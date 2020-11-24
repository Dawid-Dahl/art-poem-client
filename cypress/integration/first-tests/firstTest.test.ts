describe("First Test", () => {
	describe("happy path", () => {
		it("should log into the app", () => {
			cy.visit("https://art-poem-client.herokuapp.com/login");
			cy.get("#email").type("dawiddahl@gmail.com");
			cy.url().should("equal", "https://art-poem-client.herokuapp.com/login");
			cy.get("#password").type(Cypress.env("password")).type("{enter}");
			cy.wait(2000);
			cy.get("h1").contains("Discover").should("be.visible");
		});
	});
});
