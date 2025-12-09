describe('Agent Dashboard', () => {
  it('should redirect to login if not authenticated', () => {
    cy.visit('/agent/dashboard');
    cy.url().should('include', '/auth/login');
  });
});
