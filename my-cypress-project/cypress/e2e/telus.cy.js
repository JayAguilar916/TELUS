describe('TELUS', () => {
  const urlMain = 'https://www.telusinternational.ai/cmp';
  const urlBasicInfo = 'https://www.telusinternational.ai/cmp/contributor/userprofile/basic-info';
  const userNameLocator = 'input[aria-label="Email"]';
  const userName = 'j46902490@gmail.com';
  const passwordLocator = 'input[aria-label="Password"]';
  const password = "Testing01!";
  const dashboardLocator = 'div[aria-label="User Avatar"]';
  const urlLanguages = 'https://www.telusinternational.ai/cmp/contributor/userprofile/languages';
  const penIconLocator = 'svg[xmlns="http://www.w3.org/2000/svg"]';
  const languageFieldLocator = 'div[class="css-1g6gooi"]';
  const proficiencyLevelFieldLocator = 'div[class="css-mry1rc"]';
  const languageDropDown = 'div[class="sui-c-floating-label-dropdown sui-c-input-dropdown__single-value css-1uccc91-singleValue"]';
  const language1 = 'English (United States)';
  const language2 = 'Cebuano (Philippines)';
  const phoneNumber = 'input[name="phone_number.line_number"]';
  const postalCodeEditButton = 'button.sui-c-btn-primary';
  const cityAndStateField = 'input[name="cityAndState"]';
  const streetAddressField = 'input[name="streetAddress"]';
  const postalCodeField = 'input[name="postalCode"]';
  const nameFieldLocation = 'input[name="first_name"]';
  //const addLanguageField = 'div[class="sui-c-floating-label-dropdown sui-c-input-dropdown__control css-yk16xz-control"]';
  const otherLanguageField = 'Start typing language and select from the menu';
  const proficiencyOtherLanguage = 'input[aria-label="Select proficiency level*"]';
  const editLanguageForm = 'div[id="edit-language-form"]';
  const newLanguageForm = 'div[id="new-language-form"]';
  const saveButton = 'button[type="submit"]';
  const cancelButton = 'button.sui-c-btn-secondary';
  const Language3ProficiencyLevel = 'Native or bilingual proficiency';

  before(() => {
    cy.visit(urlMain);
  });

  it('Profile creation and edit', () => {
    cy.log("TC1 Access the website and log in using the credentials created");
    //cy.visit(urlMain);
    cy.log("Enter username/Email");
    cy.get(userNameLocator).should('be.visible');
    cy.get(userNameLocator).type(userName);
    cy.contains('Continue').click();
    cy.log("verify the username");
    cy.get('span.sui-font-medium').should('be.visible').and('contain', userName);
    cy.log("Enter password");
    cy.get(passwordLocator).should('be.visible');
    cy.get(passwordLocator).type(password);
    cy.contains('Sign in').click();
    cy.log("Verify if successfully redirected to the Dashboard");
    cy.get(dashboardLocator).first().should('be.visible');

    cy.log("TC2 Access My Profile page");
    cy.log("Click on the User Avatar to open the profile menu");
    cy.contains('FL').first().should('be.visible').click();
    cy.contains(userName).should('be.visible');
    cy.contains('Sign Out').should('be.visible');
    cy.contains('My Profile').should('be.visible').click();
    cy.url().should('include', urlBasicInfo);

    cy.log("TC3 Edit the Contact Information");
    cy.get(postalCodeEditButton).eq(0).click();
    //To check if some fields are editable
    cy.get(nameFieldLocation).should(($element) => {
      const isContentEditable = $element.is('[contenteditable="true"]');  //Check if the element has contenteditable attribute set to true
      const isInputOrTextarea = ['input', 'select', 'textarea'].includes($element.prop('tagName').toLowerCase());   //Check if the element is an input, select, or textarea element
      expect(isContentEditable || isInputOrTextarea).to.be.true;    //Assert that the element is editable
    });
    cy.get(phoneNumber).should(($element) => {
      const isContentEditable = $element.is('[contenteditable="true"]');
      const isInputOrTextarea = ['input', 'select', 'textarea'].includes($element.prop('tagName').toLowerCase());
      expect(isContentEditable || isInputOrTextarea).to.be.true;
    });
    cy.contains('Cancel').should('not.have.attr', 'disabled');  //To check if the button is enabled
    cy.contains('Save').should('have.attr', 'disabled');  //To check if a button is disabled
    //Populate the PhoneNumber field
    cy.get(phoneNumber).then(($field) => {
      const currentValue = $field.val().trim(); //Use .val() to get the current value of the field
      if (currentValue === '123456') {
        cy.get(phoneNumber).clear().type('654321'); //Replace 123456 with the new value for the field
        cy.get('body').type('{enter}');
      } else if (currentValue === '654321') {
        cy.get(phoneNumber).clear().type('123456'); // Replace 654321 with the new value for the field
        cy.get('body').type('{enter}');
      } else {
        cy.log('Field value is neither 123456 nor 654321');
      }
    });
    cy.contains('Save').should('not.have.attr', 'disabled');
    cy.contains('Save').click();

    cy.log("TC4 Edit the Postal Code");
    cy.get(postalCodeEditButton).eq(1).click();
    //To check if some fields are editable
    cy.get(cityAndStateField).should(($element) => {
      const isContentEditable = $element.is('[contenteditable="true"]');    //Check if the element has contenteditable attribute set to true
      const isInputOrTextarea = ['input', 'select', 'textarea'].includes($element.prop('tagName').toLowerCase());   //Check if the element is an input, select, or textarea element
      expect(isContentEditable || isInputOrTextarea).to.be.true;    //Assert that the element is editable
    });
    cy.get(streetAddressField).should(($element) => {
      const isContentEditable = $element.is('[contenteditable="true"]');
      const isInputOrTextarea = ['input', 'select', 'textarea'].includes($element.prop('tagName').toLowerCase());
      expect(isContentEditable || isInputOrTextarea).to.be.true;
    });
    cy.get(postalCodeField).should(($element) => {
      const isContentEditable = $element.is('[contenteditable="true"]');
      const isInputOrTextarea = ['input', 'select', 'textarea'].includes($element.prop('tagName').toLowerCase());
      expect(isContentEditable || isInputOrTextarea).to.be.true;
    });
    cy.contains('Cancel').should('not.have.attr', 'disabled');    //To check if the button is enabled
    cy.contains('Save').should('have.attr', 'disabled');    //To check if a button is disabled
    cy.get(postalCodeField).then(($field) => {
      const currentValue = $field.val().trim(); //Use .val() to get the current value of the field
      if (currentValue === '6116') {
        cy.get(postalCodeField).clear().type('6000'); //Replace 6116 with the new value for the field
        cy.get('body').type('{enter}');
      } else if (currentValue === '6000') {
        cy.get(postalCodeField).clear().type('6116'); // Replace 6000 with the new value for the field
        cy.get('body').type('{enter}');
      } else {
        cy.log('Field value is neither 6116 nor 6000');
      }
    });
    cy.contains('Save').should('not.have.attr', 'disabled');
    cy.contains('Save').click();

    cy.log("TC5 Edit the Languages");
    cy.contains('Languages').should('be.visible').click();
    cy.url().should('include', urlLanguages);
    cy.log("Add a Primary Language");
    cy.get(penIconLocator).eq(4).click({ force: true });
    cy.log("Check if Language field is enabled");
    cy.get(languageFieldLocator).should('not.have.attr', 'disabled');
    cy.log("Check if Proficiency level field is disable/hidden");
    cy.get(proficiencyLevelFieldLocator).should('exist').should('not.be.visible');
    cy.get(editLanguageForm).find(cancelButton).should('not.have.attr', 'disabled');     //To check if the button is enabled
    cy.get(editLanguageForm).find(saveButton).should('have.attr', 'disabled');     //To check if a button is disabled
    //Populate the Language field
    cy.get(languageDropDown).click(); //Open the dropdown
    cy.get(languageDropDown).then(($dropdown) => {
      const currentValue = $dropdown.text().trim();
      if (currentValue === language1) {
            cy.get(languageDropDown).type(language2);
            cy.get('body').type('{enter}');
      } else if (currentValue === language2) {
            cy.get(languageDropDown).type(language1);
            cy.get('body').type('{enter}');
      } else {
        cy.log('Dropdown value is neither Phil nor US');
      }
    });
    cy.contains('Save').should('not.have.attr', 'disabled');
    cy.contains('Cancel').should('not.have.attr', 'disabled');
    cy.contains('Save').click();
    const otherLanguageEdit = 'input[aria-label="Start typing language and select from the menu"]';
    const language3 = 'Tagalog (Philippines)';
    const trash = 'div[class="trash-div"]';

    cy.log("TC6 Add Other Languages");
    cy.get(trash, { failOnStatusCode: false }).then(($element) => {
      if ($element.length > 0 && Cypress.dom.isVisible($element)) {
        cy.wrap($element).click();
        cy.contains('Yes').click();
      } else {
        //Do nothing
      }
    });
    cy.contains('Add').click();
    cy.contains(otherLanguageField).should('not.have.attr', 'disabled');
    cy.get(proficiencyOtherLanguage).should('exist').should('not.be.visible');
    cy.get(newLanguageForm).find(cancelButton).should('not.have.attr', 'disabled'); 
    cy.get(newLanguageForm).find(saveButton).should('have.attr', 'disabled');    //To check if a button is disabled
    cy.get(otherLanguageEdit).as('inputField'); //Alias the input field
    cy.get('@inputField').click(); //Click on the input field
    cy.get('@inputField').type(language3); //Type into the input field
    cy.get('body').type('{enter}');
    cy.get(proficiencyOtherLanguage).type(Language3ProficiencyLevel);
    cy.get('body').type('{enter}');
    cy.get(newLanguageForm).find(saveButton).click(); 

    cy.log("TC7 Sign Out");
    cy.contains('FL').first().should('be.visible').click();
    cy.contains('Sign Out').should('be.visible').click();
  })

  it('GET request and status 200', () => {
    //Make a GET request to the API endpoint
    cy.request('GET', urlMain).then((response) => {
        //Assert that the response status is 200 (OK)
        expect(response.status).to.eq(200);
        //Assert that the response body contains data
        expect(response.body).to.have.length.greaterThan(0);
      });
  });

  it('Create a new user', () => {
    //Define the user data
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe',
    };
  });

})



