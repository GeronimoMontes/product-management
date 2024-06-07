describe('Testing authenticate page!', () => {
  it('', () => {
    const userCredenctials = { username: "test", password: "123" };
    cy.login(userCredenctials);
  })
});