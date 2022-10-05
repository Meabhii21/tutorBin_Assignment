const jwt = require("jsonwebtoken");
const Todo = require("../model/todo.models");
const createTodoList = async (req, res) => {
  try {
    if (!req.isAuth) {
      return res.json({
        status: 403,
        message: "User is not Authorized. Please provide auth token",
      });
    }
    const task = req.body.list;
    await Todo.create({
      userId: req.userId,
      task: task,
    });
    return res.json({ status: 200, message: "ToDo created successfully" });
  } catch (err) {
    console.log(`[todo.js] createTodoList err:${err}`);
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

const readTodoList = async (req, res) => {
  try {
    if (!req.isAuth) {
      return res.json({
        status: 403,
        message: "User is not Authorized. Please provide auth token",
      });
    }
    console.log("userId", req.userId);
    const userTodoList = await Todo.aggregate([
      { $match: { userId: req.userId } },
      { $sort: { updatedAt: -1 } },
    ]);
    console.log("user to do list", userTodoList);
    if (userTodoList.length > 0) {
      return res.json({
        status: 200,
        message: "User to-do list:",
        data: userTodoList,
      });
    } else {
      return res.json({
        status: 200,
        message: "User to-do list is empty at the moment",
      });
    }
  } catch (err) {
    console.log(`[todo.js] readTodoList err:${err}`);
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

const updateTodoList = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      return res.json({
        status: 403,
        message: "User is not Authorized. Please provide auth token",
      });
    }
    const todo = req.body.todoDetail;
    console.log(todo.id, todo.todo);
    const data = await Todo.findOneAndUpdate(
      { _id: todo.id },
      { $set: { task: todo.todo } },
      { new: true }
    );
    return res.json({
      status: 200,
      message: "To-Do list updated successfully",
    });
  } catch (err) {
    console.log(`[todo.js] updateTodoList err:${err}`);
    return res.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

const deleteTodoList = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      return res.json({
        status: 403,
        message: "User is not Authorized. Please provide auth token",
      });
    }
    const id = req.body.id;
    await Todo.deleteOne({ _id: id });
    return res.json({
      status: 200,
      message: "To-Do list deleted successfully",
    });
  } catch (err) {
    console.log(`[todo.js] deleteTodoList err:${err}`);
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = {
  createTodoList,
  readTodoList,
  updateTodoList,
  deleteTodoList,
};
