//This is the main objects file 
//This file has all the methods which are called from main file
import loginCy from "./login.cy"
let api_key;
let space_id;
let project_name;

//defining class
class fastn {

    //method definition
    create_and_deploy_flow() {

        loginCy.login()

        //click on My Workspace
        cy.contains('My Workspace',{timeout:100000}).click({ force: true })

        cy.wait(3000)
        cy.get('body', { timeout: 1000000 }).then((body) => {
            // Check if pop appears
            if (body.find('.p-6').length > 0) {
                //close pop up
                cy.contains('Not now').click();
                //click on Flows
                cy.wait(3000)
                cy.get('[data-testid="apis"]', { timeout: 100000 }).click({ force: true })
            }
            else {
                //click on Flows
                cy.get('[data-testid="apis"]', { timeout: 100000 }).click({ force: true })
            }
        })


        cy.wait(3000)
        cy.get('body', { timeout: 1000000 }).then((body) => {
            // Check if .api-item exists in the body
            if (body.find('.api-item').length > 0) {
                // If it exists, click the button (adjust the selector for your button)
                cy.get('[data-testid="add-api"]').click();
            }
            else {
                cy.get('[data-testid="create-first-project-button"]', { timeout: 100000 }).click({ force: true })
            }
        })

        //click on create first flow


        //enter name of the flow
        project_name = this.generate_random_strings(3)
        cy.get('[data-testid="api-draft-input"]', { timeout: 100000 }).type(project_name)

        //click on build button
        cy.get('[data-testid="api-build-draft-modal-build-button"]').click({ force: true })

        cy.wait(3000)
        //click on skip
        cy.contains('Skip', { timeout: 100000 }).click({ force: true })

        //click on dismiss to close the box
        cy.wait(2000)

        cy.contains('Dismiss', { timeout: 100000 }).click({ force: true })

        //drag n drop the required node
        cy.wait(5000)
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
        cy.wait(4000)
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

    //method definition
    call_api_and_make_assertions(api_key, space_id) {
        //making api request
        cy.request({
            method: 'POST',
            url: 'https://live.fastn.ai/api/v1/' + project_name,
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
        }).then((res) => { //capturing response
            let api_response = JSON.stringify(res.body)
            cy.log(api_response)
            //assertions on response
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('Shehroz').and.to.be.equal('')


        });
    }

    //method definition
    //this method is used to generate random project names so that automation can run as many times as you like
    //AS the application does not allow creation of two projects of same name
    generate_random_strings(wordCount) {
        // List of words you can use for project names
        const words = [
            'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Lambda', 'Sigma', 'Theta', 'Omega',
            'Tech', 'Cloud', 'Vision', 'Innovate', 'Launch', 'Venture', 'Peak', 'Pioneer', 'Spark', 'Elevate',
            'Matrix', 'Code', 'System', 'Stream', 'Path', 'Wave', 'Edge', 'Quantum', 'Core', 'Fusion',
            'Network', 'Drive', 'Solution', 'Growth', 'Nexus', 'Impact', 'Strive', 'Pulse', 'Elevate', 'Ignite',
            'Future', 'Flow', 'Digital', 'Connect', 'Power', 'Pulse', 'Momentum', 'Insight', 'Horizon', 'Visionary',
            'Game', 'Logic', 'Prime', 'Cloudscape', 'TechSpace', 'Pursuit', 'Mind', 'Forge', 'Synergy', 'Beacon',
            'Link', 'Advance', 'Discover', 'Climb', 'Journey', 'Vibe', 'Ignition', 'Peak', 'Data', 'Construct',
            'Foundation', 'Titan', 'Empire', 'Orbit', 'Vector', 'Catalyst', 'AlphaCore', 'Stratosphere', 'NexGen',
            'Project_1', 'Solution_2', 'Innovator_3', 'Cloud_Compute', 'Tech_2021', 'Pulse_Accelerator'
        ];

        // Ensure that we do not select the same word twice by shuffling the array
        const shuffledWords = words.sort(() => Math.random() - 0.5);

        // Select the first `wordCount` words from the shuffled array
        let projectName = shuffledWords.slice(0, wordCount).join('_');  // Join with underscores between words

        // Ensure no spaces or special characters (just letters, numbers, and underscores)
        projectName = projectName.replace(/[^a-zA-Z0-9_]/g, '');  // Remove anything that's not a letter, number, or underscore

        // Check the length of the project name and trim it if it's longer than 30 characters
        if (projectName.length > 30) {
            projectName = projectName.substring(0, 30);  // Trim the project name to 30 characters
        }

        return projectName;

    }

    //method definition
    //this method will delete all the api keys if the count equals 4
    //Free plan does not allow more than 4 api keys 
    //In order to have consistent automation flow, this method will be called to check if the count is equal to 4
    //If the count of api keys is 4 then they all will be deleted to make room for new api keys.
    delete_api_keys() {
        loginCy.login()
        //click on My Workspace
        cy.contains('My Workspace').click({ force: true })

        //click on settings
        cy.get('[data-testid="project-settings"]', { timeout: 100000 }).click({ force: true })

        //wait for it to load
        cy.get('.pt-4', { timeout: 1000000 }).should('be.visible')

        //check if there are 4 api keys
        cy.get('.mt-6.text-sm.leading-6',{timeout:100000}).then(($parent) => {
            // Get the number of children
            const childrenCount = $parent.children().length;

            // If there are exactly 4 children, proceed with the delete action
            if (childrenCount === 4) {
                cy.log('Parent has 4 children. Proceeding with delete action.');
                $parent.children().each((index, child) => {
                    // clicking on delete button for each child sequentially
                    cy.wrap(child).find('[data-testid="delete-project-token"]').click({ force: true });
                    cy.get('#name', { timeout: 100000 }).type('shehroz')
                    cy.get('[data-testid="delete-token-modal-button"]').click({ force: true })
                    cy.wait(1000)
                });
            } else {
                cy.log(`Parent has ${childrenCount} children. Skipping delete action.`);
            }
        });

    }

}
export default new fastn