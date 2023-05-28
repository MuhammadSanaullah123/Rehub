import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdPersonPin } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import logo1 from "../../assets/n-logo.jpeg";
import profile from "../../assets/profile.png";
import { getContentApi } from "../../redux/UserReducerApis";
import { setAuthorizedUser } from "../../features/userSlice";
import { baseURLSecond } from "../../common/AxiosInstance";
import "./Header.scss";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);
  const [logout, setLogout] = useState(false);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const userType = useSelector((state) => state?.user?.value?.user?.accountType);
  const path = window.location.pathname;
  const getToken = localStorage.getItem("rehub_token");
  const [profLogCard, setProfLogCard] = useState();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const authorizedUser = useSelector((state) => state?.user);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const profilePictureImg = useSelector((state) => state?.user?.value?.user?.image);

  const handleShow = () => {
    setLogoutShow(!logoutShow);
  };
  const handleLogout = () => {
    // setLogoutShow(!logoutShow);
    localStorage.removeItem("persist:root");
    localStorage.removeItem("rehub_token");
    dispatch(setAuthorizedUser(null));
    history.push("/home");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setScroll(window.pageYOffset > 50));
    }
  }, []);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  const personNavClicked = () => {
    setProfLogCard(!profLogCard);
  };
  return (
    <div
      style={{
        boxShadow: `${scroll ? "0px 3px 19px rgba(0, 0, 0, 0.25)" : ""}`
      }}
      className="mainHeader"
    >
      <AppBar className="Header" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters className="topHeaderMain">
            <div className="topLeftIconMenu">
              <Link to="/home">
                <img className="headerlogo" src={logo1} alt="" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              </Link>

              <Box
                className="header-box"
                sx={{
                  justifyContent: "space-around",
                  display: { xs: "none", sm: "flex" },
                  marginLeft: "20px"
                }}
              >
                <Link
                  to="/home"
                  style={{
                    borderBottom: `${path === "/home" ? `2px solid ${primaryColor}` : ""}`
                  }}
                  className="link1"
                  href
                >
                  Home
                </Link>
                <Link
                  to="/about-us"
                  style={{
                    borderBottom: `${path === "/about-us" ? `2px solid ${primaryColor}` : ""}`
                  }}
                  className="link1"
                  href
                >
                  About us
                </Link>
                <Link
                  to="/list-center"
                  style={{
                    borderBottom: `${path === "/list-center" ? `2px solid ${primaryColor}` : ""}`
                  }}
                  className="link1"
                  href
                >
                  List Centers
                </Link>
                {userType === "Professional" && (
                  <Link
                    to="/physiotherapy-hub/my-bookings"
                    style={{
                      borderBottom: path === "/physiotherapy-hub/my-bookings" ? `2px solid ${primaryColor}` : ""
                    }}
                    className="link1"
                    href
                  >
                    My bookings
                  </Link>
                )}
                {userType === "Host" && (
                  <>
                    <Link
                      to="/physiotherapy-hub/dashboard"
                      style={{
                        borderBottom: path === "/physiotherapy-hub/dashboard" ? `2px solid ${primaryColor}` : ""
                      }}
                      className="link1"
                      href
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/physiotherapy-hub/spaces"
                      style={{ borderBottom: path === "/physiotherapy-hub/spaces" ? `2px solid ${primaryColor}` : "" }}
                      className="link1"
                      href
                    >
                      Spaces
                    </Link>
                  </>
                )}
                {/*{userType === "Host" && (
                  <Link
                    to="/booking-list"
                    style={{
                      width: "fit-content",
                      borderBottom: `${
                        path === "/booking-list"
                          ? `2px solid ${primaryColor}`
                          : ""
                      }`,
                    }}
                    className="link1"
                    href
                  >
                    My Bookings
                  </Link>
                )}*/}
              </Box>
            </div>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }} className="ham-icon">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#000000" }} />
              </IconButton>
              <Menu
                id="menu-appbar1"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                <Link
                  to="/home"
                  style={{
                    width: "fit-content",
                    borderBottom: `${path === "/home" ? `2px solid ${primaryColor}` : ""}`
                  }}
                  className="link1"
                  href
                >
                  Home
                </Link>
                <Link
                  to="/about-us"
                  style={{
                    width: "fit-content",
                    borderBottom: `${path === "/about-us" ? `2px solid ${primaryColor}` : ""}`
                  }}
                  className="link1"
                  href
                >
                  About us
                </Link>
                {userType === "Host" && (
                  <Link
                    to="/physiotherapy-hub/dashboard"
                    style={{
                      borderBottom: `${path === "/physiotherapy-hub/dashboard" ? `2px solid ${primaryColor}` : ""}`
                    }}
                    className="link1"
                    href
                  >
                    Dashboard
                  </Link>
                )}
                {userType === "Host" && (
                  <Link
                    to="/physiotherapy-hub/spaces"
                    style={{ borderBottom: path === "/physiotherapy-hub/spaces" ? `2px solid ${primaryColor}` : "" }}
                    className="link1"
                    href
                  >
                    Spaces
                  </Link>
                )}
                <Link
                  to="/list-center"
                  style={{
                    width: "fit-content",
                    borderBottom: `${path === "/list-center" ? `2px solid ${primaryColor}` : ""}`
                  }}
                  className="link1"
                  href
                >
                  List Centers
                </Link>
                {userType === "Professional" && (
                  <Link
                    to="/booking-list"
                    style={{
                      width: "fit-content",
                      borderBottom: `${path === "/booking-list" ? `2px solid ${primaryColor}` : ""}`
                    }}
                    className="link1"
                    href
                  >
                    My Bookings
                  </Link>
                )}
              </Menu>
            </Box>
            {getToken && (
              <div className={profilePictureImg != undefined ? "topImageNavbarHost1" : "topImageNavbarHost"}>
                <img
                  onClick={personNavClicked}
                  src={
                    profilePictureImg != undefined
                      ? profilePictureImg.startsWith("http")
                        ? profilePictureImg
                        : `${baseURLSecond}/${profilePictureImg}`
                      : profile
                  }
                  className="personIconNavPr"
                />

                {profLogCard && (
                  <div className="topMainCardLogPro" style={{ background: primaryColor }}>
                    <Link to="/profile" className="progileLinkHost">
                      <div className="topRow1Profile">
                        <MdPersonPin className="proIconDrop" />
                        <span className="spTxtDropdown"> Profile</span>
                      </div>
                    </Link>

                    <div className="topRow1Profile" onClick={handleLogout}>
                      <AiOutlineLogout className="proIconDrop" />
                      <span className="spTxtDropdown"> Logout </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {getToken ? (
              <></>
            ) : (
              <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                <div className="bothbtndiv">
                  <Link to="/login" className="headerLogbtn">
                    Log in
                  </Link>
                  <Link to="/signup" className="headerSignbtn">
                    Sign up
                  </Link>
                </div>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
