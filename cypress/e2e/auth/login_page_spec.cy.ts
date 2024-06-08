describe('Testing authenticate page!', () => {
  it('', () => {
    // const userCredenctials = { username: Cypress.env('username'), password: Cypress.env('password') };
    cy.login(Cypress.env('auth'));
  })
});