"""Run the level test suites (and optionally the robustness bots) in headless Chromium.

Usage:
  python tests/run_tests.py                 # every suite in tests/chapters
  python tests/run_tests.py ch1 ch2         # only chapters/ch1.js and chapters/ch2.js
  python tests/run_tests.py --robust 0,1 150   # mash / spam / hold / wander bots on 0-indexed levels, 150 runs each
  python tests/run_tests.py --legacy        # the first version (legacy/index.html) against tests/legacy
"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright

HERE = pathlib.Path(__file__).resolve().parent
GAME = (HERE.parent / 'index.html').as_uri() + '#debug'
SUITES = HERE / 'chapters'

async def main(args):
    global GAME, SUITES
    if args and args[0] == '--next':  # old name, kept so earlier commands still work
        args = args[1:]
    if args and args[0] == '--legacy':
        args = args[1:]
        GAME = (HERE.parent / 'legacy' / 'index.html').as_uri() + '#debug'
        SUITES = HERE / 'legacy'
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto(GAME)
        await page.wait_for_timeout(300)
        await page.evaluate('window.__pred.pause(true)')
        await page.add_script_tag(content=(HERE / 'lib.js').read_text())
        await page.add_script_tag(content=(HERE / 'solver.js').read_text())
        failed = 0
        if args and args[0] == '--robust':
            await page.evaluate(f'window.__LVLS = [{args[1]}]; window.__N = {args[2] if len(args) > 2 else 60};')
            out = await page.evaluate((HERE / 'robustness.js').read_text())
            print('\n'.join(out))
        else:
            names = args or sorted(f.stem for f in SUITES.glob('*.js'))
            for name in names:
                out = await page.evaluate((SUITES / f'{name}.js').read_text())
                for line in out:
                    print(line)
                    failed += line.startswith('XX')
        print('page errors:', errors[:5])
        await browser.close()
        sys.exit(1 if failed or errors else 0)

asyncio.run(main(sys.argv[1:]))
