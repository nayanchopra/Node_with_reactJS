//Required Keys for application
const keys = require("./config/keys");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");

//Here we are initializing an express server
const app = express();
const mongoose = require('mongoose');
//Connecting to mongoDB Instance
mongoose.connect(keys.MongoDBURI);

require('./models/Users')
require('./services/passport');

app.use(
    cookieSession({
        maxAge : 30 * 24 * 60 * 60 * 1000,
        keys : [keys.cookieKey]
    })
)
app.use(
    passport.initialize()
);
app.use(
    passport.session()
);

const authRoutes = require('./routes/authRoutes');

authRoutes(app);

//Dynamically changing port between Prod and Dev Environment
const PORT = process.env.PORT || 5000;
app.listen(PORT);
