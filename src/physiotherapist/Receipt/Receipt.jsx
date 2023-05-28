import React, { useState, useEffect } from "react";

//components
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
//assets
import Modal from "@mui/material/Modal";

//mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableHead from "@material-ui/core/TableHead";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import styled from "styled-components";
import "./Receipt.css";
import { render } from "react-dom";
// import { renderToString } from "react-dom/server";
import ReactDOMServer from "react-dom/server";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import jsPDF from "jspdf";
import moment from "moment";
import { textAlign } from "@mui/system";
// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/fontWeight";
// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center",
// };
// const colstyle = {
//   width: "30%",
// };
// const tableStyle = {
//   width: "100%",
// };

// const ReciptContainer = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 20px 20px 65px 20px;
//   @media only screen and (max-width: 1400px) and (min-width: 1000px) {
//     //  padding: 40px 70px 40px 70px;
//   }
// `;

// const ReciptContainerInnerOne = styled.div`
//   alignContent: center;
//   display:"flex",
//   flexDirection: column;
//   columnGap: 1rem;
//   height: 75vh;
//   background-color:red @media screen and (max-width: 838px) {
//     alignContent: initial;
//   }
// `;
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { setBookingDataInbooking, setReciptData } from "../../features/bookingSlice";
import { useHistory } from "react-router-dom";
import LoadingProgressBar from "../../common/LoadingProgressBar";
import { Bookingdatatest, deleteBookingdata } from "../../services/Books";
import { Alert } from "../../common/Alert";
import { getContentApi } from "../../redux/UserReducerApis";
import SimpleAlert from "../../common/Swal Alert";
import instance, { baseURLSecond } from "../../common/AxiosInstance";
import Logo from "../../assets/logo.png";
import spaceimg from "../../assets/spaceimg.png";
import profile from "../../assets/profile.png";
import { setupcomingBooking } from "../../features/bookingSlice";
import GoogleCalender from "./GoogleCalender";
import { getSellerInfoNameInBooking } from "../../services/AddSpace";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "526px",
  width: "100%",
  height: "max-content",
  background: "#00B4FF",
  borderRadius: "6px",
  paddingLeft: "15px",
  display: "flex",
  maxHeight: "690px",
  overflowX: "hidden",
  paddingRight: "15px",
  flexDirection: "column",
  overflowY: "scroll"
};
const useStyles = makeStyles((theme) => ({
  // root: {
  //   marginBottom: "2rm",
  //   "& > *": {
  //     margin: "2rem 0",
  //   },
  // },
  DivImageLogo: {
    marginLeft: "20px"
  },
  ImageLogo: {
    height: "56px",
    width: "100px"
  },
  Reciept: {
    gridColumn: "2/3",
    display: "flex",
    flexDirection: "column",
    // border: "0.5px solid #43404079",
    borderRadius: "3px",
    width: "270px"
    // backgroundColor: "red",
  },
  bookingrecd1: {
    // alignContent: "center",
    // display: "flex",
    // flexDirection: "column",
    // columnGap: "1rem",
    // height: "75vh",
    display: "grid",
    rowGap: "1rem",
    columnGap: "1rem",
    paddingTop: "20px",
    paddingLeft: "20px",
    alignContent: "center",
    flexDirection: "column",
    gridTemplateColumns: " 1fr 1fr"
  },
  bookingleftbothrecdiv: {
    display: "grid",
    alignContent: "center",
    gridTemplateColumns: "1fr 1fr",
    rowGap: "1rem",
    columnGap: "1rem",
    flexDirection: "column",
    paddingLeft: "20px"
    // paddingTop: "20px",
  },
  bookingrecd2: {
    gridColumn: 1 / 2,
    width: "270px",
    border: "0.5px solid #43404079",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    justifySelf: "flex-end",
    paddingLeft: "10px"
  },
  bookingrech1: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "17px",
    color: "#000000",
    margin: "7px 0px 0px 7px"
  },
  bookingrecp1: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    color: "#403c3c",
    margin: "15px 0px 0px 7px"
  },
  bookingrech2: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "15px",
    color: "#2b2626",
    margin: "7px 0px 15px 7px,"
  },
  bookingrecp2: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#000000",
    margin: "7px 15px 0px 0px",
    textAlignLast: "end"
  },
  bookingrecd3: {
    gridColumn: "1/2",
    width: "280px",
    border: "0.5px solid #43404079",
    borderRadius: "3px",
    justifySelf: " self-end",
    display: "flex",
    flexDirection: "column",
    justifyContent: " space-around",
    height: "max-content"
  },
  bookingrech3: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "17px",
    lineHeight: "23px",
    color: "#000000",
    margin: "7px 0px 0px 7px"
  },
  invoicenumber: {
    display: "flex",
    gap: "10px",
    marginLeft: "40px"
  },
  bookingrecd4: {
    display: "flex",
    margin: "7px 15px 10px 7px",
    justifyContent: "space-between,"
  },
  bookingrecd5: {
    display: "flex"
  },
  bookingimgrec1: {
    width: "42px",
    height: "42px"
  },
  bookingrecd6: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px"
  },
  bookingrech4: {
    margin: 0,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "13px",
    color: "#000000"
  },
  bookingrecp3: {
    margin: 0,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "11px",
    color: "#4f4848"
  },
  recieptd1: {
    gridColumn: "2/3",
    display: "flex",
    flexDirection: "column",
    border: "0.5px solid #43404079",
    borderRadius: "3px",
    // width: "240px",
    flexWrap: "wrap",
    width: "max-content"
  },
  reciepth1: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "17px",
    color: "#000000",
    margin: "10px 0 0 10px"
  },
  bookingspaceImage: {
    width: "100px",
    height: "100px"
  },
  div_recieptbooked: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexDirection: "column"
  },
  reciepth6: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    color: "#403c3c",
    margin: "20px 0 0 10px"
  },
  recieptp1: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "23px",
    margin: " 20px 0 0 0",
    color: "#000000",
    textAlign: "center"
  },
  div_date_time: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
    // flexDirection: "column",
  }
}));

