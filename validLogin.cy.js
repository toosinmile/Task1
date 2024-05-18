import { login } from "../fixtures/selectors";

export const validLogin = ()=>{
    cy.get(login.loginBttn).click()
    cy.get(login.usernameField).type('mykiaell')
    cy.get(login.passwordField).type('Password1$')
    cy.get(login.loginBttn1).click()
    cy.get(login.startnewSessionBttn).click()  
}