import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "../../common/Alert";
import { getSpaces } from "../../services/Spaces";
import { getContentApi } from "../../redux/UserReducerApis";
import ListProduct from "../../mainLayout/ListProduct/ListProduct";
import Footer from "../../mainLayout/Footer/Footer";
import Header from "../../mainLayout/Header/Header";
import LoadingProgressBar from "../../common/LoadingProgressBar";

const itemsPerPage = 2;

// let suposetime = "12:00pm - 1:00pm";
// let suposetime = " 1am - 2am ";
// let suposetime = "";

// let location = "";
// let location = "one";
function SpaceProvider() {
  const history = useHistory();
  //city areas
  const [count, setCount] = useState(0);
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);

  const dispatch = useDispatch();
  const [allSpaces, setAllSpaces] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [loading, setLoading] = useState(true);
  const [LoadingSecond, setLoadingSecond] = useState(true);
  const [areaArray, setAreaArray] = useState([]);
  //filter data
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [temptime, setTempTime] = useState("");
  const [subCity, setSubCity] = useState("");

  const [area, setArea] = useState([
    {
      city: "Paphos",
      name: ["Geroskipou", "Pegeia", "Polis", "Chrysochous"],
    },
    {
      city: "Limassol",
      name: ["Ypsonas", "Kato Polemidia", "Mesa Geitonia", "Agios Athanasios", "Germasogeia"],
    },
    {
      city: "Nicosia",
      name: ["Strovolos", "Lakatamia", "Latsia", "Aglandzia", "Engomi", "Agios Dhometios", "Yeri", "Tseri"],
    },
    {
      city: "Larnaca",
      name: ["Aradippou", "Athienou", "Dromolaxia-Meneou", "Larnaca", "Livadia", "Lefkara"],
    },
    {
      city: "Famagusta",
      name: ["Ayia Napa", "Paralimni", "Derynia", "Sotira"],
    },
  ]);
  // useEffect(() => {

  //   if (location ) {
  //     setDate("");
  //     setTempTime("");
  //   }
  //   if (date) {
  //     setTempTime("");
  //     setSubCity("");

  //     setLocation("");
  //   }
  //   if (temptime) {
  //     setLocation("");
  //     setDate("");
  //     setSubCity("");
  //   }
  //   if (subCity) {
  //     setDate("");
  //     setTempTime("");
  //   }
  // }, [date, temptime, subCity, location]);
  // useEffect(() => {
  //   if (location) {
  //     setDate("");
  //     setTempTime("");
  //   } else if (date) {
  //     setTempTime("");

  //     setLocation("");
  //   } else if (temptime) {
  //     setLocation("");
  //     setDate("");
  //   }
  // }, []);

  //filter By Date

  // const newArray1 = allSpaces?.map((item) => {
  //   item?.pickDate?.map((item2) => {
  //     if (
  //       item2?.dateofAvailibilty.includes(moment(date)?.format("DD/MM/YYYY"))
  //     ) {
  //       NewArrayFilter.push(item);
  //     }
  //   });
  // });

  //filter By City&Area

  // const FilterByCity = allSpaces.filter((item) => {

  //   return item?.address?.includes(location);
  // });

  // NewArrayFilter.push(FilterByCity);

  // const filterSubCity = FilterByCity.map((item) => {

  //   area?.map((item2) => {
  //     item2?.name.map((item3) => {

  //       if (item?.address?.includes(item3)) {
  //         // NewArrayFilter.push(item);
  //       }
  //     });
  //   });
  // });

  // const newCount = NewArrayFilterBysub.length;

  //drawer
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };

  const currentDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

  //update query
  const onChangeQueryLocation = (e) => setLocation(e.target.value);
  const onChangeQueryDate = (e) => {
    setDate(e);
  };
  const onChangeQueryTime = (e) => setTime(e);

  useEffect(() => {
    //update url on page load
    /*const params = new URLSearchParams();
    if (location) {
      params.append("location", location);
    }
    if (date) {
      params.append("date", date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
    }
    if (time) {
      params.append("time", time.getHours() + "-" + time.getMinutes());
    }

    history.push({ search: params.toString() });*/
  }, [location, date, time, history]);
  //24 to 12hr conversion

  const handleConvert = () => {
    const [hourString, minute] = time.toString().slice(16, 21).split(":");
    const hour = +hourString % 24;
    const nextHour = hour + 1;
    setTempTime(
      `${hour % 12 || 12
      }:`
        + `00${
          hour < 12 ? "am" : "pm"
        }-${
          nextHour % 12 || 12
        }:`
        + `00${
          nextHour < 12 || nextHour === 24 ? "am" : "pm"}`,
    );
  };

  //cookies
  const tempdate = date.toString();

  const cookies = new Cookies();
  cookies.set("datecook", tempdate, { path: "/" });
  cookies.set("timecook", temptime, { path: "/" });

  useEffect(() => {
    getSpaces(setLoading)
      ?.then((data) => {
        setAllSpaces(data.spaceData);
      })
      .catch((err) => {
        Alert("error", err);
      });
  }, [location]);

  // useEffect(() => {
  //   getSpaceWithFilter(date, location, temptime)
  //     .then((data) => {
  //       // setLoading(false);
  //       // setAllSpaces(data.spaceData);
  //       // setFilteredData(data.spaceData);
  //     })
  //     .catch((err) => {
  //       SimpleAlert("error", err);

  //       // setLoading(false);
  //     });
  // }, [date, location, temptime]);

  const handleClear = () => {
    setLocation("");
    setDate("");
    setTime("");
    setTempTime("");
    setCount(0);
  };

  // React.useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;

  //   setCurrentItems(filteredData.slice(itemOffset, endOffset));
  //   dispatch(setFilterSpace(filteredData.slice(itemOffset, endOffset)));
  //   setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  // }, [filteredData, itemOffset, itemsPerPage]);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % allSpaces.length;
  //   setItemOffset(newOffset);
  // };

  const newArray = areaArray.filter((item) => {});

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <>
      <Header />
      <div className="SpaceProvider w-full">
        {/* FIRST PART START*/}
        {/* <div className="spaceproviderd1">
          <div>
            <h6 className="spaceproviderh1" style={{ color: primaryColor }}>
              Lorem ipsum dolor sit
            </h6>
            <p className="spaceproviderp1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <img className="spaceproviderimg" src={spacepic1} alt=""></img>
          </div>
        </div> */}
        {/* FIRST PART END */}
        {/* SECOND PART START */}
        <div className="spaceproviderd2">
          <div className="spaceproviderFilter">
            <div className="spaceproviderFilterclrbtndiv">
              <h6 className="spaceproviderFilterh1">Filters</h6>
              <button onClick={handleClear} className="spaceproviderFilterclrbtn">
                Clear All
              </button>
            </div>
            <div className="spaceproviderFilterl1" />
            <h6
              style={{
                marginTop: "20px",
                fontSize: "18px",
              }}
              className="spaceproviderFilterh1"
            >
              Location
            </h6>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                {/*  <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  //  label="Location"
                  onChange={(e) => onChangeQueryLocation(e)}
                >
                  <MenuItem value="City" disabled hidden>
                    City
                  </MenuItem>
                  {/* <MenuItem value={"Paphos"}>Multan</MenuItem> */}
                  <MenuItem value="Paphos">Paphos</MenuItem>
                  <MenuItem value="Limassol">Limassol</MenuItem>
                  <MenuItem value="Nicosia">Nicosia</MenuItem>
                  <MenuItem value="Larnaca">Larnaca</MenuItem>
                  <MenuItem value="Famagusta">Famagusta</MenuItem>
                  {/* <MenuItem value={"Kyrenia"}>Kyrenia</MenuItem> */}
                  {/* <MenuItem value={"test"}>test</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
            <h6 className="spaceproviderFilterh2">{/* {location !== "City" && location} */}</h6>
            <div>
              {/* {area.map((area, index) => {
                return (
                  <div className="spaceproviderFilterd1">
                    {area.city === location &&
                      area.name.map((name, index) => {
                        return (
                          <p
                            className="spaceproviderFilterp1"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSubCity(name);
                            }}
                          >
                            {name}
                          </p>
                        );
                      })}
                  </div>
                );
              })} */}
            </div>

            <div style={{ marginTop: "30px" }} className="spaceproviderFilterl1" />
            <h6 className="spaceproviderFilterh3">Date and time </h6>
            <div className="spaceproviderFilterd2">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack className="spaceproviderFilterdate" spacing={3}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="dd-MM-yyyy"
                    value={date === "" ? null : date}
                    onChange={(e) => onChangeQueryDate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack className="spaceproviderFiltertime" spacing={1}>
                  <TimePicker
                    ampm={false}
                    label="Time"
                    inputFormat="HH-MM"
                    value={time === "" ? null : time}
                    onChange={(e) => onChangeQueryTime(e)}
                    onClose={handleConvert}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>

          <div className="spaceproviderlist">
            <div className="text-list">List of Centers</div>
            {/*   <ListProduct /> */}
            {loading ? (
              <div
                style={{
                  height: "40vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <LoadingProgressBar />
              </div>
            ) : (
              <ListProduct
                // date={currentDate}
                time={temptime}
                data={allSpaces}
                date={date}
                location={location}
                Loading={loading}
                LoadingSecond={LoadingSecond}
                area={area}
                subCity={subCity}
                setCount={setCount}
                count={count}
              />
            )}
          </div>
        </div>
        {/* SECOND PART END */}
      </div>
      <Footer />
    </>
  );
}
export default SpaceProvider;
