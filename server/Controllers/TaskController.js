const TaskModel = require("../models/TaskModel");

// REGISTER
//POST REGISTER
const FetchAlltask = async (req, res,) => {
    try {
        const task = await TaskModel.find();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get a single post by ID
const FetchSingletask = async (req, res,) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Post not found" })
        }
        res.json(assigns);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Createtask = async (req, res,) => {
    const task = new TaskModel({
        TaskName: req.body.TaskName,
        AboutTask: req.body.AboutTask,
        DueDate: req.body.DueDate,
        StartDate: req.body.StartDate,
        checkVal: req.body.checkVal,
        status: req.body.status,
    });
    try {
        await task.save();
        res.status(201).json(task);
        console.log(task)
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

const Updatetask = async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Post not Found" });
        }
        task.TaskName = req.body.TaskName || task.TaskName;
        task.AboutTask = req.body.AboutTask || task.AboutTask;
        task.checkVal = req.body.checkVal || task.checkVal;
        task.DueDate = req.body.DueDate || task.DueDate;
        task.status = req.body.status || task.status;
        task.StartDate = req.body.StartDate || task.StartDate;

        const updatedTask = await task.save();
        res.json(updatedTask);
        console.log(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: "Error updating task" });
    }
};

//Delete a post
const Deletetask = async (req, res,) => {
    try {
        const task = await TaskModel.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ message: "Post not Found" })
        }
        //await Post.deleteOne({ _id: post._id })
        await TaskModel.findByIdAndDelete(req.params.id)
        res.json({ message: "Post Deleted" })
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: "htfdhgfc" });
    }
}

exports.FetchAlltask = FetchAlltask;
exports.FetchSingletask = FetchSingletask;
exports.Createtask = Createtask;
exports.Updatetask = Updatetask;
exports.Deletetask = Deletetask;

