# vue-battleship

Play Battleship against the PC, using Vue.js

> ## From The Odin Project's [curriculum](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/battleship)

> ## [Live Demo](https://joshaubrey.github.io/vue-battleship/) :shipit:

## Project Requirements

1. Begin your app by creating the Ship factory function.
> * Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.
> * REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
> * Ships should have a hit() function that takes a number and then marks that position as ‘hit’.
isSunk() should be a function that calculates it based on their length and whether all of their positions are ‘hit’.
2. Create Gameboard factory.
> * Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.logs or DOM methods to make sure your code is doing what you expect it to.
> * Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
> * Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
> * Gameboards should keep track of missed attacks so they can display them properly.
> * Gameboards should be able to report whether or not all of their ships have been sunk.
3. Create Player.
> * Players can take turns playing the game by attacking the enemy Gameboard.
> * The game is played against the computer, so make ‘computer’ players capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldn’t shoot the same coordinate twice).
4. Create the main game loop and a module for DOM interaction.
> * At this point it is appropriate to begin crafting your User Interface.
> * The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
> * We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.
> * You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
> * The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
> * Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.
5. Finish it up
> * There are several options available for letting users place their ships. You can let them type coordinates for each ship, or investigate implementing drag and drop.
> * You can polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
> * Optionally, create a 2 player option that lets users take turns by passing the device back and forth. If you’re going to go this route, make sure the game is playable on a mobile screen and implement a ‘pass device’ screen so that players don’t see each others boards!

## Getting Started

### Installing and running

```bash
git clone https://github.com/JoshAubrey/vue-battleship.git
cd vue-battleship
npm install
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Run your unit tests
```
npm run test:unit
```
### Lints and fixes files
```
npm run lint
```

## Built With

* html 
* css
* javascript
* [Vue](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Jest](https://jestjs.io/)
