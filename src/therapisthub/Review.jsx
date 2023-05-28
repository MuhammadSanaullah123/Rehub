import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spacereview from "../mainLayout/AdminReview/Spacereview";
import { getAllSpace } from "../services/AddSpace";
import { getContentApi } from "../redux/UserReducerApis";
import Header from "../mainLayout/Header/Header";

function Review() {
  const dispatch = useDispatch();
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const userData = useSelector((state) => state.user);
  const [allSPaceDataHub, setAllSPaceDataHub] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();

  useEffect(() => {
    getAllSpace()
      .then((res) => {
        const data = res.spaceData;

        const datafilter = data.filter(
          // (item) => item?.therapisthub?._id == userData?.value?.firstName
          (item) => item?.therapisthub?.firstName === userData?.value?.firstName
            && item?.therapisthub?.lastName === userData?.value?.lastName,
          // (item) => item?.therapisthub?._id == userData?.value?.firstName
        );
        setAllSPaceDataHub(datafilter);
      })
      .catch((err) => {}, []);
  }, []);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <div
        style={{
          backgroundColor: "#f4f3f3",
        }}
      >
        <div className="Review">
          <div className="dashboardhiddendiv">HIDDEN</div>
          <div className="reviewmain">
            <h6 className="reviewh1">Your Spaces reviews</h6>
            <div className="reviewd1">
              {allSPaceDataHub.map((i) => (
                <Spacereview key={i} data={i} primaryColor={primaryColor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
