const express = require('express'),
    mongoose = require('mongoose'),
    keys = require('./config/keys'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    bodyParser = require('body-parser');

//models
require('./models/User');

// passport config
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 100,
    keys: [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/authRoute')(app);
require('./routes/billingRoute')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})