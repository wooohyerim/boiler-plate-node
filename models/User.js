const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true, //공백 없애주는 기능
    unique: 1,
  },
  password: {
    type: String,
    maxLength: 50,
  },
  lastName: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  //비밀번호 암호화 시킨다.
  if (user.isModified("password")) {
    //비밀번호가 변경됐을시에만 실행하도록
    bcrypt.genSalt(saltRound, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
