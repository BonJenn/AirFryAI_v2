import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';

const uri = "mongodb+srv://BonJenn:oeYEAJUgHSY4KFLH@cluster0.w1tskqr.mongodb.net/Users?retryWrites=true&w=majority";

const app = express();
const client = new MongoClient(uri);

client.connect(err => {
  if (err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
  }
  console.log('Connected...');

  app.get('/data', (req, res) => {
    const collection = client.db("AirFry.AI").collection("Cluster0");
    collection.find({}).toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  });

  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});