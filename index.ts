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
mongoose.connect(
  db,
  {
    useMongoClient: true
  }
);

app.use(express.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.send(messages.messagePrint())
);

app.listen(Settings.PORT, () => console.log(messages.messagePrint())
);
