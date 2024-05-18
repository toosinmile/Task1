describe('Booking API Test', () => {
  let bookingId;
  let authToken;
  
  before(() => {
    // Create a booking
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        firstname: "John",
        lastname: "Doe",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2022-01-01",
          checkout: "2022-01-02"
        },
        additionalneeds: "Breakfast"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      //expect(response.status).to.eq(201);
      bookingId = response.body.bookingid;
      cy.log('Booking ID: ' + bookingId);
    });

    // Create an auth token
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        username: "admin",
        password: "password123"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
      cy.log('Auth Token: ' + authToken);
    });
  });

  it('Get the booking created', () => {
    cy.request({
      method: 'GET',
      url: `https://restful-booker.herokuapp.com/booking/${bookingId}`
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.eq('John');
      expect(response.body.lastname).to.eq('Doe');
    });
  });

  it('Update the booking', () => {
    cy.request({
      method: 'PUT',
      url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${authToken}`
      },
      body: {
        firstname: "John",
        lastname: "Doe",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2022-01-01",
          checkout: "2022-01-03" // Changed checkout date
        },
        additionalneeds: "Late Checkout" // Changed additional needs
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingdates.checkout).to.eq('2022-01-03');
      expect(response.body.additionalneeds).to.eq('Late Checkout');
    });
  });
});
