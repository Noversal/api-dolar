const { chromium } = require('playwright');

async function getBrowserAndPage() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, page };
}

async function locateAndObtainData({ page, URL, locate }) {
  await page.goto(URL);
  const valueDolar = page.locator(locate);
  const value = await valueDolar.allTextContents();
  return value;
}

function getMatchingValues({ valueArray, identifier }) {
  return valueArray.filter((element) => {
    const isLongEnough = element.length > 2;
    const isIdentifier = element.startsWith(identifier);
    return isLongEnough && isIdentifier;
  });
}

function dataInformationProcessing(valueArray) {
  const identifier = { name: 'DÓLAR', cost: '$' };

  const costDolar = getMatchingValues({
    valueArray,
    identifier: identifier.cost,
  });
  const nameDolar = getMatchingValues({
    valueArray,
    identifier: identifier.name,
  });

  return costDolar.map((price, i) => {
    return { name: nameDolar[i], price: price.replace(',', '.').slice(1) };
  });
}

module.exports = (async () => {
  const { browser, page } = await getBrowserAndPage();
  const URL = 'https://www.cronista.com/informacion-de-mercados/';
  const locate = '.items-3 > li span';
  const scrapedData = await locateAndObtainData({ page, URL, locate });
  
  await browser.close();
  return dataInformationProcessing(scrapedData)
})
