describe('Menu navigation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/src/main/resources/static/normalModeScreens/games.html')
    })
  

    // id 1
    it('redirects to word search page', () => {   
      cy.contains('Word Search').click()
      cy.url().should('include', 'games/wordSearch.html')
    })


     // id 2 
    it('redirects to Memory Match page', () => {
      cy.contains('Memory Match').click()
      cy.url().should('include', 'games/memoryMatch.html')
    })
  
  })