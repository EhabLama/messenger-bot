const fs = require('fs');
const path = require('path');
const pool = require('../database/db');

const filePath = path.join(__dirname, '../utils/products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

products.forEach(product => {
    const { sku, name, type, price, upc, category, shipping, description, manufacturer, model, url, image } = product;
  
    const shippingValue = (shipping === '' || shipping === null || shipping === undefined) ? 0 : shipping;
  
    pool.query(
      'INSERT INTO products (sku, name, type, price, upc, category, shipping, description, manufacturer, model, url, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [sku, name, type, price, upc, JSON.stringify(category), shippingValue, description, manufacturer, model, url, image],
      (error, results) => {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            console.log(`Duplicate entry for sku: ${sku}. Skipping.`);
          } else {
            console.error('Error inserting product:', error);
          }
        } else {
          console.log('Product inserted:', results.insertId);
        }
      }
    );
  });
