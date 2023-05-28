import React, { useState, useEffect, useCallback } from "react";
import "./Login.scss";
import { Link, useHistory } from "react-router-dom";
// import FacebookLogin from "react-facebook-login";
import Box from "@mui/material/Box";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Modal from "@mui/material/Modal";

//mui

//assets
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import logo from "../../assets/logo_img.png";

import userpic from "../../assets/user.svg";
import passwordpic from "../../assets/password.svg";
// import google from "../../assets/google.svg";
// import { ReactComponent as FacebookIcon } from "../../assets/fb.svg";
import { Alert } from "../../common/Alert";
import {
  forgotPassword,
  googleAccountCheck,
  googleLogin,
  isLoggedIn,
  logIn
} from "../../services/Auth";
import { setAuthorizedUser } from "../../features/userSlice";
import GoogleSignIn from "../../socials/GoogleSignIn";
import Input from "@mui/material/Input";

function Login() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  // const [signInType, setSignInType] = useState("");
  // const [googleTokenId, setGoogleTokenId] = useState(null);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [user, setUser] = useState("");
  const [icon, setIcon] = useState(false);
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // const [modal, setmodalvalue] = useState("");
  // const [fbResponse, setFbResponse] = useState(null);

  const [showSelectRole, setShowSelectRole] = useState(false);
  const [googleAccountData, setGoogleAccountData] = useState();
  const [accountType, setAccountType] = useState("Professional");

  const dispatch = useDispatch();
  const authorizedUser = useSelector((state) => state.user.value);

  const handleRemember = (event) => {
    setRemember(event.target.checked);
  };
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn() && authorizedUser) {
      //   if (authorizedUser?.data?.user?.signInType === "Facebook") {
      //     redirectUser(authorizedUser?.data?.user?.accountType);
      //   } else redirectUser(authorizedUser?.accountType);
      redirectUser(authorizedUser?.user?.accountType);
    }
  }, [authorizedUser]);

  const handleForgotPassword = useCallback(() => {
    setShowForgotPassword(true);
  }, []);

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

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

  const handleClose = () => setOpen(false);

  const handleLogin = async (type, token) => {
    let authorizedUser;
    try {
      switch (type) {
        case "Google":
          const existing = await googleAccountCheck(token);

          let response;
          if (existing) {
            response = await googleLogin(token);
            dispatch(setAuthorizedUser(response.authorizedUser));
            authorizedUser = response.authorizedUser;
            Alert("success", "Successfully logged In");
          } else {
            setShowSelectRole(true);
          }
          break;

        default:
          authorizedUser = await logIn(user, pass);
          dispatch(setAuthorizedUser(authorizedUser));
          break;
      }
      redirectUser(authorizedUser.user.accountType);
    } catch (error) {
      Alert("error", error.response?.data?.errorMessage);
    }
  };

  // const handleSignUp = async (accountType) => {
  //   try {
  //     let response;

  //     switch (signInType) {
  //       case "Google":
  //         response = await googleSignIn(googleTokenId, accountType);
  //         dispatch(setAuthorizedUser(response.authorizedUser));
  //         dispatch(setGoogleTokenForRegister(null));
  //         Alert("success", response.message);
  //         break;

  //     }

  //     history.push("/login");
  //   } catch (e) {
  //     Alert("error", e.response.data.errorMessage);
  //   }
  // };

  const onGoogleSuccess = (response) => {
    setGoogleAccountData(response);
    handleLogin("Google", response.credential);

  };
  const handleOpen = () => {
    setOpen(true);
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
  // const responseFacebook = async (type) => {
  //   const response = facebookSignup(
  //     fbResponse.email,
  //     fbResponse.id,
  //     fbResponse.name,
  //     type,
  //     fbResponse?.picture?.data?.url,
  //   ).then((response) => {
  //     dispatch(setAuthorizedUser(response.authorizedUser));
  //     history.push("/login");
  //     // if (!response.isPresent) {
  //     //   setGoogleTokenId(response.credential);
  //     //   setSignInType("Facebook");
  //     //   // handleOpen1();
  //     // } else {
  //     //   //
  //     // }
  //   });
  //
  //   //       Alert("success", data.message);
  //
  //   //       history.push("/login");
  //   // } catch (error) {
  //   //   Alert("error", "SomeThings went wrong");
  //   // }
  // };

  const onGoogleFailure = (response) => {
    alert("Google login did not work");
  };

  const handleSendForgotPassword = () => {
    forgotPassword(forgotPasswordEmail);
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
  return (
    <>
      <div className="mainDiv">
        <div className="bigDiv">
          <div className="circleDiv">
            <Link to="/home" className="circleDiv2">
              <img className="w-full h-full" src={logo} alt="" />
            </Link>
          </div>
          <div className="smallDiv">
            <div className="input-container">
              <i className="inputimgback">
                <img className="inputimg" src={userpic} alt="" />
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Username"
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
                name="usrnm"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              {icon ? (
                <AiOutlineEye className="visblePasswordIcon" onClick={iconClicked} />
              ) : (
                <AiOutlineEyeInvisible className="visblePasswordIcon" onClick={iconClicked} />
              )}
            </div>
            <div className="check-container my-2">
              <div style={{ display: "flex" }}>
                <input
                  className="form-check-input"
                  checked={remember}
                  onChange={handleRemember}
                  type="checkbox"
                  value=""
                />
                <p className="checkp">Remember me!</p>
                <div />
              </div>
              <div className="flex flex-col items-end gap-2">
                <Link to="/signup" className="checkp2">
                  Create Account
                </Link>
                <div className="checkp2 cursor-pointer select-none" onClick={handleForgotPassword}>
                  Forgot Password
                </div>
              </div>
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
          <button onClick={handleLogin} className="btn1">
            Login
          </button>
        </div>

        <p className="mainDivp1">Or login with</p>
        <div className="mainimgDiv">
          <GoogleSignIn onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} />

          {/*<div style={{ background: "#2F4D93" }} className="imgDiv">*/}
          {/*  <FacebookLogin*/}
          {/*    // appId="1286694482123833"*/}
          {/*    appId="1642682732854294"*/}
          {/*    autoLoad={false}*/}
          {/*    isMobile={false}*/}
          {/*    textButton=""*/}
          {/*    fields="name,email,picture"*/}
          {/*    callback={(response) => {*/}
          {/*      setFbResponse(response);*/}
          {/*      handleOpen1();*/}
          {/*    }}*/}
          {/*    cssClass="facebook-btn cursor-pointer"*/}
          {/*    disableMobileRedirect*/}
          {/*    icon={(*/}
          {/*      <div style={{ background: "#2F4D93" }}>*/}
          {/*        <FacebookIcon className="endimg" />*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  />*/}
          {/*  <Modal*/}
          {/*    open={open1}*/}
          {/*    onClose={() => {*/}
          {/*      handleClose1();*/}
          {/*    }}*/}
          {/*    aria-labelledby="modal-modal-title"*/}
          {/*    aria-describedby="modal-modal-description"*/}
          {/*  >*/}
          {/*    <div className="w-fit h-fit mx-auto mt-100 p-4 flex-col bg-white rounded-lg">*/}
          {/*      <div className="my-2">Please select role</div>*/}
          {/*      <div className="slector-input">*/}
          {/*        <select className="form-select" onChange={(e) => responseFacebook(e.target.value)}>*/}
          {/*          <option selected>Select Role</option>*/}
          {/*          <option value="Professional">Professional</option>*/}
          {/*          <option value="Host">Host</option>*/}
          {/*        </select>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Modal>*/}
          {/*</div>*/}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="SignBoxp">Sign up as ?</p>
          <div
            style={{
              width: "77%",
              display: "flex",
              justifyContent: "space-around",
              alignSelf: "center"
            }}
          >
            <button
              className="SignBoxb1"
              onClick={() => {
                responseFacebook("Professional");
              }}
            >
              Professional
            </button>
            <button
              className="SignBoxb2"
              onClick={() => {
                responseFacebook("Host");
              }}
            >
              Host
            </button>
          </div>
        </Box>
      </Modal>
      <Modal open={showForgotPassword} onClose={() => setShowForgotPassword(false)}>
        <div className="w-screen h-screen flex">
          <div className="m-auto py-6 px-8 bg-white rounded-xl shadow">
            <p className="mt-4 mb-5 pr-5 text-black text-2xl font-bold">Forgot Password Request</p>

            <Input
              type="text"
              classes={{ input: "text-xl", root: "text-xl !leading-10" }}
              className="w-full"
              placeholder="Email"
              name="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
            <div className="w-full mt-5 flex justify-end">
              <button className="SignBoxb2 cursor-pointer" onClick={handleSendForgotPassword}>
                Send
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
    </>
  );
}

export default Login;
