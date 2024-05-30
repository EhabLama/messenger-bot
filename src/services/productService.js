const pool = require('../database/db');

const getProductBySku = (sku, callback) => {
    pool.query('SELECT * FROM products WHERE sku = ?', [sku], (error, results) => {
      if (error) {
        return callback(error);
      }
      callback(null, results[0]);
    });
  };
  
  module.exports = {
    getProductBySku
  };