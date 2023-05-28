import React, { useEffect, useState } from "react";
import "../Profile/Profile.scss";
import "./SignUp.scss";
import { Link, useHistory } from "react-router-dom";
//mui
import FacebookLogin from "react-facebook-login";

// import Modal from "@mui/material/Modal";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { HiOutlineSelector } from "react-icons/hi";

//assets
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo_img.png";
import namepic from "../../assets/name.svg";
import userpic from "../../assets/user.svg";
import passwordpic from "../../assets/password.svg";
// import { ReactComponent as FacebookIcon } from "../../assets/fb.svg";
import { Alert } from "../../common/Alert";
import {
  facebookSignup,
  getLoggedinUser, googleAccountCheck,
  googleLogin,
  googleSignUp,
  signUp,
  updateAccountType
} from "../../services/Auth";
import GoogleSignIn from "../../socials/GoogleSignIn";
import { setAuthorizedUser, setGoogleTokenForRegister } from "../../features/userSlice";
import Modal from "@mui/material/Modal";

// import { ButtonBase, Icon } from "@mui/material";

function SignUp() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [conpass, setConPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [googleTokenId, setGoogleTokenId] = useState(null);
  const [signInType, setSignInType] = useState("");
  const [fbResponse, setFbResponse] = useState(null);
  const [icon, setIcon] = useState(false);
  const [icon1, setIcon1] = useState(false);
  const [selectValue, setSelectValue] = useState();
  const [showSelectRole, setShowSelectRole] = useState(false);
  const [googleAccountData, setGoogleAccountData] = useState();
  const [accountType, setAccountType] = useState("Professional");
  const savedGoogleToken = useSelector((state) => state.user.googleTokenId);
  const userImageGoogle = useSelector((state) => state.user.userImage);

  useEffect(() => {
    if (savedGoogleToken) {
      setGoogleTokenId(savedGoogleToken);
      setSignInType("Google");
    }
  }, [savedGoogleToken]);

  const handleRemember = (event) => {
    setRemember(event.target.checked);
  };

  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const redirectUser = (accountType) => {
    switch (accountType) {
      case "Professional":
        history.push("/home");
        break;
      case "Host":
        history.push("/physiotherapy-hub/dashboard");
        break;
      default:
        break;
    }
  };

  const onGoogleSuccess = async (googleResponse) => {
    const token = googleResponse.credential;
    setGoogleAccountData(googleResponse);
    const existing = await googleAccountCheck(token);

    let authorizedUser;
    let response;
    if (existing) {
      response = await googleLogin(token);
      dispatch(setAuthorizedUser(response.authorizedUser));
      authorizedUser = response.authorizedUser;
      Alert("success", "Successfully logged In");
    } else {
      setShowSelectRole(true);
    }

    redirectUser(authorizedUser.user.accountType);
  };

  const handleSendAccountType = async () => {
    if (googleAccountData) {
      const response = await googleLogin(googleAccountData.credential, accountType);
      Alert("success", "Successfully logged In");

      dispatch(setAuthorizedUser(response.authorizedUser));
      history.push("/login");
    }
  };

  const handleCancelLogin = async () => {
    setGoogleAccountData(null);
    setShowSelectRole(false);
  };

  const onGoogleFailure = (response) => {
    alert("Google login did not work");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "526px",
    height: "158px",
    background: "#00B4FF",
    borderRadius: "6px",
    paddingLeft: "15px",
    display: "flex",
    flexDirection: "column"
  };

  const iconClicked = () => {
    setIcon(!icon);
  };
  const iconClicked1 = () => {
    setIcon1(!icon1);
  };

  const signUpClicked = async () => {
    try {
      let response;

      if (user === "" || name === "" || pass === "" || conpass === "") {
        Alert("error", "Please fill in the fields");
      } else if (pass !== conpass) {
        Alert("error", "Passwords do not match");
      } else if (!regexp.test(user)) {
        Alert("error", "Email is not correct");
      } else if (!remember) {
        Alert("error", "Please agree to Terms and Conditions");
      } else {
        response = await signUp(name, user, selectValue, pass);
        Alert("success", response.data.message);
        history.push("/login");
      }
    } catch (e) {
      Alert("error", e.response.data.errorMessage);
    }
  };

  const selectOnChangeType = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <div
      style={{
        padding: "50px 0 100px 0"
      }}
      className="mainDiv"
    >
      <div className="bigDivS">
        <div className="circleDiv">
          <Link to="/home" className="circleDiv2">
            <img className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>
        <div className="smallDivS">
          <div className="input-container">
            <i className="inputimgback">
              <img className="inputimg" src={namepic} alt="" />
            </i>
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <i className="inputimgback">
              <img className="inputimg" src={userpic} alt="" />
            </i>
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="usrnm"
              value={user}
              onChange={(e) => setUser(e.target.value)}
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

          <div className="input-container">
            <i className="inputimgback">
              <HiOutlineSelector style={{ color: "white" }} className="inputimg" />
            </i>

            <select name="cars" id="cars" className="input-field" onChange={(e) => selectOnChangeType(e)} required>
              <option value="" disabled selected>
                Select Usertype
              </option>
              <option value="Professional">Professional</option>
              <option value="Host">Host</option>
            </select>
          </div>
          <div className="check-container">
            <div style={{ display: "flex" }}>
              <input
                className="form-check-input"
                checked={remember}
                onChange={handleRemember}
                type="checkbox"
                value=""
              />
              <span className="checkpS">
                Agree to
                <Link
                  to="/terms-of-service"
                  style={{
                    color: "#00B4FF",
                    textDecoration: "underline",
                    fontWeight: "700",
                    margin: "0px 0px 0px 5px"
                  }}
                >
                  Terms and Conditions
                </Link>{" "}
              </span>
            </div>
            <Link className="checkp2" to="/login">
              Login
            </Link>
          </div>
          <p
            style={{
              display: `${show && !remember ? "flex" : "none"}`
            }}
            className="smallDivp"
          >
            Kindly check the checkbox!
          </p>
        </div>
      </div>
      <div style={{ marginTop: "35px" }}>
        <button onClick={signUpClicked} className="btn1">
          Sign up
        </button>
      </div>
      <p className="mainDivp1">Or login with</p>
      <div className="mainimgDiv">
        <GoogleSignIn onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} />

        {/*<div style={{ background: "#2F4D93" }} className="imgDiv">*/}
        {/*  <FacebookLogin*/}
        {/*    appId="1814236655588582"*/}
        {/*    autoLoad={false}*/}
        {/*    isMobile={false}*/}
        {/*    textButton=""*/}
        {/*    fields="name,email,picture"*/}
        {/*    callback={(response) => {*/}
        {/*      setFbResponse(response);*/}
        {/*    }}*/}
        {/*    cssClass="facebook-btn cursor-pointer"*/}
        {/*    disableMobileRedirect*/}
        {/*    icon={*/}
        {/*      <div style={{ background: "#2F4D93" }}>*/}
        {/*        <FacebookIcon className="endimg" />*/}
        {/*      </div>*/}
        {/*    }*/}
        {/*  />*/}
        {/*</div>*/}
        <Modal open={showSelectRole}>
          <div className="w-fit h-fit mx-auto mt-100 p-4 flex-col bg-white rounded-lg">
            <div className="my-2">Please select role</div>
            <div className="slector-input">
              <select className="form-select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                <option value="Professional">Professional</option>
                <option value="Host">Host</option>
              </select>
            </div>
            <div className="w-full mt-5 flex justify-end gap-2">
              <button
                className="p-2 bg-danger cursor-pointer text-sm border-none text-white rounded"
                onClick={handleCancelLogin}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-primary cursor-pointer text-sm border-none text-white rounded"
                disabled={!accountType}
                onClick={handleSendAccountType}
              >
                Send
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default SignUp;
