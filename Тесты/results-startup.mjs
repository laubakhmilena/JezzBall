import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const out = resolve(import.meta.dirname,'../QA_тестирование/Окна_результата');
await mkdir(out,{recursive:true});
const browser = await chromium.launch({headless:true});
const context = await browser.newContext();
// Deterministic terminal-state fixtures exercise production completion/penalty handlers.
// These hooks are injected only into the test response, never into the game files.
await context.route('**/script.js', async route => {
  const response = await route.fetch();
  const body = (await response.text()).replace('window.JezzBallChapterMap = {', `
    window.__resultTest = {
      snapshot: () => ({running:levelState.running,completed:levelState.completed,failed:levelState.failed,coins:state.coins,currentLevel:state.currentLevel}),
      open: async level => { deactivateModalFocus(levelCompletePanel); levelCompletePanel.classList.remove('is-visible'); levelCompletePanel.setAttribute('aria-hidden','true'); stopJezzLevel(); state.lives=5; state.currentLevel=Math.max(state.currentLevel,level); await openLevel(level,{skipReplayConfirm:true}); },
      win: () => { levelState.capturedArea=levelState.totalArea*.9; finishJezzLevel(); },
      fail: () => { handleLinePenalty(); handleLinePenalty(); handleLinePenalty(); },
      pausedDialog: () => { pauseJezzLevelForPlatform(); showConfirm({title:'Пауза',message:'Проверка'}); resumeJezzLevelFromPlatform(); }
    }; window.JezzBallChapterMap = {`);
  await route.fulfill({response,body});
});
let page = await context.newPage();
const errors=[], checks=[];
page.on('pageerror',e=>errors.push(e.message));
const open = async level => {
  await page.evaluate(level=>window.__resultTest.open(level),level);
  await page.waitForFunction(()=>window.__resultTest.snapshot().running);
};
const main = async () => {
  await page.waitForSelector('#main-menu.is-active');
  assert.equal(await page.locator('#levelCompletePanel.is-visible').count(),0);
  assert.equal(await page.locator('#confirmModal.is-open').count(),0);
};
const fit = async selectors => {
  for(const selector of selectors) {
    const b = await page.locator(selector).boundingBox();
    const v = page.viewportSize();
    assert(b && b.width>0 && b.x>=0 && b.y>=0 && b.x+b.width<=v.width+1 && b.y+b.height<=v.height+1, `${selector} clipped: ${JSON.stringify(b)}`);
  }
};
try {
  await page.goto('http://127.0.0.1:43188/?debug#chapter-1-screen');
  await main();
  await open(1); await page.reload(); await main(); checks.push('reload playing -> main');
  for (const [width,height] of [[1366,768],[320,568],[427,952],[952,427],[568,320]]) {
    await page.setViewportSize({width,height});
    await open(1); await page.evaluate(()=>window.__resultTest.win());
    await page.waitForSelector('#levelCompletePanel.is-visible');
    await page.waitForTimeout(220);
    await fit(['.reward-card','#rewardTitle','#rewardStars','#completeReplayButton','#completeNextButton']);
    await page.screenshot({path:resolve(out,`win-${width}x${height}.png`)});
    const earned = await page.evaluate(()=>window.__resultTest.snapshot());
    await page.reload(); await main();
    assert.equal(await page.evaluate(()=>window.__resultTest.snapshot().coins),earned.coins,'lost rewards');
    checks.push(`win layout/reload ${width}x${height}`);
    await open(2); await page.evaluate(()=>window.__resultTest.fail());
    await page.waitForSelector('#confirmModal.is-open'); await page.waitForTimeout(220);
    await fit(['.confirm-panel','#confirmTitle','#confirmAcceptButton','#confirmCancelButton']);
    await page.screenshot({path:resolve(out,`loss-${width}x${height}.png`)});
    await page.locator('#confirmAcceptButton').click();
    await page.waitForFunction(()=>window.__resultTest.snapshot().running);
    assert.equal(await page.locator('#confirmModal.is-open').count(),0);
    checks.push(`loss layout/retry ${width}x${height}`);
  }
  await page.evaluate(()=>window.__resultTest.pausedDialog());
  await page.locator('#confirmCancelButton').click();
  await page.waitForFunction(()=>window.__resultTest.snapshot().running);
  checks.push('platform pause + modal resumes');
  await page.evaluate(()=>window.__resultTest.fail()); await page.waitForSelector('#confirmModal.is-open');
  await page.reload(); await main(); checks.push('reload loss -> main');
  await page.close(); page = await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:43188/?debug'); await main(); checks.push('reopened tab -> main');
  await page.setViewportSize({width:1366,height:768});
  await open(3); await page.evaluate(()=>window.__resultTest.win());
  await page.locator('#completeNextButton').click();
  await page.waitForFunction(()=>window.__resultTest.snapshot().running && document.querySelector('#levelTitle').textContent.includes('4'));
  checks.push('victory -> next level');
  for(let level=1;level<=100;level++) {
    await open(level); await page.evaluate(()=>window.__resultTest.win());
    await page.waitForSelector('#levelCompletePanel.is-visible');
    const before = await page.evaluate(()=>window.__resultTest.snapshot());
    await page.evaluate(()=>window.__resultTest.win());
    assert.equal(await page.evaluate(()=>window.__resultTest.snapshot().coins),before.coins,'duplicate award');
  }
  checks.push('100 completion handlers, visible results, no duplicate rewards');
  assert.deepEqual(errors,[]);
  console.log(`PASS: ${checks.length} scenarios including 100 terminal-state fixtures; no JS errors`);
} finally {
  await writeFile(resolve(out,'checks.json'),JSON.stringify({checks,errors},null,2));
  await browser.close();
}
