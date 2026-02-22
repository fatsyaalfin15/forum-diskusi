describe('Login', () => {
  it('should login successfully', () => {
    const email = `alfin${Date.now()}@test.com`;
    const password = 'password123';

    // register dulu
    cy.visit('http://localhost:3000/register');

    cy.get('input[placeholder="Nama"]').type('Alfin Test');
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password (min 6)"]').type(password);
    cy.contains('button', 'Register').click();

    cy.url().should('include', '/login');

    // login
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('button', 'Login').click();

    // assert login sukses (redirect ke home)
    cy.url().should('not.include', '/login');
  });
});