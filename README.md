# DevMeetup Chat - A Real-time Chat Application using Express & WebSockets

"DevMeetup Chat" is a live chat application using WebSockets and was built with Express and Socket.io. The user can enter a nickname and choose to join one of the available chat rooms. The topics of the rooms are centered around differend programming languages. You can check out a live version of this project [here](https://devmeetup-chat.herokuapp.com/)

## Project Set-Up

After cloning this repository install all depencies via NMP with the following CLI-command:

`npm install`

To run the dev server it is recommended to use Nodemon, so that the dev server automatically reboots when changes are made. Nodemon can be installed globally via:

`npm i -g nodemon`

## NPM Scripts

To run a dev server (uses Nodemon) that auto-reloads when changes are made use:

`npm run dev`

To run the server in "production" without Nodemon use instead the following script:

`npm start`
