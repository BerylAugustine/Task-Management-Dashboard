
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require("./routes/userRoute");
const AssignRoutes = require("./routes/TaskRoutes");
require("dotenv").config();


// connect to express app
const app = express()

// middleware
app.use(bodyParser.json())
app.use(cors());
app.use("/api", router);
app.use("/api", AssignRoutes);

// connect to mongoDB

mongoose.connect('mongodb://127.0.0.1:27017/TaskDashboard')
    .then(() => {
        app.listen(process.env.PORT);
        console.log(`Server is running in ${process.env.PORT}`);
    })
    .catch((err) => console.log(err));







// const express = require("express");
// const mongoose = require("mongoose");
// const router = require("./routes/userRoute");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cookieParser());
// app.use(express.json());
// app.use("/api", router);

// mongoose.connect('mongodb://127.0.0.1:27017/TaskDashboard')

//     // mongoose
//     //   .connect(
//     //     `mongodb+srv://admin:${process.env.MONGODB_PASSWORORD}@cluster0.hes3x.mongodb.net/auth?retryWrites=true&w=majority`
//     //   )
//     .then(() => {
//         app.listen(process.env.PORT);
//         console.log(`Server is running in ${process.env.PORT}`);
//     })
//     .catch((err) => console.log(err));




// import express from 'express'
// import dotenv from 'dotenv'
// import { UserRouter } from './routes/userRoute.js'
// import cors from 'cors'
// import mongoose from 'mongoose'
// import { AssignRouter } from './routes/AssignRoutes.js'

// dotenv.config()



// const app = express()
// app.use(express.json())
// // app.use(cookieParser());
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     credentials: true
// }))
// app.use('/api', UserRouter)
// app.use('/api/assigns', AssignRouter)

// mongoose.connect('mongodb://127.0.0.1:27017/TaskDashboard')

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running in ${process.env.PORT}`)
// })