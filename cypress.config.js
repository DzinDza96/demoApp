const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://ananas.rs/',
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    scrollBehavior: 'center',
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
