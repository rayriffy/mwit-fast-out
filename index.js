const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

const { USER = "USERNAME", PASS = "PASSWORD", BACK_HOME_MESSAGE="กลับบ้าน" } = process.env;

(async function () {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto('http://10.40.50.50:8080/MahidolGateSystem/login.jsp');

  // Login

  await page.waitForSelector('body > #cerceve > .formbody > form > .text:nth-child(1)');
  await page.type('body > #cerceve > .formbody > form > .text:nth-child(1)', USER);

  await page.waitForSelector('body > #cerceve > .formbody > form > .text:nth-child(2)');
  await page.type('body > #cerceve > .formbody > form > .text:nth-child(2)', PASS);

  await page.waitFor(500) // Prevent form to submit before DOM is loaded

  await page.waitForSelector('#cerceve > div.formbody > form > input:nth-child(1)');
  await page.click('#cerceve > div.formbody > form > input.submit', {visible: true});

  // Request

  await page.goto('http://10.40.50.50:8080/MahidolGateSystem/frmSTDRequestHome.jsp?groupindx=2');

  await page.waitForSelector('table > tbody > tr > td > #txtSubject')
  await page.click('table > tbody > tr > td > #txtSubject')

  await page.waitForSelector('table > tbody > tr > td > #dateEnd')
  await page.click('table > tbody > tr > td > #dateEnd')

  await page.waitForSelector('table > tbody > tr > td > #dateEnd')
  await page.click('table > tbody > tr > td > #dateEnd')

  await page.waitForSelector('table > tbody > tr > td > #btnSave')
  await page.click('table > tbody > tr > td > #btnSave')

  await navigationPromise;

  await browser.close();
})()