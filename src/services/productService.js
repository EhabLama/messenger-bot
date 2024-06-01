const pool = require('../database/db');
const { sendEmailNotification } = require('../services/emailService');
const request = require('request');
const { PAGE_ACCESS_TOKEN } = require('../utils/constants');

const getProductBySku = (sku, callback) => {
  pool.query('SELECT * FROM products WHERE sku = ?', [sku], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      callback(error, null);
    } else if (results.length > 0) {
      callback(null, results[0]);
    } else {
      callback(null, null);
    }
  });
};

const handleDescCommand = (sender_psid, messageText) => {
  const sku = parseInt(messageText.split(' ')[1]);
  getProductBySku(sku, (error, product) => {
    let response;
    if (error) {
      response = { "text": "An error occurred while fetching the product information." };
    } else if (product) {
      response = { "text": product.description };
    } else {
      response = { "text": "Sorry, I couldn't find that product." };
    }
    callSendAPI(sender_psid, response);
  });
};

const handlePriceCommand = (sender_psid, messageText) => {
  const sku = parseInt(messageText.split(' ')[1]);
  getProductBySku(sku, (error, product) => {
    let response;
    if (error) {
      response = { "text": "An error occurred while fetching the product information." };
    } else if (product) {
      response = { "text": product.price.toString() };
    } else {
      response = { "text": "Sorry, I couldn't find that product." };
    }
    callSendAPI(sender_psid, response);
  });
};

const handleShippingCommand = (sender_psid, messageText) => {
  const sku = parseInt(messageText.split(' ')[1]);
  getProductBySku(sku, (error, product) => {
    let response;
    if (error) {
      response = { "text": "An error occurred while fetching the product information." };
    } else if (product) {
      response = { "text": product.shipping.toString() };
    } else {
      response = { "text": "Sorry, I couldn't find that product." };
    }
    callSendAPI(sender_psid, response);
  });
};

const handleBuyCommand = (sender_psid, messageText) => {
  const sku = parseInt(messageText.split(' ')[1]);
  getProductBySku(sku, (error, product) => {
    let response;
    if (error) {
      response = { "text": "An error occurred while processing your purchase." };
    } else if (product) {
      sendEmailNotification(product, sender_psid);
      response = { "text": `Thank you for your purchase of ${product.name}. An email notification has been sent to us to start shipping your order!` };
    } else {
      response = { "text": "Sorry, I couldn't find that product." };
    }
    callSendAPI(sender_psid, response);
  });
};

function callSendAPI(sender_psid, response) {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  };

  request({
    "uri": "https://graph.facebook.com/v12.0/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!');
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports = {
  getProductBySku,
  handleDescCommand,
  handlePriceCommand,
  handleShippingCommand,
  handleBuyCommand
};
