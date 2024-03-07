const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");

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
    maxLength: 150,
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
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //입력된 비밀번호와 암호화 된 비밀번호가 맞는지 체크
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  //jsonwebtoken 을 이용해서 토큰 생성
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user
    .save()
    .then(() => {
      return cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  // token decode
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저 찾은 다음에
    //클라이언트에서 가져온 토큰과 DB에 보관된 토큰 일치하는지 확인
    // user.findOne({ _id: decoded, token: token }, function (err, user) {
    //   if (err) return cb(err);
    //   cb(null, user);
    // });
    user
      .findOne({ _id: decoded, token: token })
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
