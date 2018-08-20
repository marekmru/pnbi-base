/*  cy.request('GET', 'http://localhost:5000/bmw/pro/827' + proId).then((response) => {
        console.log(response)
      }) */
// before running the tests below.

describe('Pages', function () {
  context('Zielgruppen Page', function () {
    beforeEach(function () {
      const proId = Cypress.env('proId')
      cy.login('admin')
      cy.server()
      cy.visit('project/' + Cypress.env('proId') + '/targetGroups')
    })

    it('should create add targetgroups when clicked (+)', function () {
      cy.request({
        method: 'get',
        url: 'http://localhost:5000/bmw/pro/' + Cypress.env('proId'), // baseUrl is
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (response.body.result.data.targetGroups.length > 0) {
          cy.get('.cypress-deletetg').each(($el, index, $list) => {
            $el.click()
          })
        }
      })

      cy.wait(1337)

      cy.get('[cypress-addtg]').click()
      cy.get('.dialog.dialog--active.dialog--fullscreen').should('be.visible')
      cy.get('.dialog.dialog--active.dialog--fullscreen').contains('Speichern').click()
      cy.get('div.cypress-targetgroup').should('have.length', 1)

      cy.get('[cypress-addtg]').click()
      cy.get('.dialog.dialog--active.dialog--fullscreen').should('be.visible')
      cy.get('.dialog.dialog--active.dialog--fullscreen').contains('Speichern').click()
      cy.get('div.cypress-targetgroup').should('have.length', 2)
    })

    it('focusgroup should exist and be selected', function () {
      cy.get('div.cypress-targetgroup').first().find('[role="radio"]').should('have.attr', 'aria-checked', 'true')
    })

    it('focusgroups should change on click on other targetgroup', function () {
      cy.get('div.cypress-targetgroup').last().find('[role="radio"]').click()
      cy.get('div.cypress-targetgroup').first().find('[role="radio"]').should('have.attr', 'aria-checked', 'false')
      cy.get('div.cypress-targetgroup').last().find('[role="radio"]').should('have.attr', 'aria-checked', 'true')
    })

    it('should delete targetgroup and switch focusgroup after delete', function () {
      cy.get('div.cypress-targetgroup').last().find('.cypress-deletetg').click()
      cy.get('div.cypress-targetgroup').first().find('[role="radio"]').should('have.attr', 'aria-checked', 'true')
      cy.get('[cypress-addtg]').click()
      cy.get('.dialog.dialog--active.dialog--fullscreen').should('be.visible')
      cy.get('.dialog.dialog--active.dialog--fullscreen').contains('Speichern').click()
      cy.get('div.cypress-targetgroup').last().find('[role="radio"]').click()
      cy.wait(500)
      cy.reload()
      cy.get('div.cypress-targetgroup').last().find('[role="radio"]').should('have.attr', 'aria-checked', 'true')
    })
  })
})
// Uncaught (in promise) TypeError: Cannot read property 'adAwareness' of undefined
