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
mongoose.connect(db, {
    useMongoClient: true
});
app.use(express.json());
(0, crmRoutes_1.default)(app);
// serving static files
app.use(express.static('public'));
app.get('/', (req, res) => res.send(messages.messagePrint()));
app.listen(settings_1.Settings.PORT, () => console.log(messages.messagePrint()));
