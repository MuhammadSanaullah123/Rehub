import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Input from "@mui/material/Input";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getBookingAll } from "../services/Books";
import { setBookingDataAdmin } from "../features/bookingSlice";
import { Alert } from "../common/Alert";
import BookingTable1 from "../mainLayout/BookingTable/BookingTable1";
import Header from "../mainLayout/Header/Header";

function Transactions() {
  const dispatch = useDispatch();
  const [filterdate, setFilterDate] = useState("");
  const [filtername, setFilterName] = useState("");
  const [filterbook, setFilterBook] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  // const [status, setStatus] = useState("");
  // l;
  const [allBookingData1, setAllBookingData1] = useState([]);

  const [loading, setLoading] = useState(true);
  const [tempBookingArray, setTempBookingArray] = useState([]);
  const [allBookingData, setAllBookingData] = useState([]);
  const [datePicker, setDatePicker] = React.useState(new Date());
  const [value, setValue] = React.useState(null);
  const [filteredData, setFilteredData] = useState(allBookingData);
  const [currentItems, setCurrentItems] = useState(null);
  const [testLoader, setTestLoader] = useState(true);
  const [showCount, setShowCount] = useState(0);

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
    getBookingAll()
      .then((response) => {
        const newData = response?.data.filter((item) => {
          return item.bookingDate !== "Invalid date";
        });
        newData.map((item) => {
          // if (item.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY")) {
          //   sortDate.splice(0, sortDate.length, item);
          // }

          // if (item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase())) {
          //   sortDate.splice(0, sortDate.length, item);
          // }
          const month = new Date(item.bookingDate).getMonth();
          const newM = (month + 1).toString().padStart(2, "0");
        });
      })
      .catch((error) => {});
  }, [name, selectedDate]);

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
  const [filterD, setFilterDate1] = useState([]);
  useEffect(() => {
    const dataempty = [...allBookingData];
    const checkCurrentDate = moment(new Date())?.format("DD/MM/YYYY");
    const datevalue = "10/10/2022";
    const status = filterbook == 1 ? "Previous" : filterbook == 2 ? "Upcoming" : "";

    // if(moment(selectedDate)?.format("DD/MM/YYYY") === moment(new Date())?.format("DD/MM/YYYY")){

    // }else{

    // }
    const fillArray = [];

    const filt = dataempty.filter((item) => {
      return item?.bookingDate.includes(moment(selectedDate)?.format("DD/MM/YYYY"));
    });

    const dataset = dataempty?.filter((item) => {
      if (selectedDate && name && filterbook === null) {
        setLoading(false);

        return (
          item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase()) &&
          item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY")
        );
      }
      if (name && selectedDate && filterbook !== 0) {
        setLoading(false);
        return (
          item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase()) &&
          item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY") &&
          item?.status == status
        );
      }

      if (name && filterbook === null) {
        setLoading(false);
        return item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase());
      }
      if (filterbook !== 0 && name) {
        setLoading(false);
        return item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase()) && item?.status == status;
      }

      if (selectedDate && !name) {
        setLoading(false);

        return item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY");
      }
      if (name) {
        setLoading(false);

        return item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase());
      }

      if (selectedDate && name) {
        setLoading(false);

        return (
          item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase()) &&
          item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY")
        );
      }

      if (!selectedDate && !name && filterbook !== 0) {
        setLoading(false);

        return item?.status == status;
      } if (selectedDate !== null && name !== "" && filterbook !== 0) {
        return (
          item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY") &&
          item?.userName?.toLowerCase()?.includes(name?.toLowerCase()) &&
          item?.status == status
        );
      } if (selectedDate !== null && name !== "") {
        setLoading(false);

        return (
          item?.bookingDate == moment(selectedDate)?.format("DD/MM/YYYY") &&
          item?.userName?.toLowerCase()?.includes(name?.toLowerCase())
        );
      } if (name !== "" && filterbook !== 0) {
        setLoading(false);

        return item?.userName?.toLowerCase()?.includes(name?.toLowerCase()) && item?.status == status;
      } if (selectedDate !== null && filterbook !== 0) {
        setLoading(false);

        let getDate = new Date();
        let currentDate = moment(getDate)?.format("DD/MM/YYYY");
        if (currentDate === item?.bookingDate) {
          return item?.status == status;
        } 
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
      } else {
        setLoading(false);

        return item;
      }
    });
    setFilteredData(dataset);
    dispatch(setBookingDataAdmin(dataset));
    setAllBookingData1(fillArray);
  }, [allBookingData, name, filterbook, selectedDate]);

  useEffect(() => {
    dispatch(setBookingDataAdmin(currentItems));
  }, [currentItems]);

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
            <h6 className="bookingsh1">Recent Bookings</h6>
            <div className="bookingsd1">
              {/*          <FormControl className="bookingsinput1">
                <InputLabel className="bookingslabel1">
                  Filter By Date
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterdate}
                  label="Filter By Dateeeee"
                  onChange={handleChangeDate}
                >
                  <MenuItem className="bookingsitem" value={1}>
                    22-sep-2022
                  </MenuItem>
                  <MenuItem className="bookingsitem" value={2}>
                    22-sep-2022
                  </MenuItem>
                  <MenuItem className="bookingsitem" value={3}>
                    22-sep-2022
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className="bookingsinput1">
                <InputLabel className="bookingslabel1">
                  Filter By Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filtername}
                  label="Filter By Nameeeee"
                  onChange={handleChangeName}
                >
                  <MenuItem className="bookingsitem" value={1}>
                    John
                  </MenuItem>
                  <MenuItem className="bookingsitem" value={2}>
                    David
                  </MenuItem>
                  <MenuItem className="bookingsitem" value={3}>
                    Peter
                  </MenuItem>
                </Select>
              </FormControl>
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
                    Upcoming
                  </MenuItem>
                </Select>
              </FormControl> */}
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Filter By Date"

                  value={datePicker}
                  onChange={(event) => {
                    setDatePicker(event);
                  }}
                  renderInput={(params) => (
                    <TextField className="textfield_date" {...params} />
                  )}
                />
              </LocalizationProvider> */}
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
                placeholder="Filter By Space Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <Input
                className="input1"
                placeholder="Filter By Status"
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              /> */}
              <FormControl className="bookingsinput1">
                <InputLabel className="bookingslabel1">Filter By Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterbook}
                  label="Filter By Status"
                  onChange={handleChangeBook}
                >
                  {/* <MenuItem className="bookingsitem" value="">
                    Select Status
                  </MenuItem> */}
                  {/* <MenuItem className="bookingsitem" value={""}>
                    Select Status
                  </MenuItem> */}
                  <MenuItem className="bookingsitem" value={1}>
                    Previous
                  </MenuItem>

                  <MenuItem className="bookingsitem" value={2}>
                    Upcoming
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="bookingstablediv">
              <BookingTable1
                loading={loading}
                selectedDate={selectedDate}
                filterbook={filterbook}
                name={name}
                filterD={filterD}
                setShowCount={setShowCount}
                showCount={showCount}
              />
              {/*  <Stack className="stackPagination" spacing={2}>
                <ReactPagination
                  currentItems={currentItems}
                  setCurrentItems={setCurrentItems}
                  allDataArray={filteredData}
                  itemsPerPage={3}
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

export default Transactions;
