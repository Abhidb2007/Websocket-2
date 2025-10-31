import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    // @ts-ignore (ignore TypeScript error for message type)
    const parsedMessage = JSON.parse(message);

    // 👇 When a user joins a room
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    // 👇 When a user sends a chat message
    if (parsedMessage.type === "chat") {
      let currentUserRoom: string | null = null;

      // Find the room of the sender
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].socket === socket) {
          currentUserRoom = allSockets[i].room;
        }
      }

      // Send message to all users in the same room
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].room === currentUserRoom) {
          allSockets[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});

console.log("✅ WebSocket server running on ws://localhost:8080");
