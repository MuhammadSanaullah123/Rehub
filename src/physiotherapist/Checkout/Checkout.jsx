import TextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { getContentApi } from "../../redux/UserReducerApis";
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
import profile from "../../assets/profile.png";
import { updateSpaceSingleAfterBook } from "../../services/Spaces";
import { addBooking, getBookingAll } from "../../services/Books";
import { setReciptData } from "../../features/bookingSlice";
import { Alert } from "../../common/Alert";
import instance, { baseURL, baseURLSecond } from "../../common/AxiosInstance";

function Checkout() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  // let redirect_Page = () => {
  //   let tID = setTimeout(function () {
  //     window.location.href = "http://localhost:3000/receipt";
  //     window.clearTimeout(tID);
  //   }, 5000);
  // };
  const bookingdata = useSelector((state) => state?.booking?.bookingdata);

  const bookID = bookingdata[0]?.bookingInvoiceNumber;

  const [objectValueSpace, setObjectValueSpace] = useState({});

  const currentSelectSlots = useSelector((state) => state?.booking?.userCurrentSlotsSelected);
  const userDetail = useSelector((state) => state?.user?.value);
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentSpace = useSelector((state) => state?.booking?.singleSpaceSelect);
  const updatedPickDate = useSelector((state) => state?.booking?.updatePickDate);
  const authorizedUser = useSelector((state) => state.user);

  const [name, setName] = useState(`${userDetail?.firstName}  ${userDetail?.lastName}`);
  const [email, setEmail] = useState(userDetail?.user?.email);
  const [address, setAddress] = useState(userDetail?.location);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [sha1Value, setSha1Value] = useState();
  const [pfee, setPFee] = useState(0);
  const [open, setOpen] = useState(false);
  const newPrice =
    (currentSpace?.price || 0) * (bookingdata?.length || 0) + (bookingdata?.length || 0) * pfee + pfee * 0.19;
  const finalPurChaeVal1 = newPrice.toString().replace(/\./g, "");
  const newValuePurch11 = finalPurChaeVal1.padStart(12, "0");

  //password//76u2713l//meriid//AcqID//testId//price

  //76u2713l0093149011402971finalPurChaeVal1
  const signatureStringBef =
    "76u2713l" + "0093149011" + `402971${bookingdata[0]?.bookingInvoiceNumber}${newValuePurch11}840`;

  if (signatureStringBef.includes("NaN")) {
  } else {
    logSha1(signatureStringBef);
  }

  const textString = sha1Value?.toString();
  let binKey;

  if (typeof textString === "string" || textString instanceof String) {
    binKey = Buffer.from(textString, "hex");
  }
  // it's a string
  else {
  }

  const u8 = new Uint8Array(binKey);
  const b64 = Buffer.from(u8).toString("base64");

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPFee(item.platFormFee);
      });
    });
  }, []);
  function goToExternalURL() {

    const newData ={
      Version: "1.0.0",
      MerID: "0093149011",
      AcqID: "402971",
      PurchaseAmt: newValuePurch11,
      PurchaseCurrency: "840",
      PurchaseCurrencyExponent: "2",
      OrderID: bookingdata[0]?.bookingInvoiceNumber,
      CaptureFlag: "A",
      Signature: b64,
      SignatureMethod: "SHA1",
      MerRespURL: `https://rehubcy.com/api/receipt/${bookID}`
    };  
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://tjccpg.jccsecure.com/EcomPayment/RedirectAuthLink';
  
    // Sample 1
    Object.keys(newData).map(key => {
      const hiddenFieldSample1 = document.createElement('input');
      hiddenFieldSample1.type = 'hidden';
      hiddenFieldSample1.name = key;
      hiddenFieldSample1.value = newData[key];
      form.appendChild(hiddenFieldSample1);
    })
  
    document.body.appendChild(form);
    form.submit();
  }
  const handleOpen = async () => {
    await sendSendBackData();
    goToExternalURL()

    setOpen(true);
    // redirect_Page();

    // formRef.current.submit();

    // window.location.reload()
  };
  const profilePictureImg = useSelector((state) => state?.user?.value?.user?.image);

  async function logSha1(str) {
    const buffer = new TextEncoder("utf-8").encode(str);
    const digest = await crypto.subtle.digest("SHA-1", buffer);

    // Convert digest to hex string
    const result = Array.from(new Uint8Array(digest))
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");

    setSha1Value(result);
    return result;
  }

  // it's something else

  const sendSendBackData = () => {
   return new Promise((resove,reject)=>{
    updateSpaceSingleAfterBook(currentSpace?._id, updatedPickDate)
      .then((data) => {
        // SimpleAlert("success", "Sucessfully Added");
        // Alert("success", "Sucessfully Added");

        addBooking(bookingdata, authorizedUser?.value?.user?._id)
          .then((data) => {
            // SimpleAlert("success", data?.message);
            instance
              .get(`/booking/getBook/${bookID}`)
              .then((res) => {
                dispatch(setReciptData(res.data.data));
                resove()
              })
              .catch((err) => {
                reject()
              });
            Alert("success", data?.message);
          })
          .catch((err) => {
            reject()
            // SimpleAlert("error", err);
            Alert("error", err);
          });
      })
      .catch((err) => {
        reject()
        // SimpleAlert("error", err);
        Alert("error", err);
      })
   }) ;
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "650px",
    height: "121px",
    background: "#00B4FF",
    borderRadius: "6px",
    paddingLeft: "15px",
    display: "flex",
    flexDirection: "column"
  };

  useEffect(() => {
    const objectdata = {
      address: currentSpace?.address,
      name: currentSpace?.name,
      pickDate: currentSelectSlots,
      price: currentSpace?.price,
      spaceImage: currentSpace?.spaceImage,
      therapisthub: currentSpace?.therapisthub,
      userImage: currentSpace?.userImage,
      _id: currentSpace?._id
    };
    setObjectValueSpace(objectdata);
  }, [currentSelectSlots, currentSpace]);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);
  useEffect(() => {
    // getBookingAll()
    //   .then((response) => {
    //     // setTempBookingArray(response?.data);
    //     let arraygGet = response?.data?.map((item) => {
    //       return {
    //         ...item,
    //         status: myFunction(moment(item?.bookingDate).format("YYYY-DD-MM")),
    //       };
    //     });
    //     updateBookingAll(arraygGet)
    // .then((res) => {

    getBookingAll()
      .then((response) => {
        response?.data.map((item) => {
        });

        // dispatch(setBookingDataAdmin(response?.data));
      })
      .catch((error) => {
        // SimpleAlert("error", error);
        Alert("error", error);
      });
    //     })
    //     .catch((error) => {
    //       // SimpleAlert("error", error);
    //       Alert("error", error);
    //     });
    // })
    // .catch((error) => {
    //   // SimpleAlert("error", error);
    //   Alert("error", error);
    // });
  }, []);

  const litral = `https://rehubcy.com/api/receipt/${bookID}`;

  return (
    <>
      <Header />
      <div className="Checkout">
        <div className="checkoutinfo">
          <h6 className="checkoutinfoh1">Required Info</h6>
          <div className="checkoutinfod1">
            <div className="checkoutinfod3">
              <p className="checkoutinfolabel">Name</p>
              <TextField
                className="filled-basic1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="filled"
              />
            </div>
            <div className="checkoutinfoverl1" />
            <div className="checkoutinfod3">
              <p className="checkoutinfolabel">Email</p>

              <TextField
                className="filled-basic2"
                value={authorizedUser?.value?.userName}
                // onChange={(e) => setEmail(e.target.value)}
                variant="filled"
              />
            </div>
          </div>
          <div className="checkoutinfod2">
            <p
              style={{
                width: "95%",
                textAlign: "start",
                marginTop: "0"
              }}
              className="checkoutinfolabel"
            >
              Address
            </p>
            <TextField
              className="filled-basic3"
              value={authorizedUser?.value?.location}
              // onChange={(e) => setAddress(e.target.value)}
              variant="filled"
            />
          </div>
        </div>
        <div className="checkoutpay">
          <h6 className="checkoutpayh1">Payment</h6>
          <div className="checkoutpayd1">
            <h6 className="checkoutpayh2">Space Rental</h6>
            <p className="checkoutpayp1">€{(currentSpace?.price || 0) * (bookingdata?.length || 0)}</p>
          </div>
          <div className="checkoutpayd2">
            <h6 className="checkoutpayh2">Rehub fee</h6>
            <p className="checkoutpayp1">
              € {bookingdata?.length * pfee}
              {/* {bookingdata?.length * currentSpace?.price} */}
            </p>
          </div>
          <div className="checkoutpayd2">
            <h6 className="checkoutpayh2"> VAT on Platform Fee</h6>
            <p className="checkoutpayp1">
              € {(pfee * 0.19).toFixed(2)}
              {/* {bookingdata?.length * currentSpace?.price} */}
            </p>
          </div>
          <div className="checkoutpayd3">
            <h6 className="checkoutpayh3">Total</h6>
            <p className="checkoutpayp2">
              €{" "}
              {(currentSpace?.price || 0) * (bookingdata?.length || 0) +
                (bookingdata?.length || 0) * pfee +
                pfee * 0.19}
            </p>
          </div>
        </div>
        <div className="checkoutleftpage">
          <div className="checkoutbooking">
            <h6 className="checkoutbookingh1">Booking Details</h6>
            <h6
              style={{
                margin: "20px 0 0 10px"
              }}
              className="checkoutbookingh2"
            >
              Space Name
            </h6>
            <p className="checkoutbookingp1">{currentSpace?.name}</p>
            <h6 className="checkoutbookingh2">Address</h6>
            <p className="checkoutbookingp1">{currentSpace?.address}</p>
          </div>
          <div className="checkoutdate">
            <h6 className="checkoutdateh1">Date and Time</h6>
            {currentSelectSlots?.map((item) => {
              return (
                <>
                  <h6 className="checkoutdateh2">{item?.dateofAvailibilty}</h6>
                  {item?.timeslots?.map((item2) => {
                    return <p className="checkoutdatep1">{item2?.timevalue}</p>;
                  })}
                </>
              );
            })}
            {/* <h6 className="checkoutdateh1">Date and Time</h6>
            <h6 className="checkoutdateh2">19 sep 2020</h6>
            <p className="checkoutdatep1">1:00pm - 3:00pm</p> */}
          </div>
          <div className="checkoutcontact">
            <h6 className="checkoutcontacth1">Contact Information</h6>
            <div className="checkoutcontactd4">
              <div className="checkoutcontactd5">
                <img
                  className="checkoutcontactimg1"
                  src={
                    profilePictureImg != undefined
                      ? profilePictureImg.startsWith("http")
                        ? profilePictureImg
                        : `${baseURLSecond}/${profilePictureImg}`
                      : profile
                  }
                  alt=""
                />
                <div className="checkoutcontactd6">
                  <h6 className="checkoutcontacth4">
                    {authorizedUser?.value?.firstName} {authorizedUser?.value?.lastName}
                  </h6>
                  <p className="checkoutcontactp3">
                    Member since {authorizedUser?.value?.user?.createdAt.slice(0, 10)}
                  </p>
                </div>
              </div>
              {/* <EmailOutlinedIcon
                className="checkoutcontactimg2"
                sx={{ color: "#000000" }}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="checkoutbtndiv">
          <input
            className="checkoutbtndivb1"
            value="Check Out"
            style={{ background: primaryColor }}
            onClick={handleOpen}
            name="submitPaymentButton"
          />
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img className="checkoutbtndivimg1" src={plane} alt="" />
            <p className="checkoutbtndivp1">
              Confirmation will be sent to your email address
            </p>
          </Box>
        </Modal> */}
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
