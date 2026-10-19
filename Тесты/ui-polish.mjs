import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const out=resolve(import.meta.dirname,'../QA_тестирование/Иконки_и_панели');
await mkdir(out,{recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route('**/script.js',async route=>{
 const response=await route.fetch();
 const body=(await response.text()).replace('window.JezzBallChapterMap = {',`
 window.__uiTest={shop:()=>openInventoryModal('chests'),achievements:()=>openAchievementsPanel(),
 confirm:n=>showConfirm({title:'Проверка',message:'Выберите действие',acceptText:'Продолжить',cancelText:n===1?null:'Назад'})};
 window.JezzBallChapterMap = {`);
 await route.fulfill({response,body});
});
let checks=0;
try {
 for(const [width,height] of [[1366,768],[320,568],[427,952],[952,427],[568,320]]) {
  await page.setViewportSize({width,height});
  for(const screen of ['shop','achievements','one','two']) {
   await page.goto((process.env.QA_URL||'http://127.0.0.1:43188/')+'?debug');
   await page.waitForSelector('#main-menu.is-active');
   await page.evaluate(s=>{if(s==='one'||s==='two')window.__uiTest.confirm(s==='one'?1:2);else window.__uiTest[s]();},screen);
   await page.waitForTimeout(300);
   const selector=screen==='shop'?'#inventoryModal':screen==='achievements'?'.achievements-panel':'#confirmModal';
   assert(await page.locator(selector).isVisible());
   const images=await page.locator(selector+' img').evaluateAll(async imgs=>{
    await Promise.all(imgs.map(i=>i.decode()));
    return imgs.every(i=>i.naturalWidth>0);
   });
   assert(images,'broken icon');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal page overflow');
   if(screen==='shop') assert.equal(await page.locator('.chest-card .shop-card-image').count(),3);
   if(screen==='achievements') assert.equal(await page.locator('.achievement-icon img').count(),20);
   if(screen==='one'||screen==='two') {
    const panel=await page.locator('.confirm-actions').boundingBox();
    const a=await page.locator('#confirmAcceptButton').boundingBox();
    assert(a.x>=0&&a.y>=0&&a.x+a.width<=width&&a.y+a.height<=height);
    if(screen==='one') assert(Math.abs(a.x+a.width/2-panel.x-panel.width/2)<1,'single action not centered');
    else {const b=await page.locator('#confirmCancelButton').boundingBox();assert(Math.abs(a.width-b.width)<1,'unequal actions');}
   }
   await page.screenshot({path:resolve(out,screen+'-'+width+'x'+height+'.png')});
   checks++;
  }
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: '+checks+' UI scenarios, all 23 SVG icons load, no JS errors');
} finally {await browser.close();}
