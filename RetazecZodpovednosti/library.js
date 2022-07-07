// Class stores person data
class Person
{
    constructor(name, email, phoneNumber)
    {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }
}

// Class Handler provides interface to other classes
class Handler
{
    // nextObjInChain = null;

    nextObjectInChain(nextObj){
        if (nextObj != null) {
            this.nextObjInChain = nextObj;
        }
    }

    processData(person){}
}

// Class will check correct format of name
class NameHandler extends Handler
{
    nextObjectInChain(nextObj) {
        super.nextObjectInChain(nextObj);
    }

    processData(person) {
        if (person.getName() == null) {
            throw "Some data is missing!";
        }

        else {
            const splitName = person.getName().split(' ');
            const splitNameNumber = splitName.length;

            // The name must consist of 2 or 3 words
            if (splitNameNumber !== 2 && splitNameNumber !== 3) {
                throw "Invalid name!";
            }

            for(let namePart of splitName) {
                // Every part of name must start with capital
                if (namePart.charAt(0) === namePart.charAt(0).toLowerCase()) {
                    throw "Invalid name!";
                }

                // The name must consist only of letter (letters of different languages are accepted)
                if(!/^[a-zA-ZÇ-Üá-ú]+$/.test(namePart)) {
                    throw "Invalid name!";
                }
            }

            this.nextObjInChain.processData(person);
        }
    }
}

// Class will check correct format of email
class EmailHandler extends Handler
{
    nextObjectInChain(nextObj) {
        super.nextObjectInChain(nextObj);
    }

    processData(person) {
        if (person.getEmail() == null) {
            throw "Some data is missing!";
        }

        else {
            // Email must contain '@'
            if (!person.getEmail().includes('@')) {
                throw "Invalid email!";
            }

            const emailParts = person.getEmail().split('@');

            if (emailParts.length !== 2) {
                throw "Invalid email!";
            }

            // First part of email must consist of english letters, numbers and characters '.' or '_'
            if(!/^[a-zA-Z._0-9]+$/.test(emailParts[0])) {
                throw "Invalid email!";
            }

            // Second part of email must contain at least one '.'
            if (!emailParts[1].includes('.')) {
                throw "Invalid email!";
            }

            const domain = emailParts[1].split('.');
            const domainName = domain[domain.length - 2];
            const topLevelDomain = domain[domain.length - 1];

            // Domain name must consist of english letters and numbers
            if(!/^[a-zA-Z0-9]+$/.test(domainName)) {
                throw "Invalid email!";
            }

            // Top level domain length must be 2 or 3 characters long
            if(topLevelDomain.length !== 2 && topLevelDomain.length !== 3) {
                throw "Invalid email!";
            }

            // Top level domain must consist of small english letters
            if(!/^[a-z]+$/.test(topLevelDomain)) {
                throw "Invalid email!";
            }

            this.nextObjInChain.processData(person);
        }
    }
}

// Class will check correct format of phone number
class PhoneNumberHandler extends Handler
{
    nextObjectInChain(nextObj) {
        super.nextObjectInChain(nextObj);
    }

    processData(person) {
        if (person.getPhoneNumber() == null) {
            throw "Some data is missing!";
        }

        else {
            // First character of phone number must be '+'
            if (person.getPhoneNumber().charAt(0) !== '+') {
                throw "Invalid format of phone number!";
            }

            const number = person.getPhoneNumber().substring(1);

            // Number must be 12 digits long
            if (number.length !== 12) {
                throw "Invalid format of phone number!";
            }

            // Number must consist of digits
            if (isNaN(number)) {
                throw "Invalid format of phone number!";
            }
        }
    }
}

const nameHandler = new NameHandler();
const emailHandler = new EmailHandler();
const phoneNumberHandler = new PhoneNumberHandler();
nameHandler.nextObjectInChain(emailHandler);
emailHandler.nextObjectInChain(phoneNumberHandler);

module.exports.person = Person;
module.exports.nameHandler = nameHandler;