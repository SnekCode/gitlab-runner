Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  if (err.message.includes('Cannot read')) {
    return false
  }  
})

describe('Gitlab Signup', () => {
  it('Check user is able to signup', () => {
    // test signup
    cy.visit('/users/sign_up')

    cy.get('input[id="new_user_first_name"]').type(Cypress.env('gitlab_first_name'))
    cy.get('input[id="new_user_last_name"]').type(Cypress.env('gitlab_last_name'))
    cy.get('input[id="new_user_username"]').type(Cypress.env('gitlab_username'))
    cy.get('input[id="new_user_email"]').type(Cypress.env('gitlab_email'))
    cy.wait(3000) // wait 3 seconds for username check to complete
    // add user if not already created
    cy.get('.validation-error').then(($userexist) => {
      if ($userexist.hasClass('hide')) {
        cy.get('input[id="new_user_password"]').type(Cypress.env('gitlab_password'))
        cy.get('input[type="submit"]').click()
      }
    })
  })
})