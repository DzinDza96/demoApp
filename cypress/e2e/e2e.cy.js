import homePage from '../support/pages/homePage.js';
import searchResultsPage from '../support/pages/searchResultsPage.js';
import data from '../fixtures/data.json';

beforeEach(() => {
  homePage.navigate();
  homePage.handleCookiePopup();
});

describe('Ananas e2e tests', () => {
  it('Validate search functionality', () => {
    homePage.searchForProduct(data.searchString);
    searchResultsPage.assertURL(data.searchString);
    searchResultsPage.handlePaginationAndCheckProductList(data.searchString);
  });
  it('Validate sort by cheapest', () => {
    homePage.searchForProduct(data.searchString);
    searchResultsPage.sortByCheapestAndValidate();
  });
});
