export class FormPage {
  constructor(page) {
    this.page = page;

    // Locators for the form fields
    this.firstName = '#firstName';
    this.lastName = '#lastName';
    this.userEmail = '#userEmail';
    this.genderRadioButton = 'label[for="gender-radio-1"]';
    this.userNumber = '#userNumber';
    this.dateOfBirthInput = '#dateOfBirthInput';
    this.yearSelect = 'select.react-datepicker__year-select';
    this.monthSelect = 'select.react-datepicker__month-select';
    this.daySelect = '.react-datepicker__day--015';
    this.subjectsInput = '#subjectsInput';
    this.hobbyCheckbox1 = '#hobbies-checkbox-1';
    this.hobbyCheckbox3 = '#hobbies-checkbox-3';
    this.uploadPicture = "input[id='uploadPicture']";
    this.currentAddress = '#currentAddress';
    this.stateSelect = '#state';
    this.citySelect = '#city';
    this.submitButton = 'role=button >> text=Submit';
  }

  async PageObjectModel() {
    // Your logic for the PageObjectModel method
    console.log("Page Object Model method is called");
  }

  // Navigate to the form page
  async goTo() {
    await this.page.goto('https://demoqa.com/automation-practice-form', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
  }

  // Fill personal details
  async fillPersonalDetails(firstName, lastName, email, userNumber) {
    await this.page.fill(this.firstName, "Pravesh");
    await this.page.fill(this.lastName, "Malviya");
    await this.page.fill(this.userEmail, "pravesh.m@example.com");
    await this.page.click(this.genderRadioButton);
    await this.page.fill(this.userNumber, "9876543210");
  }

  // Fill date of birth
  async fillDateOfBirth(year, month, day) {
    await this.page.click(this.dateOfBirthInput);
    await this.page.selectOption(this.yearSelect, year, { timeout: 60000 });
    await this.page.selectOption(this.monthSelect, month, { timeout: 60000 });
    await this.page.click(this.daySelect);
  }

  // Add subjects
  async addSubjects(subject) {
    const subjectsInput = await this.page.locator(this.subjectsInput);
    await subjectsInput.fill(subject);
    await this.page.keyboard.press('Enter');
  }

  // Select hobbies
  async selectHobbies() {
    await this.page.click(this.hobbyCheckbox1);
    await this.page.click(this.hobbyCheckbox3);
  }

  // Upload a picture
  async UploadPicture(filePath) {
    await this.page.locator(this.uploadPicture).setInputFiles(filePath);
  }

  // Fill current address
  async fillCurrentAddress(address) {
    await this.page.fill(this.currentAddress, "address");
  }

  // Select state and city
  async selectStateAndCity(state, city) {
    await this.page.waitForSelector(this.stateSelect);
    await this.page.click(this.stateSelect);
    await this.page.waitForSelector(`text=${state}`);
    await this.page.getByText(state, { exact: true }).click();

    await this.page.waitForSelector(this.citySelect);
    await this.page.click(this.citySelect);
    await this.page.waitForSelector(`text=${city}`);
    await this.page.getByText(city, { exact: true }).click();
  }

  // Submit the form
  async submitForm() {
    const submitButton = this.page.locator(this.submitButton);
    await submitButton.click();
  }
}