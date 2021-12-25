
describe('Login Functionality', () => {
	before(() => {
	});
	
	after(() => {
	});
	
	it('Can register new user', () => {
		cy.visit('/auth/register');
		cy.get('input[name="username"]').type('test-user');
		cy.get('input[name="email"]').type('user@email.com');
		cy.get('input[name="password"]').type('test');
		cy.get('input[name="password2"]').type('test');
		cy.get('input[name="submit"]').click();

		cy.contains('Congratulations, you are now a registered user!');
	});

	it('Login as new user', () => {
		cy.visit('/auth/login');
		cy.get('input[name="username"]').type('test-user');
		cy.get('input[name="password"]').type('test');
		cy.get('input[name="submit"]').click();

		cy.contains('Hi, test-user!');
	});

	it('Reset new user password', () => {
		cy.visit('/auth/reset_password_request');

		// Fill out reset password request form
		cy.get('input[name="email"]').type('user@email.com');
		cy.get('input[name="submit"]').click();

		// Get reset link
		cy.contains('My Dear test-user,');
		cy.get('a').contains('click here').click();

		// Fill out reset password form
		cy.get('input[name="password"]').type('test2');
		cy.get('input[name="password2"]').type('test2');
		cy.get('input[name="submit"]').click();
		cy.contains('Your password has been reset.');
		
		// Login with new password
		cy.get('input[name="username"]').type('test-user');
		cy.get('input[name="password"]').type('test2');
		cy.get('input[name="submit"]').click();

		cy.contains('Hi, test-user!');
	});

});
