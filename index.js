const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

const webhookRoutes = require('./src/routes/webhook');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Chatty McBotFace Solutions!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
