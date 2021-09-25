import React from "react";
import { Button, Input } from "antd";
import carrot from "./carrot.svg";
import "./login.styl";
import { apiReqs } from "../../../api";

function Login(props) {
  const login = () => {
    // props.history.push("./home");

    apiReqs.signIn({
      success: (res) => {
        console.log(res);
        props.history.push("/home");
      },
      fail: (res) => {
        alert(res);
      },
    });
  };

  return (
    <div className="P-login">
      <img src={carrot} alt="" className="carrot" />
      <div className="login-con">
        <div className="ipt-con">
          <Input placeholder="enter username" size="large" />
        </div>
        <div className="ipt-con">
          <Input.Password placeholder="enter pass" size="large" />
        </div>
        <Button type="primary" size="large" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
