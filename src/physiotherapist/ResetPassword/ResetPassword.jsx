import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import logo from "../../assets/logo_img.png";
import userpic from "../../assets/user.svg";
import passwordpic from "../../assets/password.svg";
import { Alert } from "../../common/Alert";
import { confirmResetPasswordToken, resetPassword } from "../../services/Auth";
import "./ResetPassword.scss";

function ResetPassword() {
  const { token } = useParams();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conpass, setConPass] = useState("");
  const [icon, setIcon] = useState(false);
  const [icon1, setIcon1] = useState(false);

  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (!token || token.length < 20) {
      Alert("error", "Token is not valid");
      history.push("/home");
    } else {
      confirmResetPasswordToken(token).catch((err) => {
        Alert("error", "Token is not valid");
        history.push("/home");
      });
    }
  }, [token, history]);

  const iconClicked = () => {
    setIcon(!icon);
  };
  const iconClicked1 = () => {
    setIcon1(!icon1);
  };

  const handleResetPassword = async () => {
    try {
      let response;

      if (email === "" || pass === "" || conpass === "") {
        Alert("error", "Please fill in the fields");
      } else if (pass !== conpass) {
        Alert("error", "Passwords do not match");
      } else if (!regexp.test(email)) {
        Alert("error", "Email is not correct");
      } else {
        response = await resetPassword(email, pass, token);
        Alert("success", response.data.message);
        history.push("/login");
      }
    } catch (e) {
      Alert("error", e.response.data.errorMessage);
    }
  };

  return (
    <div className="reset-password-wrapper">
      <div className="bigDivS">
        <div className="circleDiv">
          <div className="circleDiv2">
            <img className="w-full h-full" src={logo} alt="" />
          </div>
        </div>
        <div className="small-div-s px-10 gap-4">
          <div className="input-container">
            <i className="inputimgback">
              <img className="inputimg" src={userpic} alt="" />
            </i>
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <i className="inputimgback">
              <img className="inputimg" src={passwordpic} alt="" />
            </i>
            <input
              className="input-field"
              type={icon ? "text" : "password"}
              placeholder="Password"
              name="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {icon ? (
              <AiOutlineEye className="visblePasswordIcon" onClick={iconClicked} />
            ) : (
              <AiOutlineEyeInvisible className="visblePasswordIcon" onClick={iconClicked} />
            )}
          </div>
          <div className="input-container">
            <i className="inputimgback">
              <img className="inputimg" src={passwordpic} alt="" />
            </i>
            <input
              className="input-field"
              type={icon1 ? "text" : "password"}
              placeholder="Confirm Password"
              name="conpass"
              value={conpass}
              onChange={(e) => setConPass(e.target.value)}
            />
            {icon1 ? (
              <AiOutlineEye className="visblePasswordIcon" onClick={iconClicked1} />
            ) : (
              <AiOutlineEyeInvisible className="visblePasswordIcon" onClick={iconClicked1} />
            )}
          </div>

          <div className="check-container w-full justify-end">
            <Link className="checkp2" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "35px" }}>
        <button onClick={handleResetPassword} className="reset-password-submit px-5">
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
