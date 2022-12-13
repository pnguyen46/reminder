const Todo = require("../models/Todo");

module.exports = {
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
};
