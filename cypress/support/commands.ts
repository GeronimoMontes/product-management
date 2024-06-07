/// <reference types="cypress" />

import { keys } from "cypress/types/lodash"

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
Cypress.Commands.add("login", (userCredenctials) => {
    cy.session(
        userCredenctials,
        () => {
            cy.visit('auth/login/')
            cy.visit('/login')
            cy.get('input[name=username]').type(userCredenctials.username)
            cy.get('input[name=password]').type(userCredenctials.password)
            cy.get('form').submit()
        },
        {
            validate: () => {
                cy.getAllLocalStorage().then((result) => {
                    expect(result).to.deep.equal({
                        keys: ['token']
                    })
                })
            },
        }

    )
    cy.visit("/auth/login/")
})
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