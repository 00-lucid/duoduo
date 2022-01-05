const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  //socket 서버 cors 설정
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// express 서버 cors 설정
app.use(cors());

// 임시 메모리 룸 관리용
const rooms = [];

io.on("connection", (socket) => {
  console.log("connection info: " + socket.request.connection._peername);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join room", ({ from, room }) => {
    console.log(`${from} join ${room} room`);
    rooms.push({ name: room, joiner: from });
    socket.join(room);
    io.to(room).emit("receive message", {
      from,
      message: `${from} 님이 채팅에 참가했습니다`,
    });
    console.log(rooms);
  });

  socket.on("leave room", ({ from }) => {
    const room = rooms.find((el) => el.joiner === from);
    socket.leave(room.name, () => {
      console.log(`${from} leave ${room.name}`);
    });
  });

  socket.on("send message", ({ message, from }) => {
    const room = rooms.find((el) => el.joiner === from);
    console.log(`send message ${from} to ${room.name}`);
    io.to(room.name).emit("receive message", { from, message });
  });
});

app.get("/", (req, res) => {
  res.send("duoduo live message server");
});

server.listen(5000, function () {
  console.log("서버 실행중 . . .");
});
