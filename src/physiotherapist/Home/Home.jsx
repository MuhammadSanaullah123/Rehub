import React, { useEffect, useState } from "react";
import "./home.css";
//components
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
//assets
import backpic from "../../assets/homepic.png";
import backimg3 from "../../assets/backimg3.png";
import { getBookingsByUserId } from "../../services/Books";
import { setOnlyBookingArrayforreviewModel } from "../../features/bookingSlice";
import SliderHome from "./SliderHome";
import logo from "../../assets/logo.png";
import { baseURL, baseURLSecond } from "../../common/AxiosInstance";

function Home() {
  const dispatch = useDispatch();
  const authorizedUser = useSelector((state) => state.user?.value?._id);
  const [para1, setPara1] = useState();
  const [link1, setLink] = useState();
  const [link2, setLink1] = useState();
  const [link3, setLink2] = useState();

  const [para2, setPara2] = useState();
  const [para3, setPara3] = useState();
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [pic1, setPic1] = useState();
  const [pic2, setPic2] = useState();
  const [pic3, setPic3] = useState();
  const [booKTimeA, setBooKTimeA] = useState([]);
  const [modelTimeCheck, setModelTimeCheck] = useState([]);
  const [modelTimeCheck1, setModelTimeCheck1] = useState("");

  const splitMonth1 = modelTimeCheck1?.split("-")[1];

  const userData = useSelector((state) => state.user);
  const [testLoader, setTestLoader] = useState(true);

  // const userId=useSelector()

  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPara1(item.paragraph1);
        setPara2(item.paragraph2);
        setPara3(item.paragraph3);
        setPrimary(item.primaryColor);
        setSecondary(item.secondaryColor);
        setPic1(`${baseURLSecond}/${item?.picture1}`);
        setPic2(`${baseURLSecond}/${item?.picture2}`);
        setPic3(`${baseURLSecond}/${item?.picture3}`);
        setLink(item?.link1);
        setLink1(item?.link2);
        setLink2(item?.link13);
      });
    });
  }, []);
  const data1 = [
    {
      picture: pic1,
      link: link1
    },
    {
      picture: pic2,
      link: link2
    },
    {
      picture: pic3,
      link: link3
    }
  ];
  const data = [
    {
      digit: "1",
      picture: pic1,
      text: "<b>Physiotherapists:</b> You register on ReHub\n\n<b>Physiotherapy Center Owners:</b> Register your center and update its availability on the calendar."
    },
    {
      digit: "2",
      picture: pic2,
      text: "Physiotherapists can search, book and pay for a center for specific time slots, in order to satisfy a client request."
    },
    {
      digit: "3",
      picture: pic3,
      text: "Confirmation is sent to both parties."
    }
  ];
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 948,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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

  const checktestDataeformat = (bookingDate) => {
    const currentdate = new Date();

    const chnagefortmate = moment(currentdate).format("YYYY-DD-MM");

    // let splitMonth = chnagefortmate.split("/")[1];

    // let splitdate = chnagefortmate.split("/")[0];

    // let splitd = bookingDate.split("/")[0];

    // splitd = splitd < 10 ? `0${splitd}` : splitd;

    // let splitM = bookingDate.split("/")[1];

    // if (splitd === splitdate && splitM === splitMonth) {
    //   return "Upcoming";
    // } else if (splitd > splitdate && splitM >= splitMonth) {
    //   return "Upcoming";
    // } else {
    //   return "Previous";
    // }
  };

  useEffect(() => {
    // let datacheck = "20/11/2022";
    const datacheck = "2022-20-11";
    const datachecksdsd = checktestDataeformat(datacheck);
    // let datacheck = "2022-20-11";

    // let datachecksdsd = myFunction(
    //   moment(datacheck, "YYYY-DD-MM").format("YYYY-DD-MM")
    // );
  }, []);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentMinutes1 = currentMinutes.toString().padStart(2, "0");

  useEffect(() => {
    getBookingsByUserId(authorizedUser, setTestLoader).then((res) => {
      // let updateData = res?.data?.map((item) => {
      //   return {
      //     ...item,
      //     status: myFunction(moment(item?.bookingDate).format("YYYY-DD-MM")),
      //   };
      // });
      const dataget = res?.data
        ?.filter((item) => item?.userId === authorizedUser)
        .filter((item2) => item2.reviewSubmit === false)
        .filter((item2) => item2.paymentStatus === "Paid")
        .filter((item3) => item3.status === "Previous");

      dispatch(setOnlyBookingArrayforreviewModel(dataget));

      setModelTimeCheck(dataget);
      dataget.map((item) => {
        setModelTimeCheck1(item.bookingTime);
      });

      // const filterArray = res?.data?.filter((item) => {
      //   return item?.userId === authorizedUser;
      // });
      // filterArray?.map((item2) => {
      //   booKTimeA.push(item2.bookingTime);
      // });
    });
    // .catch((error)=>{
    // })
  }, []);

  const handleDateReturnhrs = (userdate) => {
    const userdatechange1 = moment(userdate, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    const userdatafinal = moment(userdatechange1, "DD-MM-YYYY  HH:mm");
    const currentDate = moment(new Date()).format("DD-MM-YYYY HH:mm");
    const finalCurrentDate = moment(currentDate, "DD-MM-YYYY  HH:mm");

    const result2 = userdatafinal.diff(finalCurrentDate, "minutes");
    const numdays = Math.floor(result2 / 1440);
    const numhours = Math.floor((result2 % 1440) / 60);
    const numminutes = Math.floor((result2 % 1440) % 60);
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentMinutes1 = currentMinutes.toString().padStart(2, "0");

    const dddddddd = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    });
    return { numhours, numdays, numminutes };
  };
  useEffect(() => {
    const testdate = "18/11/2022";

    const datemonth = testdate?.split("/")[1];
    const dateday = testdate?.split("/")[0];
    const dateyear = testdate?.split("/")[2];
    const splitfinal = `${dateday}-${datemonth}-${dateyear}`;
    const testdata = handleDateReturnhrs(splitfinal);

    // var d = new Date();
    // var t = new Date().getTime();
    // var randomnum = Math.floor(Math.random() * (1000 - 500000)) + 1000;
    // randomnum =
    //   d.getFullYear() + f(d.getMonth() + 1) + f(d.getDate()) + randomnum;
    // randomnum = randomnum + t;

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
  }, []);

  return (
    <>
      <Header />

      <div className="Home">
        <div className="homed1">
          <div>
            <img src={logo} height="200px" />
            {/* <h6
              className="homeh1"
              style={{
                color: primaryColor,
              }}
            >
              Lorem ipsum dolor sit
            </h6> */}

            <p className="homep1">
              Welcome to ReHub,
              {"\n"}a digital platform for rehabilitation experts,
              {"\n"}
              where professional skills are matched to
              {"\n"}
              vacant workspaces.
            </p>
          </div>
          <div>
            <img className="homeimg" src={backpic} alt="" />
          </div>
        </div>

        <p className="linesDivp11">
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
          ReHub is you and me and all of us. We have been chosen and trained to be in the profession of Rehabilitation.
          Because we are the kind of people who need to give, to help, to heal. To do that we connect with those who
          need us, and we share our skills and knowledge with them. Through ReHub we can now connect digitally with each
          other and share our resources. So that we can all stay in business and continue doing what we like most: be of
          service.
        </p>
        <div className="linesDiv">
          <div className="background" />
          <h6 className="linesDivh1">How we Work</h6>
          <p className="work-text">Rehub matches the needs of Physiotherapists with Physiotherapy Centers.</p>
          <p className="work-text">
            A freelance physiotherapists with no space to practice and a physiotherapy center with free rooms during
            specific time slots are brought together. The physiotherapists acquires a therapy room for an hour, the
            center is owner is paid a fee and the patient receives treatment.
          </p>
          <p className="work-text">This is how you can 'Rehub':</p>

          <div className="slider-main">
            <Slider {...settings} className="sliderSetting">
              {data.map((item) => {
                return (
                  <div className="linesDivd2">
                    <div className="linesDivcircle1">
                      <div className="linesDivcircle2">{item.digit}</div>
                    </div>
                    <div className="linesDivd3">
                      {/* <img className="linesDivd3img" src={therapy} alt="" /> */}
                      <p className="linesDivd3p" dangerouslySetInnerHTML={{ __html: item?.text }} />
                      <p />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>

        <div className="homelastDiv">
          <h6 className="homelastDivh1">Why You Should Register</h6>
          <p className="work-text2">
            ReHub removes an economic burden off your back in a flexible way, <br />
            offering you flexibility, independence and financial relief,
          </p>

          <div className="homelastDivd2">
            <div className="p-1 phy-text1">
              <p>
                For <span className="phy-text"> Physiotherapy Center Owners</span>
              </p>
              <div
                className="homelastDivd1"
                // style={{ background: primaryColor }}
              >
                <ul className="f-1">
                  <li>Share your rental and utilities expenses and keep your business viable.</li>
                  <li>Earn a passive income in addition to and while earning your normal income.</li>
                  <li>Avoid permanent and long-term partnership commitments.</li>
                  <li>You can unsubscribe as you please.</li>
                  <li>And do all of these online with just a few clicks.</li>
                </ul>
                {/* <img className="homelastDivimg1" src={center} alt="" />
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                <h6 className="homelastDivh2">Physiotherapists</h6>
              </div> */}
              </div>
            </div>

            <div className="phy-text1">
              <p>
                For <span className="phy-text"> Physiotherapists looking for a space </span>{" "}
              </p>
              <div
                className="homelastDivd1"
                // style={{ background: primaryColor }}
              >
                <ul className="f-1">
                  <li>Pay rent on demand. Avoid permanent contractual commitments.</li>
                  <li>Choose more than one center location to service clients in different areas.</li>
                  <li>Remain self-employed and independent.</li>
                  <li>You can unsubscribe as you please.</li>
                  <li>And do all of these online with just a few clicks.</li>
                </ul>
                {/* <img className="homelastDivimg1" src={therapy} alt="" />
                <div
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <h6 className="homelastDivh2">Physiotherapy center</h6>
                </div> */}
              </div>
            </div>
          </div>
          {/* <Reviews  primaryColor={primaryColor} /> */}
        </div>
      </div>
      {/* <div className="data-div">
        <p className="homelastDivp1">
          ReHub is here to ensure that Cyprud's rehabilitation resources are
          fully utilized to the benefit of both.Professional and flexible way.We
          encourage sharing without the need for a full-time commitments
        </p>

        <p className="homelastDivp1">
          We start by bringing physiotherapists together to assist them in
          meeting one another needs ,by sharing their premises and expenses.so
          that they can maintain their businesses through periods of economic
          distress and high unemployment
        </p>
      </div> */}

      <SliderHome
        backimg3={backimg3}
        piture1={pic1}
        piture2={pic2}
        data1={data1}
        piture3={pic3}
      />

      <Footer />
    </>
  );
}

export default Home;
