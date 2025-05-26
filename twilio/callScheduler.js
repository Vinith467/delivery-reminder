const cron = require('node-cron');
const Customer = require('../models/Customer');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendReminderCall = async (customer) => {
  try {
    await client.calls.create({
      twiml: `<Response><Play>${process.env.VOICE_MESSAGE_URL}</Play></Response>`,
      to: customer.phone,
      from: process.env.TWILIO_PHONE_NUMBER
    });
    console.log(`Called ${customer.name} at ${customer.phone}`);
  } catch (error) {
    console.error(`Call failed for ${customer.name}:`, error.message);
  }
};

const scheduleCalls = () => {
 cron.schedule('* * * * *', async () => {
    console.log("📞 Running daily reminder call job...");

    const readyCustomers = await Customer.find({ status: 'Ready' });

    for (let customer of readyCustomers) {
      await sendReminderCall(customer);
      customer.lastCalledAt = new Date();
      await customer.save();
    }
  });
};

module.exports = scheduleCalls;
