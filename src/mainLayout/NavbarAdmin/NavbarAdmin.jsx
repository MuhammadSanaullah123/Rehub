import React, { useState, useEffect } from "react";
import "./NavbarAdmin.scss";
import { Link, useHistory, useLocation } from "react-router-dom";

//assets

import axios from "axios";
import { BsFillCalculatorFill } from "react-icons/bs";
import { AiFillCodepenCircle } from "react-icons/ai";
import { RiHome6Line } from "react-icons/ri";
import { BiSpreadsheet } from "react-icons/bi";
//mui
import { styled } from "@mui/material/styles";
import { MdDashboard } from "react-icons/md";
import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import MuiDrawer from "@mui/material/Drawer";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@mui/icons-material/Menu";
import { logOut } from "../../services/Auth";
import { useDispatch, useSelector } from "react-redux";
import calendar from "./../../assets/calendar.png";
import logout from "../../assets/logout.png";
import setting from "../../assets/setting.png";
import profile from "../../assets/profile.png";
import review1 from "../../assets/review1.svg";
import booking1 from "../../assets/booking1.svg";
import space1 from "../../assets/space1.svg";
import dashboard1 from "../../assets/dashboard1.svg";
import logo_img from "../../assets/logo_img.png";
import logo_null from "../../assets/logo_null.png";
import { setAuthorizedUser } from "../../features/userSlice";
import { baseURL } from "../../common/AxiosInstance";

