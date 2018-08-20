// let proId = Cypress.env('proId')

describe('Project Coefficients', function () {
  context('Login as admin', function () {
    beforeEach(function () {
      cy.login('admin')
      cy.server()
      cy.visit('project/' + Cypress.env('proId') + '/coefficients')
    })
    it('should load coefficients page', function () {
      const mediaLength = 15 // medium + expand
      cy.get('.datatable.table tbody tr').should('have.length', mediaLength * 2)
    })

    it('should contain media in correct order', function () {
      cy.get('.datatable.table tbody tr').eq(0).find('td').should('contain', 'TV')
      cy.get('.datatable.table tbody tr').eq(4).find('td').should('contain', 'Radio')
    })
    it('should save changes to TV >> AdStock', function () {
      cy.get('.datatable.table tbody tr').eq(0).find('[data-vv-as="AdStock"]').clear()
      cy.get('.datatable.table tbody tr').eq(0).find('.input-group__error').should('be.visible')
      const nr1 = 55
      cy.get('.datatable.table tbody tr').eq(0).find('[data-vv-as="AdStock"]').type(nr1)
      cy.wait(1000)
      cy.reload()
      cy.get('.datatable.table tbody tr').eq(0).find('[data-vv-as="AdStock"]').should('have.value', nr1.toString())
    })
    it('should open graph accordeon for TV', function () {
      cy.get('.datatable.table tbody tr').eq(1).should('not.be.visible')
      cy.get('.datatable.table tbody tr').click()
      cy.contains('TV').click()
      cy.get('.datatable.table tbody tr').eq(1).should('be.visible')
      cy.wait(1000)
    })
  })
})
