import React, { useState, useEffect } from "react";

//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Alert } from "../../common/Alert";
import { getContentApi } from "../../redux/UserReducerApis";
import { AddReview, UpdateSingleReview } from "../../services/Review";

function GiveReview({ show, modelTimeCheck }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const selectgetdata = useSelector((state) => state?.booking?.reviewArrayOnlyModel);
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);

  useEffect(() => {
    if (selectgetdata?.length === 0) {
      setOpen(false);
    }
  }, [selectgetdata]);

  const [text, setText] = useState("");
  const [allModalData, setAllModalData] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [singleData, setSingleData] = useState([]);
  const getToken = localStorage.getItem("rehub_token");
  const userId = useSelector((state) => state?.user?.value?.user?._id);
  const userId2 = useSelector((state) => state?.user?.value?._id);

  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "auto",
    background: "#00B4FF",
    borderRadius: "6px",
    paddingLeft: "15px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #00B4FF",
  };

  //review submit

  const handleSubmit = async () => {
    // if (allModalData?.length < 1) {

    // } else{
    const dataoriginal = [...allModalData];
    const fruit = dataoriginal.shift();
    setSingleData(fruit);
    setAllModalData(dataoriginal);
    // }
    let spacedata;
    spacedata = new FormData();
    spacedata.append("userId", "637be3ac9753d36a756db0e7");
    spacedata.append("spaceId", "637b9975d73767f80e3e113f");
    spacedata.append("booking", "637bfeeb9753d36a756dc030");

    spacedata.append("rating", "3");
    spacedata.append(
      "review",
      "Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit, Lorem ipsum dolor sit",
    );
    // spacedata.append("userId", singleData?.userId);
    // spacedata.append("spaceId", singleData?.spaceId);
    // spacedata.append("booking", singleData?._id);

    // spacedata.append("rating", value);
    // spacedata.append("review", text);

    try {
      AddReview(
        // singleData?.userId,
        userId,
        text,
        singleData?.spaceId,
        value,
        singleData?._id,
      )
        .then((res) => {
          Alert("success", "Review Submit  Successfully");
          setValue(0);
          setText("");
        })
        .catch((err) => {});

      UpdateSingleReview(singleData?._id, true)
        .then((res) => {})
        .catch((err) => {});
    } catch (error) {
      Alert("error", "Review Submit not Successfully");
    }
    // }

    if (allModalData?.length === 0) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (selectgetdata?.length > 0) {
      const dataoriginal = [...selectgetdata];
      setOpen(true);

      const fruit = dataoriginal.shift();
      setSingleData(fruit);
      setAllModalData(dataoriginal);
    }
  }, [selectgetdata]);

  // useEffect(() => {
  // let dataoriginal = [...allModalData];
  // let fruit = dataoriginal.shift();
  // setSingleData(fruit);
  // setAllModalData(dataoriginal);
  // }, [allModalData]);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <Box>
      {/* {modelTimeCheck} */}
      {/* {getToken && ( */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ background: primaryColor }} className="greviewbox">
          <div className="greview">
            <h6 className="greviewh1">Please wait...</h6>
            <p className="greviewp1">
              Kindly give your review about your experience.
              <br />
              Booking Time
              {" "}
              {singleData?.bookingTime}
              <br />
              Booking Date
              {" "}
              {singleData?.bookingDate}
              <br />
              Space Name
              {" "}
              {singleData?.spaceName}
              {/* {singleData?.bookingDate} {singleData?.spaceName} */}
            </p>
            <Rating
              className="greviewdiv"
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <textarea
              className="greviewtextarea"
              id="reviewtextarea"
              name="reviewtextarea"
              rows="4"
              cols="50"
              placeholder="Write your review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleSubmit} style={{ background: primaryColor }} className="greviewbtn">
              Submit
            </button>
          </div>
        </Box>
      </Modal>
      {/* // )} */}
    </Box>
  );
}

export default GiveReview;
