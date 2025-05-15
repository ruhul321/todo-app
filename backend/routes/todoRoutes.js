const express = require('express');
const router = express.Router();
const {
  getTodoLists,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  getTodoItems
} = require('../controllers/todoController');

const {
  addTodoItem,
  updateTodoItem,
  deleteTodoItem
} = require('../controllers/todoController');

const auth = require('../middleware/authMiddleware');
const { todoListValidation, todoItemValidation, todoItemUpdateValidation } = require('../middleware/validation');

router.use(auth);

router.get('/', getTodoLists);
router.post('/', todoListValidation,createTodoList);
router.put('/:id', todoListValidation, updateTodoList);
router.delete('/:id', deleteTodoList);

router.get('/:id/items', getTodoItems);
router.post('/:id/items', todoItemValidation,addTodoItem);
router.put('/:id/items/:itemId', todoItemUpdateValidation,updateTodoItem);
router.delete('/:id/items/:itemId', deleteTodoItem);

module.exports = router;
