import loginCy from "./login.cy"
let api_key;
let space_id;
class fastn {
    create_and_deploy_flow() 
    {

       loginCy.login()

        //click on My Workspace
        cy.contains('My Workspace').click({ force: true })

        //click on Flows
        cy.get('[data-testid="apis"]', { timeout: 100000 }).click({ force: true })

        //click on create first flow
        cy.get('[data-testid="create-first-project-button"]', { timeout: 100000 }).click({ force: true })

        //enter name of the flow
        cy.get('[data-testid="api-draft-input"]', { timeout: 100000 }).type('shehroz')

        //click on build button
        cy.get('[data-testid="api-build-draft-modal-build-button"]').click({ force: true })

        cy.wait(3000)
        //click on skip
        cy.contains('Skip', { timeout: 100000 }).click({ force: true })

        //click on dismiss to close the box
        cy.wait(2000)

        cy.contains('Dismiss', { timeout: 100000 }).click({ force: true })

        //drag n drop the required node
        cy.get('[data-testid="Output"]').drag('#addFirstNode >.h-3 >path');
        //cy.get('[data-testid="Output"]')

        //add example json
        //click on + icon
        cy.get('#add-field-0', { timeout: 100000 }).click({ force: true })

        //enter key for json
        cy.get('[data-testid="key-0-"]', { timeout: 10000 }).type('Shehroz')

        //click on save
        cy.get('[data-testid="connect-save-button"]', { timeout: 100000 }).click({ force: true })

        //click on deploy to live
        cy.get('[data-testid="deploys-button"]', { timeout: 100000 }).click({ force: true })

        //add deploy comment
        cy.get('#deploy-comment', { timeout: 100000 }).type('deploying api')

        //click on deploy
        cy.get('.text-primary').click({ force: true })

        //assertion to check successfull deploy notification
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .px-2', { timeout: 100000 }).should('be.visible').should('contain.text', 'Success')

        //click on integrate button
        cy.get('#integrate-button', { timeout: 100000 }).click({ force: true })

        //wait for the integrate panel to open
        cy.get('.text-center', { timeout: 100000 }).should('be.visible')

        //select "Live" from drop down
        cy.get('[data-testid="environment"]').select("LIVE")

        //generate api token
        cy.get('[data-testid="generate-token-button"]').click({ force: true })

        //enter api key name
        cy.get('[data-testid="apiKeyName"]', { timeout: 10000 }).type('shehroz')

        //click on select all
        cy.get('[data-testid="ALL_RESOURCES"]').check();

        //click on generate api key button
        cy.get('[data-testid="generate-apiKey-btn"]').click({ force: true })

        //wait till the token appears
        cy.get('#api-token', { timeout: 100000 }).should('be.visible')

        cy.get('#api-token')
            .invoke('attr', 'value')  // Get the 'value' attribute
            .then((value) => {
                api_key = value;
                Cypress.env('apiKey', api_key)  // Store the extracted value in the variable
                cy.log('api token:', api_key);  // Log it for debugging (optional)
            });

        //click on done button
        cy.get('[data-testid="doneTokenBtn"]').click({ force: true })

        //change sdk to react to extract space-id 
        cy.get('[data-testid="sdk"]', { timeout: 100000 }).select('React')
        cy.wait(2000)
        //extract space-id
        cy.get('span.mtk20')
            .contains('x-fastn-space-id')  // Find the span with the "x-fastn-space-id" text
            .siblings('span.mtk20')  // Get all sibling spans of 'x-fastn-space-id'
            .eq(0)  // Get the adjacent span element
            .invoke('text')  // Get the text inside the adjacent span
            .then((text) => {
                space_id = text.trim();
                let cleanedString = space_id.replace(/['"]+/g, '');
                Cypress.env('spaceKey', cleanedString) // Clean up the text by trimming spaces
                cy.log('Extracted Space ID:', cleanedString);
            });

    }

    call_api_and_make_assertions(api_key,space_id)
    {
        cy.request({
            method: 'POST',
            url: 'https://live.fastn.ai/api/v1/shehroz',
            headers: {
                'Content-Type': 'application/json',
                'x-fastn-space-tenantid': 'test',
                'x-fastn-api-key': api_key,
                'x-fastn-space-id': space_id,
                'stage': 'LIVE'
            },

            body:
            {
                "input": {}
            }
        }).then((res) => {
            let api_response = JSON.stringify(res.body)
            cy.log(api_response)
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('Shehroz').and.to.be.equal('')
            

        });
    }

}
export default new fastn