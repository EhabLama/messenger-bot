const request = require('request');
const { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = require('../utils/constants');
const { getRandomGreeting } = require('../services/greetingService');
const { getProductBySku } = require('../services/productService');
const { sendEmailNotification } = require('../services/emailService');
const pool = require('../database/db');

exports.verifyWebhook = (req, res) => {
  console.log('Received GET /webhook');

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      console.log('Verification failed');
      res.sendStatus(403);
    }
  } else {
    console.log('Bad request');
    res.sendStatus(400);
  }
};

exports.handleWebhook = (req, res) => {
  console.log('Received POST /webhook');
  let body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};

function handleMessage(sender_psid, received_message) {
  let response;

  if (received_message.text) {
    const messageText = received_message.text.toLowerCase();

    if (messageText.startsWith('/desc')) {
      const sku = parseInt(messageText.split(' ')[1]);
      getProductBySku(sku, (error, product) => {
        if (error) {
          response = { "text": "An error occurred while fetching the product information." };
        } else if (product) {
          response = { "text": product.description };
        } else {
          response = { "text": "Sorry, I couldn't find that product." };
        }
        callSendAPI(sender_psid, response);
      });
    } else if (messageText.startsWith('/price')) {
      const sku = parseInt(messageText.split(' ')[1]);
      getProductBySku(sku, (error, product) => {
        if (error) {
          response = { "text": "An error occurred while fetching the product information." };
        } else if (product) {
          response = { "text": product.price.toString() };
        } else {
          response = { "text": "Sorry, I couldn't find that product." };
        }
        callSendAPI(sender_psid, response);
      });
    } else if (messageText.startsWith('/shipping')) {
      const sku = parseInt(messageText.split(' ')[1]);
      getProductBySku(sku, (error, product) => {
        if (error) {
          response = { "text": "An error occurred while fetching the product information." };
        } else if (product) {
          response = { "text": product.shipping.toString() };
        } else {
          response = { "text": "Sorry, I couldn't find that product." };
        }
        callSendAPI(sender_psid, response);
      });
    } else if (messageText.startsWith('/buy')) {
      const sku = parseInt(messageText.split(' ')[1]);
      getProductBySku(sku, (error, product) => {
        if (error) {
          response = { "text": "An error occurred while processing your purchase." };
        } else if (product) {
          sendEmailNotification(sender_psid, sku);
          response = { "text": `Thank you for your purchase of ${product.name}. You will receive an email confirmation shortly.` };
          logPurchase(sender_psid, sku);
        } else {
          response = { "text": "Sorry, I couldn't find that product." };
        }
        callSendAPI(sender_psid, response);
      });
    } else {
      response = { "text": `${getRandomGreeting()} You sent the message: "${received_message.text}". Now, I can process it.` };
      callSendAPI(sender_psid, response);
    }
  }
}

function logPurchase(sender_psid, sku) {
  pool.query('INSERT INTO purchases (sender_psid, sku) VALUES (?, ?)', [sender_psid, sku], (error, results) => {
    if (error) {
      console.error('Error logging purchase:', error);
    } else {
      console.log('Purchase logged successfully:', results);
    }
  });
}

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
