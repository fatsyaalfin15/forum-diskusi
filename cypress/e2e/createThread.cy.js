describe('Create Thread Flow', () => {
  const email = `alfin${Date.now()}@test.com`;
  const password = 'password123';

  it('should create thread successfully', () => {
    // ======================
    // REGISTER
    // ======================
    cy.visit('/register');

    cy.get('input[placeholder="Nama"]').type('Alfin Test');
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password (min 6)"]').type(password);
    cy.contains('button', 'Register').click();

    // 🔥 WAJIB tunggu redirect login
    cy.url().should('include', '/login');

    // ======================
    // LOGIN
    // ======================
    cy.get('input[placeholder="Email"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password);
    cy.contains('button', 'Login').click();

    // 🔥 pastikan login sukses
    cy.url().should('not.include', '/login');

    // ======================
    // BUKA HALAMAN CREATE THREAD
    // ======================
    cy.contains('Buat Thread').click();

    cy.url().should('include', '/create');

    // ======================
    // ISI FORM THREAD
    // ======================
    const title = `Thread Cypress ${Date.now()}`;

    cy.get('input[placeholder="Judul"]').type(title);
    cy.get('input[placeholder="Kategori (opsional)"]').type('Testing');
    cy.get('textarea[placeholder="Isi Thread"]').type('Ini isi thread dari Cypress');

    cy.contains('button', 'Kirim').click();

    // ======================
    // ASSERT THREAD MUNCUL
    // ======================
    cy.contains(title).should('exist');
  });
});