var express = require("express");
var router = express.Router();
const todoController = require("../controller/todo");
/**
 * To-do get APIs
 */
router.get("/read", todoController.readTodoList);

/**
 * To-do post APIs
 */
router.post("/create", todoController.createTodoList);

/**
 * To-Do put APIs
 */
router.put("/update", todoController.updateTodoList);

/**
 * TO-DO delete APIs
 */

router.delete("/delete", todoController.deleteTodoList);

module.exports = router;
