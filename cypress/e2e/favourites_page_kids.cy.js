describe('Menu navigation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/src/main/resources/static/KidsModeScreens/userProfile.html')
    })
  
    // id 1
    it('redirects to favourites page', () => {
      cy.contains('Favourite Locations').click()
      cy.url().should('include', 'favourites.html')
    })
  
  })