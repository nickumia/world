
describe('Blog Posts', () => {
	before(() => {
	});
	
	after(() => {
	});
	
	it('Loads the explore all posts page', () => {
		cy.visit('/nlp/posts');
		cy.contains('I AM a Language (:');
		cy.contains('Introduction (2018)');
	});

	it('Loads a specific post page', () => {
		cy.visit('/nlp/posts');
		cy.get('ul a:first').click();
		cy.contains('As with most of the concepts described here, syntax and grammar');
	});

});
