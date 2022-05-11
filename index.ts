import * as express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT: number = 3000;
const mongoUser: string = 'abe-dev';
const mongoPass: string = 'abe123'

const dbConnection = (user: string, password: string): string => {
  return `mongodb://${user}:${password}@listingsexpressapp.vvkf8.mongodb.net/nodetypescript?retryWrites=true&w=majority`
}
const db = dbConnection(mongoUser, mongoPass)

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
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
