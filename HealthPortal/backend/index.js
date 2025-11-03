import express from "express";
import { connectDb } from "./src/configs/dbconfigs.js";

const app = express();
app.use(express.json)




app.listen(7000,()=>{
    connectDb()
});