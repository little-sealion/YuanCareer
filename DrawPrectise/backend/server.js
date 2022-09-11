const express = require('express');
const cors = require('cors');
const server = express();
const port = 8000;
require('dotenv').config();

server.use(cors());
// introduce middleware to parse json data & web form data & use express-session
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Link up item controller
const itemController = require('./controllers/itemController');
server.use('/api', itemController);

server.listen(port, () => {
  console.log(`Backend is listening on http://localhost: ${port}`);
});
