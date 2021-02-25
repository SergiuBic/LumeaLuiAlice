const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');
const app = express();

if (process.env.NODE_ENV == 'development')
{require('dotenv').config({ silent: true });}


app.use(serveStatic(path.join(__dirname, '/dist'))); // it was / before
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });
const port = process.env.PORT || 8080;
app.listen(port);