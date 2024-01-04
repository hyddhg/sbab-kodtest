describe("Linjetoppen", () => {
  it("shows a title", () => {
    cy.visit("/");
    cy.findByTestId("title").should("contain", "Linjetoppen");
  });

  it("links", () => {
    cy.visit("/");
    cy.findByTestId("home").should("exist");
    cy.findByTestId("kontakt").should("exist");
  });

  it("top 10", () => {
    cy.visit("/");
    cy.get(".MuiAccordion-root").should("have.length", 10);
  });

  it("active link", () => {
    cy.visit("/");
    cy.findByTestId("home")
      .should("have.class", "active")
      .and("have.css", "text-decoration")
      .and("match", /underline/);

    cy.findByTestId("kontakt")
      .should("not.have.class", "active")
      .and("have.css", "text-decoration")
      .and("match", /none/);
  });
});
