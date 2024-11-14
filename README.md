# How to run locally
1. Clone this repository into your VSCode directory
2. cd into the repo folder
3. type ```npm install``` into console and hit enter
4. then type ```npm run dev``` into console and hit enter
5. Website should be running locally

# TODO

* ~~Implement a video player for youtube videos~~
  * NOTE: Videos with copyright restrictions won't play (i.e. sports highlights) 
* Allow for saving/loading mindmaps locally
* ~~Put most things into components instead of cramming it in one app.tsx file~~
* Allow for recording audio and being able to play it from a node
* ~~Connect nodes via lines (this is gonna take a bit)~~
  * This one works but has some jank.
* ~~Replace the current node adding system with a popup that appears when you click anywhere on the canvas~~
* Instad of cramming edit features as part of the node, have it so that clicking on a node will allow you to make edits (WIP)
* Make it look prettier
* An about section that informs the user on how to use the mind map
* Adding tabs for the creation of other mind maps on the same page
* ~~Add a context file~~
* prevent certain nodes from being placed based on current map state
  * i.e., can't place more than one value node, cant place a role node without a value node, etc
* General improvements to the canvas
  * Currently has issues with scaling, size inconsistency, etc

