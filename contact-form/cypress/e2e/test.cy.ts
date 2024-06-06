describe("Elements displayed", () => {
  it("Should open the page", () => {
    cy.visit("http://localhost:3000");
  });

  it("Should display the title", () => {
    const translatedTitle = "Contact Us";

    cy.visit("http://localhost:3000");

    cy.get("[data-cy='title']")
      .then((element) => {
        element.is(":visible");
      })
      .should("have.text", translatedTitle);
  });

  it("Should display the elements", () => {
    const fields = [
      '[data-cy="field_first_name"]',
      '[data-cy="field_last_name"]',
      '[data-cy="field_email"]',
      '[data-cy="field_radio_group"]',
      '[data-cy="field_message"]',
      '[data-cy="field_checking"]',
    ];

    cy.visit("http://localhost:3000");

    fields.map((field) => {
      cy.get(field).then((field) => {
        field.is(":visible");
      });
    });
  });

  it("Should display the submit button", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-cy='field_button']").then((element) => {
      element.is(":visible");
    });
  });
});

describe("Form functionality", () => {
  it("Should throw errors", () => {
    cy.visit("http://localhost:3000");

    cy.get('button[type="submit"]').click();

    cy.get('[data-cy="error_required"]')
      .should("be.visible")
      .and("contain.text", "This field is required");
    cy.get('[data-cy="error_selector"]')
      .should("be.visible")
      .and("contain.text", "Please select a query type");
    cy.get('[data-cy="error_checking"]')
      .should("be.visible")
      .and(
        "contain.text",
        "To submit this form, please consent to being contacted"
      );
  });

  it("Should display the submit message", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="field_first_name"]').type("Someone");
    cy.get('[data-cy="field_last_name"]').type("Someone");
    cy.get('[data-cy="field_email"]').type("someone@something.com");
    cy.get('[type="radio"]').check("One");
    cy.get('[data-cy="field_message"]').type("This is the message.");
    cy.get('[type="checkbox"]').check("One");

    cy.get('button[type="submit"]').click();

    cy.get('[data-cy="submit_message"]').should("be.visible");
  });
});
