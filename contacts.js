const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
}

function getContactById(contactId) {
  const contacts = listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

function removeContact(contactId) {
  const contacts = listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = { id: Date.now(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
