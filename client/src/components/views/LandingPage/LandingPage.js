import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import userAuth from "../../../hoc/auth";
import { auth } from "../../../_actions/user_action";

const LandingPage = () => {
  const [user, setUser] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickHandler = () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        if (res.data.success) {
          navigate("/");
        } else {
          alert("logout 실패");
        }
      })
      .catch((err) => console.log(err));
  };

  const onClickLoginHandler = () => {
    navigate("/login");
  };

  dispatch(auth()).then((res) => {
    if (res.payload) {
      setUser(res.payload.name);
    } else {
      alert("error");
    }
  });

  return (
    <div

    // style={{
    //   display: "flex",
    //   flexDirection: "column",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   width: "100%",
    //   height: "100vh",
    // }}
    >
      <h1>LandingPage</h1>
      {user !== undefined ? (
        <button onClick={onClickHandler}>Logout</button>
      ) : (
        <button onClick={onClickLoginHandler}>Login</button>
      )}
    </div>
  );
};

export default userAuth(LandingPage, null);
