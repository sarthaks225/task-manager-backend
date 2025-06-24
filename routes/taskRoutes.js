const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
} = require("../controllers/taskController");

router.get("/tasks", auth, getTasks);
router.post("/tasks", auth, createTask);
router.put("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);
router.get("/tasks/search", auth, searchTasks);

module.exports = router;
