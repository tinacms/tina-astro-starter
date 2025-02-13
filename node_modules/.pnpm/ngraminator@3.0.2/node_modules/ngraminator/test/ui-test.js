const { chromium } = require('playwright')
const test = require('ava')
const browserPromise = chromium.launch({
  headless: true
  // slowMo: 50
})

const path = require('path')
async function pageMacro (t, callback) {
  const browser = await browserPromise
  const page = await browser.newPage()
  await page.setViewportSize({ width: 640, height: 480 })
  try {
    await callback(t, page)
  } finally {
    await page.close()
  }
}

test('Add text "Mary had a little lamb" and compare array of ngrams', pageMacro, async (t, page) => {
  // t.plan(1)
  const filePath = await path.resolve('./demo/index.html')
  const url = 'file://' + filePath

  // Go to ./index.html
  await page.goto(url)

  // Click first number input field and delete
  await page.click('#text')

  // Type number
  await page.keyboard.type('mary had a little lamb')

  let ngrammed = await (page.textContent('#nGraminated pre'))
  ngrammed = JSON.parse(ngrammed)

  // Check array
  t.deepEqual(await ngrammed, [['a', 'little'], ['a', 'little', 'lamb'], ['had', 'a'], ['had', 'a', 'little'], ['had', 'a', 'little', 'lamb'], ['little', 'lamb'], ['mary', 'had'], ['mary', 'had', 'a'], ['mary', 'had', 'a', 'little']])
})
