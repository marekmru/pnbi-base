/*  cy.request('GET', 'http://localhost:5000/bmw/pro/827' + proId).then((response) => {
        console.log(response)
      }) */
// before running the tests below.

describe('Pages', function () {
  context('Media Page', function () {
    beforeEach(function () {
      const proId = Cypress.env('proId')
      cy.login('admin')
      cy.server()
      cy.visit('project/' + Cypress.env('proId') + '/media')
    })
      
    it('should add and remove media', function () {
      cy.request({
        method: 'get',
        url: 'http://localhost:5000/bmw/pro/' + Cypress.env('proId'), // baseUrl is
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (response.body.result.data.mediaChannels.length > 0) {
          cy.get('.btn-icon--delete').each(($el, index, $list) => {
            $el.click()
          })
        }
      })

      cy.wait(1337)

      cy.get('[cypress-add-1]').click()
      cy.get('.list__tile').contains('TV').click()
      cy.get('[cypress-add-1]').click()
      cy.get('.cypress-medium').should('have.length', 1)

        
      cy.get('[cypress-add-1]').click()
      cy.get('.list__tile').contains('Radio').click()
      cy.get('[cypress-add-1]').click()
      cy.get('.cypress-medium').should('have.length', 2)
        
     cy.get('.cypress-medium').first().find('.btn-icon--delete').click()
     cy.get('.cypress-medium').should('have.length', 1)
cy.contains('Radio') 
        cy.get('.cypress-medium div').should('contain', 'Radio')
    })

  })
})
// Uncaught (in promise) TypeError: Cannot read property 'adAwareness' of undefined
