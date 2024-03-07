const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

function invokeAction(action, id, name, email, phone) {
  switch (action) {
    case "list":
      console.table(listContacts());
      break;

    case "get":
      console.table(getContactById(id));
      break;

    case "add":
      addContact(name, email, phone);
      console.log(`Contact ${name} addes.`);
      break;

    case "remove":
      removeContact(id);
      console.log(`Contact with id ${id} removed.`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(action, id, name, email, phone);
