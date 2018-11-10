# Node.js Master Class Assignments #

## Homework Assignment #1 ##

### Description
Create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice. 

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 


### Installing and executing
In a computer with Node.js installed, download the package in a folder under the local web root.

Open a command line window in this folder (cmd, GitBash...)

Start the server with 

    $ node index.js

The server should answer

    HTTP Server is listening on port  8888



Open another command line window, and type:

    $ curl localhost:8888/hello

The application API should answer with a short welcome message such as this:


    {"msg":"Hello - Welcome! Time now is 19:20:11"}


(plus maybe some other stuff from curl).

Alternatively, use Postman as shown in the course examples and navigate to

     localhost:8888/hello

  
