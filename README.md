This app can be run on your current browser by clicking the link on the side, or by running it locally on your machine.

# How to run locally
1. Clone this repository into your VSCode directory
2. cd into the repo folder
3. type ```npm install``` into console and hit enter
4. then type ```npm run dev``` into console and hit enter
5. Website should be running locally

# Features in Progress
* Add "X" button on the top right corner
* change color of buttons to better indicate uses (i.e. cancel buttons should be red)
* Asset nodes should be able to hold audio recordings
  * Like adding a picture or video (add media)
  * Functionality for this feature already exists, it just needs to be interwoven into the node adding feature
* Allow users to select more photos in image search
  * Have left and right buttons to render next batch of photos (like an image gallery)
* Allow users to upload their own photos and videos from their devices  

# Issues
* When editing a node, if a user clicks anywhere on the canvas a new dialog box will appear
* Update placeholder text when editing nodes
  * Placeholder should be original value, or better indicate what the user should do
* Node movement issues
  * Node movement is very choppy
  * If the user moves the node too fast, the cursor will detatch from the node, leaving it idle until hovered over again
  * Connecting lines do not update after placing down a moved node. Will only update if another state change occurs somehwere else
    * i.e. moving another node, or trying to add a new node
* Canvas Scaling issues
  * the size of the nodes is dependent on the screen resolution/zoom factor on web browser
    * If a user zooms in while editing their map, some nodes on the lower left of the page will be hidden
* Map Screenshotting issues
  * Screenshots can vary in their scale depening on the physical size of the user's screen
    * Smaller screens can have screenshots with alot of blank space on the bottom
* When the 'how to use' section is opened, the asset accordian is still highlighted
* (potential issue) Center value node should not be able to be moved 
