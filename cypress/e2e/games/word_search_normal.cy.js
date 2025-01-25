describe(' Word Search kids functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/src/main/resources/static/normalModeScreens/games/wordSearch.html')
    })
  
  
    it('Full score is given when all correct answers are entered', () => { // id 1
      cy.get('#userAnswer').type('arboretum')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('city of caves')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('greens windmill')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('ibuprofen')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('john the baptist')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('lace market')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('malt cross')
      cy.get('#submitInput').click() 
      cy.get('#userAnswer').type('newstead abbey')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('pilgrimage')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('synagogue')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('thomas hawkley')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('wollaton hall')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('altar')
      cy.get('#submitInput').click()
      cy.wait(100000)
      cy.contains('13 out of 13')

      
    })

   


    

      it('Ensure game ends after time runs out', () => { // id 2
        cy.wait(100000)
        cy.contains('0 out of 13')
  
      })


      it('A score of 0 is given when all wrong answers are entered', () => { // id 3
        cy.get('#userAnswer').type('goo')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('la')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('littl')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('mai')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('rale')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('reliq')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('rive')
        cy.get('#submitInput').click() 
        cy.get('#userAnswer').type('rob')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('swood') // only one correct answer is entered.
        cy.get('#submitInput').click()
        cy.wait(100000)
        cy.contains('0 out of 13')
  
      })

  
   it('A score is inclusive of the total score 13', () => { // id 4
        cy.get('#userAnswer').type('rive')
        cy.get('#submitInput').click() 
        cy.get('#userAnswer').type('rob')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('altar') // only one correct answer is entered.
        cy.get('#submitInput').click()
        cy.wait(100000)
        cy.contains('1 out of 13')
      })



  })