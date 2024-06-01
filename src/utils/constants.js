module.exports = {
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
  HELP_MESSAGE:
    "You can use the following commands:\n/desc [SKU] - Get product description\n/price [SKU] - Get product price\n/shipping [SKU] - Get shipping information\n/buy [SKU] - Buy a product\nGo to this link to see the full list of products and information: https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json",
  GENERIC_RESPONSE:
    "Please use one of the following commands for a result:\n/desc [SKU]\n/price [SKU]\n/shipping [SKU]\n/buy [SKU]\n/help",
  GREETINGS: ["Hello!", "Hi there!", "Greetings!", "Hey!", "Howdy!"],
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  MAILGUN_FROM_EMAIL: process.env.MAILGUN_FROM_EMAIL,
  MAILGUN_TO_EMAIL: process.env.MAILGUN_TO_EMAIL
};
