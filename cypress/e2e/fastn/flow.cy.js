/// <reference types="Cypress" />
import objectsCy from "../page-objects/objects.cy";
let api_key;
let space_id;
describe('fastn flow', () => {


    it('Create and deploy flow ', () => {
        objectsCy.create_and_deploy_flow()
    })

    it('Make Assertions on live API', () => {
        api_key = Cypress.env('apiKey')
        space_id = Cypress.env('spaceKey')
        cy.log('api key ' + api_key)
        cy.log('space key ' + space_id)
        objectsCy.call_api_and_make_assertions(api_key,space_id)
        

    })
})