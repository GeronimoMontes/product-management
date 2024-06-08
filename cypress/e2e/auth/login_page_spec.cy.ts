describe('Auth-login: Authenticate User', () => {
  const user: Cypress.User = Cypress.env('auth');

  beforeEach(() => {
    cy.visit('/auth/login/');
  });

  it('should load the input-username', () => {
    cy.get('[data-cy=cy-input-username]').should('exist');
  });

  it('should load the form-login', () => {
    cy.get('[data-cy=cy-form-login]').should('exist');
  });

  it('should load the input-password', () => {
    cy.get('[data-cy=cy-form-login]').should('exist');
    cy.get('[data-cy=cy-input-password]').should('exist');
  });

  it('should load the button-submit', () => {
    cy.get('[data-cy=cy-button-submit]').should('exist');
  });

  it('should Required: Inpunts', () => {
    cy.get('[data-cy=cy-input-username]').should('exist');
    cy.get('[data-cy=cy-input-password]').should('exist');
    cy.get('[data-cy=cy-button-submit]').click();
    const $el = cy
      .get('[data-cy=cy-error-username]')
      .should('be.exist')
      .get('[data-cy=cy-error-password]')
      .should('be.exist')
      .get('[data-cy=cy-error-form]')
      .should('not.exist');

    expect($el).be.exist;
  });

  it('should Required: input-username', () => {
    cy.get('[data-cy=cy-input-username]').type('ad').clear();
    cy.get('[data-cy=cy-input-password]').type('ad').clear();
    cy.get('[data-cy=cy-button-submit]').click();

    const $el = cy
      .get('[data-cy=cy-error-username]')
      .should('be.exist')
      .get('[data-cy=cy-error-password]')
      .should('be.exist');

    expect($el).to.be.exist;
  });

  it('should Required: input-password', () => {
    cy.get('[data-cy=cy-button-submit]').click();
    const $el = cy.get('[data-cy=cy-error-password]').should('be.exist');
    expect($el).to.be.exist;
  });

  it('should load the button-submit', () => {
    cy.get('[data-cy=cy-input-username]').type(user.username);
    cy.get('[data-cy=cy-input-password]').type(user.password + '<FAKE_PASS>');
    cy.get('[data-cy=cy-button-submit]').click({ force: true });

    const $el = cy.get('[data-cy=cy-error-form]').should('be.exist');
    expect($el).to.be.exist;
  });

  it('Authenticate: Show home page.', () => {
    cy.login(Cypress.env('auth'));
  });
});
