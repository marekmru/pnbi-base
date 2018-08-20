/*  cy.request('GET', 'http://localhost:5000/bmw/pro/827' + proId).then((response) => {
        console.log(response)
      }) */
// before running the tests below.

describe('Pages', function () {
  context('Media Page 2', function () {
    beforeEach(function () {
      const proId = Cypress.env('proId')
      cy.login('admin')
      cy.server()
      cy.visit('project/' + Cypress.env('proId') + '/media')
    })
    after(function () {
      /*       cy.get('[cypress-budgetgrp]').find("div[role='combobox']").click()
      cy.get('.menuable__content__active .list__tile__title').eq(0).click()
      cy.get('[cypress-payfactor]').find("input[type='number']").clear() */
      cy.get('[cypress-budgetgrp]').find("input[aria-label='Min']").clear()
      cy.get('[cypress-budgetgrp]').find("input[aria-label='Max']").clear()
      cy.get('[cypress-budgetgrp]').find("div[role='combobox']").click()
      cy.get('.menuable__content__active .list__tile__title').eq(1).click()
    })

    it('should handle payfactor changes', function () {
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
      cy.get('[cypress-payfactor]').find("input[type='number']").clear()
      cy.wait(333)
      cy.get('[cypress-payfactor]').find("input[type='number']").type(10.6)
      cy.wait(500)
      cy.reload()
      cy.get('[cypress-payfactor]').find("input[type='number']").should('have.value', '10.6')
      cy.get('[cypress-payfactor]').find("div[role='combobox']").click()
      cy.get('.menuable__content__active .list__tile__title').eq(1).click()
      cy.wait(500)
      cy.reload()
      cy.get('[cypress-payfactor]').find("input[type='number']").should('have.value', '47.5')
      /// //
      cy.get('[cypress-budgetgrp]').find("div[role='combobox']").click()
      cy.get('.menuable__content__active .list__tile__title').eq(1).click()

      cy.get('[cypress-budgetgrp]').find("input[aria-label='Min']").type(14)
      cy.get('[cypress-budgetgrp]').find("input[aria-label='Max']").type(20)
      cy.wait(500)
      cy.reload()
      cy.get('[cypress-budgetgrp]').find('.input-group__selections__comma').should('contain', 'Budgetrahmen')
      cy.get('[cypress-budgetgrp]').find("input[aria-label='Min']").should('have.value', '14')
      cy.get('[cypress-budgetgrp]').find("input[aria-label='Max']").should('have.value', '20')

      //
      cy.get('[cypress-budgetgrp]').find("div[role='combobox']").click()
      cy.get('.menuable__content__active .list__tile__title').eq(0).click()

      cy.get('[cypress-budgetgrp]').find("input[aria-label='Min']").type(13)
      cy.get('[cypress-budgetgrp]').find("input[aria-label='Max']").type(119)
      cy.wait(200)
      cy.get('[cypress-budgetgrp]').find("div[role='combobox']").click()
      cy.wait(500)
      cy.reload()
      cy.get('[cypress-budgetgrp]').find('.input-group__selections__comma').should('contain', 'GRP')
      cy.get('[cypress-budgetgrp]').find("input[aria-label='Min']").should('have.value', '13')

      cy.get('[cypress-budgetgrp]').find("input[aria-label='Max']").should('have.value', '119')
      // reset
    })
  })
})
