const { defineConfig } = require("Cypress");
module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 100000,
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'fastn assessment',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    html: true,
    autoOpen:true,
    reportDir: 'cypress/reports/fastn-test-reports',
    reportFilename: "[status]_[fastn-assessment]-report",
    
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  }
});

