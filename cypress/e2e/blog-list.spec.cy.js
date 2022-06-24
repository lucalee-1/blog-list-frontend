describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testuserpassword',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3002');
  });

  it('Login form is shown', function () {
    cy.contains('Log In');
    cy.get('form').should('contain', 'Username').should('contain', 'Password');
    cy.get('#loginButton').contains('Log In');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('testuserpassword');
      cy.get('#loginButton').click();

      cy.contains('Hello, Test User');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('wrongpw');
      cy.get('#loginButton').click();

      cy.get('.notification')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });
});
