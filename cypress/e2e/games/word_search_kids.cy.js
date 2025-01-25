describe(' Word Search kids functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/src/main/resources/static/KidsModeScreens/games/wordSearch.html')
    })
  
  
    it('Full score is given when all correct answers are entered', () => { // id 1
      cy.get('#userAnswer').type('goose fair')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('lace')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('little john')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('maid marian')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('raleigh')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('reliquary')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('river trent')
      cy.get('#submitInput').click() 
      cy.get('#userAnswer').type('robin hood')
      cy.get('#submitInput').click()
      cy.get('#userAnswer').type('sherwood')
      cy.get('#submitInput').click()
      cy.wait(100000)
      cy.contains('9 out of 9')

      
    })

   


    

      it('Ensure game ends after time runs out', () => { // id 2
        cy.wait(100000)
        cy.contains('0 out of 9')
  
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
        cy.contains('0 out of 9')
  
      })

  
   it('A score is inclusive of the total score 9', () => { // id 4
        cy.get('#userAnswer').type('rive')
        cy.get('#submitInput').click() 
        cy.get('#userAnswer').type('rob')
        cy.get('#submitInput').click()
        cy.get('#userAnswer').type('sherwood') // only one correct answer is entered.
        cy.get('#submitInput').click()
        cy.wait(100000)
        cy.contains('1 out of 9')
  
      })



  })