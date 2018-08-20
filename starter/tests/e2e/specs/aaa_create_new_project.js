describe('Project Creation', function () {
  context('Login as admin', function () {
    beforeEach(function () {
      cy.login('admin')
      cy.server()
    })
    it('should create a project', function () {
      cy.request({
        method: 'get',
        url: 'http://localhost:5000/bmw/pro', // baseUrl is
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (response.body.result.length > 0) {
          response.body.result.forEach(function (val) {
            if (val.label.indexOf('Jane_') === 0) {
              cy.request({
                method: 'delete',
                url: 'http://localhost:5000/bmw/pro/' + val._id, // baseUrl is
                headers: {
                  'Accept': 'application/json'
                }
              })
            }
          })
        }
      })
      cy.wait(2500)
      cy.visit('overview')
      const name = ('Jane_' + Math.random()).substring(0, 15)
      Cypress.env('proName', name)
      cy.log('PROJECTNAME', Cypress.env('proName'))

      cy.get('.control-button').click()
      cy.get('.card__title').should('contain', 'Neues Projekt')
      cy.get('.dialog').find('input').type(Cypress.env('proName'))
      cy.server()
      cy.route('POST', 'bmw/pro').as('pro')
      cy.contains('Erstellen').click()
      cy.wait('@pro').then((xhr) => {
        Cypress.env('proId', xhr.response.body.result._id)
        cy.log('proId', xhr.response.body.result._id)
      })
      cy.url().should('include', 'create')
      cy.visit('overview', { timeout: 2000 })

      cy.get('.control-button').click()
      cy.get('.card__title').should('contain', 'Neues Projekt')
      cy.get('.dialog').find('input').type(Cypress.env('proName'))
      cy.get('.dialog .input-group__error').should('contain', 'Der Projektname ist bereits vergeben.')
      cy.get('[cypress-cancel]').click()
    })
  })
})

/*       cy.fixture('newProject').then((json) => {
        json.label = Cypress.env('proName')
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/bmw/pro', // baseUrl is prepended to url
          body: json,
          headers: {
            'Accept': 'application/json'
          }
        }).then((response) => {
          console.log(response)
          Cypress.env('proId', response.body.result._id)
        })
      }) */
