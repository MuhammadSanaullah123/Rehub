import React, { useCallback, useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import Rating from "@mui/material/Rating";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getContentApi } from "../redux/UserReducerApis";
import addtime from "../assets/addtime.svg";
import sphere from "../assets/sphere.svg";
import profile from "../assets/profile.png";
import LocationPin from "../mainLayout/GoogleMap/LocationPin";
import { getIndividualSpace } from "../services/AddSpace";
import { baseURL, baseURLSecond } from "../common/AxiosInstance";
import { Alert } from "../common/Alert";
import { GetAllReview } from "../services/Review";
import Footer from "../mainLayout/Footer/Footer";
import Header from "../mainLayout/Header/Header";
import "./indiviual.scss";
import TimerEditor from "./TimerEditor";
import { timeSlots } from "./constant";
import classnames from "classnames";
import { parseTimeRange } from "../helper/time.helper";

function IndividualSpace() {
  const dispatch = useDispatch();
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const profilePictureImg = useSelector((state) => state?.user?.value?.user?.image);

  const location = useLocation();

  const [date, setDate] = useState(new Date());
  const [review, setReview] = useState(true);
  const [option, setOption] = useState(1);
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [arraytwo, setArrayTwo] = useState([]);
  const [indiviualData, setIndiviualData] = useState([]);

  const [tempdataObjectArray, setTempdataObjectArray] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [space_id] = useState(location.pathname?.split("/").pop() || null);
  const [close] = useState(false);
  const [availabilityState, setAvailabilityState] = useState([]);
  const [tempAvailabilityState, setTempAvailabilityState] = useState([]);

  const [, setUniqueSlot] = useState(null);
  const [timearr, setTimeArr] = useState(timeSlots);

  const [city1, setCity1] = useState();

  const [add1, setAdd1] = useState("");

  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [pickU, setpickU] = useState([]);
  const [pickTime, setPickTime] = useState();
  const [data, setData] = useState([]);

  const ClearAll = () => {
    timearr?.map((item) => {
      if (item.isTimeSelected === true) {
        item.isTimeSelected = false;
      }
    });
    setTimeArr([...timearr]);
    Alert("info", "Please press confirm to save.");
  };

  const handleRemove = (index, data) => {
    data.splice(index, 1);
    setScheduleSlots(data);
    setInformTemp(data);
  };

  const filteredSlots = useMemo(
    () =>
      scheduleSlots
        .filter((slot) => {
          const selectedDate = moment(date)?.format("YYYY-MM-DD");
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
          timevalue: `${moment(slot.startTime, "HH:mm").format("h:mma")}-${moment(slot.endTime, "HH:mm").format(
            "h:mma"
          )}`,
          userName: null
        })),
    [scheduleSlots, date]
  );

  useEffect(() => {
    let datatest = [...tempAvailabilityState];

    datatest = datatest?.map((item) => {
      return {
        ...item,
        timeslots: mainFunConsecutive(item?.timeslots)
      };
    });
    setAvailabilityState(datatest);
  }, [date, tempAvailabilityState, filteredSlots]);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  useEffect(() => {
    GetAllReview()
      .then((response) => {
        const newPerson = response?.person.filter((item) => {
          return item?.space?._id === space_id && item.rating !== "0";
        });
        setData(newPerson);
        // SimpleAlert("success", "Sucessfully Data get");
      })
      .catch(() => {
        // SimpleAlert("error", error);
      });
  }, []);

  useEffect(() => {
    const dataobject = [...tempdataObjectArray];
    const duplicateArray = [];
    const removeDuplication = (value) => {
      let isPresent = false;

      for (let index = 0; index < duplicateArray.length; index++) {
        if (duplicateArray[index].dateofAvailibilty === value.dateofAvailibilty) {
          isPresent = true;
          break;
        }
      }
      if (!isPresent) {
        duplicateArray.push(value);
      }
    };

    const checkDuplication = (value) => {
      if (duplicateArray.length === 0) {
        duplicateArray.push(value);
      } else {
        removeDuplication(value);
      }
    };

    for (let x = 0; x < dataobject.length; x++) {
      checkDuplication(dataobject[x]);
    }
  }, [tempdataObjectArray]);

  useEffect(() => {
    pickU.forEach((item) => {
      setUniqueSlot(item.timeslots);
    });

    let datatest = pickU?.map((item) => {
      return {
        ...item,
        timeslots: mainFunConsecutive(item?.timeslots)
      };
    });
    setTempAvailabilityState(datatest);

    const dataDayIndex = pickU.findIndex((data) => data.dateofAvailibilty === moment(date).format("DD/MM/YYYY"));

    if (dataDayIndex === -1) {
      setTimeArr((prev) =>
        prev.map((data) => {
          return { ...data, isTimeSelected: false };
        })
      );
    } else {
      const data = pickU[dataDayIndex];

      const dateNew = moment(date).format("DD/MM/YYYY");

      setTempdataObjectArray((prev) => {
        const dataobject = [...prev];
        const objectdata = {
          dateofAvailibilty: dateNew,
          timeslots: data.timeslots
        };
        dataobject.push(objectdata);
        return dataobject;
      });

      const pickuFilter = [...pickU];

      let tempIndex;
      let itemSlots;
      pickuFilter.forEach((item, index) => {
        if (item.dateofAvailibilty === moment(date).format("DD/MM/YYYY")) {
          tempIndex = index;
          itemSlots = item.timeslots;
        }
      });

      const temp = timearr.map((data) => {
        return { ...data, isTimeSelected: false };
      });

      const finx = [];

      for (let i = 0; i < data.timeslots.length; i++) {
        temp?.forEach((da, index) => {
          if (da.timevalue === data.timeslots[i].timevalue) {
            finx.push(index);
          }
        });
      }

      finx.map((d) => {
        temp[d].isTimeSelected = true;
      });
      setTimeArr([...temp]);
    }
  }, [date, pickU]);

  const refresh = useCallback(() => {
    getIndividualSpace(location.pathname?.split("/").pop())
      .then((response) => {
        setpickU(response.result.pickDate);

        setIndiviualData(response.result);
        setAdd1(response?.result?.address);

        setScheduleSlots(response.result?.scheduleTimeSlot?.scheduleSlots || []);
        response.result.pickDate.map((item) => {
          setUniqueSlot(item.timeslots);
        });

        let datatest = response.result.pickDate;

        datatest = datatest?.map((item) => {
          return {
            ...item,
            timeslots: mainFunConsecutive(item?.timeslots)
          };
        });
        setTempAvailabilityState(datatest);

        const dataDayIndex = response.result.pickDate.findIndex((data) => {
          return data.dateofAvailibilty === moment(date).format("DD/MM/YYYY");
        });

        if (dataDayIndex === -1) {
          // let temp = null;
          // temp = timearr.map((data) => {
          //   return { ...data, isTimeSelected: false };
          // });
          // setTimeArr(temp);
        } else {
          const data = response.result.pickDate[dataDayIndex];

          const dateNew = moment(date).format("DD/MM/YYYY");
          const dataobject = [...tempdataObjectArray];
          const objectdata = {
            dateofAvailibilty: dateNew,
            timeslots: data.timeslots
          };
          dataobject.push(objectdata);
          setTempdataObjectArray(dataobject);

          const pickuFilter = [...pickU];

          let tempIndex;
          pickuFilter.map((item, index) => {
            if (item.dateofAvailibilty === moment(date).format("DD/MM/YYYY")) {
              tempIndex = index;
            }
          });

          let itemSlots;
          pickuFilter.map((item, index) => {
            if (index === tempIndex) {
              itemSlots = item.timeslots;
            }
          });

          const obj = {
            dateofAvailibilty: moment(date).format("DD/MM/YYYY"),
            timeslots: itemSlots
          };

          let ObjTemp = [...pickuFilter];
          let indexForDate = 0;
          pickuFilter.map((item) => {
            const changedatetest = item.dateofAvailibilty.split("/");
            const dateday = changedatetest[0];
            const datayear = changedatetest[2];
            const datemonth = changedatetest[1];
            const concatdatasd = `${datayear}/${datemonth}/${dateday}`;
            if (moment(concatdatasd).format("DD/MM/YYYY") === moment(date).format("DD/MM/YYYY")) {
              ObjTemp = pickuFilter;
              indexForDate = 5;
            }
          });

          if (indexForDate !== 5) {
            ObjTemp.push(obj);
          }

          if (itemSlots !== undefined || itemSlots?.length > 0) {
            axios.patch(`${baseURL}/space/addavailability/${space_id}`, {
              pickDate: ObjTemp
            });

            const datatest1 = ObjTemp?.map((item) => {
              return {
                ...item,
                timeslots: mainFunConsecutive(item?.timeslots)
              };
            });
            setTempAvailabilityState(datatest1);
          }

          //Creating issues

          let temp = null;
          temp = timearr.map((data) => {
            return { ...data, isTimeSelected: false };
          });

          const finx = [];

          for (let i = 0; i < data.timeslots.length; i++) {
            temp?.map((da, index) => {
              if (da.timevalue === data.timeslots[i].timevalue) {
                finx.push(index);
              }
            });
          }

          finx.map((d) => {
            temp[d].isTimeSelected = true;
          });
          setTimeArr([...temp]);
        }

        const dte = response.result.pickDate.findIndex(
          (data) => data.dateofAvailibilty === moment(date).format("DD/MM/YYYY")
        );

        if (dte === -1) {
          let temp = null;
          temp = timearr.map((data) => {
            return { ...data, isTimeSelected: false };
          });
          setTimeArr(temp);
        } else {
          const data = response.result.pickDate[dte];

          if (data.dateofAvailibilty === moment(date).format("DD/MM/YYYY")) {
            if (data.timeslots === undefined || null) {
              let temp = null;
              temp = timearr.map((data) => {
                return { ...data, isTimeSelected: false };
              });
              setTimeArr(temp);
            } else {
              let temp = null;
              temp = timearr.map((data) => {
                return { ...data, isTimeSelected: false };
              });

              const finx = [];

              for (let i = 0; i < data.timeslots.length; i++) {
                temp?.map((da, index) => {
                  if (da.timevalue === data.timeslots[i].timevalue) {
                    finx.push(index);
                  }
                });
              }

              finx.map((d) => {
                temp[d].isTimeSelected = true;
              });

              setTimeArr(temp);
            }
          } else {
          }
        }
      })
      .catch(() => {
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const [infotemp, setInformTemp] = useState([]);
  const [timefinal, setTimeFinal] = useState([]);
  const [, setCountry] = useState();

  useSelector((state) => state);
  const userdata = useSelector((state) => state.user);
  const usersplitdate = userdata.value.user?.createdAt?.split("T")[0];

  const handleChangeTime = (index) => (newValue) => {
    scheduleSlots[index] = newValue;
    setScheduleSlots([...scheduleSlots]);
  };

  const add = () => {
    setScheduleSlots((prevSlots) => [
      ...prevSlots,
      {
        endDate: undefined,
        endTime: "01:00",
        endType: 0,
        repeatEvery: 1,
        repeatType: 0,
        startTime: "01:00"
      }
    ]);
  };

  const handleConversion = () => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        let city;
        let state;
        let country;
        for (let i = 0; i < response?.results[0]?.address_components?.length; i++) {
          for (let j = 0; j < response?.results[0]?.address_components[i]?.types?.length; j++) {
            switch (response?.results[0]?.address_components[i]?.types[j]) {
              case "locality":
                city = response?.results[0]?.address_components[i]?.long_name;
                // setCity1(city);
                break;
              case "administrative_area_level_1":
                state = response?.results[0]?.address_components[i]?.long_name;
                setCountry(state);

                break;
              case "country":
                country = response.results[0].address_components[i].long_name;

                break;
            }
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    handleConversion();
  }, [latitude]);

  const isPast = useCallback(
    (rangeString) => {
      const selectedTime = new Date(date);
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
    [date]
  );

  const subSelected = useCallback(
    (rangeString) => {
      const [startTime, endTime] = parseTimeRange(rangeString.timevalue);
      return filteredSlots.some((slot) => {
        const [customStartTime, customEndTime] = parseTimeRange(slot.timevalue);
        return !(customStartTime >= endTime || customEndTime <= startTime);
      });
    },
    [date, filteredSlots]
  );

  const length = scheduleSlots.length;
  useEffect(() => {
    Geocode.setApiKey("AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY");
    Geocode.fromAddress(add1).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCity1(response.results[0].address_components[3].long_name);
        setlatitude(lat);
        setlongitude(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [add1]);

  const buttonClickedMain = (indexone, item) => {
    if (isPast(item)) {
      return;
    }

    item.isTimeSelected = !item.isTimeSelected;
    const oldData = [...arraytwo];

    oldData.push(item);

    setArrayTwo(oldData);
  };

  const handleDataConfirmPickDate = async () => {
    const tempArray = [];
    timefinal.forEach((item) => {
      const obj = {
        isTimeSelected: true,
        isBooked: false,
        timevalue: `${item.starttime}-${item.endtime}`,
        userName: null,
        status: null,
        dateofbooking: null
      };
      tempArray.push(obj);
    });

    // setTimeArr(temp);

    const pickuFilter = [...pickU];
    const dateformate = moment(date).format("DD/MM/YYYY");

    const datachngesdfd = tempArray;

    pickuFilter.map((dat, idx) => {
      if (dat.dateofAvailibilty === moment(date).format("DD/MM/YYYY")) {
        pickuFilter[idx].timeslots = datachngesdfd;
      }
    });
    const obj = {
      dateofAvailibilty: dateformate,
      timeslots: datachngesdfd
    };

    setPickTime(obj.timeslots);

    pickuFilter.push(obj);
    setpickU(pickuFilter);

    const duplicateArray = [];
    const removeDuplication = (value) => {
      let isPresent = false;

      for (let index = 0; index < duplicateArray.length; index++) {
        if (duplicateArray[index].dateofAvailibilty === value.dateofAvailibilty) {
          isPresent = true;
          break;
        }
      }
      if (!isPresent) {
        duplicateArray.push(value);
      }
    };

    const checkDuplication = (value) => {
      if (duplicateArray.length === 0) {
        duplicateArray.push(value);
      } else {
        removeDuplication(value);
      }
    };

    for (let x = 0; x < pickuFilter.length; x++) {
      checkDuplication(pickuFilter[x]);
    }

    setpickU(duplicateArray);

    // let valueToSplit = {
    //   interval: "01:00",
    //   startTime: startTime,
    //   endTime: endTime,
    // };

    // newDataSplit = showTimeIntervals(valueToSplit);

    let datatest1 = duplicateArray;

    datatest1 = datatest1?.map((item) => {
      return {
        ...item,
        timeslots: mainFunConsecutive(item?.timeslots)
      };
    });

    let datatest = duplicateArray;

    datatest = datatest?.map((item) => {
      let startTime = null;
      let endTime = null;
      item.timeslots.map((item2) => {
        startTime = item2.timevalue.toString().split("-")[0];
        endTime = item2.timevalue.toString().split("-")[1];
      });

      const valueToSplit = {
        interval: "01:00",
        startTime,
        endTime
      };
      const getTimeArray = showTimeIntervals(valueToSplit);
      const newObjForjmObject = [];
      getTimeArray.slice(0, -1).map((data) => {
        const objForm = {
          timevalue: data,
          userName: null,
          dateofbooking: null,
          isTimeSelected: true,
          isBooked: false,
          status: null,
          isBookedDis: false
        };
        newObjForjmObject.push(objForm);
      });
      return {
        ...item,
        timeslots: newObjForjmObject
      };
    });
    setTempAvailabilityState(datatest1);

    try {
      await axios.post(`${baseURL}/space/schedule-timeslots/${space_id}`, {
        scheduleSlots: scheduleSlots
      });
      Alert("success", "Availability set Successfully");
    } catch (error) {
      Alert("error", "Availability not set");
    }
    setTimeFinal([]);
  };

  const getTimeDifferences = (t1, t2) => {
    const date1 = moment()
      .set("hours", getHourFormat(t1).split(":")[0])
      .set("minutes", getHourFormat(t1).split(":")[1]);
    const date2 = moment()
      .set("hours", getHourFormat(t2).split(":")[0])
      .set("minutes", getHourFormat(t2).split(":")[1]);
    return Math.abs(date1.diff(date2, "hours"));
  };

  const getDividedTimes = (timeArray) => {
    const timeArr = timeArray.map((t) => t.timevalue);

    const doneArr = [];
    const solArr = [];

    for (let i = 0; i < timeArr.length; ++i) {
      if (!doneArr.includes(i)) {
        const arr = [];
        doneArr.push(i);
        arr.push(timeArr[i]);
        let lastDuration = timeArr[i] === undefined ? timeArr[i] : timeArr[i].split("-")[1];
        for (let j = 0; j < timeArr.length; ++j) {
          if (!doneArr.includes(j)) {
            const diff = getTimeDifferences(lastDuration, timeArr[j].split("-")[0]);

            if (diff <= 0) {
              doneArr.push(j);
              lastDuration = timeArr[j].split("-")[1];
              arr.push(timeArr[j]);
            }
          }
        }
        solArr.push(arr);
      }
    }
    return solArr;
  };

  const makeConsecutive = (tempArrayData) => {
    const twoDataArray = [];
    twoDataArray.push(tempArrayData[0]);
    twoDataArray.push(tempArrayData[tempArrayData.length - 1]);

    let firstElement;
    let secondElement;
    if (twoDataArray[0]) {
      firstElement = twoDataArray[0].split("-")[0];
    }
    if (twoDataArray[1]) {
      secondElement = twoDataArray[1].split("-")[1];
    }
    return `${firstElement}-${secondElement}`;
  };

  const getHourFormat = (timeString) => {
    return moment(timeString, ["h:mm A"]).format("HH:mm");
  };

  const mainFunConsecutive = (timeArray) => {
    const finalArray = [];
    const dataMain = getDividedTimes(timeArray);

    for (let i = 0; i < dataMain.length; i++) {
      if (dataMain[i].length > 1) {
        const finalString = makeConsecutive(dataMain[i]);
        const objMulti = {
          timevalue: finalString,
          userName: null,
          status: null,
          dateofbooking: null,
          isTimeSelected: true,
          isBooked: false
        };
        finalArray.push(objMulti);
      }
      if (dataMain[i].length === 1) {
        const objSingle = {
          timevalue: dataMain[i]?.[0],
          userName: null,
          status: null,
          dateofbooking: null,
          isTimeSelected: true,
          isBooked: false
        };
        finalArray.push(objSingle);
      }
    }

    return finalArray;
  };

  const handleSubmit = async () => {
    const pickuFilter = [...pickU];
    //until then same
    const datachngesdfd = timearr.filter((data) => data.isTimeSelected);
    const dateformate = moment(date).format("DD/MM/YYYY");
    pickuFilter.map((dat, idx) => {
      if (dat.dateofAvailibilty === moment(date).format("DD/MM/YYYY")) {
        pickuFilter[idx].timeslots = datachngesdfd;
      }
    });
    const obj = {
      dateofAvailibilty: dateformate,
      timeslots: datachngesdfd
    };
    //until then same
    pickuFilter.push(obj);
    const duplicateArray = [];
    const removeDuplication = (value) => {
      let isPresent = false;
      for (let index = 0; index < duplicateArray.length; index++) {
        if (duplicateArray[index].dateofAvailibilty === value.dateofAvailibilty) {
          isPresent = true;
          break;
        }
      }
      if (!isPresent) {
        duplicateArray.push(value);
      }
    };
    pickuFilter.forEach((value) => {
      if (duplicateArray.length === 0) {
        duplicateArray.push(value);
      } else {
        removeDuplication(value);
      }
    });
    setpickU(duplicateArray);
    let datatest = duplicateArray;
    datatest = datatest?.map((item) => {
      return {
        ...item,
        timeslots: mainFunConsecutive(item?.timeslots)
      };
    });
    setTempAvailabilityState(datatest);
    try {
      await axios.patch(`${baseURL}/space/addavailability/${space_id}`, {
        pickDate: duplicateArray,
        currentDate: date
      });
      refresh();
      Alert("success", "Availability set Successfully");
    } catch (error) {
      Alert("error", "Availability not set");
    }
  };

  useEffect(() => {
    GetAllReview()
      .then((res) => {
        res?.person?.filter((item) => item.space.name === indiviualData.name);
      })
      .catch(() => {
      });
  }, []);

  function showTimeIntervals(value) {
    const result = value.interval;
    let start = "";
    let timeNotation = "";
    let time = "";
    for (const i in result) {
      let hr = moment(result, "H:mm").format("H");
      let min = moment(result, "H:mm").format("mm");
      hr = hr !== 0 ? parseInt(hr, 10) : "";
      min = min !== 0 ? parseInt(min, 10) : "";
      if (hr !== 0) {
        time = hr;
        timeNotation = "hour";
        start = moment(value.startTime, "h:mm a");
      } else {
        time = min;
        timeNotation = "minutes";
        start = moment(value.startTime, "h:mm a");
      }
    }
    let end = moment(value.endTime, "h:mm a");
    if (end.isBefore(start)) end = end.add(1, "d");
    const finalResult = [];
    const current = moment(start);
    let currentInterval;
    let finalResultObj;
    while (current <= end) {
      currentInterval = `${current.format("h:mma")}-`; //This will add the start of interval
      current.add(time, timeNotation);
      currentInterval += current.format("h:mma"); //This will add end of interval
      finalResult.push(currentInterval); //Add the complete interval to your result
      finalResultObj = {
        timevalue: finalResult
      };
    }

    return finalResult;
  }

  const availableSlots = useMemo(() => {
    const pieceSelected =
      (
        availabilityState?.find((item) => item.dateofAvailibilty === moment(date).format("DD/MM/YYYY")) || {}
      ).timeslots?.map((slot) => slot.timevalue) || [];
    const scheduleSelected = filteredSlots?.map((slot) => slot.timevalue);
    return [...pieceSelected, ...scheduleSelected].sort((aSlot, bSlot) =>
      parseTimeRange(aSlot).reduce((sum, slotTime) => sum + slotTime, 0) > parseTimeRange(bSlot).reduce((sum, slotTime) => sum + slotTime, 0) ? 1 : -1
    );
  }, [availabilityState, filteredSlots, date]);

  useEffect(() => {
    setTimeArr((prev) => {
      const tempNewSplit = [];

      pickTime?.map((data) => {
        let newDataSplit;
        const startTime = data?.timevalue.toString().split("-")[0];
        const endTime = data?.timevalue.toString().split("-")[1];
        const valueToSplit = {
          interval: "01:00",
          startTime,
          endTime
        };

        newDataSplit = showTimeIntervals(valueToSplit);

        for (let i = 0; i < newDataSplit.length - 1; i++) {
          tempNewSplit.push(newDataSplit[i]);
        }
      });

      let temp = null;
      temp = prev.map((data) => {
        return { ...data };
      });

      const finx = [];

      for (let i = 0; i < tempNewSplit.length; i++) {
        temp?.map((da, index) => {
          if (da.timevalue === tempNewSplit[i]) {
            finx.push(index);
          }
        });
      }

      finx.map((d) => {
        temp[d].isTimeSelected = true;
      });

      return temp;
    });
  }, [pickTime, date]);

  const address = add1;

  const extractCity = (address) => {
    const regex = /,\s([A-Za-z\s]+),/;
    const city = address.match(regex);
    if (city) {
      return city[1];
    }
    return null;
  };

  const citydd = extractCity(address);

  const extractState = (address) => {
    const regex = /,\s([A-Z]{2})\s/;
    const state = address.match(regex);
    if (state) {
      return state[1];
    }
    return null;
  };

  extractState(address);

  return (
    <>
      <Header />
      <div className="IndividualSpace">
        <div className="dashboardhiddendiv">HIDDEN</div>
        <div className="individualspacemain">
          <div className="individualspaced1">
            <div className="individualspaced2">
              <h6 className="individualspaceh1">{indiviualData.name} Space</h6>

              <div className="individualspaced3" style={{ background: primaryColor }}>
                <h6 className="individualspaceh2">{userdata.value.firstName}</h6>
                <p className="individualspacep1">{indiviualData.address}</p>
                <div className="individualspaced4">
                  <div className="individualspaced5">
                    <h6 className="individualspaceh3">City</h6>
                    <p className="individualspacep3">{city1}</p>
                  </div>
                  {/* <div className="individualspaced5">
                    <h6 className="individualspaceh3">Postal Code</h6>
                    <p className="individualspacep3">6000</p>
                  </div> */}
                  <div className="individualspaced5">
                    <h6 className="individualspaceh3">Region</h6>
                    <p className="individualspacep3">{citydd}</p>
                  </div>
                  {/* <div className="individualspaced5">
                    <h6 className="individualspaceh3">State</h6>
                    <p className="individualspacep3">{state}</p>
                  </div> */}
                </div>
              </div>
              <div className="individualspaced6" style={{ background: primaryColor }}>
                <div className="individualspaced7">
                  <h6 className="individualspaceh4">Contact Information</h6>
                  <div className="individualspaced8">
                    <img
                      src={
                        profilePictureImg != undefined
                          ? profilePictureImg.startsWith("http")
                            ? profilePictureImg
                            : `${baseURLSecond}/${profilePictureImg}`
                          : profile
                      }
                      alt=""
                    />
                    <div className="individualspaced9">
                      <p className="individualspacep4">
                        {userdata.value.firstName} {userdata.value.lastName}
                      </p>
                      <p className="individualspacep5">
                        Member since {/* {usersplitdate} */}
                        {moment(usersplitdate).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h6 className="individualspaceh5">Availability</h6>

              <div className="individualspacethreedivd1">
                <p className="data-scrol">
                  <p className="dataofavaio" style={{ color: primaryColor }}>
                    {" "}
                    {moment(date).format("DD/MM/YYYY")}
                  </p>

                  <div className="data_timeshow">
                    {availableSlots?.map((slot) => (
                      <p key={slot} className="data_timeshow_p">
                        {slot}
                      </p>
                    ))}
                  </div>

                  {/* Please set the date & time of availability */}
                </p>
              </div>
            </div>
            <div className="individualspacespimgdiv">
              <img
                className="individualspacespimg"
                style={{ borderLeft: `6px solid ${primaryColor}` }}
                src={`${baseURLSecond}/${indiviualData.spaceImage}`}
                alt=""
              />
              <div className="individualspacesmapdiv">
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
            </div>

            <div className="rating-main">
              {location.state === 0 ? (
                ""
              ) : (
                <div className="toRatingCommentsNum">
                  <Rating
                    // onClick={() => setValueStar(4)}
                    name="read-only"
                    value={location.finalRatingC}
                    readOnly
                  />

                  <div className="ratingLngth">({location.state})</div>
                </div>
              )}

              <h6 className="individualspaceh6">€{indiviualData.price}</h6>
            </div>
          </div>
          <div className="individualspacemainseconddiv">
            <div className="individualspacecaltime">
              <div
                className="individualspacecaltimed1"
                style={{
                  background: `linear-gradient(106.26deg, ${primaryColor} 11.37%, ${secondaryColor} 61.29%)`
                }}
              >
                <h6 className="individualspacecaltimeh1">Pick a date</h6>
                <Calendar
                  onChange={(e) => setDate(e)}
                  value={date}
                  minDate={new Date()}
                  showNeighboringMonth={false}
                  prevLabel={<ArrowBackIosNewIcon />}
                  nextLabel={<ArrowForwardIosIcon />}
                  selectRange={false}
                  // formatDay={(locale, date) =>
                  //   dayjs(date).format("MM-DD-YYYY")
                  // }
                />
              </div>
              {/* <div className="individualspacecaltimed2">
                <div className="individualspacecaltimebothdiv">
                  <h6
                    onClick={() => setOption(1)}
                    className={`${
                      option === 1
                        ? "individualspacecaltimed2h1active"
                        : "individualspacecaltimed2h1"
                    }`}
                  >
                    Select Time Slots
                  </h6>
                  <img
                    style={{
                      margin: "20px 0 0 20px",
                    }}
                    src={sphere}
                    alt=""
                  />
                  <h6
                    onClick={() => setOption(2)}
                    style={{
                      marginLeft: "25px",
                    }}
                    className={`${
                      option === 2
                        ? "individualspacecaltimed2h1active"
                        : "individualspacecaltimed2h1"
                    }`}
                  >
                    Pick your time
                  </h6>
                </div>

                <div
                  style={{
                    display: `${option === 1 ? "" : "none"}`,
                  }}
                  className="individualspacecaltimed2d1"
                >
                  {timearr.map((item, index) => {
                    return (
                      <div
                        key={index}
                        index={index}
                        // className={`${item.class} ${
                        //   classname.includes(item.class)
                        //     ? "individualspacecaltimed2d2active"
                        //     : "individualspacecaltimed2d2"
                        // }`}
                        onClick={(e) => buttonClickedMain(index, item)}
                      >
                        {item.timevalue}
                      </div>
                    );
                  })}
                  <button className="individualspacecaltimebtn">
                    Confirm
                  </button>
                </div>
                <div
                  style={{
                    display: `${option === 2 ? "" : "none"}`,
                  }}
                  className="individualspacecaltimesecond"
                >
                  <div>
                    {timearray.map((timearray, index) => {
                      return (
                        <div
                          key={index}
                          style={{ display: "flex", marginTop: "10px" }}
                        >
                          <LocalizationProvider
                            key={index}
                            dateAdapter={AdapterDayjs}
                          >
                            <TimePicker
                              key={index}
                              ampm={false}
                              value={timearray.starttime}
                              onChange={handleChangeTime1(index)}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />

                            <p className="individualspacecolon">:</p>

                            <TimePicker
                              ampm={false}
                              value={timearray.endtime}
                              onChange={handleChangeTime2(index)}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                          <img
                            style={{
                              display: `${
                                index + 1 === length ? "block" : "none"
                              }`,
                            }}
                            onClick={add}
                            className="w-10 h-10"
                            src={addtime}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>

                  <img
                    style={{
                      display: `${timearray.length >= 1 ? "none" : ""}`,
                    }}
                    onClick={add}
                    className="w-10 h-10"
                    src={addtime}
                    alt=""
                  />
                  <button className="individualspacecaltimebtn">
                    Confirm111
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  className="individualspacecaltimebtn"
                >
                  Confirm
                </button>
              </div> */}
              <div className="individualspacecaltimed2">
                <div className="individualspacecaltimebothdiv">
                  <h6
                    onClick={() => setOption(1)}
                    style={{
                      borderBottom: option === 1 ? `3px solid ${primaryColor}` : ""
                    }}
                    className={`${option === 1 ? "individualspacecaltimed2h1active" : "individualspacecaltimed2h1"}`}
                  >
                    Select Time Slots
                  </h6>
                  <img
                    style={{
                      margin: "20px 0 0 20px"
                    }}
                    src={sphere}
                    alt=""
                  />
                  <h6
                    onClick={() => setOption(2)}
                    style={{
                      marginLeft: "25px",
                      borderBottom: option === 2 ? `3px solid ${primaryColor}` : ""
                    }}
                    className={`${option === 2 ? "individualspacecaltimed2h1active" : "individualspacecaltimed2h1"}`}
                  >
                    Define your time slots
                  </h6>
                </div>

                <div
                  style={{
                    display: `${option === 1 ? "" : "none"}`
                  }}
                  className="individualspacecaltimed2d1"
                >
                  {timearr &&
                    timearr.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            background: item.isTimeSelected === true ? primaryColor : ""
                          }}
                          className={classnames(
                            "individualspacecaltimed2d2",
                            item.isTimeSelected
                              ? "individualspacecaltimed2d2active"
                              : subSelected(item)
                                ? "bg-warning text-white"
                                : "bg-white text-black",
                            isPast(item) ? "past-date" : ""
                          )}
                          onClick={() => buttonClickedMain(index, item)}
                        >
                          {item.timevalue}
                        </div>
                      );
                    })}
                </div>
                <div
                  style={{
                    display: `${option === 2 ? "none" : "flex"}`
                  }}
                  className="individualspacecaltimebtnbothdiv"
                >
                  <button
                    className="individualspacecaltimebtn"
                    onClick={handleSubmit}
                    style={{
                      border: `2px solid ${primaryColor}`,
                      color: primaryColor
                    }}
                  >
                    Confirm
                  </button>
                  <button className="individualspacecaltimebtn1" onClick={ClearAll}>
                    Clear All
                  </button>
                </div>
                <div
                  style={{
                    display: `${option === 2 ? "" : "none"}`
                  }}
                  className="p-4 flex flex-col overflow-hidden"
                >
                  <div className="overflow-y-auto flex flex-col space-y-4">
                    {scheduleSlots.map((slot, index) => {
                      return (
                        <div className="flex items-center gap-4">
                          <TimerEditor
                            onDelete={() => handleRemove(index, [...scheduleSlots])}
                            onChange={handleChangeTime(index)}
                            currentDate={date}
                            slot={slot}
                          />

                          <img
                            onClick={add}
                            className={classnames("w-10 h-10 mx-auto mt-2 mb-auto cursor-pointer", {
                              invisible: index + 1 !== length
                            })}
                            src={addtime}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>

                  <img
                    style={{
                      display: `${scheduleSlots.length >= 1 ? "none" : ""}`
                    }}
                    onClick={add}
                    className="w-10 h-10 mx-auto mt-4 cursor-pointer"
                    src={addtime}
                    alt=""
                  />

                  <button
                    className="individualspacecaltimebtn"
                    onClick={handleDataConfirmPickDate}
                    style={{
                      border: `2px solid ${primaryColor}`,
                      color: primaryColor,
                      marginTop: "20px"
                    }}
                    // onClick={() => {
                    //   let temp = [...timearr];

                    //   timefinal.forEach((item) => {

                    //     let obj = {
                    //       isTimeSelected: true,
                    //       isBooked: false,
                    //       timevalue: `${item.starttime} - ${item.endtime}`,
                    //       userName: null,
                    //       status: null,
                    //       dateofbooking: null,
                    //     };
                    //     temp.push(obj);
                    //   });

                    //   setTimeArr(temp);
                    //   setTimeFinal([]);
                    //   Alert("success", "Time Added");
                    // }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {location?.state === 0 ? (
            ""
          ) : (
            <button
              className="individualspaceb1"
              style={{
                backgroundColor: `${review ? primaryColor : "#3498db"}`,
                // color: `${review ? "#3498db" : primaryColor}`,
                border: `${review ? "" : `2px solid ${primaryColor}`}`
              }}
              onClick={() => {
                setReview(!review);
              }}
            >
              Reviews
            </button>
          )}

          <div className="individualspacelastDiv">
            <div
              className="individualspacereview"
              style={{
                display: `${close ? "none" : "block"}`
              }}
            >
              <div className="BookingTable">
                {/* <div className="dashboardbookingsd1">
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableHead
                        style={{ position: "sticky", top: "0", zIndex: "10" }}
                      >
                        <TableRow
                          className="firstrow"
                          style={{ background: primaryColor }}
                        >
                          <TableCell className="firstrowcellreview">
                            Booking Date
                          </TableCell>
                          <TableCell className="firstrowcellreview">
                            Booking Time
                          </TableCell>
                          <TableCell className="firstrowcellreview">
                            Name of Physiotherapist
                          </TableCell>
                          <TableCell className="firstrowcellreview">
                            Space Name
                          </TableCell>

                          <TableCell className="firstrowcellreview">
                            Rating
                          </TableCell>
                          <TableCell className="firstrowcellreview">
                            Review
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <>

                          {data.map((rows, index) => (
                            <TableRow key={index}>
                              <TableCell
                                className="cellreview"
                                style={{ width: 160 }}
                              >
                                {rows?.booking?.bookingDate}
                              </TableCell>
                              <TableCell
                                className="cellreview"
                                style={{ width: 160 }}
                              >
                                {rows?.booking?.bookingTime}
                              </TableCell>
                              <TableCell
                                className="cellreview"
                                style={{ width: 160 }}
                              >
                                {rows?.booking?.userName}
                              </TableCell>
                              <TableCell
                                className="cellreview"
                                style={{ width: 225 }}
                              >
                                {rows?.space?.name}
                              </TableCell>

                              <TableCell
                                className="cellreview"
                                style={{ width: 160 }}
                              >
                                <Rating
                                  name="read-only"
                                  value={rows?.rating}
                                  readOnly
                                />
                              </TableCell>
                              <TableCell
                                className="reviewtablecell"
                                style={{ width: 160, textAlign: "left" }}
                              >
                                <div className="reviewcell">
                                  {" "}
                                  {rows?.review}
                                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Tristique magna sit amet purus.
                          Suspendisse sed nisi lacus sed viverra. Ut aliquam
                          purus sit amet luctus venenatis lectus magna */}
                {/* </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div> */}
                {location.state === 0
                  ? ""
                  : data.map((rows) => (
                    <div
                      className="review-div"
                      style={{
                        display: "flex",
                        gap: "100px"
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
                            src={rows?.user?.image !== undefined ? `${baseURLSecond}/${rows?.user?.image}` : profile}
                            alt=""
                          />
                        </div>
                        <div> {rows?.booking?.userName.replace("undefined", "")}</div>
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default IndividualSpace;
