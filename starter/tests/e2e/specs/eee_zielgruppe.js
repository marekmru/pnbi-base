describe('Zielgruppe', function () {
  context('Zielgruppe (1) Page', function () {
    beforeEach(function () {
      cy.login('admin')
      cy.server()
      cy.visit('project/' + Cypress.env('proId') + '/targetGroups')
      cy.wait(1000)
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
      cy.get('[cypress-create-tg]').click()
      cy.wait(1250)
    })

    it('should calculate correct potential', function () {
      cy.get('.bc-counter').should('contain', '69,56')
      cy.get('input[aria-label="Targetinggüte"]').should('have.value', '70')
      cy.get('[cypress-add-char]').click()
      cy.wait(200)
      cy.get('.tgchar-row').should('contain', 'error')
      cy.get(".tgchar-row div[role='combobox']").click()
      cy.get('.menu__content--select .list .subheader').first().should('contain', 'Demographie')
      cy.contains('Geschlecht').click()
      cy.get('.tgchar-row .tgchar--detail .input-group').click()
      cy.get('.menuable__content__active .list__tile__title').first().should('contain', 'männlich')
      cy.get('.menuable__content__active .list__tile__title').first().click()
      cy.wait(500)
      cy.get('.bc-counter').should('contain', '34,02')
    })

    it('should calculate correct potential for multiselects', function () {
      cy.get('[cypress-add-char]').click()
      cy.get(".tgchar-row div[role='combobox']").click()
      cy.contains('Bildung').click()
      cy.get('.tgchar-row .tgchar--detail .input-group').click()
      cy.get('.menuable__content__active .list__tile__title').contains('Hauptschulabschluss ohne abgeschlossene Berufsausbildung').click()
      cy.get('.menuable__content__active .list__tile__title').contains('Abitur ohne Studium').click()
      cy.get('.bc-counter').should('contain', '14,18')
      cy.get('.bc-counter-small').should('contain', '20,38')
    })
    it('should calculate correct potential for age', function () {
      cy.get('[cypress-add-char]').click()
      cy.get(".tgchar-row div[role='combobox']").click()
      cy.contains('Alter').click()
      cy.get('.tgchar-row .tgchar--detail .input-group').first().click()
      cy.get('.menuable__content__active .list__tile__title').contains('17').click()
      cy.get('.tgchar-row .tgchar--detail .input-group').first().next().click()
      cy.get('.menuable__content__active .list__tile__title').contains('23').click()
      cy.get('.bc-counter').should('contain', '5,89')
      cy.get('.bc-counter-small').should('contain', '8,47')
    })
    it('should calculate correct potential for pseudo multiselects', function () {
      // pseudoMultiSelectTest()
      cy.get('[cypress-add-char]').click()
      cy.get('.tgchar-row').parent().last().find('.input-group').click()
      cy.get('.menuable__content__active').scrollTo(0, 500)
      cy.contains('Wichtige Lebensaspekte').click()
      cy.get('.tgchar-row').parent().last().find('.tgchar--detail .input-group').first().click()
      cy.get('.menuable__content__active .list__tile__title').contains('Kinder haben').click()
      cy.get('.menuable__content__active .list__tile__title').contains('Erfolg im Beruf').click()
      // pseudoMultiSelectTest()
      cy.get('.bc-counter').should('contain', '63,26')
      cy.get('.bc-counter-small').should('contain', '90,94')
      cy.wait(500)
    })

    /* it('should change targeting_guete', function () {
      cy.get('input[aria-label="Targetinggüte"]')
        .should('have.value', '70')
      cy.get('input[aria-label="Targetinggüte"]').clear()
      // TODO  btn should be dsabled bc tg invalid no targetingguete
      cy.get('input[aria-label="Targetinggüte"]').type(6)
      cy.get('input[aria-label="Targetinggüte"]').type(9)
      cy.wait(1000)
      cy.reload()
      cy.get('input[aria-label="Targetinggüte"]').should('have.value', '69')
      cy.get('input[aria-label="Targetinggüte"]').clear()
      cy.get('input[aria-label="Targetinggüte"]').type(70)
      cy.wait(1000)
      cy.reload()
      cy.get('input[aria-label="Targetinggüte"]').should('have.value', '70')
    })

    it('should handle adding and removing multiple tg-charactersitics', function () {
      cy.get('[cypress-add-char]').click()
      cy.wait(100)
      cy.get('.tgchar-row').parent().last().find('.input-group').click()
      cy.contains('Geschlecht').click()

      cy.get('.tgchar-row').parent().last().find('.tgchar--detail .input-group').click()
      cy.get('.menuable__content__active .list__tile__title').first().click() // 'männlich' !?
      // psedudo function not working !!! ... so codecopy
      cy.wait(500)
      cy.get('[cypress-add-char]').click()
      cy.wait(100)
      cy.get('.tgchar-row').parent().last().find('.input-group').click()
      cy.get('.menuable__content__active').scrollTo(0, 400)
      cy.contains('Wichtige Lebensaspekte').click()
      cy.get('.tgchar-row').parent().last().find('.tgchar--detail .input-group').first().click()
      cy.get('.menuable__content__active .list__tile__title').contains('Kinder haben').click()
      cy.wait(500)
      cy.get('.menuable__content__active .list__tile__title').contains('Erfolg im Beruf').click()
      // psedudo function not working !!! ...

      cy.get('.bc-counter').should('contain', '30,63')
      cy.get('.bc-counter-small').should('contain', '44,03')
      cy.get('.tgchar-row').parent().last().contains('cancel').click()
      cy.wait(1000)
      cy.reload()
      cy.get('.bc-counter').should('contain', '34,02')
    }) */
  })
})
