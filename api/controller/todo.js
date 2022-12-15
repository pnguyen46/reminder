const Todo = require("../models/Todo");

module.exports = {
  retrieveTasks: async (req, res) => {
    const { userId: user } = req.params;
    try {
      const tasks = await Todo.find({ user });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
    }
  },
  createTodo: async (req, res) => {
    const { user, text } = req.body;
    try {
      const todo = await Todo.create({
        user,
        text,
      });
      console.log("Todo has been added!");
      res.status(200).json(todo);
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: async (req, res) => {
    const { id, text } = req.body;
    try {
      const updatedTask = await Todo.findByIdAndUpdate(
        id,
        { $set: { text } },
        { returnDocument: "after" }
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
    }
  },
  updateComplete: async (req, res) => {
    const { id, complete } = req.body;
    try {
      const updatedTask = await Todo.findByIdAndUpdate(
        id,
        { $set: { completed: complete } },
        { returnDocument: "after" }
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
    }
  },
  deleteTodo: async (req, res) => {
    const { userId: id } = req.params;
    try {
      await Todo.findByIdAndDelete(id);
      console.log("Todo has been deleted!");
      res.status(200).json("todo deleted!");
    } catch (error) {
      console.error(error);
    }
  },
};
