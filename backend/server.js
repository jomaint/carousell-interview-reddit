'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(__dirname + '/../frontend/static/', { maxage: '8h'}));
app.use('/dist', express.static(__dirname + '/../frontend/dist/', { maxage: '8h'}));

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/../frontend/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
