Developer Guide
================

## Directory Structure
- /ui - User Interface code. The HTML/JavaScript application users will interact with.
- /server - Server-side code. The RESTful Node.js application the ui will talk to.
- /graphics - Any graphic design artifacts. psd/sketch/gimp/illustrator files.


## User Interface
Building the user interface requires node.js, ruby, and git to be installed
on your system.
Node.js is available from https://nodejs.org.
Ruby is available from https://www.ruby-lang.org.
Git is available from https://git-scm.com.
Check your installations by opening a terminal and running:

> node --version

> ruby --version

> git --version

Once those are installed, you'll need to install some additional applications

> npm install -g gulp

> npm install -g bower

> gem install sass


Then install project dependencies by opening a terminal, going into
the ui directory, and executing:

> npm install

> bower install

Finally, you can now run the user interface locally by running:

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

The server by default will run on port 3000. You can change this by setting an environment variable named `VCAP_APP_PORT` with the port number you would like to use.
