# All Soccer


## Overview

Soccer enthusiats in NYC usually engage in the sport by playing pick-up games with random others(lower level), friendly matches between teams(medium level), and organized tournaments(higher level). Currently, there is no consistently operating website exclusive for amateur soccer teams to connect with each other.

All Soccer is a web app that will allow soccer teams to easily connect with each other and arrange matches formal or friendly. It is also a database for player stats, team conditions and match histories.


## Data Model

The application will store Players(Managers), Teams and Matches

* Each player belong's to one team (via reference)
* Each team can have multiple players (via embedding)
* Each match include two teams (via references)


An Example Player:

```javascript
{
  username: "soccerking",
  hash: // a password hash
  name: "Pele",
  team: //a reference to a team object
  isManager: false
}s
```

An Example Team:

```javascript
{
  name: "best team in the world",
  manager: "Jose Mourinho"
  players: [
    { username: "CR7", realname: "Cristiano Ronaldo"},
    { username: "god", realname: "Zlatan Ibrahimovic"},
  ],
  createdAt: // timestamp
}
```

An Example Match:

```javascript
{
  teams: //two references to home and away team objects
  dateTime: //datetime object
  location: "Pier 40",
  status: "upcoming"
}
```


## [Link to Commented First Draft Schema](db.js) 


## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/home - home page
![home page](documentation/HomePage.png)

/login - page for logging in existing or creating new accounts
![login](documentation/LoginSignup.png)

/search - page for searching teams and players in the database
![search](documentation/SearchTeamPlayer.png)

/playerProfile - page for a player's information
![player profile](documentation/PlayerProfile.png)

/teamProfile - page for a team's information
![team profile](documentation/TeamProfile.png)

/createTeam - page for creating a new team
![create team](documentation/CreateTeam.png)


## Site map

![site map](documentation/site-map.png)

## User Stories or Use Cases

1. As an amateur soccer player, I want to challenge teams all over the city.
2. As a team manager, I want to reach out to other teams to arrange matches.
3. As any team member, I want to have my personal profile and team profile with past stats recorded.
4. As any team member, I want to research my opponents before playing against them.
5. As any team member, I want match highlight summaries for future review.
6. As any team member, I want a chat channel within the team.


## Research Topics

* (6 points) React.js
    * Building up front end with React.
* (3 points) Passport Authentication.

9 points total out of 8 required points


## [Link to Initial Main Project File](back-end/app.js) 


## Annotations / References Used

1. [Mocha unit test docs](https://mochajs.org/)
2. [Tutorial on React.js](https://reactjs.org/tutorial/tutorial.html)

