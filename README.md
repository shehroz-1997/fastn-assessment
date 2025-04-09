# fastn-assessment
Before running please see the following pre-requisites

1- You should have node installed in your system (If not please install node and then restart system otherwise cypress wont detect node)

2-Make sure that there is not any restriction on your system to run automation scripts
Run this command in your powershell by opening as administrator "Set-ExecutionPolicy RemoteSigned"

3-Cypress needs to be installed locally in order to run scripts
You will probably face this error if you have not installed cypress in your system previosuly
In the VS code terminal where repository is currently opened, run following two commands in the same order
npm install --save-dev cypress
npx cypress install --force

4-After this try opening the cypress and run the "flow.cy.js" - this is the main test file
    4.1- There are two dependencies which we need to take care of drag n drop and cypress mochawesome reporter
        If error comes for drag n drop dependency then please run following command in your vs code terminal where currently repository is opened:
        npm install --save-dev @4tw/cypress-drag-drop
        If error comes for cypress mochawesome dependency then please run following command in your vs code terminal where currently repository is opened:
        npm i --save-dev cypress-mochawesome-reporter


