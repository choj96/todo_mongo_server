const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// const { Todo } = require("./model/TodoModel.js");

const config = require("./config/key.js");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post 관련 Router 연결
app.use("/api/post", require("./router/Post.js"));
// User 관련 Router 연결
app.use("/api/user", require("./router/User.js"));

app.use(express.static(path.join(__dirname, "./build")));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("DB 연결 성공");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`DB 연결 실패 ${err}`);
    });
});

// 요청 : Request
// 응답 : Response
app.get("/", (req, res) => {
  // 파일을 보여줌
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
//  주소가 없는 경우에 강제 URL 이동
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
// // 할일 등록
// app.post("/api/post/submit", (req, res) => {
//   // console.log(요청.body);
//   let temp = req.body;
//   const todoPost = new Todo(temp);
//   todoPost
//     .save()
//     .then(() => {
//       // 데이터 저장이 성공한 경우
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       // 데이터 저장이 실패한 경우
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// // 목록 읽어오기
// app.post("/api/post/list", (req, res) => {
//   // console.log("전체목록 호출");
//   Todo.find({})
//     .exec()
//     .then((doc) => {
//       console.log(doc);
//       res.status(200).json({ success: true, initTodo: doc });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// // 할일의 completed 를 업데이트
// app.post("/api/post/updatecompleted", (req, res) => {
//   let temp = {
//     completed: req.body.completed,
//   };
//   Todo.updateOne({ id: req.body.id }, { $set: temp })
//     .exec()
//     .then(() => {
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       res.status(400).json({ success: false });
//     });
// });

// // 타이틀 업데이트
// app.post("/api/post/updatetitle", (req, res) => {
//   let temp = {
//     title: req.body.title,
//   };
//   Todo.updateOne({ id: req.body.id }, { $set: temp })
//     .exec()
//     .then(() => {
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// // 할일 삭제
// app.post("/api/post/deletetitle", (req, res) => {
//   Todo.deleteOne({ id: req.body.id })
//     .exec()
//     .then(() => {
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// // 전체 할일 삭제
// app.post("/api/post/deleteall", (req, res) => {
//   Todo.deleteMany()
//     .exec()
//     .then(() => {
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });
