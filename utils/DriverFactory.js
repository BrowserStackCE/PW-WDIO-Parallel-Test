// utils/DriverFactory.js
const { remote } = require('webdriverio');

class DriverFactory {
    static async create(testInfo) {
        // Pull the device assigned to this specific Playwright Project
        const device = testInfo.project.use.platformCaps;
        

        const wdioOptions = {
            hostname: 'hub.browserstack.com',
            port: 443,
            protocol: 'https',
            path: '/wd/hub',
            capabilities: {
                "platformName" : device.platformName,
                'appium:platformVersion': device.platformVersion,
                'appium:app': process.env.BS_APP_ID || 'bs://url',
                'bstack:options': {
                    'userName': process.env.BROWSERSTACK_USERNAME,
                    'accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
                    'sessionName': `${testInfo.title} [${device.deviceName}]`,
                    'buildName': process.env.BS_BUILD_NAME || 'Hybrid-Automation-Build',
                    'debug': true,
                    'networkLogs': true,
                    'deviceName': device.deviceName,
                    'osVersion': device.platformVersion                                    
                },                
            }

        };   
        
        
        return await remote(wdioOptions);
    }
}

module.exports = { DriverFactory };