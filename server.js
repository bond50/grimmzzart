const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Admin Server is up and running on port ${port}`);
});
