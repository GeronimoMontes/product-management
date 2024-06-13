describe('Product: Create product', () => {
  const data = {
    name: 'Meal Product 001',
    description: 'Meal Product 001: Description',
    price: 120.0,
  };

  const name_taken = 'Anisette - Mcguiness';

  beforeEach(() => {
    cy.login(Cypress.env('auth'));
    cy.visit('/pages/products/table-paginate/');
    cy.get('[data-cy=cy-product-add]').should('exist').click();
  });

  afterEach(() => {
    cy.visit('/pages/products/table-paginate/');
  });

  it('should load the input-name', () => {
    cy.get('[data-cy=cy-input-name]').should('exist');
  });

  it('should load the input-description', () => {
    cy.get('[data-cy=cy-input-description]').should('exist');
  });

  it('should load the input-price', () => {
    cy.get('[data-cy=cy-input-price]').should('exist');
  });

  it('should load the input-price', () => {
    cy.get('[data-cy=cy-button-add]').should('exist');
    cy.get('[data-cy=cy-button-delete]').should('not.exist');
    cy.get('[data-cy=cy-button-update]').should('not.exist');
  });

  it('should Required: Inpunts', () => {
    cy.get('[data-cy=cy-input-name]').should('exist');
    cy.get('[data-cy=cy-input-description]').should('exist');
    cy.get('[data-cy=cy-input-price]').should('exist');
    cy.get('[data-cy=cy-button-add]').click();
    let $el;

    $el = cy.get('[data-cy=cy-error-name]').should('be.exist');
    expect($el).be.exist;
    $el = cy.get('[data-cy=cy-error-description]').should('be.exist');
    expect($el).be.exist;
    $el = cy.get('[data-cy=cy-error-price]').should('be.exist');
    expect($el).be.exist;
  });

  it('should Max Len: Inpunt Name', () => {
    cy.get('[data-cy=cy-input-name]').should('exist').type('*'.repeat(61));
    cy.get('[data-cy=cy-input-description]')
      .should('exist')
      .type(data.description);
    cy.get('[data-cy=cy-input-price]')
      .should('exist')
      .type(data.price.toString());
    cy.get('[data-cy=cy-button-add]').click();
    let $el;

    $el = cy.get('[data-cy=cy-error-name]').should('be.exist');
    expect($el).be.exist;
  });

  it('should unique name: Inpunt Name', () => {
    cy.get('[data-cy=cy-input-name]').should('exist').type(name_taken);
    cy.get('[data-cy=cy-input-description]').should('exist').type(name_taken);
    cy.get('[data-cy=cy-input-price]').should('exist').type('000');
    cy.get('[data-cy=cy-button-add]').click();
    let $el;

    $el = cy.get('[data-cy=cy-error-name]').should('be.exist');
    expect($el).be.exist;
  });

  it('should Max Len: Inpunt Description', () => {
    cy.get('[data-cy=cy-input-name]').should('exist').type(data.name);
    cy.get('[data-cy=cy-input-description]')
      .should('exist')
      .type('*'.repeat(101));
    cy.get('[data-cy=cy-input-price]')
      .should('exist')
      .type(data.price.toString());
    cy.get('[data-cy=cy-button-add]').click();
    let $el;

    $el = cy.get('[data-cy=cy-error-description]').should('be.exist');
    expect($el).be.exist;
  });

  it('should only decimal numer: Inpunt price', () => {
    cy.get('[data-cy=cy-input-name]').should('exist').type(data.name);
    cy.get('[data-cy=cy-input-description]')
      .should('exist')
      .type(data.description);
    cy.get('[data-cy=cy-input-price]')
      .should('exist')
      .type(data.price.toString() + '<aaa>');
    cy.get('[data-cy=cy-button-add]').click();
    let $el;

    $el = cy.get('[data-cy=cy-error-price]').should('be.exist');
    expect($el).be.exist;
  });

  it('should create: new Product', () => {
    cy.product(data);
  });
});
