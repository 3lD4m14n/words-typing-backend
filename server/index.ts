import dotenv from "dotenv";
import { generate } from "random-words";
import { Server, Socket } from "socket.io";

dotenv.config();

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL?.split(","),
  }
});

io.on("connection", (socket: Socket) => {
  socket.on("finish", () => {
    socket.emit("new word", generate());
  });

  socket.emit("initialize", generate(), generate())
});

io.listen(Number(process.env.PORT) || 3000);
console.log(`Listening on port ${Number(process.env.PORT) || 3000}`);
console.log(`Client URL: ${process.env.CLIENT_URL}`);
