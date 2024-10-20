const productList = 'li.ais-Hits-item';
const paginationButtons = 'ul.ais-Pagination-list > a';

const getProductName = (item) => {
  const name = item.split(' ');
  return name[0];
};

function assertURL(product) {
  cy.url().should('include', getProductName(product));
}

function handlePaginationAndCheckProductList(product) {
  cy.get(paginationButtons).each(($el) => {
    cy.wrap($el)
      .click({ force: true })
      .then(() => {
        cy.wait(1000);
        checkProductList(product);
      });
  });
}

function checkProductList(product) {
  const productName = getProductName(product);
  cy.get(productList).each(($el, index) => {
    cy.wrap($el, { log: false }).find('img', { log: false }).should('exist');
    cy.wrap($el, { log: false })
      .find('span:contains("RSD")', { log: false })
      .then(($el) => {
        const text = $el.parent().text();
        console.log('Price', text);
      });
    cy.wrap($el, { log: false })
      .find('h3', { log: false })
      .invoke('text')
      .then((text) => {
        expect(text).to.contain(productName);
      });
  });
}

export default { assertURL, handlePaginationAndCheckProductList };
