'use strict';

// Init
const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const TopicRoute = require('./routes/TopicRoute');

// App Settings
app.use(bodyParser.json());


// Serve Statics
app.use('/static', express.static(__dirname + '/../frontend/static/', { maxage: '8h'}));
app.use('/dist', express.static(__dirname + '/../frontend/dist/', { maxage: '8h'}));

// ===== router to handle api routes ===== //
app.use('/api',  router);
TopicRoute(router);

// Server index.html regardless of path
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/../frontend/index.html'));
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
