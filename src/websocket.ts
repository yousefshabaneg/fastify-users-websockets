import { Server, WebSocket } from "ws";
import UserModel from "./modules/users/users.model";

const connectedUsers: Map<string, WebSocket> = new Map(); // Store user connections
interface WebSocketMessage {
  to: string;
  content: string;
}

async function handleWebSocketConnection(ws: WebSocket, req: any) {
  // Extract token from URL query parameter
  const token = req.url?.split("token=")[1];
  if (!token) {
    sendErrorMessage(ws, "Missing token");
    ws.close();
    return;
  }

  try {
    const { user } = await verifyUserToken(token);
    if (!user) {
      sendErrorMessage(ws, "Invalid token");
      ws.close();
      return;
    }

    console.log(`User ${user._id} connected`);
    connectedUsers.set(user._id.toString(), ws);

    ws.on("message", async (message: Buffer) => {
      handleMessage(ws, user, message);
    });

    ws.on("close", () => {
      handleWebSocketClose(user);
    });
  } catch (error) {
    console.error(error);
    sendErrorMessage(ws, `WebSocket connection error: ${error}`);
    ws.close();
  }
}

async function verifyUserToken(token: string) {
  return UserModel.verifyToken(token);
}

function handleMessage(ws: WebSocket, user: any, message: Buffer) {
  try {
    const messageStr = message.toString("utf-8");
    const { to, content } = JSON.parse(messageStr) as WebSocketMessage;

    const recipientWs = connectedUsers.get(to);
    if (recipientWs) {
      recipientWs.send(JSON.stringify({ from: user._id, content }));
    } else {
      sendErrorMessage(ws, "User not connected");
    }
  } catch (error) {
    console.error("Error parsing message:", error);
    sendErrorMessage(ws, "Invalid message format");
  }
}

function handleWebSocketClose(user: any) {
  connectedUsers.delete(user._id.toString());
  console.log(`User ${user._id} disconnected`);
}

function sendErrorMessage(ws: WebSocket, errorMessage: string) {
  ws.send(JSON.stringify({ error: errorMessage }));
}

export default function WebSocketHandlers(wss: Server) {
  wss.on("connection", (ws, req) => {
    handleWebSocketConnection(ws, req);
  });
}
