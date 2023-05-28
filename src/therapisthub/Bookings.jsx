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
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import moment from "moment";
import { getBookingAll, getBookingsByUserId } from "../services/Books";
import { setBookingDataAdmin } from "../features/bookingSlice";
import ReactPagination from "../physiotherapist/SpaceProvider/ReactPagination";
import BookingTable from "../mainLayout/BookingTable/BookingTable";
import { Alert } from "../common/Alert";
import { getSpaceDataPostById, getUserleSpace } from "../services/AddSpace";
import Footer from "../mainLayout/Footer/Footer";
import Header from "../mainLayout/Header/Header";

function Bookings() {
  const dispatch = useDispatch();
  const [filterdate, setFilterDate] = useState("");
  const [filtername, setFilterName] = useState("");
  const [filterbook, setFilterBook] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [name, setName] = useState("");
  // const [status, setStatus] = useState("");
  // l;
  const [currentTherpistHub, setCurrentTherpistHub] = useState([]);

  const [loading, setLoading] = useState(true);
  const [testLoader, setTestLoader] = useState(true);

  const [allBookingData, setAllBookingData] = useState([]);
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState(allBookingData);
  const [currentItems, setCurrentItems] = useState(null);
  const [info1, setInfo1] = useState([]);
  const logiddetail = useSelector((state) => state?.user);
  const userId = logiddetail?.value?._id;
  const userType = logiddetail?.value?.user?.accountType || "";
  const handleChangeDate = (event) => {
    setFilterDate(event.target.value);
  };
  const userData = useSelector((state) => state.user);

  const handleChangeName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangeBook = (event) => {
    setFilterBook(event.target.value);
  };

  const getspace = () => {
    getUserleSpace(userId)
      .then((response) => {
        setInfo1(response);
        // resolve(response.data)
        // let nnnn=response.map((item)=>{
        //    return (item?.name);

        // })
        // info1.push(nnnn)
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getspace();
  }, []);

  useEffect(() => {
    if (userType === "Host") {
      getBookingAll(setTestLoader)
        .then((response) => {
          const arrayb = response?.data;
          const arraya = [...currentTherpistHub];

          const resultFilter = arrayb?.filter((elem1) => arraya?.some((elem2) => elem2?.name === elem1?.spaceName));

          const filterIndiviual = response.data.filter((item) =>
            info1.filter((item2) => item.spaceName === item2.name)
          );
          setAllBookingData(resultFilter);
          setData(resultFilter);
          setFilteredData(resultFilter);
        })
        .catch((error) => {
          Alert("error", error);
        });
    } else if (userType === "Professional") {
      getBookingsByUserId(userId)
        .then((response) => {
          setAllBookingData(response.data);
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch((error) => {
          Alert("error", error);
        });
    }
  }, [userType, currentTherpistHub]);

  useEffect(() => {
    getSpaceDataPostById(userData?.value?._id)
      // getSpaceDataPostById("6359db377d7d0bbc068d1409")
      .then((res) => {
        setCurrentTherpistHub(res?.data);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    if (userType === "Host") {
      getBookingAll()
        .then((response) => {
          const arrayb = response?.data;
          const arraya = [...currentTherpistHub];

          const resultFilter = arrayb?.filter((elem1) => arraya?.some((elem2) => elem2?.name === elem1?.spaceName));
          setData(resultFilter);
        })
        .catch((error) => {});
    } else if (userType === "Professional") {
      getBookingsByUserId(userId)
        .then((response) => {
          setAllBookingData(response.data);
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch((error) => {
          Alert("error", error);
        });
    }
  }, [currentTherpistHub]);

  useEffect(() => {
    const dataempty = [...data];
    const status = filterbook === 1 ? "Previous" : filterbook === 2 ? "Upcoming" : "";
    const fromDate = selectedFromDate && selectedFromDate.format("YYYY/MM/DD");
    const toDate = selectedToDate && selectedToDate.format("YYYY/MM/DD");
    const dataset = dataempty
      .filter((item) => !status || item.status === status)
      .filter(
        (item) =>
          !name ||
          item?.spaceName?.toLowerCase()?.includes(name?.toLowerCase()) ||
          item?.userName?.toLowerCase()?.includes(name?.toLowerCase())
      )
      .filter((item) => !selectedFromDate || moment(item?.bookingDate, "DD/MM/YYYY").format("YYYY/MM/DD") >= fromDate)
      .filter((item) => !selectedToDate || moment(item?.bookingDate, "DD/MM/YYYY").format("YYYY/MM/DD") <= toDate);

    setLoading(false);
    setFilteredData(dataset);
    dispatch(setBookingDataAdmin(dataset));
  }, [allBookingData, name, filterbook, selectedFromDate, selectedToDate]);

  const handleClear = () => {
    setSelectedFromDate("");
    setSelectedToDate("");
    setName("");
    setFilterBook(null);
  };

  const handleChangeRange = (type, value) => {
    const dateValue = new Date(value || "");
    const isValid = dateValue.toString() !== "Invalid Date";

    if (type === "from") {
      setSelectedFromDate(value);
      if (isValid && selectedToDate && dateValue > selectedToDate) {
        setSelectedToDate(value);
      }
    } else if (type === "to") {
      setSelectedToDate(value);
      if (isValid && selectedFromDate && dateValue < selectedFromDate) {
        setSelectedFromDate(value);
      }
    }
  };
  useEffect(() => {
    dispatch(setBookingDataAdmin(currentItems));
  }, [currentItems]);

  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <div className="Bookings box-border">
        <div className="bookingsmain">
          <h6 className="bookingsh1">Recent Bookings</h6>
          <div className="bookingsd1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="bookingsinput1">
                <DesktopDatePicker
                  className="date-range-picker"
                  inputFormat="DD-MM-YYYY"
                  label="From Date"
                  value={selectedFromDate === "" ? null : selectedFromDate}
                  onChange={(newValue) => handleChangeRange("from", newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  className="date-range-picker"
                  inputFormat="DD-MM-YYYY"
                  label="To Date"
                  value={selectedToDate === "" ? null : selectedToDate}
                  onChange={(newValue) => handleChangeRange("to", newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
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
                value={filterbook === null ? null : filterbook}
                label="Filter By Bookingggggg"
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
            <button onClick={handleClear} className="bookingsclrbtn">
              Clear
            </button>
          </div>
          <div className="bookingstablediv">
            <BookingTable
              loading={loading}
              testLoader={testLoader}
              data={filteredData}
              selecteable={userType === "Host"}
            />

            <Stack className="stackPagination" spacing={2}>
              <ReactPagination
                currentItems={currentItems}
                setCurrentItems={setCurrentItems}
                allDataArray={filteredData}
                itemsPerPage={10}
                allData={allBookingData}
              />
            </Stack>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Bookings;
