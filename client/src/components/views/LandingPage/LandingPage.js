import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userAuth from "../../../hoc/auth";

const LandingPage = () => {
  // useEffect(() => {
  //   axios
  //     .get("/api/hello")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);
  const navigate = useNavigate();

  const onClickHandler = () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
        } else {
          alert("logout 실패");
        }
      })
      .catch((err) => console.log(err));
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
      <h1>LandingPage</h1>
      <button onClick={onClickHandler}>Logout</button>
    </div>
  );
};

export default userAuth(LandingPage, null);
