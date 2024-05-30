const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Chatty McBotFace Solutions!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});