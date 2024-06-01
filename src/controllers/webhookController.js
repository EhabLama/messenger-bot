const { VERIFY_TOKEN, GENERIC_RESPONSE, PAGE_ACCESS_TOKEN } = require('../utils/constants');
const { getRandomGreeting } = require('../services/greetingService');
const { getHelpMessage } = require('../services/helpService');
const {
  handleDescCommand,
  handlePriceCommand,
  handleShippingCommand,
  handleBuyCommand,
} = require('../services/productService');
const request = require('request');

let userSessions = {};

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

      if (!userSessions[sender_psid]) {
        userSessions[sender_psid] = { firstMessage: true };
      }

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
  
      if (userSessions[sender_psid].firstMessage) {
        userSessions[sender_psid].firstMessage = false;
        response = {
          "text": `${getRandomGreeting()} Use the /help command to see what I can do for you.`
        };
        callSendAPI(sender_psid, response);
      } else if (messageText.startsWith('/help')) {
        handleHelpCommand(sender_psid);
      } else if (messageText.startsWith('/desc')) {
        handleDescCommand(sender_psid, messageText);
      } else if (messageText.startsWith('/price')) {
        handlePriceCommand(sender_psid, messageText);
      } else if (messageText.startsWith('/shipping')) {
        handleShippingCommand(sender_psid, messageText);
      } else if (messageText.startsWith('/buy')) {
        handleBuyCommand(sender_psid, messageText);
      } else {
        response = { "text": GENERIC_RESPONSE };
        callSendAPI(sender_psid, response);
      }
    }
  }

function handleHelpCommand(sender_psid) {
  const response = { "text": getHelpMessage() };
  callSendAPI(sender_psid, response);
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
