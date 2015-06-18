Developer Guide
================

## Directory Structure
- /ui - User Interface code. The HTML/JavaScript application users will interact with.
- /server - Server-side code. The RESTful Node.js application the ui will talk to.
- /graphics - Any graphic design artifacts. psd/sketch/gimp/illustrator files.

## User Interface
To work with the user interface code, make sure you have gulp and bower installed
globally.

> npm install -g gulp

> npm install -g bower

Then install dependencies by opening a terminal, going into
the ui directory, and executing:

> npm install

> bower install

Finally, you can run the user interface locally by running:

> gulp

## Server
To run the server, make sure you have gulp installed
globally.

> npm install -g gulp

Then install dependencies by opening a terminal, going into
the server directory, and executing:

> npm install

Finally, you can run the server locally by running:

> gulp

The server by default will run on port 3000. You can change this by setting an environment variable named `PORT` with the port number you would like to use.
