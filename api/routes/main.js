const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const todoController = require("../controller/todo");

router.get("/todos/:userId", todoController.retrieveTasks);
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/todo", todoController.createTodo);
router.put("/completed", todoController.updateComplete);
router.delete("/todos/:userId", todoController.deleteTodo);

module.exports = router;
