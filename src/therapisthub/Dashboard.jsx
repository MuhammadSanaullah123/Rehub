import React, { useState } from "react";

//components
import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getBookingAll } from "../services/Books";

import { setBookingDataAdmin } from "../features/bookingSlice";
import { getContentApi } from "../redux/UserReducerApis";
import { Alert } from "../common/Alert";
import { getSpaceDataPostById } from "../services/AddSpace";
import BookingTable2 from "../mainLayout/BookingTable/BookingTable2";
import Footer from "../mainLayout/Footer/Footer";
import Header from "../mainLayout/Header/Header";

function Dashboard() {
  const dispatch = useDispatch();
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);

  const [currentTherpistHub, setCurrentTherpistHub] = useState([]);
  const [allBookingData, setAllBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState(allBookingData);
  const [currentItems, setCurrentItems] = useState(null);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [upCommingBooking, setUpCommingBooking] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [PreviousMonth, setPrevoiusMonth] = useState("");
  const [curentValue, setCurrentvalue] = useState(0);
  // const [currentTherpistHub, setCurrentTherpistHub] = useState([]);

  const [previousMonthBooking, setPreviousMonthBooking] = useState(0);
  const userData = useSelector((state) => state.user);
  const [testLoader, setTestLoader] = useState(true);

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
  const currentMonth1 = new Date().getMonth() + 1; // getMonth() returns a number between 0 and 11, so we add 1 to get the month number
  const currentMonthTwoDigits = currentMonth1.toString().padStart(2, "0");

  useEffect(() => {
    getSpaceDataPostById(userData?.value?._id)
      // getSpaceDataPostById("6359db377d7d0bbc068d1409")
      .then((res) => {
        setCurrentTherpistHub(res?.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    getBookingAll(setTestLoader)
      .then((response) => {
        const arrayb = response?.data;
        const arraya = [...currentTherpistHub];

        const resultFilter = arrayb?.filter((elem1) => {
          return arraya?.some((elem2) => elem2?.name === elem1?.spaceName) && elem1?.status === "Upcoming";
        });
        allBookingData.push(resultFilter);
        setAllBookingData(response?.data);
        setFilteredData(resultFilter);
        dispatch(setBookingDataAdmin(resultFilter));
        setLoading(false);
      })
      .catch((error) => {
        Alert("error", error);

        setLoading(false);
      });
  }, [currentTherpistHub]);

  function GetMonthName(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber];
  }

  useEffect(() => {
    const dataempty = [...allBookingData];
    const currentdate = moment().format("DD/MM/YYYY");
    const splitdate = currentdate.split("/")[1];
    const previousDate = currentdate.split("/")[1] - 1;
    const datesss = 10;
    let sum = 0;
    const cdate = new Date();
    const now = new Date();
    const currentYear = new Date().getFullYear();
    const currentMonth = GetMonthName(new Date().getMonth());
    const lastMonth = GetMonthName(now.getMonth() - 1);
    const current = GetMonthName(now.getMonth());
    setCurrentMonth(current);
    setPrevoiusMonth(lastMonth);

    const datatest = dataempty?.filter((item) => {
      const dateSplit = item?.bookingDate.split("/")[1];
      return item?.bookingDate.split("/")[1] == splitdate;
    });

    const datatestPreiousMonth = dataempty?.filter((item) => {
      const dateSplitPrev = item?.bookingDate.split("/")[1] - 1;

      return item?.bookingDate.split("/")[1] == previousDate;
    });

    const getPreivousMonth = datatestPreiousMonth?.filter(
      (item) => item?.status === "Previous" && item?.paymentStatus == "Paid",
    );
    setPreviousMonthBooking(getPreivousMonth?.length);
    const previousPrice = datatest.filter((item) => {
      return item?.paymentStatus == "Paid";
    });

    const dataprice = previousPrice?.map((item) => {
      return item?.spacePrice;
    });

    setCurrentvalue(dataprice.length);
    const getUpcomming = datatest?.filter((item) => item?.status === "Upcoming" && item?.paymentStatus == "Paid");
    // for (let i = 0; i < datatest?.length; i++) {
    //   sum += datatest[i];

    //   return sum;
    // }

    setUpCommingBooking(getUpcomming?.length);

    if (dataprice?.length !== 0) {
      const datacost = dataprice?.map((item) => {
        return (sum += item);
      });
    }

    setRevenue(sum);

    setFilteredData(allBookingData);
  }, [allBookingData]);

  useEffect(() => {
    getSpaceDataPostById(userData?.value?._id)
      // getSpaceDataPostById("6359db377d7d0bbc068d1409")
      .then((res) => {
        setCurrentTherpistHub(res?.data);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    getBookingAll()
      .then((response) => {
        const arrayb = response?.data;
        const arraya = [...currentTherpistHub];

        const resultFilter = arrayb?.filter((elem1) => arraya?.some((elem2) => elem2?.name === elem1?.spaceName));

        const newData = response?.data.filter((item) => {
          return item.bookingDate !== "Invalid date";
        });
        setAllBookingData(resultFilter);
      })
      .catch((error) => {});
  }, [currentTherpistHub]);

  useEffect(() => {
    dispatch(setBookingDataAdmin(currentItems));
  }, [currentItems]);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <div className="dashboard">
        <div className="dashboardhiddendiv">HIDDEN</div>
        <div className="dashboardmain">
          <h6 className="dashboardh1">Dashboard Overview</h6>
          <div className="dashboardd1">
            <div
              className="dashboardd2"
              style={{
                background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
            >
              <p className="dashboardp1">
                Upcoming
                {" "}
                <br />
                Bookings
              </p>
              <h6 className="dashboardh2">{upCommingBooking}</h6>
            </div>
            <div
              className="dashboardd2"
              style={{
                background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
            >
              <p className="dashboardp1">
                Total Revenue
                {" "}
                <br />
                {" "}
                in
                {" "}
                {currentMonth}
              </p>
              <h6 className="dashboardh2">
                €
                {revenue}
              </h6>
            </div>
            <div
              className="dashboardd2"
              style={{
                background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
            >
              <p className="dashboardp1">
                Past Bookings
                <br />
                in
                {" "}
                {currentMonth}
              </p>
              <h6 className="dashboardh2">{previousMonthBooking}</h6>
            </div>
          </div>
          <div className="dashboardbookings">
            <h6 className="dashboardbookingsh1">Recent Bookings</h6>
            <BookingTable2 loading={loading} testLoader={testLoader} allBookingData={allBookingData} />
            {/* <Stack className="stackPagination" spacing={2}>
              <ReactPagination
                currentItems={currentItems}
                setCurrentItems={setCurrentItems}
                allDataArray={filteredData}
                itemsPerPage={7}
                allData={allBookingData}
              />
            </Stack> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
