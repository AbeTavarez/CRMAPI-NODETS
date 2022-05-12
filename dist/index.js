"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const crmRoutes_1 = require("./src/routes/crmRoutes");
const createMessage_1 = require("./src/controllers/createMessage");
const settings_1 = require("./settings");
const app = express();
let messages = new createMessage_1.default(settings_1.Settings.PORT);
const dbConnection = (user, password) => {
    return `mongodb://${user}:${password}@listingsexpressapp.vvkf8.mongodb.net/nodetypescript?retryWrites=true&w=majority`;
};
const db = dbConnection(settings_1.Settings.mongoUser, settings_1.Settings.mongoPass);
// mongoose connection
// mongoose.Promise = global.Promise;
mongoose.connect(db, {
    useMongoClient: true
});
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
