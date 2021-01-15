# projects

## Memory Game

This game is built using, HTML, CSS and JavaScript. Library used is jQuery.

### Approach

These are some key aspects of the game function:

* Generate cards and DOM elements - Used jQquery to create, append html tags and manipulate the DOM.

* Add hide and show cards function ('flip card') - Add event listeners and event handlers to the img.

* Add match cards function ('game logic') - Add functions that use conditional statements to determine if cards are a match, that run every 2 clicks. 

* Add ajax call function (used for card images) - Add ajax call to generate cards function and used the data to match images.

* Add 'shuffle' function - Break the cards into 2 groups, 1st group will take and store data image and data name from ajax call into array. 2nd group will randomly assign image and names from those arrays, hence creating a *pseudo-shuffle* effect.

* Add 3 difficulty levels - Increase the amount of cards for each level of difficulty.

* Add timer function

* Add Win condition (when all cards are matched) - Add each pair of matched cards into an array, set a conditional statement to check if array length is equal to number of cards set * 2.

* Add lose condition (when timer reach 1 minute and have not finish matching all cards) - Add conditional statement to check when minute variable equals 1

### Link

*https://calvansaw.github.io/memoryGame/*

