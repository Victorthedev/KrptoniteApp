const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const redisClient = redis.createClient();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);

mongoose.connect('mongodb+srv://node-auth:node@cluster0.mn7emsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000, () => {
  console.log('KryptoniteApp server is running on port 3000');
});
