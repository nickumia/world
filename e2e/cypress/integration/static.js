
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

	it('Loads Kumia Page', () => {
		cy.visit('/kumia');
		cy.contains('Hi, I\'m Nicholas Kumia');

		cy.get('[data-testid="NewspaperIcon"]').click();
		cy.contains('Data.gov Python 3 Migration');
		cy.contains('CURRE Robotics Demonstration');
		cy.contains('Integrating Robotics Education in Pre-College Engineering Program');

		cy.get('[data-testid="WorkOutlineIcon"]').click();
		cy.contains('AVT Simulation');
		cy.contains('Vaughn College');

		cy.get('[data-testid="SchoolIcon"]').click();
		cy.contains('AWS Certified Cloud Practitioner');
		cy.get('[src="/static/img/aws-cp.png"]');
		cy.contains('M.S. Computer Science, Networking Concentration');
		cy.contains('B.S. Mechatronics Engineering, summa cum laude');
	});

	it('Loads Parry\'s Page', () => {
		cy.visit('/nlp/processing');
		cy.contains('Hello, I am Parry, the Keeper of the knowledge of the Mode of Processing.');
	});

	it('Loads Lalita\'s Page', () => {
		cy.visit('/nlp/language');
		cy.contains('Hi, my name is Lalita, the Keeper of the knowledge of the Mode of Language.');
	});

	it('Loads Nick\'s Page', () => {
		cy.visit('/nlp/natural');
		cy.contains('Hmm.. I am Nick, the Keeper of the knowledge of the Mode of the Natural Core.');
	});
});
