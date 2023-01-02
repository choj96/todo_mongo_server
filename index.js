// express 서버
const express = require("express");
// 서버 경로 모듈
const path = require("path");

// mongoose 모듈
const mongoose = require("mongoose");
const { Todo } = require("./model/TodoModel.js");
// 개발인증 관련
const config = require("./config/key.js");
// express 인스턴스 생성
// const { text } = require("express");
const app = express();

// 포트번호
const port = 5000;
// 고정된(Static) path 경로를 설정한다.

// mongodb+srv://admin:q1q2q3q4@cluster0.r9zji5x.mongodb.net/?retryWrites=true&w=majority
app.use(express.static(path.join(__dirname, "../client/build/")));

// 요청이 들어오면 json 사용 및 url 인코딩 진행해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 서버가 요청을 받아들이기 위해서 대기 중.
app.listen(port, () => {
  // MONGODB 관련
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("DB 연결성공");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`DB 연결실패${err}`);
    });
});
// 요청 : Request
// 응답 : Response
app.get("/", (req, res) => {
  // 파일을 보여줌
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// 테스트 요청이 들어왔다.
// 요청 : request
// 응답 : response

// 할일 등록
app.post("/api/post/submit", (req, res) => {
  // console.log(요청.body);
  let temp = req.body;
  const todoPost = new Todo(temp);
  todoPost
    .save()
    .then(() => {
      // 데이터 저장이 성공한 경우
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      // 데이터 저장이 실패한 경우
      console.log(err);
      res.status(400).json({ success: false });
    });
});
// 목록 읽어오기
app.post("/api/post/list", (req, res) => {
  // console.log("전체목록 호출");
  Todo.find({})
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, initTodo: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
