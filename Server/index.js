const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Todo Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
// Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await Todo.create({ title });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
