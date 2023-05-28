import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Rating } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Cookies from "universal-cookie";
import Calendar from "react-calendar";
import Geocode from "react-geocode";
import moment from "moment";
import axios from "axios";
import { v4 as uuid } from "uuid";
import ImageViewer from "react-simple-image-viewer";
import LocationPin from "../../mainLayout/GoogleMap/LocationPin";
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
import profile from "../../assets/profile.png";
import { getIndividualSpace } from "../../services/AddSpace";
import { setBookingDataInbooking, setUpdatedPickedDate, setUserCurrentSelect } from "../../features/bookingSlice";
import { Alert } from "../../common/Alert";
import { GetAllReview } from "../../services/Review";
import { baseURL, baseURLSecond } from "../../common/AxiosInstance";
import "./booking.scss";
import { parseTimeRange } from "../../helper/time.helper";

function Booking() {
  const history = useHistory();
  const cookies = new Cookies();
  const location = useLocation();
  const dispatch = useDispatch();
  const spData = location.state;
  const [openImageView, setOpenImageView] = useState(false);
  const [spaceData, setSpaceData] = useState([]);
  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [pickDate, setPickDate] = useState([]);
  const [currentDateSlots, setCurrentDateSlots] = useState([]);
  const [allSpaceDate, setAllSpaceDate] = useState([]);
  const [allSpaceDateTest, setAllSpaceDateTest] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const getToken = localStorage.getItem("rehub_token");
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [timeSlots, setTimeSlots] = useState({});
  const authorizedUser = useSelector((state) => state?.user);
  const usersplitdate = authorizedUser?.value?.user?.createdAt?.split("T")[0];
  const datagetfiltered = useSelector((state) => state?.booking?.singleSpaceSelect);
  const [selectDate, setSelectDate] = useState(spData?.date ? new Date(spData.date) : new Date());

  const [reviewData, setReviewData] = useState([]);
  const [review, setReview] = useState(false);

  useEffect(() => {
    if (spaceData) {
      Geocode.setApiKey("AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY");
      Geocode.fromAddress(spaceData.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setlatitude(lat);
          setlongitude(lng);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    /*  cookies.remove("addresscook");
    handleDeletecookie(); */
  }, [spaceData]);

  useEffect(() => {
    GetAllReview()
      .then((response) => {
        const newPerson = response?.person.filter((item) => {
          return item?.space?._id === spData?.spaceid && item.rating !== "0";
        });
        setReviewData(newPerson);
        // SimpleAlert("success", "Sucessfully Data get");
      })
      .catch((error) => {
        // SimpleAlert("error", error);
      });
  }, []);

  const isPast = useCallback(
    (rangeString) => {
      const selectedTime = new Date(selectDate);
      const currentDateTime = new Date();
      const [, endTimeString] = rangeString.timevalue.split("-");
      const minute = +endTimeString.split(":")[1].replace(/\D/g, "");
      const toTime =
        +endTimeString.split(":")[0] +
        ((endTimeString.includes("pm") || endTimeString.includes("12:00am")) && !endTimeString.includes("12:00pm")
          ? 12
          : 0);
      return (
        new Date(selectedTime.getFullYear(), selectedTime.getMonth(), selectedTime.getDate(), toTime, minute) <=
        currentDateTime
      );
    },
    [selectDate]
  );

  const handleTime = (data, index, e) => {
    if (isPast(data)) {
      return;
    }

    const originalpickupdate = [...pickDate].map((options) => {
      if (options?.dateofAvailibilty === moment(selectDate).format("DD/MM/YYYY")) {
        return {
          ...options,
          timeslots: timeSlots?.timeslots?.map((opti, idx) => {
            if (index === idx) {
              return {
                ...opti,
                isBooked: opti?.isBooked !== true,
                // isBookedDis: opti?.isBooked === true ? false : true,
                userName: authorizedUser?.value?.user?._id,
                dateofbooking: moment(selectDate).format("DD/MM/YYYY"),
                frontendSelected: opti?.frontendSelected !== true
              };
              // }
            }
            return opti;
          })
        };
      }
      return options;
    });
    if (!originalpickupdate.find((date) => date?.dateofAvailibilty === moment(selectDate).format("DD/MM/YYYY"))) {
      originalpickupdate.push({
        dateofAvailibilty: moment(selectDate).format("DD/MM/YYYY"),
        timeslots: timeSlots?.timeslots?.map((opti, idx) => {
          if (index === idx) {
            return {
              ...opti,
              isBooked: opti?.isBooked !== true,
              userName: authorizedUser?.value?.user?._id,
              dateofbooking: moment(selectDate).format("DD/MM/YYYY"),
              frontendSelected: opti?.frontendSelected !== true
            };
          }
          return opti;
        })
      });
    }
    setPickDate(originalpickupdate);
  };

  const handleChangeDate = (e) => {
    setSelectDate(e);

    let originalArray = [...pickDate];
    originalArray = originalArray.filter((item) => item?.dateofAvailibilty === moment(e).format("DD/MM/YYYY"));

    const filteredSlots = scheduleSlots
      .filter((slot) => {
        const selectedDate = moment(selectDate)?.format("YYYY-MM-DD");
        if ((slot.endDate && slot.endDate < selectedDate) || slot.currentDate > selectedDate) {
          return false;
        }
        if (slot.currentDate) {
          const diffDays = moment(selectedDate, "YYYY-MM-DD").diff(moment(slot.currentDate, "YYYY-MM-DD"), "days");
          return diffDays % (slot.repeatEvery * slot.repeatType) === 0;
        }
        return true;
      })
      .map((slot) => ({
        dateofbooking: null,
        frontendSelected: false,
        isBooked: false,
        isBookedDis: false,
        isTimeSelected: true,
        status: null,
        timevalue: `${moment(slot.startTime, "HH:mm").format("hh:mma")}-${moment(slot.endTime, "HH:mm").format(
          "hh:mma"
        )}`,
        userName: null
      }))
      .filter((slot) => !(originalArray?.[0]?.timeslots || []).some((oSlot) => oSlot.timevalue === slot.timevalue));
    setCurrentDateSlots(filteredSlots);
    const timeslots = [...(originalArray?.[0]?.timeslots || []), ...filteredSlots].sort((aSlot, bSlot) =>
      parseTimeRange(aSlot.timevalue).reduce((sum, slotTime) => sum + slotTime, 0) >
      parseTimeRange(bSlot.timevalue).reduce((sum, slotTime) => sum + slotTime, 0)
        ? 1
        : -1
    );
    setTimeSlots({ ...originalArray[0], timeslots });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getIndividualSpace(datagetfiltered?._id)
      .then((data) => {
        setSpaceData(data.result);
        setPickDate(data.result?.pickDate);
        setScheduleSlots(data.result?.scheduleTimeSlot?.scheduleSlots || []);
      })
      .catch((err) => {
        // SimpleAlert("error", err);
        Alert("error", err);

        // setLoading(false);
      });
    // setSpaceData(datagetfiltered);
    // setPickDate(datagetfiltered?.pickDate);
  }, [datagetfiltered]);

  useEffect(() => {
    const arrayData =
      pickDate?.map((data) => {
        return data?.dateofAvailibilty;
      }) || [];
    setAllSpaceDate(arrayData);

    let originalArray = [...pickDate];

    if (originalArray?.length > 0) {
      originalArray = originalArray?.map((item) => {
        return {
          ...item,
          timeslots: item?.timeslots?.map((item2) => {
            return {
              ...item2,
              frontendSelected: false
            };
          })
        };
      });
      const temp = originalArray?.filter(
        (item) => item?.dateofAvailibilty === moment(selectDate)?.format("DD/MM/YYYY")
      );

      const filteredSlots = scheduleSlots
        .filter((slot) => {
          const selectedDate = moment(selectDate)?.format("YYYY-MM-DD");
          if ((slot.endDate && slot.endDate < selectedDate) || slot.currentDate > selectedDate) {
            return false;
          }
          if (slot.currentDate) {
            const diffDays = moment(selectedDate, "YYYY-MM-DD").diff(moment(slot.currentDate, "YYYY-MM-DD"), "days");
            return diffDays % (slot.repeatEvery * slot.repeatType) === 0;
          }
          return true;
        })
        .map((slot) => ({
          dateofbooking: null,
          frontendSelected: false,
          isBooked: false,
          isBookedDis: false,
          isTimeSelected: true,
          status: null,
          timevalue: `${moment(slot.startTime, "HH:mm").format("hh:mma")}-${moment(slot.endTime, "HH:mm").format(
            "hh:mma"
          )}`,
          userName: null
        }))
        .filter((slot) => !(temp?.[0]?.timeslots || []).some((oSlot) => oSlot.timevalue === slot.timevalue));
      setCurrentDateSlots(filteredSlots);
      const timeslots = [...(temp?.[0]?.timeslots || []), ...filteredSlots].sort((aSlot, bSlot) =>
        parseTimeRange(aSlot.timevalue).reduce((sum, slotTime) => sum + slotTime, 0) >
        parseTimeRange(bSlot.timevalue).reduce((sum, slotTime) => sum + slotTime, 0)
          ? 1
          : -1
      );
      setTimeSlots({ ...temp[0], timeslots });
    }
  }, [selectDate, pickDate]);

  const checktest = (bookingDate) => {
    const currentdate = new Date();

    const chnagefortmate = moment(currentdate).format("DD/MM/YYYY");

    const splitMonth = chnagefortmate.split("/")[1];

    const splitdate = chnagefortmate.split("/")[0];

    let splitd = bookingDate.split("/")[0];

    splitd = splitd < 10 ? `0${splitd}` : splitd;

    const splitM = bookingDate.split("/")[1];

    if (splitd === splitdate && splitM === splitMonth) {
      return "Upcoming";
    }
    if (splitd > splitdate && splitM >= splitMonth) {
      return "Upcoming";
    }
    return "Previous";
  };

  const handleClikcUpateandPay = () => {
    let newProject = [];
    const currentSelected = [...pickDate];

    const addUserIdandbooking = [...pickDate];

    const datahcecksurrent = new Date();
    const datahcecksurrentformat = moment(datahcecksurrent).format("DD/MM/YYYY");
    const changepickdate = addUserIdandbooking.map((item) => {
      return {
        ...item,
        timeslots: item?.timeslots.map((item2) => {
          return {
            // ...item2,
            userName: item2?.isBooked && item2?.userName === null ? authorizedUser?.value?.user?._id : item2?.userName,

            dateofbooking: item2?.isBooked ? datahcecksurrentformat : null,
            isTimeSelected: item2?.isTimeSelected,
            timevalue: item2?.timevalue,
            isBooked: item2?.isBooked,
            // status: myFunction(
            //   moment(item?.dateofAvailibilty).format("YYYY-DD-MM")
            // ),
            status: checktest(item?.dateofAvailibilty)
          };
        })
      };
    });

    // let datacheck = changepickdate?.map((item)=>{
    //   return{
    //     ...item,

    //   }
    // })

    const Project = pickDate?.map((item) => {
      return item.timeslots
        ?.filter((item2) => item2?.isBooked && item2?.frontendSelected)
        ?.map((item3) => {
          return {
            bookingDate: item?.dateofAvailibilty,
            bookingTime: item3?.timevalue,
            // status: myFunction(
            //   moment(item?.dateofAvailibilty).format("YYYY-DD-MM")
            // ),
            status: checktest(item?.dateofAvailibilty)
          };
        });
    });

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 6);
    newProject = Project?.flat()?.map((project) => {
      return {
        ...project,
        spaceName: spaceData?.name,
        userName: `${authorizedUser?.value?.firstName}  ${authorizedUser?.value?.lastName} `,
        userId: authorizedUser?.value._id,
        reviewSubmit: false,
        spacePrice: spaceData?.price,
        spaceImage: spaceData?.spaceImage,
        spaceId: spaceData?._id,
        bookingInvoiceNumber: small_id
      };
    });

    const current = currentSelected
      ?.map((item) => {
        return {
          ...item,
          timeslots: item.timeslots?.filter((item2) => item2?.isBooked && item2?.frontendSelected)
        };
      })
      .filter((item3) => item3?.timeslots?.length !== 0);

    if (newProject?.length === 0) {
      Alert("error", "Please select a slot");
    } else {
      const current1 = changepickdate.map((item) => {
        return {
          ...item,
          timeslots: item?.timeslots?.map((item1) => {
            return {
              ...item1,
              isBookedDis: !!item1.isBooked
            };
          })
        };
      });

      dispatch(setUserCurrentSelect(current));
      dispatch(setBookingDataInbooking(newProject));
      dispatch(setUpdatedPickedDate(current1));

      // updateSpaceSingleAfterBook(spaceData?._id, changepickdate)
      //   .then((data) => {
      //     SimpleAlert("success", "Sucessfully Added");
      //     addBooking(newProject, userData?.value?.user?._id)
      //       .then((data) => {
      //         SimpleAlert("success", data?.message);
      //       })
      //       .catch((err) => {
      //         SimpleAlert("error", err);
      //       });
      //   })
      //   .catch((err) => {
      //     SimpleAlert("error", err);
      //   });
      history.push({
        pathname: "/checkout"
      });

      // dispatch(setSingleSpaceData(datagetfiltered));
    }
  };

  useEffect(() => {
    const chnagedatearray = [...allSpaceDate];
    const currentdate = moment().format("DD/MM/YYYY");

    const splitdate = currentdate.split("/");
    const dattchange = chnagedatearray?.filter((item) => {
      // if(item?.split("/")[0] > splitdate[0] && item?.split("/")[1] >= splitdate[1] &&  item?.split("/")[2] >= splitdate[2] )
      return (
        item?.split("/")[0] >= splitdate[0] &&
        item?.split("/")[1] >= splitdate[1] &&
        item?.split("/")[2] >= splitdate[2]
      );
    });
    // setAllSpaceDate(dattchange);
    setAllSpaceDateTest(dattchange);
  }, [allSpaceDate]);

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPrimary(item.primaryColor);
        setSecondary(item.secondaryColor);
      });
    });
  }, []);

  const profilePictureImg = useSelector((state) => state?.user?.value?.user?.image);

  return (
    <>
      <Header />
      <div className="Booking w-full box-border">
        <div className="bookingd1">
          <div className="bookingleftbothdiv">
            <div className="bookingd2">
              <h6 className="bookingh1">{spaceData?.name} </h6>
              <p className="bookingp1">{spaceData?.address}</p>
              <h6 className="bookingh2">€{spaceData?.price}</h6>
            </div>
            <div className="bookingd3">
              <h6 className="bookingh3">Contact Information</h6>
              <div className="bookingd4">
                <div className="bookingd5">
                  <img
                    className="bookingimg1"
                    src={
                      profilePictureImg != undefined
                        ? profilePictureImg.startsWith("http")
                          ? profilePictureImg
                          : `${baseURLSecond}/${profilePictureImg}`
                        : profile
                    }
                    alt=""
                  />

                  <div className="bookingd6">
                    <h6 className="bookingh4">
                      {spaceData?.therapisthub?.firstName}

                      {spaceData?.therapisthub?.lastName}
                    </h6>
                    <p className="bookingp3">
                      Member since {moment(usersplitdate).format("DD/MM/YYYY")}
                      {/* {splitdateDay} {splitdateMonth} {splitdateYear} */}
                    </p>
                  </div>
                </div>
                {/* <EmailOutlinedIcon
                  className="bookingimg2"
                  sx={{ color: "#000000" }}
                /> */}
                <div className="h-fit mb-auto ml-2 text-xs detailed-information">{spaceData?.detailedInformation}</div>
              </div>
            </div>
          </div>

          <div
            className="bookingd7 flex bg-contain bg-no-repeat bg-center cursor-pointer"
            style={{ backgroundImage: `url(${baseURLSecond}/${spaceData?.spaceImage})` }}
            onClick={() => setOpenImageView(true)}
          >
            {openImageView && (
              <div className="z-[1000]">
                <ImageViewer
                  src={[`${baseURLSecond}/${spaceData?.spaceImage}`]}
                  closeOnClickOutside
                  closeComponent={<></>}
                  onClose={() => setOpenImageView(false)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="" style={{ height: "400px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY"
            }}
            defaultCenter={[latitude, longitude]}
            defaultZoom={9}
            center={[latitude, longitude]}
            zoom={latitude === 35.14 && longitude === 33.17 ? 8 : 16}
            options={{ gestureHandling: "greedy" }}
          >
            <LocationPin lat={latitude} lng={longitude} />
          </GoogleMapReact>
        </div>

        {getToken ? (
          <div className="bookingcaltime">
            <div
              className="bookingcaltimed1"
              style={{
                background: `linear-gradient(106.26deg, ${primaryColor} 11.37%, ${secondaryColor} 61.29%)`
              }}
            >
              <h6 className="bookingcaltimeh1">Pick a date and time</h6>
              <Calendar
                onChange={handleChangeDate}
                value={selectDate}
                defaultValue={spData?.date ? new Date(spData.date) : new Date()}
                minDate={new Date()}
                showNeighboringMonth={false}
                prevLabel={<ArrowBackIosNewIcon />}
                nextLabel={<ArrowForwardIosIcon />}
                tileClassName={({ date, view }) => {
                  if (allSpaceDateTest?.find((x) => x === moment(date)?.format("DD/MM/YYYY"))) {
                    return "highlight";
                  }
                }}
              />
            </div>
            <div className="bookingcaltimed2">
              <h6 className="bookingcaltimed2h1">Select Time Slots</h6>
              <div className="bookingcaltimed2d1">
                {timeSlots === undefined ? (
                  <div>
                    <h6 className="bookingcaltimed2h1">No Avability on this date</h6>
                  </div>
                ) : (
                  <>
                    {timeSlots?.timeslots?.map((data, index) => {
                      return (
                        <>
                          {data?.isTimeSelected ? (
                            <div
                              style={{
                                background: !data.isBooked ? "#fff" : `${primaryColor}`
                              }}
                              // className={`t01  ${
                              //   data.isBooked
                              //     ? "bookingcaltimed2d2active"
                              //     : "bookingcaltimed2d2"
                              // }`}
                              id={data.isBookedDis ? "disableButtonBooking" : ""}
                              className={`${data.isBooked ? "bookingcaltimed2d2active" : "bookingcaltimed2d2"} ${
                                isPast(data) ? "past-date" : ""
                              }`}
                              onClick={(e) => handleTime(data, index, e)}
                            >
                              {data?.timevalue}
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="bookingbtndiv">
          {getToken ? (
            <>
              <button className="bookingb1" onClick={handleClikcUpateandPay} style={{ background: primaryColor }}>
                Proceed to pay
              </button>
              <button
                className="bookingb2"
                style={{
                  backgroundColor: `${review ? primaryColor : "#fff"}`,
                  color: `${review ? "#ffffff" : primaryColor}`,
                  border: `${review ? `2px solid ${primaryColor}` : `2px solid ${primaryColor}`}`
                }}
                onClick={() => {
                  setReview(!review);
                }}
              >
                Reviews
              </button>
            </>
          ) : (
            <button
              className="bookingb1 !text-base"
              onClick={() => history.push("/login")}
              style={{ background: primaryColor }}
            >
              Login or Register to Proceed
            </button>
          )}

          {/* </Link> */}
        </div>
      </div>
      <div
        style={{
          maxWidth: "1536px",
          margin: " 0 auto",
          display: "flex",
          justifyContent: "center"
        }}
        className="homelastDiv"
      >
        <div
          className="bookingreview"
          // style={{
          //   display: `${review ? "block" : "none"}`,
          // }}
        >
          <div className="BookingTable">
            {reviewData.map((rows, index) => (
              <div
                style={{
                  display: "flex",
                  gap: "100px",
                  height: "100px",
                  borderRadius: "50px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "292px",
                    height: "50px",
                    gap: "30px",
                    borderRadius: "20px",
                    background: "#00B4FF",
                    marginTop: "20px",
                    padding: "10px",
                    fontFamily: "inter",
                    fontSize: "17px",
                    fontWeight: "300",
                    color: "white"
                  }}
                >
                  <div>
                    <img
                      className="bookingimg1"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50px"
                      }}
                      src={rows?.user?.image != undefined ? `${baseURLSecond}/${rows?.user?.image}` : profile}
                      alt=""
                    />
                  </div>
                  <div> {rows?.booking?.userName}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "20px",
                    background: "#00B4FF",
                    marginTop: "20px",
                    padding: "10px",
                    minWidth: "350px",
                    height: "auto",
                    color: "white",
                    fontFamily: "inter",
                    fontSize: "17px",
                    fontWeight: "300"
                  }}
                >
                  <div>
                    <Rating name="read-only" value={rows?.rating} readOnly />
                  </div>
                  <div>{rows?.review}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
