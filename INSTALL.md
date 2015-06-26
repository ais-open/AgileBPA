Installation Guide
==================

## Cloud Foundry Installation
From the AgileBPA folder on a machine with the Cloud Foundry CLI installed,
run: `cf push`

## Manual Installation

### Building the User Interface
Building the user interface requires the following to be installed on your
system an available on the path:

* node.js/npm
* bower (npm install -g bower)
* gulp (npm install -g gulp)
* ruby
* sass (gem install sass)

After those items have been installed, navigate to the ui directory in a
terminal and execute the following commands:

* `npm install`
* `bower install`
* `gulp dist`

This will generate a folder named dist that can then be served out using any
static file web server such as nginx or Apache HTTPD.


### Running the Server
The server portion of the application requires node.js and npm to be
installed on the system and available on the path. Then, navigate to the
server directory in a terminal and execute the following commands:

* `npm install`
* `node index.js`

The server by default will run on port 3000. You can change this by setting an environment variable named `VCAP_APP_PORT` with the port number you would like to use.
