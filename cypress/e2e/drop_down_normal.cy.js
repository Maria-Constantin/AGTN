describe('Menu navigation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/src/main/resources/static/normalModeScreens/mapNormal.html')
    })
  
    // id 1
    it('open dropdown - select user profile', () => {
      cy.get('[id=navbarDropdown]').click()
      cy.contains('Profile').click()
      cy.url().should('include', 'userProfileNormal.html')
    })

    //2
    it('open dropdown - select favourites page', () => {
        cy.get('[id=navbarDropdown]').click()
        cy.contains('Favourites').click()
        cy.url().should('include', 'favourites.html')
      })
  
    //3
    it('open dropdown - select logout', () => {
        cy.get('[id=navbarDropdown]').click()
        cy.contains('Logout').click()
        //user gets redirected to kids home screen
        cy.url().should('include', 'KidsModeScreens/home.html')
      })
      
  })