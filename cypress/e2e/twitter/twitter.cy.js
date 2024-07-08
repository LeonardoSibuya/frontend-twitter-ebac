/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Testando aplicação por user existente', () => {
    beforeEach(() => {
        cy.viewport(1224, 768)
        cy.visit('https://twitterebac.vercel.app')

        cy.get('.sc-jTQCzO > .chakra-button').click()
        cy.get('#email').click()
        cy.get('#email').type('leonardo@teste.com')
        cy.get('#password').click()
        cy.get('#password').type('Leo123@')
        cy.get('.chakra-modal__footer > .chakra-button').click()
        cy.wait(5000);
    })

    it('Criando um tweet com Cypress', () => {
        cy.get('textarea').click()
        cy.get('textarea').type('Este é um tweet feito pelo cypress')
        cy.get('.sc-ifyrAs > button').click()
        cy.wait(4000);
        cy.contains('Este é um tweet feito pelo cypress')
    })

    it('Acessando o perfil próprio', () => {
        cy.get('.sc-fmKFGs > a').click()
        cy.wait(4000);
        cy.contains('leonardo@teste.com')
    })

    it('Acessando o perfil de outro user', () => {
        cy.get(':nth-child(2) > .sc-fLseNd > .sc-bBkKde > a').click()
        cy.wait(4000);
        cy.contains('jade@teste.com')
    })

    it('Deixando de seguir e seguindo novamente outro user', () => {
        cy.get(':nth-child(2) > .sc-fLseNd > .sc-bBkKde > a').click()
        cy.wait(5000);

        cy.get('.sc-ilxebA').click()
        cy.contains('seguir')
        cy.wait(1000);
        cy.get('.sc-ilxebA').click()
    })

    it('Procurando outro user', () => {
        cy.get('input').click()
        cy.get('input').type('jade')
        cy.wait(1000);
        cy.get('.sc-eTNRI').click()
        cy.wait(5000);
        cy.contains('jade@teste.com');
    })

    it('Renderizando mensanges do usuário e enviando uma nova mensagem', () => {
        cy.get(':nth-child(2) > a').click()
        cy.contains('Mensagens recentes:')

        cy.get('ul > :nth-child(1)').click()
        cy.contains('Gostei muito!!');
        cy.get('.sc-hhyKGa').click()
        cy.get('.sc-hhyKGa').type('Mensagem enviada pelo cypress')
        cy.get('button').click()
        cy.wait(1000);
        cy.contains('Mensagem enviada pelo cypress');
    })
});

describe('Criando um novo user', () => {
    beforeEach(() => {
        cy.viewport(1224, 768)
        cy.visit('https://twitterebac.vercel.app')
    })

    it('Executando a criação do novo user', () => {
        cy.get('.sc-eDLKkx > .chakra-button').click()
        cy.get('#name').click()
        cy.get('#name').type('Cypress')

        cy.get('#email').click()
        cy.get('#email').type('cypress@teste.com')

        cy.get('#password').click()
        cy.get('#password').type('Leo123@')

        cy.get('#confirmPassword').click()
        cy.get('#confirmPassword').type('Leo123@')

        cy.get('.chakra-modal__footer > .chakra-button').click()
        cy.wait(5000);

        cy.contains('Seu Feed')
    })
});
