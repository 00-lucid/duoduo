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

  socket.on("req socket id", () => {
    socket.emit("res socket id", socket.id);
  });

  socket.on("join room", ({ from, room }) => {
    console.log(`${from} join ${room} room`);
    rooms.push({ name: room, joiner: from });
    socket.join(room);
    console.log(rooms);
  });

  socket.on("leave room", () => {
    socket.leave("", () => {
      console.log("leave room");
    });
  });

  socket.on("send message", ({ message, from }) => {
    const room = rooms.find((el) => el.joiner === from);
    console.log(`send message ${from} to ${room.name}`);
    socket.to(room.name).emit("receive message", { from, message });
  });

  socket.on("send notice", ({ room, category, from }) => {
    if (category === "duo") {
      console.log(`send notice the other`);
      socket
        .to(room)
        .emit("receive notice", `${from} 님이 듀오 요청을 보냈습니다.`);
    }
  });
});

app.get("/", (req, res) => {
  res.send("duoduo live message server");
});

server.listen(5000, function () {
  console.log("서버 실행중 . . .");
});
