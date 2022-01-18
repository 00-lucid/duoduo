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
    const elRoom = rooms.find((el) => el.name === room);

    socket.join(room);

    io.to(room).emit("end");
    io.to(room).emit("notice", {
      message: `⚠️ 새로고침시 채팅이 종료됩니다`,
    });
    io.to(room).emit("notice", {
      message: `${elRoom.joiner} 님이 채팅에 참가했습니다`,
    });
    io.to(room).emit("notice", {
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
    io.to(room.name).emit("notice", {
      message: `${from} 님이 채팅에서 나가셨습니다`,
    });
  });

  socket.on("send message", ({ message, from }) => {
    const room = rooms.find((el) => el.joiner === from);
    console.log(`send message ${from} to ${room.name}`);
    io.to(room.name).emit("receiveMessage", { from, message });
  });

  // TODO: 생성자가 참여자를 선별할 수 있게 해야됨
  // TODO: 매칭을 통해 사용자가 연결되어 채팅이 가능하게 해줘야 됨 각각의 단계에서는 사용자가 그 단계를 인지할 수 있는 피드백이 필요함
  // TODO: 소켓서버는 이미 인증이된 연결만 가능하므로 잘못된 접근이 발생할 경우 예외처리가 필요함
  // 매칭 시작과 매칭 중 매칭 종료 세가지의 이벤트가 필요함
  // 생성자 / 참여자
  // 매칭시작 / ...
  // 매칭중 / 매칭시작
  // 성공 / 성공

  socket.on("start", ({ from, room }) => {
    rooms.push({ name: room, joiner: from });
    socket.join(room);
    socket.emit("loading", false);
    console.log(rooms);
    console.log("start");
  });

  socket.on("req permission", ({ from, fromUser, room }) => {
    console.log(fromUser, room);
    io.to(room).emit("res permission", {
      username: fromUser,
    });
  });
});

app.get("/", (req, res) => {
  res.send("duoduo live message server");
});

server.listen(5000, function () {
  console.log("서버 실행중 . . .");
});
