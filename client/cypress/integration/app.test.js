describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Signup Works correctly', () => {
    cy.visit('/auth/signup');
    cy.get('[data-test-id="email"]').type('email1234@example.com');
    cy.get('[data-test-id="username"]').type('firstname lastname');
    cy.get('[data-test-id="password"]').type('password1');
    cy.get('button').click();
  });
});
