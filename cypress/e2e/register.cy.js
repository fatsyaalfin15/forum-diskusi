describe('Register', () => {
  it('should register successfully', () => {
    cy.visit('http://localhost:3000/register');

    cy.get('input[placeholder="Nama"]').type('Alfin Test');
    cy.get('input[placeholder="Email"]').type(`alfin${Date.now()}@test.com`);
    cy.get('input[placeholder="Password (min 6)"]').type('password123');

    cy.contains('button', 'Register').click();

    cy.url().should('include', '/login');
  });
});