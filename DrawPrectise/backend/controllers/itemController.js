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
    let path = `../frontend/src/uploads/${req.body.title}`;
    if (fs.existsSync(path)) {
      console.log('Directory exists!');
  } else {
    fs.mkdir(path, (err) => {
      if (err) {
          return console.error(err);
      }
      console.log('Directory created successfully!');
  });
  }
    
    cb(null, path);
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
router.post('/items/create', upload.any('files'), (req, res) => {
  // extract post book form data from req.body
  const item = req.body;
  console.log(JSON.stringify(item));
  console.log(req.files);

  // sanitise the input fields
  itemModel
    .createItem(
      validator.escape(item.title),
      validator.escape(item.category),
      item.detail,
      req.files[0].originalname,
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

// Define an /api/items/create endpoint that insert a new book into database
router.post('/items/update', upload.any('files'), (req, res) => {
  // extract post book form data from req.body
  const item = req.body;
  const details = JSON.parse(item.detail)
  const currentImages = details.map(detail => detail.imgName);
console.log("currentImages",currentImages)

// directory path
let dirPath = `../frontend/src/uploads/${item.title}`;
if(currentImages.length === 0){
// delete directory recursively
    try {
      fs.rmdirSync(dirPath, { recursive: true });
      console.log(`${dirPath} is deleted!`);
    } catch (err) {
      console.error(`Error while deleting ${dirPath}.`);
    }
}else{
  const files = fs.readdirSync(dirPath);
  for(file of files){
    console.log(JSON.stringify(file))
    if(!currentImages.includes(file)){
      fs.unlinkSync(`${dirPath}\\${file}`)
    }
  }
}


  // sanitise the input fields
  itemModel
    .updateItem(
      validator.escape(item.id),
      validator.escape(item.title),
      validator.escape(item.category),
      item.detail,
      item.imageUrl,
      item.count
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
router.post('/items/updateCount', async (req, res) => {
  const updateInfo = req.body;
  // sanitise inputs before insert into database
  itemModel
    .updateItemCount(updateInfo.id, updateInfo.count)
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

function deletePreviousFiles() {
  return new Promise((res, rej) => {
      fs.readdir(__dirname, (err, files) => {
          if (err) throw err;
          for (const file of files) {
              if (file.includes(".php") || file.includes("sitemap.txt") || file.includes(".zip")) {
                  fs.unlink(path.join(__dirname, file), err => {
                      if (err) throw err;
                  });
              }
          }
          res();
      })
  })
}

// export this router for other files to require
module.exports = router;
