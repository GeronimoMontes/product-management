describe('Product: Delete product', () => {
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

    cy.get(`button[name="${data.name.replaceAll(' ', '-')}"]`)
      .should('exist')
      .click();

    cy.get('[data-cy=cy-button-delete]').click();
    cy.get('.swal2-confirm').click();
  });
});
