import React, { useParams, useState } from "react";
import "./ListProduct.scss";
import { Link, NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import Geocode from "react-geocode";
import Cookies from "universal-cookie";

//assets
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setSingleSpaceData } from "../../features/bookingSlice";
import axios from "axios";
import { Stack } from "@mui/material";
import { setSingleSpaceData } from "../../features/bookingSlice";

import LoadingProgressBar from "../../common/LoadingProgressBar";
import { baseURL, baseURLSecond } from "../../common/AxiosInstance";
import ReactPagination from "../../physiotherapist/SpaceProvider/ReactPagination";

function ListProduct({
  text, date, area, time, data, Loading, location, LoadingSecond, subCity,
}) {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state?.user?.value?.user?.accountType);
  const [latitude, setlatitude] = useState([]);
  const [longitude, setlongitude] = useState([]);
  const [address, setAddress] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  // const [count, setCount] = useState(0);
  const cookies = new Cookies();
  const [cookiesaddress, setCookiesAddress] = useState(cookies.get("addresscook"));
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    Geocode.setApiKey("AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY");
    Geocode.fromAddress(cookies.get("addresscook")).then(
      (response) => {
        const { lat, lng } = response.results.geometry.location;
        latitude.push(lat);
        setlongitude(lng);
      },
      (error) => {
        console.error(error);
      },
    );

    setAddress(data.map((item) => item?.address).filter((item) => !item));

    const tempFilteredData = data?.filter((item) => {
      if (location && !item?.address?.includes(location)) {
        return false;
      }
      const dateString = date ? moment(date)?.format("DD/MM/YYYY") : "";
      if (
        (dateString || time)
        && !item?.pickDate?.some(
          (pDate) => (!date || pDate?.dateofAvailibilty?.includes(dateString))
            && (!time || pDate?.timeslots?.some((tSlot) => tSlot?.timevalue.includes(time))),
        )
      ) {
        return false;
      }
      return true;
    });

    setFilteredData(tempFilteredData);
  }, [date, time, location, subCity]);

  const API_KEY = "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY";
  const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

  const path = window.location.pathname;
  const history = useHistory();

  const [bookingArray, setBookingArray] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPrimary(item.primaryColor);
        setSecondary(item.secondaryColor);
      });
    });
  }, []);

  const google = window.google;
  // var geocoder = new google.maps.Geocoder();

  // var latitude;
  // var longitude;
  // geocoder.geocode({ address: address }, function (results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //     latitude = results[0].geometry.location.lat();
  //     longitude = results[0].geometry.location.lng();
  //     // alert(latitude);
  //   }
  // });

  // function distance(lat1, lon1, lat2, lon2, unit) {
  //   var radlat1 = (Math.PI * lat1) / 180;
  //   var radlat2 = (Math.PI * lat2) / 180;
  //   var theta = lon1 - lon2;
  //   var radtheta = (Math.PI * theta) / 180;
  //   var dist =
  //     Math.sin(radlat1) * Math.sin(radlat2) +
  //     Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //   dist = Math.acos(dist);
  //   dist = (dist * 180) / Math.PI;
  //   dist = dist * 60 * 1.1515;
  //   if (unit == "K") {
  //     dist = dist * 1.609344;
  //   }
  //   if (unit == "M") {
  //     dist = dist * 0.8684;
  //   }
  //   return dist;
  // }
  // const distanceBtw = distance(
  //   30.157458,
  //   71.5249154,
  //   31.5203696,
  //   74.35874729999999,
  //   "K"
  // );

  // findAddress();
  // function setNearestData(){
  //   bookingArray?.map((item)=>{

  //     showAddress(item.address);

  //   })

  // }

  // setNearestData();

  // const handleConversion = () => {
  //   Geocode.fromLatLng(latitude, longitude).then(
  //     (response) => {
  //       const address = response.results[0].formatted_address;
  //       let city, state, country;
  //       for (
  //         let i = 0;
  //         i < response.results[0].address_components.length;
  //         i++
  //       ) {
  //         for (
  //           let j = 0;
  //           j < response.results[0].address_components[i].types.length;
  //           j++
  //         ) {
  //           switch (response.results[0].address_components[i].types[j]) {
  //             case "locality":
  //               city = response.results[0].address_components[i].long_name;
  //               break;
  //             case "administrative_area_level_1":
  //               state = response.results[0].address_components[i].long_name;

  //               break;
  //             case "country":
  //               country = response.results[0].address_components[i].long_name;

  //               break;
  //           }
  //         }
  //       }

  //       // if (edit) {
  //       //   inputvalues.addresschild = address;
  //       // } else {
  //       //   inputvalues.address = address;
  //       // }
  //       // handleCloseAddress();
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // };

  // useEffect(()=>{
  //   handleConversion()
  // },[])

  return (
    <>
      <div
        style={{
          display: `${path === "/list-center" ? "block" : "none"}`,
        }}
        className="listproductl1"
      />
      {Loading ? (
        <div
          style={{
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingProgressBar />
        </div>
      ) : (
        <>
          {!(filteredData?.length > 0) ? (
            <div>Date not Found</div>
          ) : (
            <div className="product-list">
              {currentItems.length > 0
                && currentItems?.map((spacedata) => {
                  return (
                    <div className="listproduct">
                      <Link
                        onClick={() => {
                          dispatch(setSingleSpaceData(spacedata));

                          history.push({
                            pathname: "/booking",
                            // search: `?spaceid=${spacedata?._id}`, // query string
                            state: {
                              // location state
                              spaceid: spacedata?._id,
                              primaryColor,
                              date,
                            },
                          });
                          // navigate({
                          //   pathname: "/booking",
                          // });
                        }}
                      >
                        <div className="listproductd1">
                          <img
                            className="listproductimg1"
                            style={{
                              borderRight: `6px solid ${primaryColor}`,
                            }}
                              // src={spaceimg}
                            src={`${baseURLSecond}/${spacedata?.spaceImage}`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="listproductd2">
                        <h6 className="listproducth1">{spacedata?.name}</h6>
                        <p className="listproductp1">{spacedata?.address}</p>
                        <div className="listproductd5">
                          {/*     <div>
                            {date !== "" && time !== ""
                              ? spacedata?.pickDate?.map((item) => {

                                  return (
                                    item !== "" && (
                                      <>
                                        <div className="listproductd6">

                                          {item.timeslots?.map((timeslot) => {
                                            return (
                                              <>

                                                <div className="listproductd3">
                                                  {timeslot?.timevalue
                                                    ?.split(" ")
                                                    ?.join("")}
                                                </div>

                                              </>
                                            );
                                          })}

                                          <p className="listproductp2">
                                            {item?.dateofAvailibilty}
                                          </p>
                                        </div>
                                      </>
                                    )
                                  );
                                })
                              : ""}
                          </div> */}

                          <div className="listproductd4">
                            <p className="listproductp3">
                              $
                              {spacedata?.price}
                            </p>
                            {/* <Link
                      to={{
                        pathname: "/booking",
                      }}
                      className="listproductbook"
                    > */}
                            <button
                              className={
                                  userType === "Professional" || userType === "Professional"
                                    ? "listproductb1"
                                    : "list-remove"
                                }
                              style={{
                                display: `${path === "/list-center" ? "block" : "none"}`,
                                background: primaryColor,
                              }}
                              onClick={() => {
                                dispatch(setSingleSpaceData(spacedata));

                                history.push({
                                  pathname: "/booking",
                                  // search: `?spaceid=${spacedata?._id}`, // query string
                                  state: {
                                    // location state
                                    spaceid: spacedata?._id,
                                    primaryColor,
                                  },
                                });
                                // navigate({
                                //   pathname: "/booking",
                                // });
                              }}
                            >
                              Book Now
                            </button>
                            {/* </Link> */}
                            <Link
                              to="/receipt"
                              className="listproductb2"
                              style={{
                                display: `${path === "/booking-list" ? "flex" : "none"}`,
                                width: `${text === "Upcoming Booking" ? "208px" : ""}`,
                                color: `${text === "Upcoming Booking" ? "#ffffff" : ""}`,
                                backgroundColor: `${text === "Upcoming Booking" ? "#00B4FF" : ""}`,
                              }}
                            >
                              View
                            </Link>
                            <Link
                              className="listproductb2"
                              style={{
                                display: `${
                                  path === "/booking-list" && text === "Upcoming Booking" ? "flex" : "none"
                                }`,
                                width: `${text === "Upcoming Booking" ? "208px" : ""}`,
                                color: `${text === "Upcoming Booking" ? "#ffffff" : ""}`,
                                backgroundColor: `${text === "Upcoming Booking" ? "#00B4FF" : ""}`,
                              }}
                            >
                              Upcoming Booking
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </>
      )}

      <Stack className="product-list-pagination stackPagination" spacing={2}>
        <ReactPagination
          currentItems={currentItems}
          setCurrentItems={setCurrentItems}
          allDataArray={filteredData}
          itemsPerPage={3}
          allData={data}
        />
      </Stack>
    </>
  );
}

export default ListProduct;
