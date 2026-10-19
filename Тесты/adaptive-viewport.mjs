import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const out = resolve(import.meta.dirname, '../QA_тестирование/Адаптивность_экрана');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
let page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
// Test-only read access to real runtime state; production files have no added hooks.
const attachProbe = async page => page.route('**/script.js', async route => {
  const response = await route.fetch();
  const body = (await response.text()).replace('window.JezzBallChapterMap = {', `window.__prepareInputFixture = () => {
    levelState.balls.forEach(ball => {ball.x=280;ball.y=480;});
  }; window.__viewportProbe = () => ({
    view: {...canvasView}, aim: levelState.keyboardAimPoint,
    line: levelState.activeLine ? {x:levelState.activeLine.x,y:levelState.activeLine.y,orientation:levelState.activeLine.orientation} : null,
    captured:levelState.capturedArea, lives:state.lives,
    rect:levelState.rect, walls:levelState.walls
  }); window.JezzBallChapterMap = {`);
  await route.fulfill({ response, body });
});
await attachProbe(page);
await page.goto('http://127.0.0.1:43188/?debug');
await page.getByRole('button', { name: 'Играть', exact: true }).click();
await page.getByRole('button', { name: 'Текущий уровень 1', exact: true }).click();
const results = [];
try {
  for (const [width, height] of [[1920,911],[1366,768],[1024,768],[320,568],[360,800],[412,924],[390,844],[427,952],[768,1024],[1032,1376],[952,427],[812,375],[667,375],[568,320],[427,952],[1920,911]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(400);
    const result = await page.evaluate(() => {
      const box = el => { const r = el.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}; };
      const stage = box(document.querySelector('#levelPlayfield'));
      const canvas = box(document.querySelector('#jezzCanvas'));
      const slot = box(document.querySelector('.jezz-canvas-slot'));
      const controls = [...document.querySelectorAll('#level-screen .top-ui button, #level-screen .level-boost-button, #level-screen .resource-pill')].filter(el => el.getClientRects().length).map(el => ({name:el.getAttribute('aria-label'),...box(el)}));
      const helper = box(document.querySelector('.level-helper-panel'));
      const m = document.querySelector('canvas#jezzCanvas').getContext('2d').getTransform();
      return { width:innerWidth,height:innerHeight,stage,canvas,slot,controls,helper,transform:{a:m.a,b:m.b,c:m.c,d:m.d},scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight };
    });
    results.push(result);
    await page.screenshot({ path:resolve(out, `${width}x${height}.png`) });
    const within = b => b.x >= -1 && b.y >= -1 && b.right <= width+1 && b.bottom <= height+1;
    assert(within(result.stage), `stage outside ${width}x${height}`);
    assert(within(result.canvas) && result.canvas.w > 100 && result.canvas.h > 100, `canvas unusable ${width}x${height}`);
    assert.equal(result.scrollWidth, width, 'horizontal scroll');
    assert.equal(result.scrollHeight, height, 'vertical scroll');
    for (const c of result.controls) assert(within(c) && c.w>=43 && c.h>=43, `control ${c.name} ${width}x${height}: ${JSON.stringify(c)}`);
    for (const c of result.controls) assert(c.right <= result.canvas.x+1 || c.x >= result.canvas.right-1 || c.bottom <= result.canvas.y+1 || c.y >= result.canvas.bottom-1, 'control overlaps canvas');
    assert(Math.abs(Math.hypot(result.transform.a,result.transform.b)-Math.hypot(result.transform.c,result.transform.d)) < .001, 'nonuniform scale');
    assert(Math.abs(result.canvas.w-result.slot.w)<=1 && Math.abs(result.canvas.h-result.slot.h)<=1, 'board does not fill available slot');
    if(width<height) {
      assert(Math.abs(result.stage.w-width)<1 && Math.abs(result.stage.h-height)<1, 'portrait not full viewport');
      assert(result.canvas.h > result.canvas.w, 'portrait field unexpectedly rotated');
    }
    if(width>height && height<=600) assert(result.slot.x/width>=.24 && result.slot.x/width<=.31, 'landscape split not 25/75');
  }
  for (const [width,height,touch] of [[1366,768,false],[390,844,true],[952,427,true]]) {
    await page.close();
    page = await browser.newPage();
    page.on('pageerror', error => errors.push(error.message));
    // Hold physics only while inspecting input coordinates. Otherwise a valid
    // line can collide/finish between browser commands and make this test flaky.
    await page.addInitScript(() => {
      const requestFrame = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = callback => {
        const tick = time => window.__holdInputFrames ? requestFrame(tick) : callback(time);
        return requestFrame(tick);
      };
    });
    await attachProbe(page);
    await page.setViewportSize({width,height});
    await page.goto('http://127.0.0.1:43188/?debug');
    await page.getByRole('button',{name:'Играть',exact:true}).click();
    await page.getByRole('button',{name:'Текущий уровень 1',exact:true}).click();
    await page.waitForTimeout(250);
    await page.evaluate(() => {
      window.__holdInputFrames = true;
      window.__prepareInputFixture();
    });
    const state = await page.evaluate(() => window.__viewportProbe());
    const b = await page.locator('#jezzCanvas').boundingBox();
    const v = state.view;
    const worldHeight=state.rect.h+2*state.rect.y;
    const x = b.x+v.offsetX+(v.rotated ? worldHeight-320 : 140)*v.scale;
    const y = b.y+v.offsetY+(v.rotated ? 140 : 320)*v.scale;
    // A screen-vertical drag must draw a screen-vertical line in either world orientation.
    if (touch) {
      const session = await page.context().newCDPSession(page);
      await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
      await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-40}]});
      const p = await page.evaluate(() => window.__viewportProbe());
      assert(p.line && p.line.orientation === (v.rotated?'horizontal':'vertical'), 'touch direction');
      assert(Math.abs(p.line.x-140)<2 && Math.abs(p.line.y-320)<2, 'touch inverse coordinates');
      await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await session.detach();
    } else {
      await page.mouse.move(x,y); await page.mouse.down(); await page.mouse.move(x,y-40);
      const p = await page.evaluate(() => window.__viewportProbe());
      assert(p.line && p.line.orientation === 'horizontal', 'mouse direction');
      assert(Math.abs(p.line.x-140)<2 && Math.abs(p.line.y-320)<2, 'mouse inverse coordinates');
      await page.mouse.up();
    }
    await page.locator('#jezzCanvas').focus();
    await page.keyboard.press('ArrowRight');
    const first = await page.evaluate(() => window.__viewportProbe());
    await page.keyboard.press('ArrowRight');
    const second = await page.evaluate(() => window.__viewportProbe());
    assert(v.rotated ? second.aim.y<first.aim.y : second.aim.x>first.aim.x, 'keyboard screen direction');
    await page.evaluate(() => { window.__holdInputFrames = false; });
    await page.waitForTimeout(1700);
    const before = await page.evaluate(() => window.__viewportProbe());
    await page.setViewportSize({width:height,height:width});
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => window.__viewportProbe());
    assert(Math.abs(after.captured/(after.rect.w*after.rect.h)-before.captured/(before.rect.w*before.rect.h))<1e-8,'rotation lost capture percentage');
    assert.equal(after.lives,before.lives,'rotation spent life');
    const normalizedWalls = state => state.walls.map(w=>w.orientation==='vertical'
      ? {orientation:w.orientation,x:(w.x-state.rect.x)/state.rect.w,y1:(w.y1-state.rect.y)/state.rect.h,y2:(w.y2-state.rect.y)/state.rect.h}
      : {orientation:w.orientation,y:(w.y-state.rect.y)/state.rect.h,x1:(w.x1-state.rect.x)/state.rect.w,x2:(w.x2-state.rect.x)/state.rect.w});
    const a=normalizedWalls(after), previousWalls=normalizedWalls(before);
    assert.equal(a.length,previousWalls.length,'rotation lost walls');
    for(let i=0;i<a.length;i++) for(const key of Object.keys(a[i])) {
      if(key==='orientation')assert.equal(a[i][key],previousWalls[i][key]);
      else assert(Math.abs(a[i][key]-previousWalls[i][key])<1e-8,'rotation changed wall position');
    }
  }
  await page.setViewportSize({width:952,height:427});
  await page.evaluate(async () => {
    const api = window.JezzBallChapterMap;
    api.setCurrentLevel(11);
    await api.openLevel(11);
  });
  for (const [width,height] of [[952,427],[568,320],[320,568]]) {
    await page.setViewportSize({width,height});
    await page.waitForTimeout(300);
    const legend = await page.locator('.obstacle-legend-toggle').boundingBox();
    assert(legend && legend.x>=0 && legend.y>=0 && legend.x+legend.width<=width+1 && legend.y+legend.height<=height+1, 'obstacle help outside viewport');
    await page.screenshot({path:resolve(out,`obstacles-${width}x${height}.png`)});
  }
  await page.getByRole('button',{name:'Назад к главе',exact:true}).click();
  assert(await page.evaluate(() => !document.activeElement.closest('[aria-hidden="true"]')), 'focus remains inside hidden screen');
  await page.close();
  page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const fileErrors = [];
  page.on('console', msg => { if(msg.type()==='error') fileErrors.push(msg.text()); });
  await page.goto(pathToFileURL(resolve(import.meta.dirname,'../index.html')).href);
  await page.getByRole('button',{name:'Играть',exact:true}).click();
  await page.getByRole('button',{name:'Текущий уровень 1',exact:true}).click();
  await page.waitForTimeout(300);
  assert.deepEqual(fileErrors, [], 'file launch console errors');
  assert.deepEqual(errors, []);
  console.log(`PASS: ${results.length} viewport/rotation checks; 3 input/progress checks; 3 obstacle layouts; focus transition; direct file launch; no page errors`);
} finally {
  await writeFile(resolve(out,'measurements.json'), JSON.stringify({results,errors},null,2));
  await browser.close();
}
