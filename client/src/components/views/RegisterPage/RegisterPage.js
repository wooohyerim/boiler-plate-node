import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import userAuth from "../../../hoc/auth";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPwHandler = (e) => {
    setPassword(e.target.value);
  };

  const onNameHandler = (e) => {
    setName(e.target.value);
  };

  const onPwConfirmHandler = (e) => {
    setPwConfirm(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== pwConfirm) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }

    let body = {
      email: email,
      password: password,
      name: name,
      pwConfirm: pwConfirm,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        navigate("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPwHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={pwConfirm}
          onChange={onPwConfirmHandler}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default userAuth(RegisterPage, false);
