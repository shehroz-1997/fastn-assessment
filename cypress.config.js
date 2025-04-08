const { defineConfig } = require("Cypress");
module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 100000,
  chromeWebSecurity: false,
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});

