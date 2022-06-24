describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testuserpassword',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testuserpassword' });
    });

    it('A blog can be created', function () {
      cy.contains('Add New Blog').click();
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
        cy.get('.showBtn').click();
        cy.contains('Likes: 0');
        cy.get('.likeBtn').click();
        cy.contains('Likes: 1');
        cy.get('.likeBtn').click();
        cy.contains('Likes: 2');
      });
      it('it can be deleted', function () {
        cy.get('.showBtn').click();
        cy.contains('By Tester');
        cy.get('.deleteBtn').click();
        cy.get('.notification')
          .should('contain', 'Successfully deleted blog "A test blog"')
          .and('have.css', 'color', 'rgb(46, 149, 81)')
          .and('have.css', 'border-style', 'solid');
        cy.contains('By Tester').should('not.exist');
      });
    });

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'No likes', author: 'Tester', url: 'testblog1.com' });
        cy.createBlog({ title: 'Second most liked', author: 'Tester', url: 'testblog2.com' });
        cy.createBlog({ title: 'Most liked', author: 'Tester', url: 'testblog3.com' });
      });

      it('blogs are ordered by number of likes', function () {
        cy.get('.showBtn').eq(0).click();
        cy.get('.showBtn').eq(1).click();
        cy.get('.showBtn').eq(2).click();

        cy.get('.likeBtn').eq(1).click();
        cy.get('.likeBtn').eq(2).click().click();

        cy.get('.blogItem').eq(0).should('contain', 'Most liked').and('contain', 'Likes: 2');
        cy.get('.blogItem').eq(1).should('contain', 'Second most liked').and('contain', 'Likes: 1');
        cy.get('.blogItem').eq(2).should('contain', 'No likes').and('contain', 'Likes: 0');
      });
    });
  });
});
