"""Run the level test suites (and optionally the robustness bots) in headless Chromium.

Usage:
  python tests/run_tests.py                 # every suite in tests/levels
  python tests/run_tests.py --next ch1      # the preview in next/, suites in tests/next
  python tests/run_tests.py n o             # only levels/n.js and levels/o.js
  python tests/run_tests.py --robust 85,86  # mash / spam / hold bots on 0-indexed levels
"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright

HERE = pathlib.Path(__file__).resolve().parent
GAME = (HERE.parent / 'index.html').as_uri() + '#debug'
SUITES = HERE / 'levels'

async def main(args):
    global GAME, SUITES
    if args and args[0] == '--next':
        args = args[1:]
        GAME = (HERE.parent / 'next' / 'index.html').as_uri() + '#debug'
        SUITES = HERE / 'next'
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
