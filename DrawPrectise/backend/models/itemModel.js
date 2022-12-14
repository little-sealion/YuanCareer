// Access the database connection from databse.js
const db = require('../database.js');

module.exports.getAllItems = async () => {
  return db.query(
    `select Id,Title,Category, Detail, ImageUrl, Count from items`
  );
};

module.exports.getItemById = (id) => {
  return db.query('select * from items where Id = ?', [id]);
};

// Define and export the method to create item
module.exports.createItem = (title, category, detail, imageUrl, count) => {
  // bind parameters, to avoid malicious sql injection
  return db.query(
    'insert into items ( Title,Category, Detail, ImageUrl, Count) values (?,?,?,?,?)',
    [title, category, detail, imageUrl, count]
  );
};

// Define and export the method to update item count
module.exports.updateItemCount = (id, count) => {
  // bind parameters, to avoid malicious sql injection
  return db.query('update items set Count = ? where Id = ?', [count, id]);
};

// Define and export the method to create item
module.exports.updateItem = (id,title, category, detail, imageUrl, count) => {
  // bind parameters, to avoid malicious sql injection
  return db.query(
    'update items set Title = ?,Category = ?, Detail = ?, ImageUrl = ?, Count = ? where Id = ? ',
    [title, category, detail, imageUrl, count,id]
  );
};
// Define and export the method to delete item
module.exports.deleteItem = (itemId) => {
  return db.query('delete from items where Id = ?', [itemId]);
};
