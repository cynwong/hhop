// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public/assets'));


// require("./routes/api-routes.js")(app);

<<<<<<< HEAD
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
=======
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
>>>>>>> master
