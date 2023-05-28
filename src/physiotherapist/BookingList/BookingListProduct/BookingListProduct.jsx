import React, { useParams, useEffect, useState } from "react";
import "./ListProduct.scss";
import { Link, NavLink, useHistory } from "react-router-dom";

//assets
import { useDispatch, useSelector } from "react-redux";
import spaceimg from "../../../assets/spaceimg.png";
import { baseURLSecond } from "../../../common/AxiosInstance";
// import { setSingleSpaceData } from "../../features/bookingSlice";
import LoadingProgressBar from "../../../common/LoadingProgressBar";
import { setBookingDataInbooking, setReciptData, setSingleSpaceData } from "../../../features/bookingSlice";
import { getBookingBySpaceName } from "../../../services/Books";

function BookingListProduct({
  text, filteredData, testText, primaryColor,
}) {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const history = useHistory();
  const [bookingArray, setBookingArray] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [upcom, setUpcom] = useState(null);
  const selectfilteredarray = useSelector((state) => state?.booking?.filteredArrayBookingList);
  const upcomingBooking = useSelector((state) => state?.booking?.upcomingBooking);
  const bookingdata = useSelector((state) => state?.booking?.bookingdata);
  const bookID = bookingdata?.length > 0 ? bookingdata[0]?.bookingInvoiceNumber : "";

  const selectfilteredarrayData = useSelector((state) => state?.booking);
  const userType = useSelector((state) => state?.user?.value?.user?.accountType);

  useEffect(() => {
    setBookingArray(selectfilteredarray);
    setLoading(false);
  }, [selectfilteredarray]);
  useEffect(() => {
    setUpcom(upcomingBooking);
  }, [upcomingBooking]);
  const handleMoveReciptPage = (spacedata, whole) => {
    const buttonselect = testText === "Upcoming Booking" ? "Upcoming" : "Previous";

    getBookingBySpaceName(spacedata)
      .then((res) => {
        let daatresponse = res.data;

        daatresponse = daatresponse?.filter((item) => item?.status === buttonselect);
        dispatch(setBookingDataInbooking(daatresponse));
      })
      .catch((err) => {});

    history.push({
      pathname: `/receipt/${whole[0].bookingInvoiceNumber}`,
    });
    dispatch(setReciptData(whole));
  };
  return (
    <>
      <div
        style={{
          display: `${path === "/list-center" ? "block" : "none"}`,
        }}
        className="listproductl1"
      />
      {Loading && upcom === null ? (
        <div
          style={{
            height: "30vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingProgressBar />
        </div>
      ) : (
        <></>
      )}
      {" "}
      <>
        {upcom
          && Object.keys(upcom).map((spacedata, index) => {
            return (
              <div className="listproduct">
                <div className="listproductd1">
                  <img
                    className="listproductimg1"
                    style={{ borderRight: `6px solid ${primaryColor}` }}
                    src={`${baseURLSecond}/${upcom[spacedata][0]?.spaceImage}`}
                    alt=""
                  />
                </div>
                <div className="listproductd2">
                  <h6 className="listproducth1">{upcom[spacedata][0]?.spaceName}</h6>
                  <p className="listproductp1">{upcom[spacedata][0]?.spaceId?.address}</p>
                  <div className="listproductd5">
                    <div className="listproductd4">
                      <p className="listproductp3">
                        $
                        {upcom[spacedata][0]?.spacePrice}
                      </p>

                      <button
                        className="listproductb1"
                        style={{
                          display: `${path === "/list-center" ? "block" : "none"}`,
                        }}
                        onClick={() => {
                          dispatch(setSingleSpaceData(spacedata));

                          history.push({
                            pathname: "/booking",

                            state: {
                              // location state
                              spaceid: spacedata?._id,
                            },
                          });
                          // navigate({
                          //   pathname: "/booking",
                          // });
                        }}
                      >
                        Book Now
                      </button>
                      <button
                        className="listproductb2"
                        style={{
                          display: `${path === "/booking-list" ? "flex" : "none"}`,
                          width: `${text === "Upcoming Booking" ? "208px" : ""}`,
                          color: `${text === "Upcoming Booking" ? "" : primaryColor}`,
                          backgroundColor: `${text === "Upcoming Booking" ? primaryColor : ""}`,
                          border: `1px solid ${primaryColor}`,
                        }}
                        onClick={() => handleMoveReciptPage(upcom[spacedata][0]?.spaceName, upcom[spacedata])}
                      >
                        View
                      </button>

                      {/* </Link> */}
                      <Link
                        className="listproductb2"
                        style={{
                          display: `${path === "/booking-list" && text === "Upcoming Booking" ? "flex" : "none"}`,
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

        {upcom == null || Object.keys(upcom).length == 0 ? <div>No Data Found</div> : ""}
      </>
    </>
  );
}

export default BookingListProduct;
