require('./config/config.js');
require('./db/mongoose');

const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors({ exposedHeaders: ['Content-Type', 'x-auth'] }));

require('./routes/employees')(app);
require('./routes/users')(app);

app.listen(process.env.PORT, () => console.log(`Started on port ${process.env.PORT}`));

module.exports = { app };
