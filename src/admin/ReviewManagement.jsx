import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import moment from "moment";
import ReviewTable from "../mainLayout/ReviewTable/ReviewTable";
//mui
import { getBookingAll } from "../services/Books";
import { setBookingDataAdmin } from "../features/bookingSlice";
import { Alert } from "../common/Alert";
import Header from "../mainLayout/Header/Header";

function ReviewManagement() {
  const dispatch = useDispatch();
  const [filterdate, setFilterDate] = useState("");
  const [filtername, setFilterName] = useState("");
  const [filterbook, setFilterBook] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState("");
  // const [status, setStatus] = useState("");
  // l;
  const [testLoader, setTestLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tempBookingArray, setTempBookingArray] = useState([]);
  const [allBookingData, setAllBookingData] = useState([]);
  const [datePicker, setDatePicker] = React.useState(new Date());
  const [value, setValue] = React.useState(null);
  const [filteredData, setFilteredData] = useState(allBookingData);
  const [currentItems, setCurrentItems] = useState(null);

  const handleChangeDate = (event) => {
    setFilterDate(event.target.value);
  };
  const handleChangeName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangeBook = (event) => {
    // if (event.target.value !== 0) {
    setFilterBook(event.target.value);
    // }
  };
  const handleChange = (newValue) => {
    // setDatePicker(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    getBookingAll(setTestLoader).then((res) => {});
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
    //       .then((res) => {

    getBookingAll(setTestLoader)
      .then((response) => {
        setAllBookingData(response?.data);
        setFilteredData(response?.data);
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
  useEffect(() => {
    const dataempty = [...allBookingData];
    const datevalue = "10/10/2022";
    const status = filterbook == 1 ? "Previous" : filterbook == 2 ? "Upcoming" : "";

    const dataset = dataempty?.filter((item) => {
      if (selectedDate !== null && name !== "" && filterbook !== 0) {
        setLoading(false);
        return (
          item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY")
          && item?.userName?.toLowerCase()?.includes(name?.toLowerCase())
          && item?.status == status
        );
      } if (selectedDate !== null && name !== "") {
        setLoading(false);
        return (
          item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY")
          && item?.userName?.toLowerCase()?.includes(name?.toLowerCase())
        );
      } if (name !== "" && filterbook !== 0) {
        setLoading(false);

        return item?.userName?.toLowerCase()?.includes(name?.toLowerCase()) && item?.status == status;
      } if (selectedDate !== null && filterbook !== 0) {
        setLoading(false);
        return item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY") && item?.status == status;
      } if (selectedDate !== null) {
        setLoading(false);

        return item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY");
      } if (name !== "") {
        setLoading(false);

        return item?.userName?.toLowerCase()?.includes(name?.toLowerCase());
      } if (filterbook !== 0) {
        setLoading(false);

        return item?.status == status;
      }
      setLoading(false);

      return item;
    });

    dispatch(setBookingDataAdmin(dataset));
  }, [allBookingData, name, filterbook, selectedDate]);

  // useEffect(() => {
  //   dispatch(setBookingDataAdmin(currentItems));
  // }, [currentItems]);

  return (
    <>
      <Header />
      <div
        style={{
          background: "#f4f3f3",
        }}
      >
        <div className="Bookings">
          <div className="dashboardhiddendiv">HIDDEN</div>
          <div className="bookingsmain">
            <h6
              style={{
                marginBottom: "0",
              }}
              className="bookingsh1"
            >
              Recent Reviews
            </h6>
            {/*     <div className="bookingsd1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="bookingsinput1"
                  label="Filter By Date"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(new Date(newValue));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Input
                className="input1"
                placeholder="Filter By Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <FormControl className="bookingsinput1">
                <InputLabel className="bookingslabel1">
                  Filter By Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterbook}
                  label="Filter By Bookingggggg"
                  onChange={handleChangeBook}
                >
                  <MenuItem className="bookingsitem" value={1}>
                    Previous
                  </MenuItem>

                  <MenuItem className="bookingsitem" value={2}>
                    Upcoming
                  </MenuItem>
                </Select>
              </FormControl>
            </div> */}
            <div className="bookingstablediv">
              <ReviewTable loading={loading} />
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

export default ReviewManagement;
