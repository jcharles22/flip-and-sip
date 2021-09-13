
# Flip and Sip

Flip and Sip is a drinking game for 2 or more people to fliip through cards and follow the rules on them.
Play it at https://flip-and-sip-jaredcharles.vercel.app/

## Screenshots
![Landing page screen shot](https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/landingPage.JPG?raw=true)
![Login screen shot](https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/LogInPage.JPG?raw=true)
![Signup screen shot](https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/SignUp.JPG?raw=true)
![Card List screen shot](https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/CardList.JPG?raw=true)
![Add Players screen shot](https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/AddPlayers.JPG?raw=true)
![Game screen shot](https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/GamePage.JPG?raw=true)


## Summary
* From the Land Page you can either login, signup, see list of all the cards, or play the game.
* Not signed in you can still click play to play the game. You need to select a deck to play with them put the names of the player and flip through the cards and complete the insturction.
* Not signed in you can also see the card list of all the cards in the game.
* Not signed in you can create a user.

* Signed in you can play the game.
V Signed in you can view the card list but you can toggle the card in and out of play if they are green they are in play and red ones are out of play. 
* Signed in you can create your own cards and pick which deck they go in.


## Technical
Flip and Sip was built as two separate parts.

<h3>Front End</h3>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
  <li>React</li>
</ul>
<h3>Back End</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>PostgreSql</li>
  <li>Knex</li>
</ul>

## API Documentation
API endpoints for the back end include:
* GET to '/api/card' to access all the cards
* PATCH to '/api/card' to alter a single card if it is in play or not
* POST to '/api/card' to a card to the database
* POST to '/api/auth/login' to sign in to an account
* POST to '/api/users' to create a new user
* GET to '/api/deck' to access all the decks
