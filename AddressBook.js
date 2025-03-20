class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    toString() {
        return `Name: ${this.firstName} ${this.lastName}\nAddress: ${this.address}, ${this.city}, ${this.state} ${this.zip}\nPhone: ${this.phoneNumber}\nEmail: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
    }

    displayContacts() {
        this.contacts.forEach(contact => console.log(contact.toString() + "\n"));
    }
}

// Example Usage
let addressBook = new AddressBook();

let contact1 = new Contact("Nikhil", "Kumar", "BHEL Jhansi", "Jhansi", "UP", "284120", "1234567890", "nikhil.kumar@gmail.com");
let contact2 = new Contact("Amit", "Sharma", "Civil Lines", "Delhi", "DL", "110001", "9876543210", "amit.sharma@gmail.com");

addressBook.addContact(contact1);
addressBook.addContact(contact2);

addressBook.displayContacts();
