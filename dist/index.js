"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const dbConfig_1 = require("./dbConfig");
const crmRoutes_1 = require("./src/routes/crmRoutes");
const createMessage_1 = require("./src/controllers/createMessage");
const settings_1 = require("./settings");
const app = express();
(0, dbConfig_1.dbConnect)();
let messages = new createMessage_1.default(settings_1.Settings.PORT);
// mongoose connection
// mongoose.Promise = global.Promise;
app.use(express.json());
(0, crmRoutes_1.default)(app);
// now we can set our params to expect a type of Name type
const nameCreator = (name) => {
    return `Hello, ${name.firstName}`;
};
let myName = { firstName: 'Abe' };
// ======================== Generics
// you can create functions and leave the type annotation open to when you use the function
function messageCreator(name) {
    return name;
}
// now use the function with any type
//string
let newMessage = messageCreator('Hey, server is up!');
console.log(newMessage);
// number
let newNumberMessage = messageCreator(333);
console.log(newNumberMessage);
// serving static files
app.use(express.static('public'));
app.get('/', (req, res) => res.send(messages.messagePrint()));
app.listen(settings_1.Settings.PORT, () => console.log(nameCreator(myName), messages.messagePrint()));
