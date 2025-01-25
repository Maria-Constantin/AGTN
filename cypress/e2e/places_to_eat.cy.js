describe('Menu navigation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/src/main/resources/static/normalModeScreens/food.html')
    })
  
    // id 1
    it('use 1 checkbox', () => {
      cy.get('#filters').click()
      cy.get('#element1').check()
      cy.get('#element1').should('be.checked')
      //check if matching elements are on the screen
      cy.get('#food-list').should('contain', 'American')
    })

    //2
    it('Search bar test', () => {
        cy.get('#finput').type('American').type('{enter}')
      })

    //3
    it('user multiple checkboxes', () => {
        cy.get('#element1').check()
        cy.get('#element1').should('be.checked')
        cy.get('#element2').check()
        cy.get('#element2').should('be.checked')
        //check if matching elements are on the screen
        cy.get('#food-list').should('contain', 'American')
        cy.get('#food-list').should('contain', 'Breakfast')
      })
      
  })