const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected...");

  socket.on("send-changes", (delta) => {
    console.log(delta);
  });
});
