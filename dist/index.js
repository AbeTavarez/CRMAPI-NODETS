"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const crmRoutes_1 = require("./src/routes/crmRoutes");
const app = express();
const PORT = 3000;
// mongoose connection
mongoose.connect('mongodb://abe-dev:abe123@listingsexpressapp.vvkf8.mongodb.net/nodetypescript?retryWrites=true&w=majority', {
    useMongoClient: true
});
app.use(express.json());
(0, crmRoutes_1.default)(app);
// serving static files
app.use(express.static('public'));
app.get('/', (req, res) => res.send(`Node and express server is running on port ${PORT}`));
app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
