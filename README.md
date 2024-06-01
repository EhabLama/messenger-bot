# Messenger Bot

This is a Node.js-based Facebook Messenger bot for handling various product-related queries. It integrates with a MySQL database and uses Sendinblue for sending email notifications.

## Features

1. **Greeting Message**: Sends a random greeting message when a user messages the page for the first time.
2. **Product Queries**:
   - `/desc [SKU]` - Get product description.
   - `/price [SKU]` - Get product price.
   - `/shipping [SKU]` - Get shipping information.
3. **Purchasing Products**: 
   - `/buy [SKU]` - Sends an email notification with the product details.
4. **Help Command**:
   - `/help` - Lists available commands.
5. **Database Integration**: Fetches product information from a MySQL database.
6. **Email Notifications**: Sends purchase details via Sendinblue.

## Getting Started

### Prerequisites

- Node.js
- MySQL
- Facebook Developer Account
- Ngrok

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/messenger-bot.git
    cd messenger-bot
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your MySQL database and import the products. Modify `loadProducts.js` to match your database settings and run:
    ```sh
    node src/scripts/loadProducts.js
    ```

4. Create a `.env` file in the root directory and configure your environment variables:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=productDB
    VERIFY_TOKEN=your_verify_token
    PAGE_ACCESS_TOKEN=your_page_access_token
    SENDINBLUE_API_KEY=your_sendinblue_api_key
    SENDINBLUE_FROM_EMAIL=your_sender_email
    SENDINBLUE_TO_EMAIL=your_recipient_email
    ```

5. Run Ngrok to expose your local server to the internet:
    ```sh
    ngrok http 3000
    ```

6. Set up your Facebook page webhook with the Ngrok URL and the `/webhook` endpoint:
    - **Callback URL**: `https://<your-ngrok-url>/webhook`
    - **Verify Token**: Use the same token set in your `.env` file (`VERIFY_TOKEN`).

7. Start your server:
    ```sh
    npm start
    ```

### Facebook Page Setup

1. **Create a Facebook Page**: Follow [this guide](https://www.facebook.com/pages/create) to create a new Facebook page.
2. **Create a Facebook App**:
    - Go to the [Facebook Developer Portal](https://developers.facebook.com/) and create a new app.
    - Add the Messenger product to your app.
    - Generate a Page Access Token and subscribe your webhook to the page events.

### Demo

Here are some screenshots demonstrating the bot's functionality:

1. **Facebook Page**:
    ![Facebook Page](static/demo-images/fb_page.png)
    *Description*: A screenshot of the Facebook page that the bot is connected to.

2. **Greeting Message**:
    ![Greeting Message](static/demo-images/messenger_bot_greeting.png)
    *Description*: The bot sends a random greeting message when a user messages the page for the first time.

3. **Help Command**:
    ![Help Command](static/demo-images/messenger_bot_help.png)
    *Description*: The bot responds to the `/help` command, listing all available commands.

4. **Product Queries**:
    ![Product Queries](static/demo-images/messenger_bot_queries.png)
    *Description*: The bot responds to product queries like `/desc`, `/price`, and `/shipping`.

5. **Purchasing Product**:
    ![Purchasing Product](static/demo-images/messenger_bot_purchase.png)
    *Description*: The bot processes purchase commands and sends email notifications.

6. **Email Notification**:
    ![Email Notification](static/demo-images/messenger_bot_email.png)
    *Description*: An example of the email notification sent to the admin when a user makes a purchase.

7. **Terminal Output**:
    ![Terminal Output](static/demo-images/terminal_output.png)
    *Description*: The server logs showing incoming messages and responses.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
