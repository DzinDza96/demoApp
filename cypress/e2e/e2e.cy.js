import homePage from '../support/pages/homePage.js';
import searchResultsPage from '../support/pages/searchResultsPage.js';
import data from '../fixtures/data.json';

describe('Ananas e2e spec', () => {
  it('Validate search functionality', () => {
    homePage.navigate();
    homePage.handleCookiePopup();
    homePage.searchForProduct(data.searchString);
    searchResultsPage.assertURL(data.searchString);
    searchResultsPage.handlePaginationAndCheckProductList(data.searchString);
  });
});
