const fs = require('fs');
const path = require('path');
const todoFilePath = path.join(__dirname, '../data/todos.json');

const readTodosFromFile = () => {
  try {
    const data = fs.readFileSync(todoFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeTodosToFile = (todos) => {
  fs.writeFileSync(todoFilePath, JSON.stringify(todos, null, 2));
};

exports.getAllTodos = (req, res) => {
  const todos = readTodosFromFile();
  res.json(todos);
};

exports.createTodo = (req, res) => {
  const todos = readTodosFromFile();
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  writeTodosToFile(todos);
  res.status(201).json(newTodo);
};

exports.getTodoById = (req, res) => {
  const todos = readTodosFromFile();
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
};

exports.updateTodo = (req, res) => {
  const todos = readTodosFromFile();
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index !== -1) {
    todos[index].title = req.body.title || todos[index].title;
    todos[index].completed = req.body.completed || todos[index].completed;
    writeTodosToFile(todos);
    res.json(todos[index]);
  } else {
    res.status(404).send('Todo not found');
  }
};

exports.deleteTodo = (req, res) => {
  const todos = readTodosFromFile();
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index !== -1) {
    todos.splice(index, 1);
    writeTodosToFile(todos);
    res.status(204).send();
  } else {
    res.status(404).send('Todo not found');
  }
};
