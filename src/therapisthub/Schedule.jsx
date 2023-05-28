import React, { useState, useEffect } from "react";

//components
import Calendar from "react-calendar";
import moment from "moment";
//mui
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIndividualSpace } from "../services/AddSpace";
import { getContentApi } from "../redux/UserReducerApis";
import { Alert } from "../common/Alert";
import Header from "../mainLayout/Header/Header";

function Schedule() {
  const dispatch = useDispatch();
  const [pickU, setpickU] = useState([]);
  const [emptydata, setEmptyDta] = useState([]);
  const location = useLocation();
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);

  const [scheduleData, setScheduleData] = useState({});
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [pickDateData, setPickDateData] = useState([]);
  const [test, setTest] = useState([]);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState();
  const [timearr, setTimeArr] = useState([
    { time: "12:00am", text: "No Schedule" },
    { time: "1:00am", text: "Schedule with Space 1" },
    { time: "2:00am", text: "Schedule with Kazuya" },
    { time: "3:00am", text: "Schedule with Kazuya" },
    { time: "4:00am", text: "No Time" },
    { time: "5:00am", text: "No Time" },
    { time: "6:00am", text: "No Time" },
    { time: "7:00am", text: "No Time" },
    { time: "8:00am", text: "No Time" },
    { time: "9:00am", text: "No Time" },
    { time: "10:00am", text: "No Time" },
    { time: "11:00am", text: "No Time" },
    { time: "12:00pm", text: "No Time" },
    { time: "1:00pm", text: "No Time" },
    { time: "2:00pm", text: "No Time" },
    { time: "3:00pm", text: "No Time" },
    { time: "4:00pm", text: "No Time" },
    { time: "5:00pm", text: "No Time" },
    { time: "6:00pm", text: "No Time" },
    { time: "7:00pm", text: "No Time" },
    { time: "8:00pm", text: "No Time" },
    { time: "9:00pm", text: "No Time" },
    { time: "10:00pm", text: "No Time" },
    { time: "11:00pm", text: "No Time" },
  ]);

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateformate = moment(date).format("DD/MM/YYYY");

  // useEffect(() => {
  //   getAllSpace()
  //     .then((response) => {
  //       // resolve(response.data);

  //       setScheduleData(response.spaceData);
  //     })
  //     .catch((err) => {
  //       // reject(err);
  //     });
  // }, []);

  const handleDay = () => {
    setDay(weekday[date?.getDay()]);
  };

  useEffect(() => {
    // let dateData = scheduleData.map((item) => {
    //   return {
    //     ...item,
    //     pickDate: item.pickDate?.map((item2)=>{
    //       return{
    //         ...item2,
    //         dateofAvailibilty: item2?.dateofAvailibilty == dateformate
    //       }
    //     })

    //   };
    // });

    // let newData = scheduleData.map((options) => {
    //   return {
    //     ...options,
    //     pickDate: options?.pickDate?.filter(
    //       (item) =>
    //         item?.dateofAvailibilty === dateformate
    //     ),
    //   };
    // });
    // let chnagedata = newData?.filter((item) => item?.pickDate.length !== 0);
    // let finalAray = chnagedata?.map((item) => {
    //   return {
    //     ...item,
    //     pickDate: item?.pickDate?.map((item2) => {
    //       return {
    //         ...item2,
    //         timeslots: item2?.timeslots?.map((item4) => {

    //           return {
    //             ...item4,
    //             timetext: item4?.timevalue?.split(" ")[0],
    //           };
    //         }),
    //       };
    //     }),
    //   };
    // });

    // {

    //   if (

    // )
    // {
    //   return {
    //     ...options}

    //   }
    // let dateData = scheduleData.map((item) => {
    //   return {
    //     ...item,
    //     pickDate: item.pickDate.filter(
    //       (item2) => item2.dateofAvailibilty === dateformate
    //     )

    //   };
    // });

    // setEmptyDta(finalAray);
    // ?.map((item3)=>{
    //   return{
    //     ...item3,
    //     timeslots:item3?.timeslots?.map((item4)=>{

    //       return{
    //         ...item4,
    //         timetext:item4?.timevalue?.split(" ")[0]

    //       }
    //     })

    //   }
    // })
    handleDay();
  }, [scheduleData, dateformate]);

  useEffect(() => {
    getIndividualSpace(location?.state)
      .then((response) => {
        setPickDateData(response?.result);
        // let textResponse = response?.result?.

        // let textResponse = response?.result?.map((item) => {
        //   return {
        //     ...item,
        //     pickDate: item.pickDate?.map((item2) => {
        //       return {
        //         ...item2,
        //         timeslots: item2?.timeslots?.map((item4) => {

        //           return {
        //             ...item4,
        //             timetext: item4?.timevalue?.split(" ")[0],
        //           };
        //         }),
        //       };
        //     }),
        //   };
        // });

        // resolve(response.data);

        // setScheduleData(response.result);
      })
      .catch((err) => {
        // reject(err);
        Alert("error", err);

        // SimpleAlert("error", err);
      });
  }, [location]);

  useEffect(() => {
    // let dataChnage = [...pickDateData];
    const testfilter = pickDateData?.pickDate?.filter((item) => item?.dateofAvailibilty === dateformate);

    const dataChnage = pickDateData?.pickDate
      ?.filter((item) => item?.dateofAvailibilty === dateformate)
      ?.map((item2) => {
        return {
          ...item2,
          timeslots: item2?.timeslots?.map((item4) => {
            return {
              ...item4,
              timetext: item4?.timevalue?.split(" ")[0],
            };
          }),
        };
      });

    // setPickDateData(dataChnage)
    setTest(dataChnage);
  }, [pickDateData, dateformate]);

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
        <div className="Schedule">
          <div className="dashboardhiddendiv">HIDDEN</div>
          <div className="schedulemain">
            <div className="scheduled1">
              <h6 className="scheduleh1">Schedule</h6>
              <Calendar
                onChange={setDate}
                value={date}
                minDate={new Date()}
                showNeighboringMonth={false}
                prevLabel={<ArrowBackIosNewIcon />}
                nextLabel={<ArrowForwardIosIcon />}
                selectRange={false}
              />
            </div>
            <div className="scheduled2">
              <h6 className="scheduled2h1" style={{ color: primaryColor }}>
                {day}
              </h6>
              <div className="scheduleover">
                {test?.length === 0 ? (
                  <div>
                    <h5 className="scheduled2h1">No Schedule</h5>
                  </div>
                ) : (
                  <>
                    {test?.map((timearr, index) => {
                      return (
                        <div key={index} className="scheduled2d1">
                          <div className="scheduled2d2">
                            {timearr?.dateofAvailibilty === dateformate ? (
                              <>
                                {timearr?.timeslots?.map((item3) => {
                                  return (
                                    <>
                                      <div className="time-line">
                                        {" "}
                                        <h6 className="scheduled2d2h1" style={{ color: primaryColor }}>
                                          {item3.timetext}
                                        </h6>
                                        {" "}
                                        <div
                                          className="scheduled2d3"
                                          style={{ borderBottom: `2px solid ${primaryColor}` }}
                                        />
                                      </div>

                                      <div className="scheduled2d4">
                                        <span className="scheduledspanp">
                                          {" "}
                                          <p className="scheduled2d2p1">{/* {timearr.text.slice(0, 14)} */}</p>
                                          <p className="scheduled2d2p2" style={{ color: primaryColor }}>
                                            {/* {timearr.text.slice(
                                          14,
                                          timearr.text.length
                                        )} */}
                                            {pickDateData?.name}
                                            {" "}
                                            Space
                                          </p>
                                        </span>
                                      </div>
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
