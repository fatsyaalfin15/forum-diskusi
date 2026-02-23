describe('Login Flow', () => {
  const user = {
    name: 'Alfin Test',
    email: `alfin${Date.now()}@test.com`,
    password: 'password123',
  };

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://forum-api.dicoding.dev/v1/register',
      body: user,
    });
  });

  it('should login successfully', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);

    cy.contains('button', 'Login').click();

    cy.url().should('not.include', '/login');
  });
});