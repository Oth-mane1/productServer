// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors'
import appRouter from "./routes/index.js";
import { dbUrl, dbConfig } from './dbConfig.js';

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors({
  origin: "http://localhost:4200"
}));

app.use('/', appRouter);

// set up mongoose
mongoose.connect(dbUrl, dbConfig)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
  });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default app