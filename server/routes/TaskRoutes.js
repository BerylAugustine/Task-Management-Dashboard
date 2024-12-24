const express = require("express");
const router = express.Router();
const TaskModel = require("../models/TaskModel.js");
const { FetchAlltask, FetchSingletask, Createtask, Updatetask, Deletetask } = require("../Controllers/TaskController.js");

const app = express();
app.use(express.json())

router.get('/fetch', FetchAlltask)
router.get('/fetch/:id', FetchSingletask)
router.post('/create', Createtask)
router.post('/update/:id', Updatetask)
router.delete('/delete/:id', Deletetask)
module.exports = router;
