const express = require('express');
const path = require('path');
const helmet = require('helmet')
const limiter = require('./middleware/rateLimit-config')

const userRoutes = require('./routes/user');
const topicRoutes = require('./routes/topic');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/topics', topicRoutes);

module.exports = app;
