const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");

require("dotenv").config();

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://hyerim:${process.env.Mong_PASSWORD}@cluster0.tknvffg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!~~~ nodemon으로 실행중");
});

app.post("/register", (req, res) => {
  //회원가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user
    .save()
    .then((userInfo) => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
