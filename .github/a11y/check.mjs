// Accessibility check: serves the built site, then runs axe-core (WCAG 2.1 A and AA rules)
// on every page listed in pages.json, at desktop and phone widths, in each colour scheme.
// At 320px it also fails if the page scrolls sideways (WCAG 1.4.10 Reflow).
// Run after the build:  node .github/a11y/check.mjs
import { chromium } from 'playwright'
import { AxeBuilder } from '@axe-core/playwright'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'

const cfg = JSON.parse(readFileSync(new URL('./pages.json', import.meta.url), 'utf8'))
const schemes = cfg.schemes ?? ['light']
const widths = cfg.widths ?? [1300, 320]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const server = spawn(cfg.serve, { shell: true, stdio: 'ignore', detached: true })
const stop = () => { try { process.kill(-server.pid) } catch { /* already gone */ } }

async function waitUp(url) {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(url)).ok) return } catch { /* not up yet */ }
    await sleep(500)
  }
  throw new Error(`Server never came up at ${url}`)
}

let problems = 0
try {
  await waitUp(cfg.url)
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
  for (const scheme of schemes) {
    for (const width of widths) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme })
      for (const path of cfg.pages) {
        const page = await ctx.newPage()
        await page.goto(cfg.url + path, { waitUntil: 'networkidle' })
        await sleep(cfg.settleMs ?? 800)
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
        const where = `${path || '/'} at ${width}px, ${scheme}`
        for (const v of result.violations) {
          problems++
          console.log(`✗ ${where}: ${v.id} (${v.impact}) ${v.help}, ${v.nodes.length} element(s)`)
          for (const n of v.nodes.slice(0, 3)) console.log(`    ${n.target.join(' ')}`)
        }
        if (width <= 320 && overflow > 1) {
          problems++
          console.log(`✗ ${where}: page scrolls sideways by ${overflow}px`)
        }
        if (!result.violations.length && !(width <= 320 && overflow > 1)) console.log(`✓ ${where}`)
        await page.close()
      }
      await ctx.close()
    }
  }
  await browser.close()
} finally {
  stop()
}

if (problems) {
  console.log(`\n${problems} accessibility problem(s) found.`)
  process.exit(1)
}
console.log('\nNo accessibility problems found.')
