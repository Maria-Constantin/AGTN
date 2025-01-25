describe(' Memory Match kids functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/src/main/resources/static/normalModeScreens/games/memoryMatch.html')
    })
  
  
    it('Unmatched cards remain unflipped', () => { // id 1

       // click on the first card with data-card="1"
       cy.get('[data-card="1"]').eq(0).click();

       // click on the second card with a different data-card attribute
       cy.get('[data-card]').not('[data-card="1"]').eq(0).first().click();

       cy.get('[data-card="1"]').eq(0).should('have.attr', 'src', '../../FrontEndImages/adventure-guide-logo.png');
       cy.get('[data-card]').not('[data-card="1"]').eq(0).first().should('have.attr', 'src', '../../FrontEndImages/adventure-guide-logo.png');
      
    })


     it('matched cards remain flipped', () => { // id 2


        cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '1') {
              cy.wrap($card).click();
              cy.wrap($card).should('have.attr', 'src', '../../FrontEndImages/robinHMemMatch.jpg');
            }
          });
 
    
       
     })


     it('games ends after timer runs out', () => { // id 3

        cy.wait(100000);
        cy.contains('0 out of 6');
 
    
       
     })


     it('games ends after all matches have been made', () => { // id 4

        cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '1') {
              cy.wrap($card).click();
              
            }
          });



          cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '2') {
              cy.wrap($card).click();
              
            }
          });


          cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '3') {
              cy.wrap($card).click();
              
            }
          });


          cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '4') {
              cy.wrap($card).click();
              
            }
          });


          cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '5') {
              cy.wrap($card).click();
              
            }
          });

          cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '6') {
              cy.wrap($card).click();
              
            }
          });
 

          cy.contains('6 out of 6');
    
       
     })



     it('ensures score is inclusive of total number ', () => { // id 4

        cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '1') {
              cy.wrap($card).click();
              
            }
          });



          cy.get('[data-card]').each(($card) => {
            if ($card.attr('data-card') === '2') {
              cy.wrap($card).click();
              
            }
          });

           cy.wait(100000);

          cy.contains('2 out of 6');
    
       
     })



  })