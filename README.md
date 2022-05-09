This is a project to recreate the dice game "Tenzies", built as part of a React course on Scrimba.

The goal of the game is to roll the dice until you've gotten the same number on every die. On the first round you roll at 10 dice and then set aside all the dice of the same number, choosing whichever number you rolled the most of. 

For example, you roll [6, 2, 1, 2, 4, 2, 5, 6, 2, 5]. In this case the number you got the most of is 2, so you set aside all of the dice showing 2. Now you have six dice left which you roll again, setting aside any dice that land on 2. You repeat this until you run out of dice to roll, at which point you've "won" the game. If you're playing to win, the least amount of total rolls is the winner.

An example of a full game using the original example could look like this:

(I used 10 real dice to create this example)
[6, 2, 1, 2, 4, 2, 5, 6, 2, 5]
[6, 5, 2, 4, 4, 6]
[5, 1, 4, 3, 5]
[4, 3, 4, 3, 2]
[3, 1, 5, 6]
[5, 2, 1, 2]
[4, 3]
[6, 3]
[6, 4]
[4, 6]
[3, 2]
[3]
[6]
[2]

So it took 14 rolls to win, meaning the ending score was 14.

Fun fact about the probabilities of this game: the chance of all 10 dice landing on the same number on the first roll is 1/(6^9) or 0.0000099229%. 
You're about 700 times more likely to be struck by lightning than you are winning Tenzies with a score of 1. Good luck!