require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scheduleCalls = require('./twilio/callScheduler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));
app.use('/api/customers', require('./routes/customers'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
  scheduleCalls();
}).catch(err => console.error(err));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
