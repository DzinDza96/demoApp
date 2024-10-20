const resolveCookieBtn = 'button:contains("Slažem se")';
const searchInput = 'input[placeholder="Unesi pojam za pretragu..."]';
const searchBtn = 'button[aria-label="Search"]';

function navigate() {
  cy.visit('/');
}

function handleCookiePopup() {
  cy.get('body').then((body) => {
    const isVisible = body.find(resolveCookieBtn).length > 0;
    if (isVisible) {
      cy.get(resolveCookieBtn).click();
    }
  });
}

function searchForProduct(product) {
  cy.get(searchInput).should('be.visible').type(product);
  cy.get(searchBtn).should('be.visible').click();
}

export default { navigate, handleCookiePopup, searchForProduct };
