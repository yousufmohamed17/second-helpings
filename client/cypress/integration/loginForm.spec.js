/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
describe('Signup', () => {
  it('should redirect to feed after successful login', () => {
    cy.visit('/login');
    cy.get('#username').type('Charity Supreme');
    cy.get('#password').type('Charity123!');
    cy.get('#loginSubmit').click();
    cy.location('pathname').should('eq', '/feed');
  });

  it('should give an alert if passwords is incorrect', () => {
    cy.visit('/login');
    cy.get('#username').type('Charity Supreme');
    cy.get('#password').type('wrongpassword');
    cy.get('#loginSubmit').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Incorrect password');
    });
  });

  it('should give an alert if user is not registered', () => {
    cy.visit('/login');
    cy.get('#username').type('wrongusername');
    cy.get('#password').type('Charity123!');
    cy.get('#loginSubmit').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You have not been registered yet');
    });
  });
});
