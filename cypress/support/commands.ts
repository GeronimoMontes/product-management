/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

/**
 * Session: Authenticate user
 */
Cypress.Commands.add('find_product', (name: any) => {
  cy.get('[data-cy=cy-product-search]').type(name);

  // Busca el elemento en la tabla
  // Esperar a que las filas de la tabla aparezcan
  cy.get('[data-cy=cy-table-products] tbody tr').should(
    'not.have.text',
    'No data found...'
  );

  let found = false;
  // Iterar sobre cada fila y buscar el elemento
  return cy.get('[data-cy=cy-table-products] tbody tr').each(($row) => {
    cy.wrap($row)
      .then((row) => {
        if (row.find('td').eq(1).text === name) {
          // Encontrar el botón de acción en la misma fila y hacer clic
          cy.wrap(row).get('td').eq(4).first().click();
          found = true;
        }
      })
      .then(() => {
        return cy.wrap(found);
        // Devolver el valor de 'found' envuelto en un comando de Cypress
      });
  });
  // expect(found).to.be.false;
});
Cypress.Commands.add('product', (data) => {
  cy.get('[data-cy=cy-input-name]').type(data.name);

  cy.get('[data-cy=cy-input-description]').type(data.description);

  cy.get('[data-cy=cy-input-price]').type(data.price.toString());

  cy.get('[data-cy=cy-button-add]').click();

  cy.get('.swal2-confirm').click();
});

Cypress.Commands.add('login', (userCredenctials) => {
  cy.session(
    userCredenctials,
    () => {
      cy.visit('/auth/login/');

      cy.get('[data-cy=cy-input-username]').type(userCredenctials.username);

      cy.get('[data-cy=cy-input-password]').type(userCredenctials.password);

      cy.get('[data-cy=cy-form-login]').submit();

      cy.location('pathname').should(
        'contains',
        '/pages/products/table-paginate'
      );
    },
    {
      validate: () => {
        cy.getAllLocalStorage({ log: true }).then((result) => {
          expect(result)
            .to.have.ownProperty('http://localhost:4200')
            .ownProperty('token');
        });
      },
    }
  );
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
