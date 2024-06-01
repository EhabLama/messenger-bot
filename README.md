# Messenger Bot

This project is a Facebook Messenger Bot developed using Node.js. The bot interacts with users through a Facebook Page and responds to specific commands related to product information. This project showcases integration with various technologies such as MySQL, Sendinblue, and Ngrok.

## Features

- **Greeting Message**: Sends a random greeting message when a user messages the page for the first time.
- **Product Queries**: Responds to product queries such as description, price, and shipping fee.
- **Email Notifications**: Sends email notifications when a user attempts to buy a product.
- **Commands**:
  - `/desc [SKU]` - Get product description
  - `/price [SKU]` - Get product price
  - `/shipping [SKU]` - Get shipping information
  - `/buy [SKU]` - Buy a product
- **Help Command**: Provides a list of available commands and a link to view all products.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js
- MySQL
- Ngrok
- Sendinblue account
- Facebook Developer account

### Setup

1. **Clone the repository:**
    git clone https://github.com/EhabLama/messenger-bot.git
    cd messenger-bot

2. **Install dependencies:**
    npm install

3. **Set up MySQL database:**
    - Create a database named `productDB`.
    - Run the following commands to create the `products` table:

      CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sku INT NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50),
        price DECIMAL(10, 2),
        upc VARCHAR(50),
        category JSON,
        shipping DECIMAL(10, 2),
        description TEXT,
        manufacturer VARCHAR(100),
        model VARCHAR(50),
        url VARCHAR(255),
        image VARCHAR(255)
      );


4. **Populate the database:**
    - Run the script to load products into the database:
      node src/scripts/loadProducts.js

5. **Set up Sendinblue:**
    - Create an account on [Sendinblue](https://www.sendinblue.com/).
    - Verify the sender email address.
    - Get your API key from the Sendinblue dashboard.

6. **Create a Facebook Page and App:**
    - Go to [Facebook Developer](https://developers.facebook.com/) and create a new app.
    - Add the Messenger product to your app.
    - Create a Facebook Page if you don't have one already.
    - Generate a Page Access Token for your Facebook Page.

7. **Configure environment variables:**
    - Create a `.env` file in the root directory and add the following variables:

      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=your_database_password
      DB_NAME=productDB
      VERIFY_TOKEN=your_verify_token
      PAGE_ACCESS_TOKEN=your_page_access_token
      SENDINBLUE_API_KEY=your_sendinblue_api_key
      SENDINBLUE_FROM_EMAIL=your_from_email
      SENDINBLUE_TO_EMAIL=your_to_email


8. **Run Ngrok to expose your local server:**
    ngrok http 3000

    - Copy the forwarding URL provided by Ngrok.

9. **Set up Facebook Webhook:**
    - In the Facebook Developer dashboard, under Messenger settings, set the callback URL to the Ngrok forwarding URL followed by `/webhook` (e.g., `https://<ngrok-id>.ngrok-free.app/webhook`).
    - Set the verify token to the `VERIFY_TOKEN` you defined in the `.env` file.

10. **Start the server:**
    node index.js