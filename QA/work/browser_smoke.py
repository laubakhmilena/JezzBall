from __future__ import annotations
import json, time, traceback
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

BASE = 'http://127.0.0.1:8765/index.html?debug'
QA = Path('/mnt/data/QA')
EVID = QA/'evidence'
LOG = QA/'logs'
EVID.mkdir(parents=True, exist_ok=True)
LOG.mkdir(parents=True, exist_ok=True)

results=[]
network=[]
console=[]
page_errors=[]

def rec(test_id, status, actual, evidence=''):
    results.append({'id':test_id,'status':status,'actual':actual,'evidence':evidence})

def active_screen(page):
    return page.locator('.screen.is-active').get_attribute('id')

def attach_observers(page, label):
    page.on('console', lambda msg: console.append({'scenario':label,'type':msg.type,'text':msg.text}))
    page.on('pageerror', lambda err: page_errors.append({'scenario':label,'error':str(err)}))
    page.on('requestfailed', lambda req: network.append({'scenario':label,'kind':'failed','url':req.url,'failure':req.failure}))
    page.on('response', lambda resp: network.append({'scenario':label,'kind':'response','status':resp.status,'url':resp.url}) if resp.status >= 400 else None)

def screenshot(page, name):
    path=EVID/name
    page.screenshot(path=str(path), full_page=True)
    return f'QA/evidence/{name}'

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--disable-dev-shm-usage','--no-sandbox'])

    # Desktop clean run
    context=browser.new_context(viewport={'width':1440,'height':900}, device_scale_factor=1)
    page=context.new_page(); attach_observers(page,'desktop-clean')
    t0=time.perf_counter()
    resp=page.goto(BASE, wait_until='load', timeout=30000)
    load_s=time.perf_counter()-t0
    page.wait_for_timeout(300)
    menu_ev=screenshot(page,'BVT-001_main-menu_desktop.png')
    title=page.title(); screen=active_screen(page)
    ok=(resp is not None and resp.status==200 and title=='JezzBall' and screen=='main-menu' and page.locator('#playButton').is_visible())
    rec('TC-SMOKE-001','PASS' if ok else 'FAIL',f'HTTP={resp.status if resp else None}; title={title}; active={screen}; load={load_s:.3f}s',menu_ev)

    # JS debug level audit
    try:
        audit=page.evaluate('window.auditJezzBallLevels ? window.auditJezzBallLevels([1,10,50,100]) : null')
        Path(LOG/'level-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2,default=str),encoding='utf-8')
        audit_ok = audit is not None
        rec('TC-CORE-LEVEL-AUDIT','PASS' if audit_ok else 'BLOCKED',f'Debug audit returned {type(audit).__name__}; saved to level-audit.json','QA/logs/level-audit.json')
    except Exception as e:
        rec('TC-CORE-LEVEL-AUDIT','BLOCKED',f'Debug audit call failed: {e}')

    # Keyboard focus/activation on main menu
    page.locator('body').press('Tab')
    focused=page.evaluate('document.activeElement && document.activeElement.id')
    rec('TC-INPUT-001','PASS' if focused=='playButton' else 'FAIL',f'After Tab activeElement={focused}',menu_ev)
    page.keyboard.press('Enter')
    page.wait_for_timeout(500)
    chapter_screen=active_screen(page)
    chapter_ev=screenshot(page,'SMOKE-002_chapter-1_desktop.png')
    chapter_ok=chapter_screen=='chapter-1-screen' and page.locator('#chapter-1-screen .level-button').count()>=10
    rec('TC-SMOKE-002','PASS' if chapter_ok else 'FAIL',f'Active={chapter_screen}; level buttons={page.locator("#chapter-1-screen .level-button").count()}',chapter_ev)

    # Chapter navigation and shop/achievements existence
    shop_count=page.locator('#chapter-1-screen [data-action="shop"]').count()
    ach_count=page.locator('#chapter-1-screen [data-action="achievements"]').count()
    rec('TC-UI-CHAPTER-ACTIONS','PASS' if shop_count and ach_count else 'FAIL',f'shop={shop_count}; achievements={ach_count}',chapter_ev)

    # Open shop and close
    if shop_count:
        page.locator('#chapter-1-screen [data-action="shop"]').first.click()
        page.wait_for_timeout(150)
        shop_open=page.locator('#inventoryModal').evaluate("e=>e.classList.contains('is-open') && e.getAttribute('aria-hidden')==='false'")
        shop_ev=screenshot(page,'SMOKE-003_shop.png')
        rec('TC-SHOP-001','PASS' if shop_open else 'FAIL',f'Shop open={shop_open}',shop_ev)
        page.locator('#inventoryCloseButton').click(); page.wait_for_timeout(100)
    else:
        rec('TC-SHOP-001','BLOCKED','Shop action not rendered')

    # Open achievements and close with Escape
    if ach_count:
        page.locator('#chapter-1-screen [data-action="achievements"]').first.click(); page.wait_for_timeout(150)
        panel_count=page.locator('.achievements-panel').count()
        ach_ev=screenshot(page,'SMOKE-004_achievements.png')
        page.keyboard.press('Escape'); page.wait_for_timeout(100)
        rec('TC-ACH-001','PASS' if panel_count else 'FAIL',f'Achievements panels={panel_count}',ach_ev)
    else:
        rec('TC-ACH-001','BLOCKED','Achievements action not rendered')

    # Open level 1
    lvl=page.locator('#chapter-1-screen .level-button').first
    disabled=lvl.is_disabled()
    lvl.click(); page.wait_for_timeout(700)
    level_screen=active_screen(page)
    level_ev=screenshot(page,'SMOKE-005_level-1_start.png')
    canvas_box=page.locator('#jezzCanvas').bounding_box()
    rec('TC-SMOKE-003','PASS' if (not disabled and level_screen=='level-screen' and canvas_box) else 'FAIL',f'disabled={disabled}; active={level_screen}; canvas={canvas_box}',level_ev)

    # Basic pointer action on canvas; observable HUD remains valid
    if canvas_box:
        before=page.locator('#capturePercent').inner_text()
        page.mouse.click(canvas_box['x']+canvas_box['width']*0.5, canvas_box['y']+canvas_box['height']*0.5)
        page.wait_for_timeout(1400)
        after=page.locator('#capturePercent').inner_text(); penalties=page.locator('#penaltyCount').inner_text()
        line_ev=screenshot(page,'CORE-001_after_pointer_action.png')
        valid=after.endswith('%') and penalties.split('/')[0].isdigit()
        rec('TC-CORE-001','PASS' if valid else 'FAIL',f'Capture {before}->{after}; penalties={penalties}',line_ev)
    else:
        rec('TC-CORE-001','BLOCKED','Canvas has no bounding box')

    # Restart confirmation and accepted restart
    page.locator('[data-action="restart-level"]').click(); page.wait_for_timeout(100)
    modal_open=page.locator('#confirmModal').evaluate("e=>e.classList.contains('is-open') && e.getAttribute('aria-hidden')==='false'")
    modal_ev=screenshot(page,'CORE-002_restart-confirmation.png')
    page.locator('#confirmAcceptButton').click(); page.wait_for_timeout(700)
    reset_capture=page.locator('#capturePercent').inner_text(); reset_penalty=page.locator('#penaltyCount').inner_text()
    rec('TC-CORE-RESTART','PASS' if modal_open and reset_capture=='0%' and reset_penalty.startswith('0/') else 'FAIL',f'modal={modal_open}; capture={reset_capture}; penalties={reset_penalty}',modal_ev)

    # Return to chapter confirmation cancel then accept
    page.locator('#level-screen [data-action="return-chapter"]').click(); page.wait_for_timeout(100)
    leave_modal=page.locator('#confirmModal').evaluate("e=>e.classList.contains('is-open')")
    page.locator('#confirmCancelButton').click(); page.wait_for_timeout(100)
    still_level=active_screen(page)
    page.locator('#level-screen [data-action="return-chapter"]').click(); page.wait_for_timeout(100)
    page.locator('#confirmAcceptButton').click(); page.wait_for_timeout(500)
    returned=active_screen(page)
    rec('TC-NAV-RETURN','PASS' if leave_modal and still_level=='level-screen' and returned=='chapter-1-screen' else 'FAIL',f'modal={leave_modal}; after cancel={still_level}; after accept={returned}',chapter_ev)

    # Persistence smoke: storage exists and survives reload
    storage_before=page.evaluate("localStorage.getItem('jezzball-progress-v1')")
    page.reload(wait_until='load'); page.wait_for_timeout(300)
    storage_after=page.evaluate("localStorage.getItem('jezzball-progress-v1')")
    rec('TC-SAVE-001','PASS' if storage_before and storage_after==storage_before else 'FAIL',f'before_len={len(storage_before or "")}; after_equal={storage_after==storage_before}')

    # Performance navigation timings (instrumental, not target compliance)
    perf=page.evaluate("""() => { const n=performance.getEntriesByType('navigation')[0]; return n?{domContentLoaded:n.domContentLoadedEventEnd,load:n.loadEventEnd,responseEnd:n.responseEnd,transferSize:n.transferSize}:null }""")
    Path(LOG/'browser-performance.json').write_text(json.dumps({'desktop_load_seconds':load_s,'navigation':perf},indent=2),encoding='utf-8')
    rec('TC-PERF-001','PASS' if perf else 'BLOCKED',f'Navigation timing captured: {perf}','QA/logs/browser-performance.json')

    context.close()

    # Corrupted localStorage recovery in isolated context
    context=browser.new_context(viewport={'width':1280,'height':720})
    page=context.new_page(); attach_observers(page,'corrupt-save')
    page.goto(BASE, wait_until='load')
    page.evaluate("localStorage.setItem('jezzball-progress-v1','{corrupt-json')")
    page.reload(wait_until='load'); page.wait_for_timeout(300)
    corr_screen=active_screen(page); play_visible=page.locator('#playButton').is_visible()
    corr_value=page.evaluate("localStorage.getItem('jezzball-progress-v1')")
    corr_ev=screenshot(page,'SAVE-002_corrupt-save-recovery.png')
    rec('TC-SAVE-002','PASS' if corr_screen=='main-menu' and play_visible else 'FAIL',f'active={corr_screen}; playVisible={play_visible}; storage={corr_value!r}',corr_ev)
    context.close()

    # Small viewport overlay
    context=browser.new_context(viewport={'width':320,'height':240})
    page=context.new_page(); attach_observers(page,'small-viewport')
    page.goto(BASE, wait_until='load'); page.wait_for_timeout(300)
    overlay=page.locator('#viewportTooSmallOverlay')
    small_visible=overlay.get_attribute('aria-hidden')=='false'
    small_ev=screenshot(page,'COMPAT-001_small-viewport.png')
    rec('TC-COMPAT-001','PASS' if small_visible else 'FAIL',f'overlay aria-hidden={overlay.get_attribute("aria-hidden")}',small_ev)
    context.close()

    # Mobile portrait basic flow
    context=browser.new_context(viewport={'width':390,'height':844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    page=context.new_page(); attach_observers(page,'mobile-portrait')
    page.goto(BASE, wait_until='load'); page.wait_for_timeout(300)
    mobile_menu=screenshot(page,'COMPAT-002_mobile-menu.png')
    page.locator('#playButton').tap(); page.wait_for_timeout(500)
    mchapter=active_screen(page)
    m_ev=screenshot(page,'COMPAT-003_mobile-chapter.png')
    rec('TC-COMPAT-002','PASS' if mchapter=='chapter-1-screen' else 'FAIL',f'Mobile active={mchapter}',m_ev)
    context.close()

    browser.close()

summary={'results':results,'console':console,'page_errors':page_errors,'network':network}
Path(LOG/'run-results.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
with open(LOG/'run.log','w',encoding='utf-8') as f:
    f.write(f'Executed UTC: {time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}\n')
    for r in results:
        f.write(f"{r['id']}\t{r['status']}\t{r['actual']}\t{r['evidence']}\n")
    f.write(f'\npage_errors={len(page_errors)}\n')
    for e in page_errors: f.write(json.dumps(e,ensure_ascii=False)+'\n')
    f.write(f'\nconsole_messages={len(console)}\n')
    for e in console: f.write(json.dumps(e,ensure_ascii=False)+'\n')
    f.write(f'\nnetwork_issues={len(network)}\n')
    for e in network: f.write(json.dumps(e,ensure_ascii=False)+'\n')

print(json.dumps({'counts':{s:sum(1 for r in results if r['status']==s) for s in ['PASS','FAIL','BLOCKED','NOT_RUN']},'page_errors':len(page_errors),'network_issues':len(network)},ensure_ascii=False,indent=2))
