describe('Quiz functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/src/main/resources/static/KidsModeScreens/quizzes/landmarks.html?notRandom=true')
  })

  it('answering all questions correctly displays the max score', () => {
    for(var i=0; i<10; ++i) {
      cy.get('#op1').click()
    }
    cy.contains('10 out of 10')
  })

  it('answering all questions incorrectly displays the score of zero', () => {
    for(var i=0; i<10; ++i) {
      cy.get('#op2').click()
    }
    cy.contains('0 out of 10')
  })

  it('timer reset after answer selected', () => {
    cy.get('#op1').click()
    cy.get('#timer').contains('10 seconds')
  })

  it('quiz stops after all questions answered', () => {
    for(var i=0; i<10; ++i) {
      cy.get('#op1').click()
    }
    cy.contains('Menu')
  })

  it('next question is set after timer reaches zero', () => {
    cy.get('#question').invoke('text').then((question1) => {
      cy.wait(10000)
      cy.get('#question').invoke('text').should((question2) => {
        expect(question1).not.to.eq(question2)
      })
    })    
  })
})