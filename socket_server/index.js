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
    io.to(room).emit("receiveMessage", {
      from,
      message: `${from} 님이 채팅에 참가했습니다`,
    });
    console.log(rooms);
  });

  // 실행조건:
  // - 다른 룸에 조인할 때
  // - 룸에서 나가기 버튼을 눌렀을 때
  socket.on("leave room", ({ from }) => {
    const room = rooms.find((el) => el.joiner === from);
    socket.leave(room.name, () => {
      console.log(`${from} leave ${room.name}`);
    });
  });

  socket.on("send message", ({ message, from }) => {
    const room = rooms.find((el) => el.joiner === from);
    console.log(`send message ${from} to ${room.name}`);
    io.to(room.name).emit("receiveMessage", { from, message });
  });

  // 매칭 시작과 매칭 중 매칭 종료 세가지의 이벤트가 필요함
  // 생성자 / 참여자
  // 매칭시작 / ...
  // 매칭중 / 매칭시작
  // 성공 / 성공

  socket.on("start", ({ from, room }) => {
    rooms.push({ name: room, joiner: from });
    socket.join(room);
    socket.emit("loading", false);
  });
});

app.get("/", (req, res) => {
  res.send("duoduo live message server");
});

server.listen(5000, function () {
  console.log("서버 실행중 . . .");
});
