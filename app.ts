import express, {Application } from "express";
const app : Application = express();
import dotenv from 'dotenv';
import './db/conn'
dotenv.config();
 

app.use(express.json()); 

// Importing route

import { tourRoute } from "./routes/tourRoute";

app.use('/api/v1/tours',tourRoute);




const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on the ${port}`);
})