const mongoose = require('mongoose');
// URLSlugs = require('mongoose-url-slugs'),
// passportLocalMongoose = require('passport-local-mongoose');


const Player = new mongoose.Schema({
  username: {type: String, required: true},
  //password
  name: {type: String, required: true},
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
}, );

const Team = new mongoose.Schema({
	name: {type: String, required: true},
	manager: {type: String, required: true},
	players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
	createdAt: Date
});


const Match = new mongoose.Schema({
  teams: [String],
  dateTime: Date,
  location: String,
  status: {type: String, required: true}
});


// Player.plugin(passportLocalMongoose);
// List.plugin(URLSlugs('name'));

mongoose.model('Player', Player);
mongoose.model('Team', Team);
mongoose.model('Match', Match);
mongoose.connect('mongodb://localhost/grocerydb');
