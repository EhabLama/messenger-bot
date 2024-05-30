const request = require('request');
require('dotenv').config();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

exports.verifyWebhook = (req, res) => {
  console.log('Received GET /webhook');
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
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
      console.log(webhook_event);

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
    response = {
      "text": `You sent the message: "${received_message.text}". Now, I can process it.`
    };
  }

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
