Cypress.Commands.add("login", userType => {
  const types = {
    admin: {
      name: "admin",
      password: "hans"
    },
    user: {
      name: "Jim Bob",
      admin: false
    }
  };

  // grab the user
  const user = types[userType];

  // create the user first in the DB
  cy.request({
    url: "http://localhost:5000/login2",
    method: "POST",
    body: {
      username: user.name,
      password: user.password
    }
  });
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
