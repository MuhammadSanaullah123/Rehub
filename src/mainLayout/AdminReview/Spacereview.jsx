import React, { useEffect, useState } from "react";

//assets
import { useSelector } from "react-redux";
import { setISODay } from "date-fns";
import { Rating } from "@mui/material";
import spaceimg from "../../assets/spaceimg.png";
import Reviews from "../Reviews/Reviews";
import { baseURLSecond } from "../../common/AxiosInstance";
import { GetAllReviewsByID } from "../../services/Review";
import { getUserleSpace } from "../../services/AddSpace";

// useEffect(() => {
//   GetAllReviewsByID(spaceid)
//     .then((res) => {
//       let data = res?.person.filter((item) => {
//         return item.approve === true;
//       });
//       let dadsdas = data?.map((item) => item?.rating);
//       const step2 = dadsdas.map((item) => parseInt(item));

//       setFinalRatingLength(step2?.length);
//       let filterFive = step2?.filter((item) => item === 5);
//       let filterFour = step2?.filter((item) => item === 4);
//       let filterThree = step2?.filter((item) => item === 3);
//       let filterTwo = step2?.filter((item) => item === 2);
//       let filterOne = step2?.filter((item) => item === 1);

//       let averageRatingFive = filterFive?.length * 5;
//       let averageRatingFour = filterFour?.length * 4;
//       let averageRatingThree = filterThree?.length * 3;
//       let averageRatingTw0 = filterTwo?.length * 2;
//       let averageRatingOne = filterOne?.length * 1;

//       let finalRating =
//         averageRatingFive +
//         averageRatingFour +
//         averageRatingThree +
//         averageRatingTw0 +
//         averageRatingOne;

//       let finalLengthResponse =
//         filterFive?.length +
//         filterFour?.length +
//         filterThree?.length +
//         filterTwo?.length +
//         filterOne?.length;
//       let commulativeRating = finalRating / finalLengthResponse;
//       setFinalRatingC(commulativeRating);

//       // for (let i = 0; i < step2?.length; i++) {
//       //   averageRating = step2[i] + averageRating;
//       // }
//       // let final = averageRating?.
//     })
//     .catch((err) => {
//     });
// }, [spaceid]);

function Spacereview({ data, primaryColor }) {
  const [info, setInfo] = useState([]);
  const [spid, setId] = useState({});
  const [reviewAll, setReview] = useState([]);
  const [reviewAll1, setReview1] = useState([]);

  const idOfSpace = data?._id;
  const logiddetail = useSelector((state) => state?.user);

  const spaxeid = info
    ?.reverse()
    ?.slice()
    .map((item) => item._id);

  const newid = spaxeid.map((item) => item);
  const [finalRatingC, setFinalRatingC] = useState(0);

  const [finalRatingLength, setFinalRatingLength] = useState(0);
  let userId = "";
  userId = logiddetail?.value?._id;

  useEffect(() => {
    let newValue = null;
    if (newValue === null) {
      newValue = [];
    }
    GetAllReviewsByID(idOfSpace)
      .then((res) => {
        const newData = res.person.map((item) => {
          return item;
        });
        newValue.push(newData);
        setReview1(newValue);
        setReview(newData);

        const data = res?.person.filter((item) => {
          return item.approve === true;
        });
        const dadsdas = data?.map((item) => item?.rating);
        const step2 = dadsdas.map((item) => parseInt(item));

        setFinalRatingLength(step2?.length);
        const filterFive = step2?.filter((item) => item === 5);
        const filterFour = step2?.filter((item) => item === 4);
        const filterThree = step2?.filter((item) => item === 3);
        const filterTwo = step2?.filter((item) => item === 2);
        const filterOne = step2?.filter((item) => item === 1);

        const averageRatingFive = filterFive?.length * 5;
        const averageRatingFour = filterFour?.length * 4;
        const averageRatingThree = filterThree?.length * 3;
        const averageRatingTw0 = filterTwo?.length * 2;
        const averageRatingOne = filterOne?.length * 1;

        const finalRating = averageRatingFive + averageRatingFour + averageRatingThree + averageRatingTw0 + averageRatingOne;

        const finalLengthResponse = filterFive?.length + filterFour?.length + filterThree?.length + filterTwo?.length + filterOne?.length;
        const commulativeRating = finalRating / finalLengthResponse;
        setFinalRatingC(commulativeRating);

        // for (let i = 0; i < step2?.length; i++) {
        //   averageRating = step2[i] + averageRating;
        // }
        // let final = averageRating?.
      })
      .catch((err) => {});
  }, [idOfSpace]);

  const itemALl = reviewAll?.map((item) => {});

  const getSpace = () => {
    getUserleSpace(userId)
      .then((response) => {
        // resolve(response.data);
        response.map((item) => {
          setId(item._id);
        });
        setInfo(response);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getSpace();
  }, [spid]);

  return (
    <div className="Spacereview">
      <img
        style={{ borderRight: `6px solid ${primaryColor}` }}
        className="listproductimg1"
        src={`${baseURLSecond}/${data?.spaceImage}`}
        alt=""
      />
      <div className="listproductd2">
        <div className="topRowHubRev">
          <div>
            <h6 className="listproducth1">{data?.name}</h6>
            <p className="listproductp1">{data?.address}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Rating
                // onClick={() => setValueStar(4)}
              name="read-only"
              value={finalRatingC}
              readOnly
            />
            <p>{finalRatingLength}</p>
          </div>
          {/* {
                  reviewAll.map((item)=>{

                <div  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection:"column",
                    gap: "10px",
                  }}  >

                  {
                    reviewAll
                  }
                </div>

                  })
                }
                <div  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection:"column",
                    gap: "10px",
                  }}  >

                  {
                    reviewAll
                  }
                </div> */}
          <div style={{ color: primaryColor }} className="priceTxtHubRev">
            {data.price}
          </div>
        </div>
        <div className="spacereviewreview">
          <Reviews spaceName={data?.name} primaryColor={primaryColor} />
        </div>
      </div>
    </div>
  );
}

export default Spacereview;
