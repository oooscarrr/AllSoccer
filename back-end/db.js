const mongoose = require('mongoose');
// const URLSlugs = require('mongoose-url-slugs');
const passportLocalMongoose = require('passport-local-mongoose');
require("dotenv").config({ silent: true });


const Player = new mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  realname: String,
  team: String,
}, );

const Team = new mongoose.Schema({
	name: {type: String, required: true},
	manager: {type: String, required: true},
	players: [String],
	createdAt: Date
});


const Match = new mongoose.Schema({
  teams: [String],
  dateTime: Date,
  location: String,
  status: {type: String, required: true}
});


Player.plugin(passportLocalMongoose);
// List.plugin(URLSlugs('name'));

mongoose.model('Player', Player);
mongoose.model('Team', Team);
mongoose.model('Match', Match);


const mongooseOpts = {
  useNewUrlParser: true,  
  useUnifiedTopology: true
};

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@allsoccercluster.scscx.mongodb.net/allSoccer?retryWrites=true&w=majority`;
mongoose.connect(dbURI, mongooseOpts, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database'); 
  }
});
