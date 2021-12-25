
describe('Static NLP Pages', () => {
	before(() => {
	});
	
	after(() => {
	});
	
	it('Loads the Home Page', () => {
		cy.visit('/');
		cy.contains('Parry');
		cy.contains('Pleasure to be acquainted!');

		cy.contains('Lalita');
		cy.contains('**squints eyes as she turns to do something**');

		cy.contains('Nick');
		cy.contains('Welcome, I hope you find yourself at home.');
	});
});
