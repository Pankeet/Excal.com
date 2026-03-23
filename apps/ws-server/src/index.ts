import { WebSocketServer, type WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-secret/dist/index.js";
import { prisma } from "./config/prisma-config.js";

interface DecodedToken {
  userId: string;
  email: string;
}

type ClientMessage =
    | { type: "create"; roomId: string } 
    | { type: "join"; roomId: string }
    | { type: "leave"; roomId: string }
    | { type: "chat"; roomId: string; message: string };

type UserData = {
  socket: WebSocket;
  rooms: Set<string>;
};

const wss = new WebSocketServer({ port: 8080 });

const users = new Map<string, UserData>();
const rooms = new Map<string, Set<string>>();

function sendError(ws: WebSocket, message: string) {
  ws.send(JSON.stringify({ type: "error", message }));
}

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (err) {
    console.error("JWT error:", err);
    return null;
  }
}

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return;
  }

  users.set(userId, {socket: ws,rooms: new Set(),});

  ws.on("message", async (data) => {
    const user = users.get(userId);
    if (!user) return;

    let parseData: ClientMessage;

    try {
      parseData = JSON.parse(data.toString());
    } catch {
      sendError(ws, "Invalid JSON");
      return;
    }

// Create Room
    if(parseData.type === 'create'){
        const roomId = parseData.roomId;
        if (rooms.has(roomId)) {
            sendError(ws, "Room already exists");
            return;
          }
        rooms.set(roomId,new Set());
        rooms.get(roomId)!.add(userId);
        user.rooms.add(roomId);
        ws.send(JSON.stringify({
            type: "created",
            roomId,
          }));
          return ;
    }

// Join Room
    if (parseData.type === "join"){
      const room = rooms.get(parseData.roomId);

      if (!room) {
        sendError(ws, "Room does not exist");
        return;
      }

      room.add(userId);
      user.rooms.add(parseData.roomId);

      ws.send(JSON.stringify({ type: "joined", roomId: parseData.roomId }));
      return;
    }

// Leave Room
    if (parseData.type === "leave") {
      const room = rooms.get(parseData.roomId);

      if (!room) {
        sendError(ws, "Room does not exist");
        return;
      }

      if (!user.rooms.has(parseData.roomId)) {
        sendError(ws, "You are not in the room");
        return;
      }

      room.delete(userId);
      user.rooms.delete(parseData.roomId);

      ws.send(JSON.stringify({ type: "left", roomId: parseData.roomId }));
      return;
    }

// Chat in Room
    if (parseData.type === "chat") {
      const { roomId , message } = parseData;

      if (!user.rooms.has(roomId)) {
        sendError(ws, "Join room first");
        return;
      }

      const roomUsers = rooms.get(roomId);
      if (!roomUsers) {
        sendError(ws, "Room does not exist");
        return;
      }

      for (const uid of roomUsers) {
        const user = users.get(uid);
        if (!user) continue;

        await prisma.chat.create({
          data : {
            message : message,
            userId : userId,
            roomId : Number(roomId)
          }
        })
        user.socket.send(JSON.stringify({
            type: "chat",
            from: userId,
            roomId,
            message,
          })
        );
      }
    }
  });

  ws.on("close", () => {
    const user = users.get(userId);
    if (!user) return;

    for (const roomId of user.rooms) {
      rooms.get(roomId)?.delete(userId);
    }

    users.delete(userId);
  });
});