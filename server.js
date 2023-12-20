const express = require('express');
const dotenv = require('dotenv');

const connectToDB = require('./configs/db');
const userRouter = require('./routes/user');

const errorHandler = require('./middlewares/error');
const setHeader = require('./middlewares/header');

dotenv.config({path: './configs/config.env'});
connectToDB();

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(setHeader);

app.use('/api/user/', userRouter);

app.use(errorHandler);

app.listen(process.env.PORT, err =>{
    if(err) console.log(err);
    else console.log(`server is running on Port ${process.env.PORT}`)
}); 