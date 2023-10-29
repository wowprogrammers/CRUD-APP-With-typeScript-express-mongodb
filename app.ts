import express, {Application } from "express";
const app : Application = express();
import * as dotenv from 'dotenv';
import winston from "./utils/logger";
dotenv.config();

import './db/conn'
 

app.use(express.json()); 

// Importing route

import { tourRoute } from "./routes/tourRoute";

app.use((req, res, next) => {
    winston.info(`${req.method} ${req.url}`);
    next();
  });
app.use('/api/v1/tours',tourRoute);




const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on the ${port}`);
})