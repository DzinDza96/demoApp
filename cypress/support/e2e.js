import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

function disableXHRInterception() {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
}

beforeEach(() => {
  disableXHRInterception();
});
