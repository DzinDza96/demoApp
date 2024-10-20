const productList = 'li.ais-Hits-item';
const paginationButtons = 'ul.ais-Pagination-list > a';
const sortDropdown = 'select:contains("Preporučeno")';

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

function sortByCheapestAndValidate() {
  const pricesArray = [];
  cy.get(sortDropdown).select('Rastućoj ceni');
  cy.wait(1000);
  cy.get(productList)
    .find('span:contains("RSD")', { log: false })
    .each(($el) => {
      const text = $el.siblings().text();
      const priceWithoutDot = text.replace('.', '');
      const priceNumber = parseInt(priceWithoutDot);
      pricesArray.push(priceNumber);
    })
    .then(() => {
      cy.wrap(pricesArray).then((pricesArray) => {
        //expect that the element with the lowest price is at the array first index
        let minPrice = Math.min(...pricesArray);
        let minIndex = pricesArray.indexOf(minPrice);
        expect(minIndex).equals(0);
        //expect that the element with the highest price is at the array last index
        let maxPrice = Math.max(...pricesArray);
        let maxIndex = pricesArray.indexOf(maxPrice);
        expect(maxIndex).equals(pricesArray.length - 1);
      });
    });
}

export default { assertURL, handlePaginationAndCheckProductList, sortByCheapestAndValidate };
