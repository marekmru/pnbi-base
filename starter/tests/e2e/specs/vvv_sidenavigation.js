
describe('Navigation', function () {
  context('Login as admin', function () {
    beforeEach(function () {
      cy.login('admin')
      cy.server()
    })

    it('should display project subnavigation on shared pages', function () {
      cy.visit('overview')
      cy.wait(100)
      cy.get('.toolbar__side-icon').click()
      cy.get('.sidenav').should('contain', 'Dashboard')
      cy.get('.sidenav').should('contain', 'Zielgruppen')
      cy.get('.sidenav').should('contain', 'Projektübersicht')
      cy.get('.sidenav').should('contain', 'Kein aktives Projekt')
      cy.get('[cypress-project-navigation]').should('have.class', 'disabled')
    })

    it('should display projectname in the sidenavigation below "Projektübersicht"', function () {
      cy.visit('dashboard/' + Cypress.env('proId'))
      cy.wait(100)
      cy.get('.toolbar__side-icon').click()
      cy.get('.current-project').should('contain', Cypress.env('proName'))
    })
    it('should navigate to project subpages', function () {
      function navSubTest (curr, currUrl, next) {
        cy.get('.toolbar__side-icon').click()
        cy.wait(100)
        cy.get('.navigation-drawer').contains(curr).should('have.class', 'list__tile--active')

        cy.url().should('include', currUrl)
        if (next) {
          cy.contains(next).click()
          cy.wait(500)
        }
      }
      cy.visit('dashboard/' + Cypress.env('proId'))
      cy.wait(500)
      navSubTest('Dashboard', 'dashboard', 'Projektsetup')
      navSubTest('Projektsetup', 'create', 'Koeffizienten')
      navSubTest('Koeffizienten', 'coefficients', 'Zielgruppen')
      navSubTest('Zielgruppen', 'targetGroups', 'Media')
      navSubTest('Media', 'media', 'Kampagnenzeitraum')
      navSubTest('Kampagnenzeitraum', 'dateRange')
    })
  })
})
