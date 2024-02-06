const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let contacts = [];

function addContact() {
  rl.question('Enter the name: ', (name) => {
    rl.question('Enter the phone number: ', (phoneNumber) => {
      contacts.push({ name, phoneNumber });
      console.log('Contact added successfully!\n');
      displayMenu();
    });
  });
}

function viewAllContacts() {
  if (contacts.length === 0) {
    console.log('No contacts found.\n');
  } else {
    console.log('All Contacts:');
    contacts.forEach(contact => {
      console.log(`Name: ${contact.name}, Phone: ${contact.phoneNumber}`);
    });
    console.log();
  }
  displayMenu();
}

function searchContact() {
  rl.question('Enter the name to search: ', (name) => {
    const foundContact = contacts.find(contact => contact.name === name);
    if (foundContact) {
      console.log(`Contact found - Name: ${foundContact.name}, Phone: ${foundContact.phoneNumber}\n`);
    } else {
      console.log('Contact not found.\n');
    }
    displayMenu();
  });
}

function exitApp() {
  console.log('Exiting application. Goodbye!');
  rl.close();
}

function displayMenu() {
  console.log('1. Add a contact');
  console.log('2. View all contacts');
  console.log('3. Search for a contact');
  console.log('4. Exit');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        addContact();
        break;
      case '2':
        viewAllContacts();
        break;
      case '3':
        searchContact();
        break;
      case '4':
        exitApp();
        break;
      default:
        console.log('Invalid choice. Please try again.\n');
        displayMenu();
    }
  });
}

console.log('Welcome to the Contact Management System!\n');
displayMenu();
