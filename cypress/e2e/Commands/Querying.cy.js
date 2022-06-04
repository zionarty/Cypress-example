describe('Querying', () => {
    //Querying - Example of querying for DOM elements in Cypress,for a full reference of commands,go to docs.cypress.io and read Selecting Element

    beforeEach(() => { 
        cy.visit('/')
    })
    it('To query for the button,use the cy.get() command.', () => {
        
        cy.contains('get').click()

        //Verify the URL
        cy.url().should('include', '/commands/querying')
        
        //Verify the button text with CSS selectors
        cy.get('#query-btn').should('contain', 'Button')
        cy.get('.query-btn').should('contain', 'Button')
        cy.get('#querying .well>button:first').should('contain','Button')
    });

    it('To find elements by data attribute,query using the attribute selector', () => {

        cy.contains('get').click()

        //Verify the URL
        cy.url().should('include', '/commands/querying')

        //cy.get() yields a jQuery object,you can get its attribute by invoking the .attr() method
        cy.get('[data-test-id="test-example"]').should('have.class','example')
        cy.get('[data-test-id="test-example"]')
            .invoke('attr', 'data-test-id')
            .should('equal', 'test-example')
        
        // or you can get an element's CSS property
        cy.get('[data-test-id="test-example"]')
            .invoke('css', 'position')
            .should('equal', 'static')
        
        //Alternatively,chain assertion directly to the cy.get() call. See assertion documentation
        cy.get('[data-test-id="test-example"]')
            .should('have.attr', 'data-test-id', 'test-example')
            .and('have.css', 'position', 'static')
        
    });
    
    it('We can find elements by their content using cy.contains()', () => {
        cy.contains('get').click()

        //Verify the URL
        cy.url().should('include', '/commands/querying')

        cy.get('.query-list')
            .contains('bananas').should('have.class', 'third')
        
        //we can pass a regexp to '.contains()'
        cy.get('.query-list')
            .contains(/^b\w+/).should('have.class', 'third')
        
        //passing a selector to contains will
        //yield the selector contains the text

        cy.get('#querying')
            .contains('ul', 'oranges')
            .should('have.class', 'query-list')
        
        cy.get('.query-button')
            .contains('Save Form')
            .should('have.class','btn')
    });

    it('We can find elements within a specific DOM element .within()', () => {
        cy.contains('get').click()

        //Verify the URL
        cy.url().should('include', '/commands/querying')

        cy.get('.query-form').within(() => { 
            cy.get('input:first').should('have.attr','placeholder','Email')
            cy.get('input:last').should('have.attr','placeholder','Password')
        })
    });

    it('We can find the root DOM element cy.root()', () => {
        cy.contains('get').click()

        //Verify the URL
        cy.url().should('include', '/commands/querying')

        //By default, root is the document
        cy.root().should('match', 'html')

        cy.get('.query-ul').within(() => { 
            //In this within,the root is now the ul DOM element
            cy.root().should('have.class','query-ul')
        })
        
    });

    it('Best practices : Selecting elements', () => {

        cy.contains('get').click()

        //Verify the URL
        cy.url().should('include', '/commands/querying')

        //Prefer dedicated data-cy or data-test attributes to CSS class names and element IDs.See detailed discussion at Best Practice: Selecting elements

        //Worst - too generic,no context
        //cy.get('button').click()  error because have 4 button element in this page 

        //Bad - Coupled to styling.Highly subject to change.
        cy.get('.btn.btn-large').click()

        //Average - Coupled to the 'name' attribute which has HTML semantic.
        cy.get('[name=submission]').click()

        //Better - But still coupled to styling or JS event listeners.
        cy.get('#main').click();

        //Slight better - User an ID but also ensures the element
        //has an ARIA role attribute
        cy.get('#main[role=button]').click()

        //Much better - But still coupled to text content that may change.
        cy.contains('Submit').click()

        //Best - Insulated from all change
        cy.get('[data-cy=submit]').click()
    });
});