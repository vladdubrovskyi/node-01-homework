const fs = require("fs/promises");
const path = require("path");

contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function writeDB(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function getContactById(contactId) {
  const contactList = await readDb();
  const contactToFind = contactList.find((contact) => contact.id === contactId);
  console.log(contactToFind);
}

async function removeContact(contactId) {
  const contactList = await readDb();
  const updatedContactList = contactList.filter(
    (contact) => contact.id !== contactId
  );
  await writeDB(updatedContactList);
}

async function addContact(name, email, phone) {
  const id = Date.now();
  const contact = { id, name, email, phone };
  const contactList = await readDb();
  contactList.push(contact);

  await writeDB(contactList);
}

async function listContacts() {
  const contacstList = await readDb();
  return contacstList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
