/* eslint-disable no-undef */
describe('Homepage', () => {
  it('contains a title', () => {
    cy.visit('/');
    cy.contains('Donations to date');
  });

  it('contains a subheader for total donations', () => {
    cy.visit('/');
    cy.contains(
      'Number of meals that have been given to those in need thus far:',
    );
  });

  it('contains the total for donations', () => {
    cy.visit('/');
    cy.get('#total');
  });

  it('contains a subheader for total meals claimed', () => {
    cy.visit('/');
    cy.contains('Number of meals that have been donated thus far:');
  });

  it('shows a leaderboard with maximum 5 top donators', () => {
    cy.restaurantLogin();
    cy.addListing('10', 'Hello, World', '2025-02-02T11:55');
    cy.visit('/');
    cy.get('#top-donators');
  });
});
