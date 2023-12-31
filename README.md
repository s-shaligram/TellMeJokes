# TellMeJokes
Jokes server application

Joke API Server

The Joke API Server is a backend application built using Node.js and Express.js to provide jokes related to programming. It communicates with an external API to fetch programming jokes and allows users to perform various operations such as fetching a list of all jokes, getting a specific joke by its ID, and adding new jokes to the list.

Introduction

The Joke API Server serves as a backend API to provide jokes related to programming. It utilizes the Express.js framework to handle HTTP requests and responses. The jokes are retrieved from an external API (https://v2.jokeapi.dev/joke) and are stored in an array on the server.

Features

Get a list of all programming jokes.
Get a specific programming joke by its ID.
Add new programming jokes to the list.

Technologies

Node.js
Express.js
Body-parser
HTTPS

Setup

To run the Joke API Server on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Install Node.js and npm (Node Package Manager) if not already installed.
3. Navigate to the project directory in the terminal.
4. Run npm install to install the required dependencies.
5. Start the server by running npm start.
6. The server will now be running on port 443.

Endpoints

The Joke API Server exposes the following endpoints:

GET /getAllJokes: Fetches a list of all programming jokes.
GET /getJoke: Fetches a specific programming joke by its ID.
POST /addJoke: Adds a new programming joke to the list.

Usage

You can use the Joke API Server to integrate programming jokes into your frontend applications or use it as a standalone service to fetch jokes programmatically.

To fetch a list of all jokes, make a GET request to the /getAllJokes endpoint.

To fetch a specific joke by its ID, make a GET request to the /getJoke endpoint with the jokeID query parameter.

To add a new joke, make a POST request to the /addJoke endpoint with the new joke data in JSON format.

Happy coding! 😄🚀
