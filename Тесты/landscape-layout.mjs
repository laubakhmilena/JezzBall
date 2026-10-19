import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const out=resolve(import.meta.dirname,'../QA_тестирование/Горизонтальный_режим');
await mkdir(out,{recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:412,height:924}});
const errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route('**/script.js',async route=>{
 const response=await route.fetch();
 const body=(await response.text()).replace('window.JezzBallChapterMap = {',`window.__landscapeTest={open:async()=>{state.lives=5;state.currentLevel=100;await openLevel(17,{skipReplayConfirm:true});},world:()=>({...JEZZ_WORLD,rect:levelState.rect,view:canvasView})}; window.JezzBallChapterMap = {`);
 await route.fulfill({response,body});
});
try {
 await page.goto('http://127.0.0.1:43189/?debug');
 await page.waitForSelector('#main-menu.is-active');
 await page.evaluate(()=>window.__landscapeTest.open());
 for(const [width,height] of [[412,924],[924,412],[800,360],[1024,768],[1376,1032],[568,320],[412,924],[924,412]]) {
  await page.setViewportSize({width,height});
  await page.waitForTimeout(500);
  const row=await page.evaluate(()=>{
   const box=s=>{const el=document.querySelector(s),r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};};
   return {width:innerWidth,height:innerHeight,slot:box('.jezz-canvas-slot'),canvas:box('#jezzCanvas'),hud:box('.level-hud'),top:box('#level-screen .top-ui'),tools:box('.level-tools'),world:window.__landscapeTest.world(),grid:getComputedStyle(document.querySelector('#levelPlayfield')).gridTemplateColumns};
  });
  results.push(row);console.log(JSON.stringify(row));
  await page.screenshot({path:resolve(out,width+'x'+height+'.png')});
  assert(Math.abs(row.canvas.w-row.slot.w)<2&&Math.abs(row.canvas.h-row.slot.h)<2,'canvas not filling slot');
  if(width>height){
   assert(row.slot.right>=width-16,'unused right-hand space');
   assert(row.slot.w>row.slot.h,'landscape field not wide');
   assert(row.hud.right<=row.slot.x+1&&row.tools.right<=row.slot.x+1,'controls not in left region');
   assert(row.top.right<=row.slot.x+1||row.top.bottom<=row.slot.y+1,'header overlaps board');
  }
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: '+results.length+' landscape/portrait transitions at level 17; no JS errors');
}finally{await writeFile(resolve(out,'measurements.json'),JSON.stringify({results,errors},null,2));await browser.close();}
