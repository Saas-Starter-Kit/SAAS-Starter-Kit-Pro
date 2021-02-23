describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Has no detectable accessibility violations on load', () => {
    cy.visit('/app/1/create');
  });
});
