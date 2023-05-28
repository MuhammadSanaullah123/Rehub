import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import TransactionTable from "../mainLayout/TransactionTable/TransactionTable";
import { getBookingAll } from "../services/Books";
import { setBookingDataAdmin } from "../features/bookingSlice";
import { getContentApi } from "../redux/UserReducerApis";
import { Alert } from "../common/Alert";
import Header from "../mainLayout/Header/Header";

function DashboardAdmin() {
  const dispatch = useDispatch();

  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);

  const [tempBookingArray, setTempBookingArray] = useState([]);
  const [allBookingData, setAllBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState(allBookingData);
  const [currentItems, setCurrentItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [upCommingBooking, setUpCommingBooking] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [PreviousMonth, setPrevoiusMonth] = useState("");
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [previousMonthBooking, setPreviousMonthBooking] = useState(0);
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
    // updateBookingAll(arraygGet)
    // .then((res) => {

    getBookingAll(setTestLoader)
      .then((response) => {
        setAllBookingData(response?.data);
        setFilteredData(response?.data);
        dispatch(setBookingDataAdmin(response?.data));
        setLoading(false);
      })
      .catch((error) => {
        // SimpleAlert("error", error);
        Alert("error", error);

        setLoading(false);
      });
    // })
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
    // const cdateinMonthobject = cdate.setMonth(cdate.getMonth() - 1);
    // const previousMonthData = cdateinMonthobject.toLocaleString("default", {
    //   month: "long",
    // });

    // const preivousmonth = new Date(
    //   cdate.getFullYear(),
    //   cdate.getMonth() - 1,
    //   1
    // );
    // let upcommingbooking = 0;

    const datatest = dataempty?.filter((item) => {
      const dateSplit = item?.bookingDate?.split("/")[1];
      return item?.bookingDate?.split("/")[1] == splitdate;
    });

    const datatestPreiousMonth = dataempty?.filter((item) => {
      const dateSplitPrev = item?.bookingDate?.split("/")[1] - 1;
      return item?.bookingDate?.split("/")[1] == previousDate;
    });

    const getPreivousMonth = datatestPreiousMonth?.filter((item) => item?.status === "Previous");

    // setPreviousMonthBooking(getPreivousMonth?.length);

    const dataprice = datatest?.map((item) => {
      return item?.spacePrice;
    });

    const getUpcomming = datatest?.filter((item) => item?.status === "Upcoming");
    // for (let i = 0; i < datatest?.length; i++) {
    //   sum += datatest[i];

    //   return sum;
    // }
    setPreviousMonthBooking(dataprice?.length);
    setUpCommingBooking(getUpcomming?.length);

    if (dataprice?.length !== 0) {
      const datacost = dataprice?.map((item) => {
        return (sum += item);
      });
      // for (let i = 0; i < datatest?.length; i++) {
      //   // sum += datatest[i];

      //   return (sum += datatest[i]);
      // }
    }
    setRevenue(sum);
  }, [allBookingData]);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: "#f4f3f3",
        }}
      >
        <div className="dashboard">
          <div className="dashboardhiddendiv">HIDDEN</div>
          <div className="dashboardmain">
            <h6 className="dashboardh1">Dashboard Overview</h6>
            <div className="admindashboardd1">
              <div
                className="dashboardd2"
                style={{
                  background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                }}
              >
                <p className="dashboardp1">
                  Total revenue generated
                  {" "}
                  <br />
                  {" "}
                  in
                  {" "}
                  {currentMonth}
                </p>
                <h6 className="dashboardh2">
                  $
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
            <div className="dashboardbookings" style={{ marginBottom: "20px" }}>
              <h6 className="dashboardbookingsh1">Recent Transactions</h6>
              <TransactionTable loading={loading} />
              {/* <Stack className="stackPagination" spacing={2}>
                <ReactPagination
                  currentItems={currentItems}
                  setCurrentItems={setCurrentItems}
                  allDataArray={filteredData}
                  itemsPerPage={12}
                  allData={allBookingData}
                />
              </Stack> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
