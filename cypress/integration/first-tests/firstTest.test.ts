describe("First Test", () => {
	describe("happy path", () => {
		it("should log into the app", () => {
			cy.visit("https://art-poem-client.herokuapp.com/");
			cy.get("#email").type("dawiddahl@gmail.com");
			cy.get("#password").type(Cypress.env("password")).type("{enter}");
		});
	});
});
