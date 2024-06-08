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
