import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import messenger from './src/controllers/createMessage';
import { Settings } from './settings'

const app = express();

let messages = new messenger(Settings.PORT)

const dbConnection = (user: string, password: string): string => {
  return `mongodb://${user}:${password}@listingsexpressapp.vvkf8.mongodb.net/nodetypescript?retryWrites=true&w=majority`
}
const db = dbConnection(Settings.mongoUser, Settings.mongoPass)

// mongoose connection
// mongoose.Promise = global.Promise;
mongoose.connect(
  db,
  {
    useMongoClient: true
  }
);

app.use(express.json());

routes(app);

// ========================   Interface
// allows you to build your own 'type'
// new type Name
interface Name {
  firstName: string
}
// now we can set our params to expect a type of Name type
const nameCreator = (name: Name): string => {
  return `Hello, ${name.firstName}`
}

let myName = { firstName: 'Abe' }

// ======================== Generics
// you can create functions and leave the type annotation open to when you use the function
function messageCreator<T>(name: T): T {
  return name
}
// now use the function with any type
//string
let newMessage = messageCreator<string>('Hey, server is up!')
console.log(newMessage);
// number
let newNumberMessage = messageCreator<number>(333)
console.log(newNumberMessage);


// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.send(messages.messagePrint())
);

app.listen(Settings.PORT, () => console.log(nameCreator(myName), messages.messagePrint())
);
