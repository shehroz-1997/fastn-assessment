//This is the base login class which can be ussed anywhere in the flow to perfrom login to the application
class login
{
    login()
    {
        cy.visit(Cypress.env('baseUrl'))

        //enter credentials
        cy.get('#username', { timeout: 100000 }).type(Cypress.env('username'))
        cy.get('#password', { timeout: 100000 }).type(Cypress.env('password'))

        // //click on continue
        cy.get('#kc-login', { timeout: 10000 }).click({ force: true })
        //cy.wait(4000)

        //wait for page to appear
        cy.get('#root', { timeout: 100000 }).should('be.visible')
    }
}
export default new login