const drawerWidth = 295;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function NavbarAdmin() {
  // const pathname = window.location.pathname;
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    logOut();
    dispatch(setAuthorizedUser(null));
    history.push("/home");
  };
  const pathnameValue = location.pathname;

  const pathid = location.pathname.split("/").pop();

  const [path1] = useState(window.location.pathname);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setScroll(window.pageYOffset > 10));
    }
  }, []);
  const firstName = useSelector((state) => state?.user?.value?.firstName);

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPrimary(item.primaryColor);
        setSecondary(item.secondaryColor);
      });
    });
  }, []);
  return (
    <div
      className="NavbarParentDiv"
      style={{
        backgroundColor: "rgb(244, 243, 243)",
      }}
    >
      <div
        style={{
          backgroundColor: `${path1 === "/physiotherapy-hub/spaces/profile" ? "#ffffff" : ""}`,
        }}
        className="Navbar"
      >
        <div className="navbard6">
          <div
            style={{
              justifyContent: `${
                pathnameValue === `/physiotherapy-hub/spaces/${pathid}` ? "space-between" : "flex-end"
              }`,
            }}
            className="navbard7"
          >
            {/* <img className="navbard7img2" src={bell} alt="" /> */}
            <Link to="/admin/profile">
              <img className="navbard7adminimg3" src={profile} alt="" />
            </Link>
          </div>
        </div>
        <Box sx={{ display: "flex" }}>
          <ClickAwayListener onClickAway={handleDrawerClose}>
            <Drawer onClick={handleDrawerOpen} variant="permanent" open={open}>
              <div
                style={{
                  display: `${open ? "flex" : ""}`,
                }}
                className="navbarlogodiv"
              >
                <img
                  style={{
                    display: `${open ? "flex" : "none"}`,
                  }}
                  className="navbarlogo1"
                  src={logo_null}
                  alt=""
                />
                <img
                  style={{
                    display: `${open ? "none" : "flex"}`,
                  }}
                  className="navbarlogo2"
                  src={logo_img}
                  alt=""
                />
              </div>
              <div
                className="navbarrightarrdiv"
                style={{
                  display: `${open ? "none" : ""}`,
                }}
              >
                <MenuIcon
                  style={{
                    display: `${open ? "none" : ""}`,
                  }}
                  className="navbarrightarr"
                />
              </div>

              <div onClick={handleDrawerOpen} className="navbard1">
                <div
                  style={{
                    display: `${open ? "flex" : ""}`,
                  }}
                  className="navbard2"
                >
                  <Link
                    to="/admin/dashboard"
                    style={{
                        justifyContent: `${open ? "" : "center"}`,
                      }}
                    className="navbarl1"
                  >
                    {/* <img
                        style={{
                          filter: `${
                            path1 === "/admin/dashboard"
                              ? "invert(54%) sepia(19%) saturate(6193%) hue-rotate(166deg) brightness(102%) contrast(103%)"
                              : ""
                          }`,
                        }}
                        className="dashboardlogo"
                        src={dashboard1}
                        alt=""
                      /> */}

                    <MdDashboard
                        className="dashboardlogo"
                        style={{
                          color: path1 === "/admin/dashboard" ? primaryColor : "#787878",
                        }}
                      />
                    <p
                        style={{
                          display: `${open ? "flex" : "none"}`,
                          color: `${path1 === "/admin/dashboard" ? primaryColor : "#787878"}`,
                        }}
                        className="navbarp1"
                      >
                        Dashboard
                      </p>
                  </Link>
                  <Link
                    to="/admin/profile"
                    style={{
                        justifyContent: `${open ? "" : "center"}`,
                      }}
                    className="navbarl1"
                  >
                    {/* <img
                        style={{
                          filter: `${
                            path1 === "/admin/dashboard"
                              ? "invert(54%) sepia(19%) saturate(6193%) hue-rotate(166deg) brightness(102%) contrast(103%)"
                              : ""
                          }`,
                        }}
                        className="dashboardlogo"
                        src={dashboard1}
                        alt=""
                      /> */}

                    <GroupAddIcon
                        className="dashboardlogo"
                        style={{
                          color: path1 === "/admin/profile" ? primaryColor : "#787878",
                        }}
                      />
                    <p
                        style={{
                          display: `${open ? "flex" : "none"}`,
                          color: `${path1 === "/admin/profile" ? primaryColor : "#787878"}`,
                        }}
                        className="navbarp1"
                      >
                        Profile
                      </p>
                  </Link>
                  <Link
                    to="/admin/contentmanagement"
                    style={{
                        justifyContent: `${open ? "" : "center"}`,
                      }}
                    className="navbarl1"
                  >
                    {/* <img
                        style={{
                          filter: `${
                            path1.includes("/admin/contentmanagement")
                              ? "invert(54%) sepia(19%) saturate(6193%) hue-rotate(166deg) brightness(102%) contrast(103%)"
                              : ""
                          }`,
                        }}
                        className="dashboardlogo"
                        src={space1}
                        alt=""
                      /> */}

                    <AiFillCodepenCircle
                        style={{
                          color: path1.includes("/admin/contentmanagement") ? primaryColor : "#787878",
                        }}
                        className="dashboardlogo"
                      />
                    <p
                        style={{
                          display: `${open ? "flex" : "none"}`,
                          color: `${path1.includes("/admin/contentmanagement") ? primaryColor : "#787878"}`,
                        }}
                        className="navbarp1"
                      >
                        Content
                        {" "}
                        <br />
                        {" "}
                        Management
                      </p>
                  </Link>
                  <Link
                    to="/admin/transactions"
                    style={{
                        justifyContent: `${open ? "" : "center"}`,
                      }}
                    className="navbarl1"
                  >
                    {/* <img
                        style={{
                          filter: `${
                            path1 === "/admin/transactions"
                              ? "invert(54%) sepia(19%) saturate(6193%) hue-rotate(166deg) brightness(102%) contrast(103%)"
                              : ""
                          }`,
                        }}
                        className="dashboardlogo"
                        src={booking1}
                        alt=""
                      /> */}
                    <RiHome6Line
                        style={{
                          color: path1 === "/admin/transactions" ? primaryColor : "#787878",
                        }}
                        className="dashboardlogo"
                      />
                    <p
                        style={{
                          display: `${open ? "flex" : "none"}`,
                          color: `${path1 === "/admin/transactions" ? primaryColor : "#787878"}`,
                        }}
                        className="navbarp1"
                      >
                        Transactions
                      </p>
                  </Link>
                  <Link
                    to="/admin/reviewmanagement"
                    style={{
                        justifyContent: `${open ? "" : "center"}`,
                      }}
                    className="navbarl1"
                  >
                    {/* <img
                        style={{
                          filter: `${
                            path1 === "/admin/reviewmanagement"
                              ? "invert(54%) sepia(19%) saturate(6193%) hue-rotate(166deg) brightness(102%) contrast(103%)"
                              : ""
                          }`,
                        }}
                        className="dashboardlogo"
                        src={review1}
                        alt=""
                      /> */}
                    <BiSpreadsheet
                        className="dashboardlogo"
                        style={{
                          color: path1 === "/admin/reviewmanagement" ? primaryColor : "#787878",
                        }}
                      />
                    <p
                        style={{
                          display: `${open ? "flex" : "none"}`,

                          color: `${path1 === "/admin/reviewmanagement" ? primaryColor : "#787878"}`,
                        }}
                        className="navbarp1"
                      >
                        Review
                        {" "}
                        <br />
                        {" "}
                        Management
                      </p>
                  </Link>
                </div>
              </div>
              <div
                style={{
                  display: `${open ? "flex" : "none"}`,
                }}
                className="navbard3"
              >
                <div className="navbard4">
                  <img className="navbarprofile" src={profile} alt="" />
                  <p className="navbarp2">{firstName}</p>
                </div>
                <div className="navbard5">
                  <img className="navbarimg1" src={setting} alt="" />
                  <p className="navbarp3">Settings</p>
                </div>
                <div className="navbard5">
                  <img className="navbarimg1" src={logout} alt="" />
                  <p className="navbarp3" onClick={handleLogOut}>
                    Log Out
                    </p>
                </div>
              </div>
            </Drawer>
          </ClickAwayListener>
        </Box>
      </div>
    </div>
  );
}

export default NavbarAdmin;
