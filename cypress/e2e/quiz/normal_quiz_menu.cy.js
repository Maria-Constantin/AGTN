describe('Menu navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/src/main/resources/static/normalModeScreens/quiz.html')
  })

  it('redirects to landmarks quiz when "Landmarks" button pressed', () => {
    cy.contains('Landmarks').click()
    cy.url().should('include', 'quizzes/landmarks.html')
  })

  it('redirects to history quiz when "Historical Facts" button pressed', () => {
    cy.contains('Historical').click()
    cy.url().should('include', 'quizzes/history.html')
  })

  it('redirects to religious quiz when "Religious Spaces" button pressed', () => {
    cy.contains('Religious').click()
    cy.url().should('include', 'quizzes/religion.html')
  })
})