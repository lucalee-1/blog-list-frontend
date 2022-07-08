describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3005/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testuserpassword',
    };
    cy.request('POST', 'http://localhost:3005/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log In');
    cy.get('.loginBtn').eq(1).click({ multiple: true });
    cy.get('form').should('contain', 'Username').should('contain', 'Password');
    cy.get('#loginButton').contains('Log In');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.loginBtn').eq(1).click({ multiple: true });
      cy.get('#username').type('testuser');
      cy.get('#password').type('testuserpassword');
      cy.get('#loginButton').click();
      cy.contains('Welcome back, Test User');
    });
    it('fails with wrong credentials', function () {
      cy.get('.loginBtn').eq(1).click({ multiple: true });
      cy.get('#username').type('testuser');
      cy.get('#password').type('wrongpw');
      cy.get('#loginButton').click();

      cy.contains('Invalid username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testuserpassword' });
    });

    it('A blog can be created', function () {
      cy.get('#addNew').click();
      cy.get('#title').type('A test blog');
      cy.get('#author').type('Tester');
      cy.get('#url').type('testblog.com');
      cy.contains('Save').click();
      cy.contains('A test blog');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'A test blog', author: 'Tester', url: 'testblog.com' });
      });

      it('it can be liked', function () {
        cy.get('[data-testid="likesCount"]').should('not.exist');
        cy.get('[data-testid="FavoriteIcon"]').click();
        cy.get('[data-testid="likesCount"]').contains('1');
        cy.get('[data-testid="FavoriteIcon"]').click();
        cy.get('[data-testid="likesCount"]').contains('2');
      });
      it('it can be deleted', function () {
        cy.contains('testblog.com');
        cy.get('[data-testid="DeleteIcon"]').eq(0).click();
        cy.get('.MuiAlert-message').contains('Successfully deleted blog "A test blog"');
        cy.contains('testblog.com').should('not.exist');
      });
    });

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'No likes', author: 'Tester', url: 'testblog1.com' });
        cy.createBlog({ title: 'Second most liked', author: 'Tester', url: 'testblog2.com' });
        cy.createBlog({ title: 'Most liked', author: 'Tester', url: 'testblog3.com' });
      });

      it('blogs are ordered by number of likes', function () {
        cy.get('[data-testid="FavoriteIcon"]').eq(1).click();
        cy.get('[data-testid="FavoriteIcon"]').eq(2).click().wait(500).click();

        cy.get('.MuiCard-root').eq(0).should('contain', 'Most liked').and('contain', '2');
        cy.get('.MuiCard-root').eq(1).should('contain', 'Second most liked').and('contain', '1');
        cy.get('.MuiCard-root').eq(2).should('contain', 'No likes');
      });
    });
  });
});
