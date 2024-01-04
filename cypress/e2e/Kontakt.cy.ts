describe("Kontakt", () => {
  it("shows a title", () => {
    cy.visit("/kontakt");
    cy.findByText("Jonas Jönsson").should("exist");
    cy.findByText("hndktsk@gmail.com (hund kat(t) sko)").should("exist");
    cy.findByText("0702 311 545").should("exist");
  });

  it("click on Kontakt", () => {
    cy.visit("/");
    cy.findByTestId("kontakt").click();

    cy.findByText("Jonas Jönsson").should("exist");

    cy.findByTestId("kontakt")
      .should("have.class", "active")
      .and("have.css", "text-decoration")
      .and("match", /underline/);

    cy.findByTestId("home")
      .should("not.have.class", "active")
      .and("have.css", "text-decoration")
      .and("match", /none/);
  });
});
