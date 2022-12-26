const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "add":
      await addContact(name, email, phone);
      break;
    case "remove":
      await removeContact(id);
      break;
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;
    case "get":
      await getContactById(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
