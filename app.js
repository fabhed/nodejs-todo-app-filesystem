const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
