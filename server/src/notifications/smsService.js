import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendSMS = (to, body) => {
  client.messages
    .create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(error));
};

export default sendSMS;
