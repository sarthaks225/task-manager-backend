const { Task } = require("../models");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title, user_id: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Status validation
    const allowed = ["To Do", "In Progress", "Done"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.status = status;
    task.title = req.body.title || task.title; // Allow title update
    task.updated_at = new Date(); // Update timestamp
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchTasks = async (req, res) => {
  try {
    const { status, title } = req.query;
    const where = { user_id: req.user.id };
    if (status) where.status = status;
    if (title) where.title = { [require("sequelize").Op.like]: `%${title}%` };
    console.log("Where clause:", where);

    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
