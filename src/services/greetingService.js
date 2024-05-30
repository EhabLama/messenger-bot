const { GREETINGS } = require('../utils/constants');

const getRandomGreeting = () => {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
};

module.exports = {
  getRandomGreeting
};
