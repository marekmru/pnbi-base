describe('Simulation / Result Page', function () {
  context('Login as admin', function () {
    before(function () {
      cy.login('admin')
      cy.server()
      const name = `cypress_${Math.random().toString().substring(3, 9)}`
      Cypress.env('proName', name)
      cy.fixture('project1').then((json) => {
        json.label = name
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/bmw/pro', // baseUrl is prepended to url
          body: json,
          headers: {
            'Accept': 'application/json'
          }
        }).then((response) => {
          cy.log(response.body.result._id)
          Cypress.env('project', response.body)
          Cypress.env('proId', response.body.result._id)
        })
      })
      cy.wait(1500) // runs once before all tests in the block
    })
    beforeEach(function () {
      cy.login('admin')
      cy.server()
      cy.route('GET', '**/profile', 'fixture:profile.json')
      cy.route('GET', '**/jconf', 'fixture:jconf.json')
      cy.route('GET', 'bmw/pro/*', Cypress.env('project'))
      cy.visit(`project/${Cypress.env('proId')}/result`)
      // cy.wait(1337)
    })
    /*
    it('should have all steps valid', function () {
      cy.url().should('include', 'result')
      cy.get('.stepper__step--complete').should('have.length', Cypress.env('projectStepCount'))
    })
    it('should show simulation-mode screen', function () {
      cy.get('.bc-title-line').should('contain', 'Simulationsmodus')
      cy.contains('Simulation starten').should('be.visible')
      cy.contains('Media-Eignung Überprüfen').should('be.visible')
    }) */
    it('should show media-eignung layer after click', function () {
      cy.route('POST', '**/cpg').as('cpg')
      cy.contains('Media-Eignung Überprüfen').click()
      cy.get('.progress-linear__bar').should('be.visible')
      cy.wait(100)
      cy.wait('@cpg')
      cy.get('.dialog--active').should('be.visible')
      cy.get('.dialog--active').find('strong').eq(0).should('contain', 'Zielgruppe 979m8vvhl)')
      cy.get('.dialog--active').find('strong').eq(1).should('contain', 'Zielgruppe givdrfmr8)')
      cy.get('.dialog--active').find('.datatable td').eq(0).should('contain', 'TV')
      cy.get('.dialog--active').find('.datatable td').eq(0).next().should('contain', '4,481')
    })
  })
})
