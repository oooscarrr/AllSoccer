const mongoose = require('mongoose');
// const URLSlugs = require('mongoose-url-slugs');
const passportLocalMongoose = require('passport-local-mongoose');
require("dotenv").config({ silent: true });


const Player = new mongoose.Schema({
  username: {type: String, required: true},
  salt: String,
  hash: String,
  realname: String,
  team: String,
  isManager: Boolean,
  number: Number,
  goal: Number,
  assist: Number,
}, );

const Team = new mongoose.Schema({
	name: {type: String, required: true},
	manager: {type: String, required: true},
  city: String,
	players: [{type: mongoose.Schema.Types.ObjectId, ref:'Player'}],
  matches: [{type: mongoose.Schema.Types.ObjectId, ref:'Match'}],
	createdAt: String,
  invitations: [String],
  requests: [String],
  history: [Number]
});


const Match = new mongoose.Schema({
  teams: [String],
  date: Date,
  city: String,
  location: String,
  status: {type: Number, required: true}, //0 for upcoming, 1 for playing, 2 for past
  score: [Number]
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
// const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, mongooseOpts, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database'); 
  }
});
