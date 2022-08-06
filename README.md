# SnapEasy snap-card-game

This site was scratch built from the ground up

Link to project: [https://level-ground-portfolio.netlify.app/](https://snapeasy.netlify.app/)
![snapeasy](https://user-images.githubusercontent.com/85075266/181392834-2e3f43d8-1353-44ff-a6fa-f3e5f6b18163.jpg)

## How It's Made:
<br/>
Tech used: HTML, CSS, Javascript

made with the Deck of Cards API
https://deckofcardsapi.com

This was an evolution in terms of API use, I began using localstorage to save scores and hold card info temporarily.
I also made use of timers to try for "organic" snap gameplay, with only 3-7 seconds to make a move, the computer can be
aggressive if you're not playing attention.

## Optimizations
<br/>
The site actually changed a LOT when I put it in the hands of real users, not only did I get feedback on the gameplay feel
("it's too slow"/ I reduced the computer turn timer) but I also caught a few sneaky edge cases - if the player missed a snap opportunity
by not noticing and drawing another card - the computer didn't have a contingency and continued to say "SNAP" cheating and winning the game.

## Lessons Learned:
<br/>
This site showed me the importance of getting a MVP up and running ASAP and getting the program into the hands of users early, of gathering feedback and then using that feedback to improve the program, then going back to users (the cycle repeats)

I was happy with how the API performed and also felt it might be good to expand on card gamers generally, maybe texas hold em with a simulated "hand" that responds to player interactions.
