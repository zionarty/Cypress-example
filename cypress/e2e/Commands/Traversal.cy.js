describe('Traversal', () => {
    //Traversal - Examples of traversing DOM elements in Cypress,for a full reference of commands,go to docs.cypress.io

    beforeEach(() => {
        cy.visit('/')
        cy.contains('children').click()
        cy.url().should('include','/commands/traversal')
    });

    it('To get children of DOM elements,use the .children() command', () => {
        cy.get('.traversal-breadcrumb')
            .children('.active')
            .should('contain', 'Data')
    });

    it('To get the closet ancestor DOM element,use the .closest() command', () => {
        cy.get('.traversal-badge')
            .closest('ul')
            .should('have.class', 'list-group')
    });

    it('To get a DOm element at a specific index,use the .eq() command', () => {
        cy.get('.traversal-list>li')
        .eq(1).should('contain','siamese')
    });

    it('To get DOM elements that match a specific selector,use the .filter() command', () => {
        cy.get('.traversal-nav>li')
        .filter('.active').should('contain','About')
    });

    it('To get descendant DOM elements of the selector,use the .find() command', () => {
        cy.get('.traversal-pagination').find('li').find('a').should('have.length','7')
    });

    it('To get the first DOM elements,use the .first() command', () => {
        cy.get('.traversal-table td')
        .first().should('contain','1')
    });
});