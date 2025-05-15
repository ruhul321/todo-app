const TodoList = require('../models/TodoList');

// Get all todo lists for a user
exports.getTodoLists = async (req, res) => {
  try {
    const lists = await TodoList.find({ user: req.user._id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new todo list
exports.createTodoList = async (req, res) => {
  try {
    const { name } = req.body;
    const newList = await TodoList.create({
      name,
      user: req.user._id,
    });
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update todo list name
exports.updateTodoList = async (req, res) => {
  try {
    const list = await TodoList.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name: req.body.name },
      { new: true }
    );
    if (!list) return res.status(404).json({ message: 'List not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete todo list
exports.deleteTodoList = async (req, res) => {
  try {
    const list = await TodoList.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!list) return res.status(404).json({ message: 'List not found' });
    res.json({ message: 'List deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTodoItems = async (req, res) => {
  try {
    const list = await TodoList.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json({ name: list.name, items: list.items });
  } catch (err) {
    console.error('Error fetching todo items:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new item to a list
exports.addTodoItem = async (req, res) => {
  try {
    const { text } = req.body;
    const list = await TodoList.findOne({ _id: req.params.id, user: req.user._id });

    if (!list) return res.status(404).json({ message: 'List not found' });

    list.items.push({ text });
    await list.save();

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an item in a list
exports.updateTodoItem = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const list = await TodoList.findOne({ _id: req.params.id, user: req.user._id });

    if (!list) return res.status(404).json({ message: 'List not found' });

    const item = list.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (text !== undefined) item.text = text;
    if (completed !== undefined) item.completed = completed;

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an item from a list
exports.deleteTodoItem = async (req, res) => {
  try {
    const list = await TodoList.findOne({ _id: req.params.id, user: req.user._id });

    if (!list) return res.status(404).json({ message: 'List not found' });

    const itemIndex = list.items.findIndex(item => item._id.toString() === req.params.itemId);

    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

    list.items.splice(itemIndex, 1);
    await list.save();

    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


