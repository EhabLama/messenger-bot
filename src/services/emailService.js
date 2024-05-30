// // src/services/emailService.js
// const sendgrid = require('@sendgrid/mail');
// const { SENDGRID_API_KEY } = require('../utils/constants');

// sendgrid.setApiKey(SENDGRID_API_KEY);

// const sendEmailNotification = (sender_psid, productId) => {
//   const msg = {
//     to: 'your_email@example.com', // Replace with your email
//     from: 'no-reply@yourdomain.com', // Replace with your verified sender
//     subject: 'New Purchase Order',
//     text: `User with PSID ${sender_psid} has purchased ${productId}.`,
//   };

//   sendgrid.send(msg)
//     .then(() => {
//       console.log('Email sent');
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// module.exports = {
//   sendEmailNotification
// };
