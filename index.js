const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://hyerim:${process.env.Mong_PASSWORD}@cluster0.tknvffg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// mongodb+srv://hyerim:<password>@cluster0.tknvffg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.get("/", (req, res) => {
  res.send("Hello World!~~~");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
