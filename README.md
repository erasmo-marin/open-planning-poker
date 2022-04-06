# Open Planning Poker

Planning Poker is a game used on the Scrum framework to estimate relative effort or size of a task in the software development process. This implementation aims to provide a very simple and easy to use UI/UX, without unnecessary features. It uses peerjs to stablish the communication between a host and clients.

Try the [demo](https://open-planning-poker.netlify.app/)!

<p align="center">
  <img src="https://github.com/erasmo-marin/open-planning-poker/blob/main/screenshot.png?raw=true" width="800px" height="auto"/>
</p>

## Running the project

This project was bootstraped using `create-react-app`, so all the scripts included in this tool are available. Also, we use peerjs server to develop locally.

**Start the local server**

Start a local server by running:

```bash
yarn start-server
```

The server will be available at [localhost:9000](http://localhost:9000)

**Start the web app**

Just run:

```bash
yarn start
```

The web app will be available at [localhost:3000](http://localhost:3000)

**Changing the server configuration**

We are running a free heroku server for the demo. Please don't use this server for yourself. You can change the default server at `src/services/settings.ts`. The options available are the same as in the [Peer constructor](https://peerjs.com/docs/#peer-options). In the future, environment settings will be implemented.
