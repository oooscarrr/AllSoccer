const express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Player = mongoose.model('Player');
// Team = mongoose.model('Team');

router.post('/create', (req, res) => {
	const {listSlug, name, quantity} = req.body;
	const listItem = {name, quantity};

	Player.findOneAndUpdate({slug:listSlug}, {$push: {items: listItem}}, (err) => {
    console.log(err);
		res.redirect(`/list/${listSlug}`);
	});
});

router.post('/check', (req, res) => {
	const {listSlug, items} = req.body;

	Player.findOne({slug:listSlug}, (err, list) => {
    console.log(`items: ${items}, list: ${list}`);
		for (let i = 0; i < list.items.length; i++) {
      console.log(list.items[i]);
			if (items?.includes(list.items[i].name)) {
				list.items[i].checked = true;
			}
		}
		list.markModified('items');
		list.save((err) => {
      console.log(err);
			res.redirect(`/list/${listSlug}`);
		});
	});
});

module.exports = router;
