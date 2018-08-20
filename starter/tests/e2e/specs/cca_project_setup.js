// This recipe is very similar to the 'Logging In - HTML web form'
// except that is uses AJAX (XHR's) under the hood instead
// of using a regular HTML form submission.
//
// We are going to test a few things:
// 1. Test login form using XHR's
// 2. Test error states
// 3. Stub login XHR with errors and success
// 4. Stub Login.redirect method
// 5. Use cy.request for much faster performance
// 6. Create a custom command

// Be sure to run `npm start` to start the server
// before running the tests below.
describe('Pages', function () {
  context('Project setup page', function () {
    beforeEach(function () {
      cy.login('admin')
      cy.server()
      cy.log(Cypress.env('proName'))
    })

    it('project setup page', function () {
      cy.visit('project/' + Cypress.env('proId') + '/create')
      cy.get('input[aria-label="Projektname"]').clear()
      cy.get('input[aria-label="Projektname"]')
        .type('xyzxyz')
        .blur()
      cy.wait(500)
      cy.reload()
      cy.get('input[aria-label="Projektname"]').should('have.value', 'xyzxyz')

      cy.get('input[aria-label="Projektname"]').clear()
      cy
        .get('input[aria-label="Projektname"]')
        .type(Cypress.env('proName'))
        .blur()
      cy.wait(500)
      cy.get('input[aria-label="Projektname"]')
        .should('have.value', Cypress.env('proName'))
    })
    it('displays dashboard', function () {
      cy.visit('dashboard/' + Cypress.env('proId'), { timeout: 2000 })
      cy.url().should('include', 'dashboard')
      cy.get('[cypress-proname]').should('contain', Cypress.env('proName'))
    })
  })
})
