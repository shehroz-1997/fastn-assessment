//This is the main file which can be executed to check the flow
//defining cypress reference type
/// <reference types="Cypress" />
//defining all the imports here
import objectsCy from "../page-objects/objects.cy";
//Defining global variables for the project
let api_key;
let space_id;
//---------------------------------------------------------------------------------------------//
//Main test starts from here
describe('fastn flow', () => {


    it('Create and deploy flow ', () => {

        //method to create and deploy flow
        objectsCy.create_and_deploy_flow()
    })

    it('Make Assertions on live API', () => {
        //getting the api key and sapce id 
        api_key = Cypress.env('apiKey')
        space_id = Cypress.env('spaceKey')
        //logging these values on console for validation
        cy.log('api key ' + api_key)
        cy.log('space key ' + space_id)
        //method to call api and make cypress assertions
        objectsCy.call_api_and_make_assertions(api_key,space_id)
        

    })
    it('Delete created API keys If count equals 4', () => {
        //will delete api keys if it exceeds count of 4
        //Because only 4 api keys can be added in free plan
        //To eliminate any blocker for the automation flow, script will check after every execution 
        //to check if 4 api keys are created and then delete all of them to make room for new one
        objectsCy.delete_api_keys()

    })
})
//Main test ends here
//---------------------------------------------------------------------------------------------------//