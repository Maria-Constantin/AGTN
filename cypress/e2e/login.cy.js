describe('Valid login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/src/main/resources/static/index.html')
  })

  it('clicking "LOG IN" without entering email and password does not redirect page', () => {
    cy.visit('http://localhost:1234/src/main/resources/static/index.html')
    cy.contains('LOG IN').click()
    cy.url().should('include', '/index.html')
  })

  it('Entering invalid email does not redirect page', () => {
    cy.get('#email').type('invalid_email')
    cy.get('#password').type('password')
    cy.contains('LOG IN').click()
    cy.url().should('include', '/index.html')
  })
  
  it('Entering valid email and password redirects to home page', () => {
    cy.get('#email').type('test@gmail.com')
    cy.get('#password').type('password')
    cy.contains('LOG IN').click()
    cy.url().should('include', '/home.html')
  })

  it('pressing "Create an account" link redirects to signup page', () => {
    cy.contains('Create an account').click()
    cy.url().should('include', '/signup.html')
  })
})