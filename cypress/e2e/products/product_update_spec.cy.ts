describe('Product: Update product', () => {
  const data = {
    name: 'Meal Product 001',
    description: 'Meal Product 001: Description',
    price: 120.0,
  };

  beforeEach(() => {
    cy.login(Cypress.env('auth'));
    cy.visit('/pages/products/table-paginate/');
    cy.get('[data-cy=cy-table-products]').should('exist');
  });

  afterEach(() => {
    cy.visit('/pages/products/table-paginate/');
  });

  it('should create: new Product', () => {
    cy.get('[data-cy=cy-product-search]').type(data.name);

    cy.get('[data-cy=cy-table-products] tbody tr').should(
      'not.have.text',
      'No data found...'
    );

    const $el = cy
      .get(`button[name="${data.name.replaceAll(' ', '-')}"]`)
      .should('exist');
    expect($el).exist;

    $el.click();

    cy.get('[data-cy=cy-input-name]').clear().type(data.name);
    cy.get('[data-cy=cy-input-description]').clear().type(
      data.description.concat('mod')
    );
    cy.get('[data-cy=cy-input-price]').clear().type(data.price.toString());
    cy.get('[data-cy=cy-button-update]').click();
    cy.get('.swal2-confirm').click();
  });
});
