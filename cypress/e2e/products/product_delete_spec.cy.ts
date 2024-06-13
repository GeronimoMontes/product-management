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

  it('should exist Product', () => {
    cy.find_product(data.name).then((found: any) => {
      if (found) {
        const $el = cy.get('[data-cy=cy-form-product]').should('be.exist');
        expect($el).to.be.exist;
        cy.get('[data-cy=cy-button-add]').should('not.exist');
        cy.get('[data-cy=cy-button-delete]').should('exist');
        cy.get('[data-cy=cy-button-update]').should('exist');
      }
    });
  });

  it('should delete product', () => {
    cy.find_product(data.name).then((found: any) => {
      if (found) {
        cy.get('[data-cy=cy-button-delete]').click();
        cy.get('.swal2-confirm').click();
        cy.find_product(data.name);
      }
    });
  });

  // it('should create: new Product', () => {
  //   const str_random = Math.random().toString(36).substr(2, 10);
  //   cy.get('[data-cy=cy-input-name]')
  //     .should('exist')
  //     .type(str_random + ': ' + data.name);
  //   cy.get('[data-cy=cy-input-description]')
  //     .should('exist')
  //     .type(str_random + ': ' + data.description);
  //   cy.get('[data-cy=cy-input-price]')
  //     .should('exist')
  //     .type(data.price.toString());
  //   cy.get('[data-cy=cy-button-add]').click();
  //   cy.get('.swal2-confirm').click();
  // });
});
