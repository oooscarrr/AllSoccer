const mongoose = require('mongoose');
// const URLSlugs = require('mongoose-url-slugs');
const passportLocalMongoose = require('passport-local-mongoose');


const Player = new mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  name: String,
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

mongoose.connect('mongodb://localhost/allsoccer', mongooseOpts, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database'); 
  }
});
