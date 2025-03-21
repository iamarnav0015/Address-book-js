class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.validateName(firstName, "First Name");
        this.validateName(lastName, "Last Name");
        this.validateAddress(address, "Address");
        this.validateAddress(city, "City");
        this.validateAddress(state, "State");
        this.validateZip(zip);
        this.validatePhoneNumber(phoneNumber);
        this.validateEmail(email);

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
        }
    }

    validateAddress(value, fieldName) {
        if (value.length < 2) {
            throw new Error(`${fieldName} must have at least 4 characters.`);
        }
    }

    validateZip(zip) {
        const zipRegex = /^[1-9][0-9]{5}$/;
        if (!zipRegex.test(zip)) {
            throw new Error(`Zip code must be a 6-digit number and not start with 0.`);
        }
    }

    validatePhoneNumber(phone) {
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error(`Phone number must be a valid 10-digit number starting with 6-9.`);
        }
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error(`Invalid email format.`);
        }
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
        let isDuplicate = this.contacts.some(
            c => `${c.firstName} ${c.lastName}`.toLowerCase() === `${contact.firstName} ${contact.lastName}`.toLowerCase()
        );

        if (isDuplicate) {
            throw new Error("Duplicate entry! Contact with this name already exists.");
        }

        this.contacts.push(contact);
        console.log("Contact added successfully.");
    }

    findContact(name) {
        return this.contacts.find(contact => `${contact.firstName} ${contact.lastName}`.toLowerCase() === name.toLowerCase());
    }

    editContact(name, updatedDetails) {
        let contact = this.findContact(name);
        if (!contact) {
            console.log("Contact not found.");
            return;
        }

        if (updatedDetails.firstName) {
            contact.validateName(updatedDetails.firstName, "First Name");
            contact.firstName = updatedDetails.firstName;
        }
        if (updatedDetails.lastName) {
            contact.validateName(updatedDetails.lastName, "Last Name");
            contact.lastName = updatedDetails.lastName;
        }
        if (updatedDetails.address) {
            contact.validateAddress(updatedDetails.address, "Address");
            contact.address = updatedDetails.address;
        }
        if (updatedDetails.city) {
            contact.validateAddress(updatedDetails.city, "City");
            contact.city = updatedDetails.city;
        }
        if (updatedDetails.state) {
            contact.validateAddress(updatedDetails.state, "State");
            contact.state = updatedDetails.state;
        }
        if (updatedDetails.zip) {
            contact.validateZip(updatedDetails.zip);
            contact.zip = updatedDetails.zip;
        }
        if (updatedDetails.phoneNumber) {
            contact.validatePhoneNumber(updatedDetails.phoneNumber);
            contact.phoneNumber = updatedDetails.phoneNumber;
        }
        if (updatedDetails.email) {
            contact.validateEmail(updatedDetails.email);
            contact.email = updatedDetails.email;
        }

        console.log("Contact updated successfully.");
    }

    deleteContact(name) {
        let index = this.contacts.findIndex(contact => `${contact.firstName} ${contact.lastName}`.toLowerCase() === name.toLowerCase());
        if (index === -1) {
            console.log("Contact not found.");
            return;
        }
        this.contacts.splice(index, 1);
        console.log("Contact deleted successfully.");
    }

    getContactCount() {
        return this.contacts.length;
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("No contacts found.");
        } else {
            this.contacts.forEach(contact => console.log(contact.toString() + "\n"));
        }
    }

    getAllContactNames() {
        return this.contacts.map(contact => `${contact.firstName} ${contact.lastName}`);
    }

    countContactsByCity(city) {
        return this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase()).length;
    }

    countContactsByState(state) {
        return this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase()).length;
    }
}

// Example Usage
try {
    let addressBook = new AddressBook();

    let contact1 = new Contact("Nikhil", "Kumar", "BHEL Jhansi", "Jhansi", "UP", "284120", "9876543210", "nikhil.kumar@gmail.com");
    let contact2 = new Contact("Amit", "Sharma", "Delhi NCR", "Delhi", "DL", "110001", "9123456789", "amit.sharma@gmail.com");
    let contact3 = new Contact("Nikhil", "Kumar", "BHEL Jhansi", "Jhansi", "UP", "284120", "9876543210", "nikhil.kumar@gmail.com"); // Duplicate

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);

    // Attempt to add duplicate contact
    try {
        addressBook.addContact(contact3);
    } catch (error) {
        console.error(error.message);
    }

    console.log("Before Deleting:");
    addressBook.displayContacts();
    console.log(`Total Contacts: ${addressBook.getContactCount()}`);

    // Delete contact
    addressBook.deleteContact("Nikhil Kumar");

    console.log("After Deleting:");
    addressBook.displayContacts();
    console.log(`Total Contacts: ${addressBook.getContactCount()}`);

    // Count contacts by city and state
    console.log(`Contacts in Delhi: ${addressBook.countContactsByCity("Delhi")}`);
    console.log(`Contacts in UP: ${addressBook.countContactsByState("UP")}`);

} catch (error) {
    console.error(error.message);
}
