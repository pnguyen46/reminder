const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const todoController = require("../controller/todo");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/todo", todoController.createTodo);
module.exports = router;
