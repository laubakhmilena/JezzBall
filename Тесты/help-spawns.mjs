import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const out=resolve(import.meta.dirname,'../QA_тестирование/Подсказки_и_старты');
await mkdir(out,{recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route('**/script.js',async route=>{
 const response=await route.fetch();
 const body=(await response.text()).replace('window.JezzBallChapterMap = {',`
 window.__fixTest={
 open:async()=>{state.lives=5;state.currentLevel=100;await openLevel(10,{skipReplayConfirm:true});},
 snapshot:()=>({running:levelState.running,coins:state.coins}),
 shop:()=>{state.coins=5000;openInventoryModal('chests');},
 spawns:()=>Array.from({length:100},(_,i)=>{
  const config=getLevelConfig(i+1),rect={x:16,y:16,w:352,h:608};
  const obstacles=(config.obstacles||[]).map((o,j)=>createObstacle(o,rect,j));
  const balls=createLevelBalls(config,rect,obstacles,i+1);
  return {level:i+1,balls,repeat:createLevelBalls(config,rect,obstacles,i+1),
   safe:balls.every((b,j)=>b.x-b.r>rect.x&&b.y-b.r>rect.y&&b.x+b.r<rect.x+rect.w&&b.y+b.r<rect.y+rect.h
    &&!obstacles.some(o=>ballTouchesObstacle(b,o,2))
    &&balls.every((a,k)=>j===k||Math.hypot(a.x-b.x,a.y-b.y)>a.r+b.r+2))};
 })
 };window.JezzBallChapterMap = {`);
 await route.fulfill({response,body});
});
const url=process.env.QA_URL||'http://127.0.0.1:43189/';
const fit=async selector=>{
 const box=await page.locator(selector).boundingBox(),v=page.viewportSize();
 assert(box&&box.x>=0&&box.y>=0&&box.x+box.width<=v.width+1&&box.y+box.height<=v.height+1,selector+' clipped '+JSON.stringify(box));
};
try {
 await page.goto(url+'?debug');
 await page.waitForSelector('#main-menu.is-active');
 const spawns=await page.evaluate(()=>window.__fixTest.spawns());
 for(const item of spawns){assert(item.safe,'unsafe level '+item.level);assert.deepEqual(item.balls,item.repeat);}
 for(let i=1;i<100;i++)assert(Math.hypot(spawns[i].balls[0].x-spawns[i-1].balls[0].x,spawns[i].balls[0].y-spawns[i-1].balls[0].y)>40,'similar neighbours '+i);
 await writeFile(resolve(out,'spawn-checks.json'),JSON.stringify(spawns,null,2));
 for(const [width,height] of [[1366,768],[320,568],[952,427],[568,320]]) {
  await page.setViewportSize({width,height});
  await page.goto(url+'?debug');await page.waitForSelector('#main-menu.is-active');
  await page.evaluate(()=>window.__fixTest.open());
  await page.waitForSelector('.obstacle-legend-toggle',{state:'visible'});
  await fit('.obstacle-legend-toggle');
  if(width>height&&height<=600){
   const b=await page.locator('.level-boost-button').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y};}));
   assert.equal(b[0].y,b[1].y);assert.equal(b[2].y,b[3].y);assert.equal(b[0].x,b[4].x);assert(b[4].y>b[2].y);
  }
  await page.screenshot({path:resolve(out,'controls-'+width+'x'+height+'.png')});
  await page.locator('.obstacle-legend-toggle').click();
  await page.waitForSelector('#confirmModal.is-open');
  await page.waitForTimeout(250);
  assert.equal(await page.locator('#confirmTitle').textContent(),'Препятствия');
  assert.equal((await page.evaluate(()=>window.__fixTest.snapshot())).running,false);
  await fit('.confirm-panel');await fit('#confirmAcceptButton');
  await page.screenshot({path:resolve(out,'help-'+width+'x'+height+'.png')});
  await page.locator('#confirmAcceptButton').click();
  await page.waitForFunction(()=>window.__fixTest.snapshot().running);
  assert.equal(await page.locator('.obstacle-legend-toggle').getAttribute('aria-expanded'),'false');
  await page.locator('.obstacle-legend-toggle').focus();await page.keyboard.press('Enter');
  await page.waitForSelector('#confirmModal.is-open');await page.keyboard.press('Escape');
  await page.waitForFunction(()=>window.__fixTest.snapshot().running);
  await page.evaluate(()=>window.__fixTest.shop());
  await page.locator('[data-chest-id="medium_chest"]').click();
  await page.waitForSelector('.shop-chest-result-panel');
  await page.waitForTimeout(300);
  assert.equal(await page.locator('.shop-chest-result-icon img').evaluate(i=>i.complete&&i.naturalWidth>0),true);
  await fit('.shop-chest-result-card');await fit('.shop-chest-result-claim');
  await page.screenshot({path:resolve(out,'chest-'+width+'x'+height+'.png')});
  await page.locator('.shop-chest-result-claim').click();
  assert.equal(await page.locator('.shop-chest-result-panel').count(),0);
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: 100 safe/deterministic level spawns; 99 distinct adjacent starts; help mouse/keyboard/pause/resume, 2-column boosters and real chest purchase at 4 viewport sizes; no JS errors.');
} finally {await browser.close();}
