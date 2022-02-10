
describe('Syntax App', () => {
	before(() => {
	});
	
	after(() => {
	});
	
	it('Can load', () => {
		cy.visit('/nlp/syntax');
		cy.contains('As with most of the concepts described here, syntax and grammar have intensely debated meanings');
		cy.contains('Evaluate 😮');
	});

	it('Can process text', () => {
		cy.visit('/nlp/syntax');
		cy.get('textarea[id="text_input"]').type(' world{enter}');
		cy.get('input[value="words"]').click();
		cy.get('form[id="groups"] div button[type="submit"]').click();
		cy.get('textarea').should('be.disabled').contains('world');
	});
});

