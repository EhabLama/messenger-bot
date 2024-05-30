# Messenger-Bot

## Overview
This messenger-bot AKA Chatty McBotFace is a backend service for a Facebook Messenger Bot. This bot connects with a Facebook Page to process incoming messages, send random greetings, resolve product queries, send email notifications for purchase attempts, and handle high volume write operations in RDS MySQL databases.

## Features
- **Greeting Message**: Sends a random greeting when a user messages the page for the first time.
- **Query Resolving**: Responds to product queries (description, price, shipping fee) based on message format (e.g., `/desc product-xyz`).
- **Notification**: Sends email notifications when a user attempts to buy a product.
- **High Volume Write Handling**: Efficiently manages high volume write operations in RDS MySQL databases.

## Technologies Used
- **Node.js**
- **Express.js**
- **Body-Parser**
- **Request**
- **Ngrok**
- **Sendgrid API**
- **Database Options**: MySQL, SQLite, MongoDB, Redis

## Usage
- **Greeting Message**: When a user messages your Facebook page for the first time, they will receive a random greeting.
- **Query Resolving**: Users can send queries in the format `/desc product-xyz`, and the bot will respond with the relevant product information.
- **Notification**: When a user attempts to buy a product, an email notification will be sent to the configured email address.
- **High Volume Write Handling**: The bot efficiently manages high volume write operations in the database.

## Contributing
Contributions are welcome! Please fork this repository and submit pull requests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or issues, please contact:
- **Name**: EhabAlama
- **Email**: EhabAlama@outlook.com
