import React, { useEffect, useState } from "react";

//components
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
import ListProduct from "../../mainLayout/ListProduct/ListProduct";
//mui
import SimpleAlert from "../../common/Swal Alert";
import { setFilteredBookingListCenter, setupcomingBooking } from "../../features/bookingSlice";
import ReactPagination from "../SpaceProvider/ReactPagination";
import { getSpaces, updateSpaceSingleAfterBook } from "../../services/Spaces";
import BookingListProduct from "./BookingListProduct/BookingListProduct";
import {
  checkcurrentuserbookingPrevious,
  checkcurrentuserbookingUpComming,
  removeEmptyPickDate,
} from "../SpaceProvider/CommonFunctions";
import LoadingProgressBar from "../../common/LoadingProgressBar";
import { Alert } from "../../common/Alert";
import instance, { baseURL } from "../../common/AxiosInstance";

function BookingList() {
  const dispatch = useDispatch();
  const [allBooking, setAllBooking] = useState([]);

  const [allSpaceData, setAllSpaceData] = useState([]);

  const [filteredData, setFilteredData] = useState(allBooking);
  const [currentItems, setCurrentItems] = useState(null);
  const [upCommingArray, setUpCommingArray] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [previousArray, setPreviousArray] = useState([]);
  const [upCBook, setUpCBook] = useState([]);
  const [preBook, setPreBook] = useState([]);
  const [valueBooking, setValueBooking] = useState(0);
  const [tempBookingArray, setTempBookingArray] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [text, setText] = useState("Upcoming Booking");
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPrimary(item.primaryColor);
        setSecondary(item.secondaryColor);
      });
    });
  }, []);
  const [array, setArray] = useState([
    {
      date: "19 Sep 2022",
      time: "1:00pm - 2:00pm",
    },
    {
      date: "20 Sep 2022",
      time: "3:00pm - 4:00pm",
    },
    {
      date: "21 Sep 2022",
      time: "6:00pm - 7:00pm",
    },
    {
      date: "22 Sep 2022",
      time: "11:00am - 12:00pm",
    },
    {
      date: "23 Sep 2022",
      time: "9:00pm - 10:00pm",
    },
  ]);

  useEffect(() => {
    getSpaces(setLoading)
      .then((data) => {
        // setAllSpaces(data.spaceData);
        // setFilteredData(data.spaceData);
        setTempBookingArray(data?.spaceData);
      })
      .catch((err) => {
        // SimpleAlert("error", err);
        Alert("error", err);
      });
  }, []);

  // const myFunction = (e) => {
  //   var yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
  //   var SpecialToDate = e;

  //   var tommorrw = moment().add(1, "day").format("YYYY-MM-DD");
  //   if (moment(SpecialToDate, "YYYY-MM-DD", true).isAfter(yesterday)) {
  //     if (moment(SpecialToDate, "YYYY-MM-DD", true).isBefore(tommorrw)) {
  //       return "Upcoming";
  //     } else {

  //       return "Upcoming";
  //     }
  //   } else {
  //     return "Previous";
  //   }
  // };

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
    } if (splitd > splitdate && splitM >= splitMonth) {
      return "Upcoming";
    }
    return "Previous";
  };
  useEffect(() => {
    let datachange = [...tempBookingArray];
    datachange = datachange
      // ?.filter((itemfil) => itemfil?.pickDate.length !== 0)
      ?.map((item) => {
        return {
          ...item,
          pickDate: item?.pickDate
            // ?.filter((item2) => item2?.timeslots.length !== 0)
            ?.map((item3) => {
              return {
                ...item3,
                timeslots: item3?.timeslots
                  // ?.filter((item4) => item4?.isBooked)
                  ?.map((item5) => {
                    return {
                      ...item5,
                      status: item5?.isBooked ? checktest(item3?.dateofAvailibilty) : null,
                      // status: item5?.status,
                    };
                  }),
              };
            }),
        };
      });
    for (let i = 0; i < datachange?.length; i++) {
      updateSpaceSingleAfterBook(datachange[i]?._id, datachange[i]?.pickDate)
        .then((data) => {
          // SimpleAlert("success", "updated");
          // setAllSpaces(data.spaceData);
          // setFilteredData(data.spaceData);
        })
        .catch((err) => {
          // SimpleAlert("error", err);
          Alert("error", err);
        });
    }

    getSpaces(setLoading)
      .then((data) => {
        const datae = data?.spaceData
          // ?.filter((item) => item?.pickDate?.length !== 0)
          .map((item2) => {
            return {
              ...item2,
              pickDate: item2?.pickDate
                // ?.filter((item3) => item3?.timeslots?.length !== 0)
                ?.map((item4) => {
                  return {
                    ...item4,
                    timeslots: item4?.timeslots?.filter(
                      (item5) => item5?.isBooked === true,
                      // &&
                      // item5?.userName === userData?.value?.user?._id
                    ),
                  };
                }),
            };
          });

        const dataget = datae?.map((item) => {
          return {
            ...item,
            pickDate: item?.pickDate?.filter((item2) => item2?.timeslots?.length !== 0),
          };
        });
        const finalget = dataget?.filter((item) => item?.pickDate?.length !== 0);

        setAllSpaceData(finalget);

        // setAllSpaces(data.spaceData);
        // setFilteredData(data.spaceData);
      })
      .catch((err) => {
        // SimpleAlert("error", err);
        Alert("error", err);
      });
  }, [tempBookingArray]);

  useEffect(() => {
    const datagetAccording = [...allSpaceData];
    // setLoading(true);

    if (text === "View") {
      const dataofPrevious = checkcurrentuserbookingPrevious(datagetAccording, userData?.value?.user?._id);
      const dataifEmpty = removeEmptyPickDate(dataofPrevious);
      dispatch(setFilteredBookingListCenter(dataifEmpty));
      setAllBooking(dataifEmpty);
      setFilteredData(dataifEmpty);

      // let canges = datagetAccording.map((item2) => {
      //   return {
      //     ...item2,
      //     pickDate: item2?.pickDate?.map((item4) => {
      //       return {
      //         ...item4,
      //         timeslots: item4?.timeslots?.filter(
      //           (item5) =>
      //             item5?.status === "Previous" &&
      //             item5?.userName === `${userData?.value?.user?._id}`
      //         ),
      //       };
      //     }),
      //   };
      // });
      // let checkemptytimeloty = canges?.map((item2) => {
      //   return {
      //     ...item2,
      //     pickDate: item2?.pickDate?.filter(
      //       (item4) => item4?.timeslots?.length !== 0
      //     ),
      //   };
      // });

      // let checkpickdaateEmpty = checkemptytimeloty?.filter(
      //   (item) => item?.pickDate?.length !== 0
      // );
      // setLoading(false);
    } else if (text === "Upcoming Booking") {
      const dataofPrevious = checkcurrentuserbookingUpComming(datagetAccording, userData?.value?.user?._id);
      const dataifEmpty = removeEmptyPickDate(dataofPrevious);
      dispatch(setFilteredBookingListCenter(dataifEmpty));
      setAllBooking(dataifEmpty);
      setFilteredData(dataifEmpty);
      // setLoading(false);
    }

    // dispatch(setFilteredBookingListCenter(currentItems));
  }, [allSpaceData, text]);
  useEffect(() => {
    const prev = [];
    const upcom = [];
    instance

      .get(`/booking/getAllB/${userData?.value?._id}`)
      .then((res) => {
        res.data.data.map((dd) => {
          if (dd.status == "Previous") {
            prev.push(dd);
          } else {
            upcom.push(dd);
          }
        });
        const result = upcom.reduce((r, a) => {
          r[a.bookingInvoiceNumber] = r[a.bookingInvoiceNumber] || [];
          r[a.bookingInvoiceNumber].push(a);
          return r;
        }, Object.create(null));

        dispatch(setupcomingBooking(result));
        setPreBook(prev);
        setUpCBook(upcom);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    dispatch(setFilteredBookingListCenter(currentItems));
  }, [currentItems]);

  return (
    <>
      <Header />
      <div className="BookingList">
        <div className="bookinglistd1">
          <button
            className={`${text === "View" ? "bookinglistb1" : "bookinglistb2"}`}
            style={{
              background: text === "View" ? primaryColor : "",

              border: text === "View" ? "" : `1px solid ${primaryColor}`,
              color: text === "View" ? "" : primaryColor,
            }}
            onClick={() => {
              setText("View");
              const result = preBook.reduce((r, a) => {
                r[a.bookingInvoiceNumber] = r[a.bookingInvoiceNumber] || [];
                r[a.bookingInvoiceNumber].push(a);
                return r;
              }, Object.create(null));
              dispatch(setupcomingBooking(result));
            }}
          >
            Previous Bookings
          </button>
          <button
            style={{
              background: text === "Upcoming Booking" ? primaryColor : "",
              border: text === "Upcoming Booking" ? "" : `1px solid ${primaryColor}`,
              color: text === "Upcoming Booking" ? "" : primaryColor,
            }}
            className={`${text === "Upcoming Booking" ? "bookinglistb1" : "bookinglistb2"}`}
            onClick={() => {
              setText("Upcoming Booking");
              const result = upCBook.reduce((r, a) => {
                r[a.bookingInvoiceNumber] = r[a.bookingInvoiceNumber] || [];
                r[a.bookingInvoiceNumber].push(a);
                return r;
              }, Object.create(null));

              dispatch(setupcomingBooking(result));
            }}
          >
            Upcoming bookings
          </button>
        </div>
        <div className="bookinglistd2">
          {/* {array.map((array, index) => (
            <ListProduct key={index} date={array.date} time={array.time} />
          ))} */}
          {Loading ? (
            <div
              style={{
                height: "30vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingProgressBar />
            </div>
          ) : (
            <>
              <BookingListProduct testText={text} primaryColor={primaryColor} />
              {/* <BookingListProduct /> */}
              {/* <Stack className="stackPagination" spacing={2}>
                <ReactPagination
                  currentItems={currentItems}
                  setCurrentItems={setCurrentItems}
                  allDataArray={filteredData}
                  itemsPerPage={2}
                  allData={allBooking}
                />
              </Stack> */}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookingList;
