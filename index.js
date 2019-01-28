const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

const { USER = "USERNAME", PASS = "PASSWORD", OUT_SCHOOL_MESSAGE="กินข้าว" } = process.env;

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

  await page.goto('http://10.40.50.50:8080/MahidolGateSystem/frmSTDRequest.jsp?groupindx=2');

  await page.waitForSelector('#flex1 > tbody > tr > td > #comTypeID');
  await page.click('#flex1 > tbody > tr > td > #comTypeID');

  await page.select('#flex1 > tbody > tr > td > #comTypeID', '1013');

  await page.waitForSelector('#flex1 > tbody > tr > td > #txtSubject');
  await page.click('#flex1 > tbody > tr > td > #txtSubject');

  await page.type('#flex1 > tbody > tr > td > #txtSubject', OUT_SCHOOL_MESSAGE);

  await page.waitForSelector('#flex1 > tbody > tr > td > #comStartTimeHr');
  await page.click('#flex1 > tbody > tr > td > #comStartTimeHr');

  await page.select('#flex1 > tbody > tr > td > #comStartTimeHr', '15');

  await page.waitForSelector('#flex1 > tbody > tr:nth-child(5) > td:nth-child(1) > input.btn.btn-sm.btn-info');
  await page.click('#flex1 > tbody > tr:nth-child(5) > td:nth-child(1) > input.btn.btn-sm.btn-info');

  await navigationPromise;

  await browser.close();
})()