function Receipt() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [path] = useState(window.location.pathname.split("/"));
  const gapi = window.gapi;
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [loaderIndex, setLoaderIndex] = useState(null);

  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const [dataSingleSpace, setSingleSpace] = useState(null);
  const [getInvoiceNumber, setInvoiceNumber] = useState("");
  const [makeDateAndSlots, setMakeDateAndSlots] = useState([]);
  const [dataGetPickDate, setDataGetPickDate] = useState([]);
  const [selectedBookedData, setSelectedBookedData] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [platformFee, setPlatformFee] = useState(0);

  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [loader, setLoader] = useState(false);

  const userData = useSelector((state) => state?.user);
  const dataGetSelector = useSelector((state) => state?.booking?.singleReciptData);
  const authorizedUser = useSelector((state) => state?.user?.value);
  const bookingData = useSelector((state) => state?.booking?.bookingdata);
  const userSplitDate = authorizedUser?.value?.user?.createdAt?.split("T")[0];
  const sellerSplitDate = dataSingleSpace && dataSingleSpace[0]?.spaceId?.therapisthub?.createdAt?.split("T")[0];

  useEffect(() => {
    instance
      .get(`/booking/getBook/${path[2]}`)
      .then((res) => {
        dispatch(setReciptData(res.data.data));
      })
      .catch((err) => {
      });
  }, []);
  const handleOpen = async () => {
    const pickup = dataSingleSpace[0]?.spaceId.pickDate;
    const temppickup = [];
    pickup?.map((dates, key) => {
      const tempSlo = [...dates.timeslots];

      let obj = {};

      dates.timeslots.map((im, skey) => {
        let flag = false;
        obj = im;
        dataSingleSpace.map((inner) => {
          if (inner.bookingDate === dates.dateofAvailibilty) {
            if (im.timevalue === inner.bookingTime) {
              flag = true;
            }
          }
        });

        if (flag == true) {
          obj = {
            ...obj,
            isBooked: false,
            userName: null,
            dateofbooking: null,
            status: null,
            isBookedDis: false
          };
          tempSlo[skey] = obj;
        } else {
          tempSlo[skey] = im;
        }
      });

      temppickup.push({
        dateofAvailibilty: dates.dateofAvailibilty,
        timeslots: tempSlo
      });
    });
    // setOpen(true);
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:fin="http://www.hps.ma/PowerCARD/PaymentGateway/FinancialServices">
      <soapenv:Header>
        <fin:AuthHeader>
          <fin:MerchantID>0093149011</fin:MerchantID>
          <fin:AcquirerID>402971</fin:AcquirerID>
          <fin:Password>76u2713l</fin:Password>
        </fin:AuthHeader>
      </soapenv:Header>
      <soapenv:Body>
        <fin:RefundAmount>
          <fin:OrderID>7dd3a4</fin:OrderID>
          <fin:Amount>21.19</fin:Amount>
          <fin:Culture></fin:Culture>
          <fin:sError>Success</fin:sError>
        </fin:RefundAmount>
      </soapenv:Body>
    </soapenv:Envelope>`;
    try {
      const response = await fetch("https://tjccpg.jccsecure.com:443/PgWebService/services/FinancialService", {
        body: xmls,
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/xml",
          "soapAction": "MyAction"
        }
      });
      instance
        .patch(`/space/update/${dataSingleSpace[0]?.spaceId?._id}`, {
          temppickup
        })
        .then((res) => {
          Alert("success", "Booking cancelled successfully");
        })
        .catch((err) => {
          Alert("error", "Error in cancel booking");
        });
      instance
        .patch(`/booking/update/${dataSingleSpace[0]?.bookingInvoiceNumber}`, {})
        .then((res) => {
          dispatch(setupcomingBooking(null));
        })
        .catch((err) => {
        });
      history.push({
        pathname: "/booking-list"
      });
    } catch (err) {
    }
  };
  const handleClose = () => setOpen(false);
  // Set to client ID and API key from the Developer Console
  const CLIENT_ID = "883715914684-1nf8u78ntr61e1d6b6o75esg4h08cjbn.apps.googleusercontent.com";
  const API_KEY = "AIzaSyA8ZI_DOrcqU9s-PrOX2vboPe9vgrh-1-0";
  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = "https://script.googleapis.com/$discovery/rest?version=v1";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/script.projects";

  // const currentSelectSlots = useSelector(
  //   (state) => state?.booking?.userCurrentSlotsSelected
  // );

  const checkstate = useSelector((state) => state);
  const handleDateReturnhrs = (userdate) => {
    const currentDateTest = moment(new Date()).format("DD/MM/YYYY");
    const datechange = moment(userdate, "DD/MM/YYYY").format("DD/MM/YYYY");
    const userdatechange1 = moment(userdate, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    const userdatafinal = moment(userdatechange1, "DD-MM-YYYY  HH:mm");
    const currentDate = moment(new Date()).format("DD-MM-YYYY HH:mm");
    const finalCurrentDate = moment(currentDate, "DD-MM-YYYY  HH:mm");

    // let result2 = userdatafinal.diff(finalCurrentDate, "minutes");
    // let result2 = finalCurrentDate.diff(userdatafinal, "minutes");
    if (userdate === currentDateTest) {
      const result2 = finalCurrentDate.diff(userdatafinal, "minutes");
      var numdays = Math.floor(result2 / 1440);
      var numhours = Math.floor((result2 % 1440) / 60);
      var numminutes = Math.floor((result2 % 1440) % 60);
      return { numhours, numdays, numminutes };
    }
    const result2 = userdatafinal.diff(finalCurrentDate, "minutes");
    var numdays = Math.floor(result2 / 1440);
    var numhours = Math.floor((result2 % 1440) / 60);
    var numminutes = Math.floor((result2 % 1440) % 60);
    return { numhours, numdays, numminutes };
  };

  useEffect(() => {
    const tempselectedata = [...(bookingData || [])];
    setSelectedBookedData(tempselectedata);
  }, [bookingData]);

  useEffect(() => {
    let tempnumber = [...(bookingData || [])];
    tempnumber = tempnumber?.map((item) => {
      return { bookingInvoiceNumber: item?.bookingInvoiceNumber };
    });
    setInvoiceNumber(tempnumber[0]?.bookingInvoiceNumber);
  }, [bookingData]);

  const handleCancelBooking = (data, index) => {
    setLoaderIndex(index);
    setLoader(true);
    const testdata = handleDateReturnhrs(moment(data?.bookingDate, "DD/MM/YYYY").format("DD/MM/YYYY"));
    if (testdata?.numdays > 0) {
      const tempdataGetPickDate = [...dataGetPickDate];
      const tempdata = tempdataGetPickDate?.map((item) => {
        if (item?.dateofAvailibilty === data.bookingDate) {
          return {
            ...item,
            timeslots: item?.timeslots?.filter((item2) => item2?.timevalue !== data?.bookingTime)
          };
        }
        return item;
      });
      setDataGetPickDate(tempdata?.flat());
      const objectdata = {
        address: dataSingleSpace?.address,
        name: dataSingleSpace?.name,
        pickDate: tempdata?.flat(),
        price: dataSingleSpace?.price,
        spaceImage: dataSingleSpace?.spaceImage,
        therapisthub: dataSingleSpace?.therapisthub,
        userImage: dataSingleSpace?.userImage,
        _id: dataSingleSpace?._id
      };
      // dispatch(setReciptData(objectdata));
      setReceipts(objectdata);

      const arraytemp = [...makeDateAndSlots];
      arraytemp?.splice(index, 1);
      setMakeDateAndSlots(arraytemp);
      const arraytempselectedAray = [...selectedBookedData];
      arraytempselectedAray?.splice(index, 1);
      setSelectedBookedData(arraytempselectedAray);
      dispatch(setBookingDataInbooking(arraytempselectedAray));

      Bookingdatatest(data)
        .then((res) => {
          deleteBookingdata(res?.data[0]?._id)
            .then((res) => {
              handleClose();
              Alert("success", "Sucessfully Cancel");
              setLoader(false);
              history.push({
                pathname: "/booking"
              });
            })
            .catch((err) => {
              Alert("error", err?.Error_Message);
              setLoader(false);
            });
        })
        .catch((err) => {
          setLoader(false);
        });

      // if(data?.status === "Upcomming" && testdata > )
      // let arraydata = [...makeDateAndSlots];
      // arraydata.splice(index, 1);
      // setMakeDateAndSlots(arraydata);
    } else {
      setLoader(false);
      Alert("error", "Booking Time is less than 24 hours");
    }
  };

  useEffect(() => {
    // getSellerInfoNameInBooking(datagetSelector?.name)
    //   // getSpaceDataPostById("6359db377d7d0bbc068d1409")
    //   .then((res) => {
    //     // setCurrentTherpistHub(res?.data);
    //   })
    //   .catch((error) => {
    //   });

    const datagetsdfsdf = dataGetSelector?.pickDate?.map((item) => {
      if (item?.timeslots?.length === 0) {
        return [];
      }
      return item;
    });
    setSingleSpace(dataGetSelector);
    setDataGetPickDate(datagetsdfsdf?.flat());

    if (datagetsdfsdf?.flat().length === 0) {
      history.push({
        pathname: "/list-center"
      });
    } else {
      // let dataget = datagetSelector?.pickDate?.map((item) => {

      const dataget = datagetsdfsdf?.map((item) => {
        return item.timeslots
          ?.filter((item2) => item2?.isBooked)
          ?.map((item3) => {
            return {
              bookingDate: item?.dateofAvailibilty,
              bookingTime: item3?.timevalue,
              price: dataGetSelector?.price,
              userName: item3?.userName,
              status: item3?.status
              // status: myFunction(
              //   moment(item?.dateofAvailibilty).format("YYYY-DD-MM")
              // ),
            };
          });
      });
      setMakeDateAndSlots(dataget?.flat());
    }

    // });
  }, [dataGetSelector]);
  useEffect(() => {
    // window.location.assign(`https://www.rehubcy.com/receipt/${bookingdata[0]?.bookingInvoiceNumber}`) //reload receipt page to avoid error 405
  }, []);
  const location = useLocation();

  // Get the ID parameter from the URL path
  const id = location.pathname.split("/").pop();

  const handleClickCalender = () => {
  };

  const pdfgenerter = () => {
    // print();
    // let item = {
    //   name: "zia",
    //   phoneNumber: "923434",
    //   tableNumber: "4543",
    //   order: [
    //     {
    //       title: "tile1",
    //     },
    //     {
    //       title: "tile2",
    //     },
    //   ],
    //   comments: "asdasdfsdf",
    //   total: "$3434",
    // };
    // var doc = new jsPDF("landscape", "px", "a4", "false");
    // doc.addImage(Logo, "png", 45, 45, 45, 45);
    // doc.setFont("serif");
    // doc.text(120, 50, "Name:");
    // doc.text(160, 50, item.name);
    // doc.text(120, 70, "Phone Number:");
    // doc.text(200, 70, item.phoneNumber);
    // // doc.text(320, 70, "Table Number:");
    // // doc.text(400, 70, item.tableNumber);
    // doc.text(120, 90, "Email:");
    // doc.text(160, 90, "muhammadzia@gmail.com");
    // // doc.lineTo(80,300,"|")
    // doc.rect(80, 120, 500, 200);
    // item.order.map((orderitem) => {
    //   doc.text(100, 140, orderitem.title);
    //   // doc.text(200, 90, orderitem.);
    // });
    // doc.text(100, 250, "Total");
    // doc.text(500, 250, item.total);
    // doc.rect(80, 320, 500, 80);
    // doc.text(85, 350, "Comments:");
    // {
    //   item.comments
    //     ? doc.text(165, 350, item?.comments)
    //     : doc.text(165, 350, "No Comments");
    // }
    // doc.rect(80, 400, 500, 30);
    // doc.text(100, 150, item.order);
    // doc.text(60, 160, "Phone Number:");
    // doc.text(60, 180, "Table Number:");
    // doc.text(60, 200, "Order:");
    // doc.text(60, 220, "Total:$");
    // doc.text(60, 240, "Comments:");
    // doc.text(150, 160, item.phoneNumber);
    // doc.text(150, 180, item.tableNumber);
    // doc.text(100, 200, item.titleNames);
    // doc.html(document.querySelector("#content"), {
    //   callback: function (pdf) {
    //     pdf.save(`CustomerOrder${item.tableNumber}.pdf`);
    //   },
    // });
    // doc.save(`rehub.pdf`);
  };

  // useEffect(() => {
  //   // setCurreentUserSlots()
  // }, [currentSelectSlots]);

  function Prints() {
    return (
      <div>
        <p>
          This is a Time and Materials Statement of Work between Northwestern Mutual Life Insurance Company and Infosys
          with all general terms and conditions as described in the current Master Agreement and its related documents
        </p>
      </div>
    );
  }

  const print = () => {
    // const string = renderToString(<Prints />);
    // const pdf = new jsPDF("p", "mm", "a4");
    // pdf.fromHTML(string);
    // pdf.save("pdf");
    // pdf.fromHTML(document.body, {
    //   callback: function (doc) {
    //     string.save();
    //   },
    // });
  };
  const exportPDF = () => {
    const element = (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className={classes.DivImageLogo}>
          <div>
            <img className={classes.ImageLogo} src={Logo} alt="Logo" />
          </div>
        </div>
        <div className={classes.invoicenumber}>
          <div>INVOICE:</div>
          <div>{getInvoiceNumber}</div>
        </div>
        <div className={classes.Reciept}>
          <div className={classes.bookingrecd1}>
            <div className={classes.bookingleftbothrecdiv}>
              <div className={classes.bookingrecd2}>
                {/* <img
                  className={classes.bookingspaceImage}
                  src={`${baseURLSeoncd}/${dataSingleSpace?.spaceImage}`}
                /> */}
                <h6 className={classes.bookingrech1}>{dataSingleSpace[0]?.spaceName}</h6>
                <p className={classes.bookingrecp1}>{dataSingleSpace[0]?.spaceId?.address}</p>
                <h6
                  className={classes.bookingrech2}
                  style={{
                    marginLeft: "10px"
                  }}
                >
                  € {dataSingleSpace[0]?.spacePrice}
                </h6>
              </div>
              <div className={classes.bookingrecd3}>
                <h6 className={classes.bookingrech3}>Buyer Contact Information</h6>
                <div className={classes.bookingrecd4}>
                  <div className={classes.bookingrecd5}>
                    <img className={classes.bookingimgrec1} src={profile} alt="" />
                    <div className={classes.bookingrecd6}>
                      <h6 className={classes.bookingrech4}>
                        {authorizedUser?.firstName} {authorizedUser?.lastName}
                      </h6>
                      <p className={classes.bookingrecp3}>
                        Member since
                        <span className="ml-3">{moment(userSplitDate).format("DD/MM/YYYY")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.bookingrecd3}>
                <h6 className={classes.bookingrech3}>Seller Contact Information</h6>
                <div className={classes.bookingrecd4}>
                  <div className={classes.bookingrecd5}>
                    <img className={classes.bookingimgrec1} src={profile} alt="" />
                    <div className={classes.bookingrecd6}>
                      <h6 className={classes.bookingrecp3}>
                        {" "}
                        {dataSingleSpace[0]?.spaceId?.therapisthub?.firstName}{" "}
                        {dataSingleSpace[0]?.spaceId?.therapisthub?.lastName}
                      </h6>
                      <p className={classes.bookingrecp3}>
                        Member since
                        <span className="ml-3">{moment(sellerSplitDate).format("DD/MM/YYYY")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.recieptd1}>
              <h6 className={classes.reciepth1}>Booked Date and Time Slot</h6>
              <div className={classes.div_recieptbooked}>
                {/* <h6 className={classes.reciepth6}> 09/10/2022</h6> */}
                {/* <p className={classes.recieptp1}>1:00pm -2:00pm</p> */}

                {dataSingleSpace &&
                  dataSingleSpace?.map((item) => {
                    return (
                      <div className={classes.div_date_time}>
                        <h6 className={classes.reciepth6}> {item?.bookingDate}</h6>

                        <p className={classes.recieptp1}>{item?.bookingTime}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const doc = new jsPDF("p", "pt", "letter");
    doc.html(ReactDOMServer.renderToString(element), {
      callback(doc) {
        doc.save("sample.pdf");
      }
    });
  };

  useEffect(() => {
    const res = dispatch(getContentApi());
    res.then((data) => {
      const content = data.payload.data;
      if (content?.length) {
        setPlatformFee(content[0].platFormFee);
      }
    });

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <>
      <Header />
      {dataSingleSpace && (
        <div className="Reciept">
          <div
            style={{
              height: `${path === "/receipt" ? "auto" : ""}`
            }}
            className="bookingrecd1"
          >
            <div className="bookingleftbothrecdiv">
              <div className="bookingrecd2">
                <h6 className="bookingrech1">{dataSingleSpace[0]?.spaceName}</h6>
                <p className="bookingrecp1">{dataSingleSpace[0]?.spaceId?.address}</p>
                <p className="px-2 my-3 text-xl font-bold">Payment</p>
                <div className="px-2 grid grid-cols-2 gap-2">
                  <p className="my-0 text-lg">Space Rental</p>
                  <p className="my-0 text-lg">€{(dataSingleSpace[0]?.spacePrice || 0) * (dataSingleSpace?.length || 0)}</p>

                  <p className="my-0 text-lg">Rehub fee</p>
                  <p className="my-0 text-lg">€ {dataSingleSpace?.length * platformFee}</p>

                  <p className="my-0 text-lg"> VAT on Platform Fee</p>
                  <p className="my-0 text-lg">€ {(platformFee * 0.19).toFixed(2)}</p>

                  <p className="my-0 text-lg">Total</p>
                  <p className="my-0 text-lg">
                    €{" "}
                    {(dataSingleSpace[0]?.spacePrice || 0) * (dataSingleSpace?.length || 0) +
                      (dataSingleSpace?.length || 0) * platformFee +
                      platformFee * 0.19}
                  </p>
                </div>
                <a className="recieptdownloadiconlink" href="#!" title="download as pdf">
                  <DownloadForOfflineIcon
                    className="recieptdownloadicon"
                    style={{ color: primaryColor }}
                    onClick={exportPDF}
                  />
                  {/* <button onClick={exportPDF}>print</button> */}
                </a>
              </div>
              <div className="bookingrecd3">
                <h6 className="bookingrech3">Contact Information</h6>
                <div className="bookingrecd4">
                  <div className="bookingrecd5">
                    <img className="bookingimgrec1" src={profile} alt="" />
                    <div className="bookingrecd6">
                      <h6 className="bookingrech4">
                        {authorizedUser?.firstName} {authorizedUser?.lastName}
                      </h6>
                      <p className="bookingrecp3">
                        Member since
                        <span className="ml-3">{moment(userSplitDate).format("DD/MM/YYYY")}</span>
                      </p>
                    </div>
                  </div>
                  {/* <EmailOutlinedIcon
                  className="bookingimgrec2"
                  sx={{ color: "#000000" }}
                /> */}
                </div>
              </div>
              <div className="recieptd1">
                <h6 className="reciepth1">Booked Date and Time Slot</h6>
                <div className="div_recieptbooked">
                  {/* <h6 className="reciepth6">09/10/2022</h6> */}

                  {/* <p className="recieptp1">1:00pm - 2:00pm</p>
                <p className="recieptp1">1:00pm - 2:00pm</p> */}

                  {dataSingleSpace &&
                    dataSingleSpace?.map((item) => {
                      return (
                        <>
                          <h6 className="reciepth6"> {item?.bookingDate}</h6>

                          <p className="recieptp1">{item?.bookingTime}</p>
                        </>
                      );
                    })}
                </div>

                {/* <p className="recieptp1">1:00pm - 3:00pm</p> */}
              </div>

              <div className="recieptd2">
                {/* <a href="/google-calender" target="_blank">
                <button className="recieptb1">Add to Google Calender</button>
              </a> */}
                <GoogleCalender bookingdata={bookingData} />
                <button
                  className="recieptb2"
                  onClick={handleOpen}
                  style={{
                    color: primaryColor,
                    border: `2px solid ${primaryColor}`
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="textslots">Which Slot do you want to delete?</p>
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 560 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      // align="center"
                      sx={{
                        width: "20px"
                      }}
                    >
                      S.no{" "}
                    </TableCell>
                    <TableCell
                      // align="center"
                      sx={{
                        width: "70px"
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      // align="center"
                      sx={{
                        width: "70px"
                      }}
                    >
                      Slots
                    </TableCell>
                    <TableCell
                      // align="center"
                      sx={{
                        width: "60px"
                      }}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedBookedData &&
                    selectedBookedData?.map((item, index) => {
                      return (
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={{
                              width: "20px"
                            }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              width: "50px"
                            }}
                          >
                            {item?.bookingDate}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              width: "50px"
                            }}
                          >
                            {item?.bookingTime}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              width: "50px"
                            }}
                          >
                            <Button onClick={() => handleCancelBooking(item, index)}>
                              {loaderIndex === index && loader ? <LoadingProgressBar /> : "Cancel"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Modal>
      <Footer />
    </>
  );
}

export default Receipt;
