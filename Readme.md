# WebSocket Chat Application

This is a simple WebSocket chat application built with Fastify and ws library.

## Features

- Allows users to connect via WebSocket and send messages to each other.
- Users are authenticated using JWT tokens.
- Real-time bidirectional communication between clients and server.

## Technologies Used

- [Fastify](https://fastify.dev/) (Fast and low overhead web)framework, for Node.js
- Typescript
- WebSocket ([ws library](https://www.npmjs.com/package/ws#api-docs))
- JWT (JSON Web Tokens)
- MongoDB (for user modeling)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/websocket-chat-app.git
```

2. Install dependencies:

```bash
cd websocket-chat-app
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following:

```plaintext
API_PORT =
WS_PORT =
NODE_ENV =

#Database
DATABASE_URI = ""

#jwt
JWT_SECRET =
JWT_EXPIRES_IN =

```

Rename the .env.example to .env and fill the variables with your own values.

4. Start the server:

```bash
npm start
```

- The server will start running on your API_PORT or by default at 3000.
- The Websocket server will start running on your WS_PORT or by default at 3030.

## Usage

1. Connect to the WebSocket server using a WebSocket client or library.
2. Send messages to other connected users by specifying the recipient's user ID and the message content like:

```url
ws://localhost:3030?token=your-token
```

```json
{
  "content": "Random Message",
  "to": "put here the user object id"
}
```

3. Receive messages from other users in real-time.

## API Documentation

- Postman API documentation can be accessed at: [Documentation Postman](https://documenter.getpostman.com/view/15622340/2sA3JRYJuK)

- Swagger API documentation can be accessed at `/documentation` route after starting the server

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.
