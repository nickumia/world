
describe('Search Functionality', () => {
	before(() => {
	});
	
	after(() => {
	});
	
	it('Can perform a search', () => {
		cy.visit('/');
		cy.get('input[placeholder="Search"]').type('world{enter}');
		cy.contains('Search Results');
		cy.get('ul a:first').click();

		cy.contains('Sensing the world, No Senses Required... jk!');
	});
});

