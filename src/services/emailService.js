const SibApiV3Sdk = require('sib-api-v3-sdk');
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmailNotification = (product, sender_psid) => {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

    const senderEmail = process.env.SENDINBLUE_FROM_EMAIL;
    const recipientEmail = process.env.SENDINBLUE_TO_EMAIL;

    console.log(`Sending email from ${senderEmail} to ${recipientEmail}`);

    const emailDetails = {
        to: [{ email: recipientEmail }],
        sender: { email: senderEmail, name: 'Messenger Bot' },
        subject: `Purchase of ${product.name}`,
        textContent: `
        Product Name: ${product.name}
        Description: ${product.description}
        Price: ${product.price}
        Shipping: ${product.shipping}
        `,
    };

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    Object.keys(emailDetails).forEach(key => {
        sendSmtpEmail[key] = emailDetails[key];
    });

    apiInstance.sendTransacEmail(sendSmtpEmail).then(data => {
        console.log('Email sent successfully: ' + JSON.stringify(data));
    }).catch(error => {
        console.error('Error sending email:', error);
        if (error.response && error.response.body) {
            console.error('Error details:', error.response.body);
        }
    });
};

module.exports = { sendEmailNotification };
