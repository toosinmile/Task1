describe('Automation Exercise Test', () => {
  it('Sign in, sort featured items, add to cart, and place order', () => {
    // Step 1: Go to the website
    cy.visit('https://www.automationexercise.com/');

    // Step 2: Click on Sign-In
    cy.get('a[href="/login"]').click();

    // Step 3: Sign-In using credentials
    cy.get('input[data-qa="login-email"]').type('qat@mailinator.com');
    cy.get('input[data-qa="login-password"]').type('123456');
    cy.get('button[data-qa="login-button"]').click();

    // Step 4: Ensure successful login by checking the URL or some element on the landing page
    cy.url().should('include', '/');

    // Step 5: Get the labels and prices of featured items
    cy.get('.features_items .productinfo').then((items) => {
      const products = [];

      // Loop through each featured item and get its label and price
      items.each((index, item) => {
        const label = Cypress.$(item).find('.product-name').text();
        const price = Cypress.$(item).find('.product-price').text().replace('$', '');

        products.push({ label, price: parseFloat(price) });
      });

      // Sort the products array by price (Low to High)
      products.sort((a, b) => a.price - b.price);

      // Print sorted products to the console
      products.forEach(product => {
        cy.log(`Label: ${product.label}, Price: ${product.price}`);
      });
    });

    // Step 6: Scroll Up - Navigate to Women >> Dress >> Women – Tops Products
    cy.scrollTo('top');
    cy.get('a:contains("Women")').click();
    //cy.get('a:contains("Dress")').click();
    //cy.get('a:contains("Tops")').click();

    // Step 7: Select the Fancy Green Top and add to cart
    cy.contains('Fancy Green Top').click();
    cy.get('button:contains("Add to cart")').click();
    cy.get('button:contains("Continue Shopping")').click();

    // Step 8: Select Summer White Top and add to cart
    cy.contains('Summer White Top').click();
    //cy.get('button:contains("Add to cart")').click();
    //cy.get('button:contains("Continue Shopping")').click();

    // Step 9: View cart and proceed to checkout
    cy.get('a[href="/view_cart"]').click();
    cy.get('button:contains("Proceed To Checkout")').click();

    // Step 10: Add comments and place order
    cy.get('textarea[name="message"]').type('Order placed.');
    cy.get('button:contains("Place Order")').click();

    // Step 11: Enter card details and confirm order
    cy.get('input[name="name_on_card"]').type('Test Card');
    cy.get('input[name="card_number"]').type('4100 0000 0000');
    cy.get('input[name="cvc"]').type('123');
    cy.get('input[name="expiry_month"]').type('01');
    cy.get('input[name="expiry_year"]').type('1900');
    cy.get('button:contains("Pay and Confirm Order")').click();

    // Step 12: Confirm order has been placed
    cy.contains('Your order has been placed successfully').should('be.visible');
  });
});
