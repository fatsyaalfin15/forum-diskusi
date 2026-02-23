describe('Vote Thread', () => {
  it('should upvote thread successfully', () => {
    const email = `vote${Date.now()}@test.com`;
    const password = 'password123';


    // Register dulu baru sudah itu ada login
    cy.visit('/register');
    cy.get('input[placeholder="Nama"]').type('Vote Tester');
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password (min 6)"]').type(password);
    cy.contains('button', 'Register').click();
    cy.url().should('include', '/login');

    // Login
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('button', 'Login').click();

    // Tunggu redirect
    cy.url().should('not.include', '/login');

    cy.get('.thread-item').should('exist');

    cy.get('.thread-item').first().within(() => {
      cy.get('.upvote').click();
      cy.get('.upvote').should('have.class', 'active');
    });
  });
});