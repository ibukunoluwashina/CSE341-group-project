const express = require('express');
const bodyParser = require('body-parser');
require('./data/database'); 
const app = express();
require('dotenv').config()
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


const port = process.env.PORT || 3500;


app
    .use(bodyParser.json())
    .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  // this is the basic express session({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to use express "express-session".
  .use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Acess-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next()
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({origin: "*"}))
  .use('/', require('./routes/index.js'));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, done){
    // User.findOrCreate({githubId: profile.id}, function(err, user){
      return done(null, profile);
    // })
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  

  app.get('/', (req, res) => {
    console.log("Session information:", req.session);
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
  });
  

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: false
}), (req, res) => {
  console.log("User authenticated:", req.user);
  req.session.user = req.user;
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Connected to server on port ${port}`);
});