const express = require('express');
const validator = require('validator');
const multer = require('multer');
const fs = require('fs');

// create a router so that we can define API routes in this file
const router = express.Router();
// Acess the items model so that we can access item data in this file
const itemModel = require('../models/itemModel');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `../frontend/src/uploads/${title}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define a /api/items endpoint that responds with an array of all items
router.get('/items', async (req, res) => {
  let results;
  try {
    results = await itemModel.getAllItems();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json('query error');
  }
});

// Define an /api/items/:id endpoint that responds with a specific book by id
router.get('/items/:id', (req, res) => {
  const { id } = req.params;
  itemModel
    .getItemById(id)
    .then((results) => {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json('failed to find item by id'); // not found 404 status code
      }
    })
    .catch((error) => {
      // log sql errors to node console
      console.log(error);
      res.status(500).json('query error'); //Server error 500 status code
    });
});

// Define an /api/items/create endpoint that insert a new book into database
router.post('/items/create', upload.single('coverImagePath'), (req, res) => {
  // extract post book form data from req.body
  const item = req.body;
  console.log(JSON.stringify(item));
  console.log(req.file);

  // sanitise the input fields
  itemModel
    .createItem(
      validator.escape(item.title),
      validator.escape(item.category),
      validator.escape(item.detail),
      req.file.originalname,
      0
    )
    .then((result) => {
      res.status(200).json('item created with id' + result.insertId);
    })
    // if there's an error, error code 500 and message will be returned
    .catch((error) => {
      console.log(error);
      res.status(500).json('query error - failed to create item');
    });
});

// Define an /api/items/update endpoint that updates an existing book
router.post('/items/update', async (req, res) => {
  const updateInfo = req.body;
  // sanitise inputs before insert into database
  itemModel
    .updateItem(updateInfo.id, updateInfo.count)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json('item updated');
      } else {
        res.status(404).json('item not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('failed to update item - query error');
    });
});

router.post('/items/delete', (req, res) => {
  const { id } = req.body;
  //   ask the model to delete item by id
  itemModel
    .deleteItem(id)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json('item deleted');
      } else {
        res.status(404).json('item not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('failed to delete item - query error');
    });
});

var download = function (img, filename) {
  var data = img.replace(/^data:image\/\w+;base64,/, '');
  var buf = Buffer.from(data, 'base64');
  fs.writeFile(`./uploads/${filename}`, buf);
};

// export this router for other files to require
module.exports = router;
