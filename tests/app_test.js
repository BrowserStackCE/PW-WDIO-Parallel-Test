const { test, expect } = require('@playwright/test');
const { remote } = require('webdriverio');
//const BrowserStackConfig = require('browserstack-node-sdk');
//const BrowserStackConfig = require('browserstack-node-sdk/dist/bin/utils/config');
//const BrowserStackConfig = require('browserstack-node-sdk/config'); // Note the internal path
const { DriverFactory } = require('../utils/DriverFactory');

const fs = require('fs');
const path = require('path');

test.describe('Hybrid Mobile Automation', () => {
  let driver;

  test.beforeEach(async ({ }, testInfo) => {
    driver = await DriverFactory.create(testInfo);
  });

  test('should login successfully in native app', async () => {
    
    var searchSelector = await $(`~Search Wikipedia`);
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    var insertTextSelector = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    await insertTextSelector.addValue("Browsertack");
    await browser.pause(5000);

    var allProductsName = await $$(`android.widget.TextView`);
    assert(allProductsName.length > 0);
  });

  test('After successful login trigger rest of the tests', async () => {
    
    var searchSelector = await $(`~Search Wikipedia`);
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    var insertTextSelector = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    await insertTextSelector.addValue("Browsertack");
    await browser.pause(5000);

    var allProductsName = await $$(`android.widget.TextView`);
    assert(allProductsName.length > 0);
  });

  test.afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });
});