import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

//assets
import { BsFillPencilFill } from "react-icons/bs";

//mui
import Rating from "@mui/material/Rating";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import upload from "../../assets/upload.svg";
import deleteimg from "../../assets/delete.svg";
import { Alert } from "../../common/Alert";
import Map from "../GoogleMap/Map";
import { baseURL, baseURLSecond } from "../../common/AxiosInstance";
import { GetAllReviewsByID } from "../../services/Review";

function AddSpace({
  index,
  name,
  address,
  price,
  file,
  handleEditId,
  handleAfterSubmit,
  setEditTemp,
  setBoolEdit,
  setEditIndex,
  handleDelete,
  isActive,
  info,
  spaceid,
  primaryColor,
  // states,
}) {
  const [valuestar, setValueStar] = useState(4);
  const [picname, setPicName] = useState("");
  const [infotemp] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    handleEditId(spaceid);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [openchild, setOpenChild] = useState(false);
  const handleOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => setOpenChild(false);

  const [openchild1, setOpenChild1] = useState(false);
  const handleOpenChild1 = () => setOpenChild1(true);
  const handleCloseChild1 = () => setOpenChild1(false);
  const [AllSpaceData, setAllSpace] = useState([]);

  const [openaddress, setOpenAddress] = useState(false);
  const handleOpenAddress = () => setOpenAddress(true);
  const handleCloseAddress = () => setOpenAddress(false);
  const [finalRatingC, setFinalRatingC] = useState(0);
  const [finalRatingLength, setFinalRatingLength] = useState(0);

  const [starValue, setStarValue] = useState(0);
  const spaceData = useSelector((state) => state.space);
  const space_id = spaceData?.userData?._id;
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "390px",
    background: "#FFFFFF",
    borderRadius: "9px",
    display: "flex",
    flexDirection: "column",
  };

  const stylechild = {
    position: "absolute",
    top: "44%",
    left: "68%",
    transform: "translate(-50%, -50%)",
    width: "17%",
    height: "118px",
    background: "#EB3223",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  const stylechild1 = {
    position: "absolute",
    top: "44%",
    left: "84%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    background: "#EB3223",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const styleaddress = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "390px",
    background: "#FFFFFF",
    borderRadius: "9px",
    display: "flex",
    flexDirection: "column",
  };

  const logiddetail = useSelector((state) => state?.user);
  const userId = logiddetail?.value?._id;

  const [inputvalueschild, setValuesChild] = useState({
    namechild: info?.name || "",
    addresschild: info?.address || "",
    pricechild: info?.price || "",
    filechild: null,
    detailedInformationChild: "",
  });
  useEffect(() => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY&amp;libraries=places&amp;callback=initPlaces",
    )
      .then((response) => response.json())
      .then((data) => {
        const city = data.results[0].address_components.find((component) => component.types.includes("locality")).long_name;
      });
  }, []);

  useEffect(() => {
    if (isActive) {
      setValuesChild({
        namechild: info.name,
        addresschild: info.address,
        pricechild: info.price,
        filechild: info.file,
        detailedInformationChild: info.detailedInformation,
        lat: info.latitude,
        lng: info.longitude,
      });
    } else {
      setValuesChild({});
    }
  }, [isActive, info]);

  useEffect(() => {
    GetAllReviewsByID(spaceid)
      .then((res) => {
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
  }, [spaceid]);

  //delete space
  const deleteSpace = async () => {
    try {
      handleDelete(index);
    } catch (error) {}
  };

  //edit Space
  const handleEditSpace = async () => {
    const {
      namechild, addresschild, pricechild, filechild, detailedInformationChild,
    } = inputvalueschild;
    if (!namechild || !addresschild || !pricechild) {
      Alert("error", "Please enter all fields");
      return;
    }

    let spacedata;
    spacedata = new FormData();
    spacedata.append("name", namechild);
    spacedata.append("price", pricechild);
    spacedata.append("address", addresschild);
    spacedata.append("detailedInformation", detailedInformationChild);
    if (filechild) {
      spacedata.append("spaceImage", filechild || null);
    }
    // spacedata.append("userId", loginid);

    try {
      const data = await axios.patch(`${baseURL}/space/updateSpace/${spaceid}`, spacedata);
      handleAfterSubmit();
      Alert("success", "space updated successfully");

      // alert("space updated successfully")
    } catch (error) {
      // alert("space not updated")
      Alert("error", "space not updated");
    }
  };
  const handleInputChangeChild = (file) => (e) => {
    if (file === "file") {
      setValuesChild({
        ...inputvalueschild,
        // [e.target.name]: URL.createObjectURL(e.target.files[0]),
        [e.target.name]: e.target.files[0],
      });
      setPicName(e.target.files[0].name);
    } else {
      const Value = e.target.value;
      setValuesChild({
        ...inputvalueschild,
        [e.target.name]: Value,
      });
    }
  };
  const handleStore = () => {
    const temp = infotemp;
    temp.push(inputvalueschild);
    setEditTemp(temp);
    setBoolEdit(true);
    setEditIndex(index);
    handleClose();
  };
  const handledeleteConfirm = () => {
    handleCloseChild();

    handleDelete(index);

    handleClose();
  };

  //for uploading img
  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };
  //cookies

  const handleCookies = () => {
    const cookies = new Cookies();
    cookies.set("addresscook", address, { path: "/" });

    history.push({
      pathname: `/physiotherapy-hub/spaces/${spaceid}`,
      state: finalRatingLength,
      color: primaryColor,
      finalRatingC,
    });
  };

  return (
    <div className="AddSpace">
      <div className="aslistproduct">
        <div className="aslistproductd1">
          <img
            style={{ borderRight: `6px solid ${primaryColor}` }}
            className="aslistproductimg1"
            src={`${baseURLSecond}/${info.spaceImage}`}
            alt="sssss"
          />
        </div>
        <div className="aslistproductd2" style={{ color: primaryColor }}>
          <div className="aslistproductd7">
            <h6 className="aslistproducth1">{info.name}</h6>
            <p className="aslistproductp1">{info.address}</p>
            {/* <div className="aslistproductd6">
              <p className="aslistproductd6p2">
                Please set the date & time of availability
              </p>
            </div> */}
          </div>

          <div className="aslistproductd5">
            <div className="aslistproductimgdiv">
              <a
                style={{
                  cursor: "pointer",
                }}
                href
                title="Delete Space"
              >
                <img onClick={handleOpenChild1} className="aslistproductimgdivimg1" src={deleteimg} alt="" />
              </a>

              <Modal
                open={openchild1}
                onClose={handleCloseChild1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="spacesboxchild p-2 h-25" sx={stylechild1}>
                  <p className="spacesboxchildp1">Are you sure you want to delete this Space?</p>
                  <div className="flex gap-2">
                    <button className="spacesboxchildbtn" onClick={() => setOpenChild1(false)}>
                        Cancel
                      </button>
                    <button className="spacesboxchildbtn" onClick={deleteSpace}>
                        Confirm
                      </button>
                  </div>
                </Box>
              </Modal>
              <a
                style={{
                  cursor: "pointer",
                }}
                href
                title="Edit Space"
              >
                {/* <img
                    onClick={handleOpen}
                    className="aslistproductimgdivimg2"
                    src={edit}
                    alt=""
                  /> */}
                <BsFillPencilFill
                  onClick={handleOpen}
                  className="aslistproductimgdivimg2"
                  style={{ color: primaryColor }}
                />
              </a>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="spacesbox" sx={style}>
                  <div className="spacesboxd3">
                    <h6 className="spacesboxh1">Edit Space</h6>
                    <a
                        style={{
                          alignSelf: "center",

                          cursor: "pointer",
                        }}
                        href
                        title="Delete Space"
                      >
                        <img onClick={handleOpenChild} src={deleteimg} alt="" />
                      </a>

                    <Modal
                        open={openchild}
                        onClose={handleCloseChild}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box className="spacesboxchild p-2 !w-45 h-25" sx={stylechild}>
                          <p className="spacesboxchildp1">Are you sure you want to delete this Space?</p>
                          <div className="flex gap-2">
                            <button className="spacesboxchildbtn" onClick={() => setOpenChild(false)}>
                              Cancel
                            </button>
                            <button className="spacesboxchildbtn" onClick={handledeleteConfirm}>
                              Confirm
                            </button>
                          </div>
                        </Box>
                      </Modal>
                  </div>
                  <div className="spacesboxd1">
                    <Input
                        name="namechild"
                        type="text"
                        className="input1"
                        placeholder="Name"
                        value={inputvalueschild.namechild}
                        onChange={handleInputChangeChild("text")}
                      />
                    <Input
                        name="addresschild"
                        type="text"
                        className="input1"
                        placeholder="Address"
                        value={inputvalueschild.addresschild}
                        onChange={handleInputChangeChild("text")}
                        onClick={handleOpenAddress}
                      />
                    <Modal
                        open={openaddress}
                        onClose={handleCloseAddress}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box className="spacesbox" sx={styleaddress}>
                          <Map inputvalues={inputvalueschild} handleCloseAddress={handleCloseAddress} edit />
                        </Box>
                      </Modal>
                  </div>

                  <div className="spacesboxd2">
                    <div className="input5" style={{ border: "0.5px solid #b4b4b4" }}>
                        {" "}
                        €
                        <Input
                          name="pricechild"
                          type="text"
                          className="input5"
                          placeholder="Price"
                          style={{ marginLeft: "10px" }}
                          value={inputvalueschild.pricechild}
                          onChange={handleInputChangeChild("text")}
                        />
                      </div>
                    <input
                        style={{ display: "none" }}
                        ref={ref}
                        name="filechild"
                        type="file"
                        onChange={handleInputChangeChild("file")}
                      />
                    <Input
                        name="detailedInformationChild"
                        type="text"
                        className="input-detail"
                        maxRows={3}
                        multiline
                        placeholder="Detailed Information"
                        value={inputvalueschild.detailedInformationChild}
                        onChange={handleInputChangeChild("text")}
                      />
                  </div>
                  {/*
                    <div
                      className="input1"
                      style={{
                        margin: "0 20px 10px 20px",
                        width: "37.5%",
                        display: "flex",
                        gap: "5px",
                        paddingLeft: "10px",
                      }}
                    >
                      <div
                        style={{
                          paddingTop: "7px",
                        }}
                      >
                        €
                      </div>
                      <Input
                        name="pricechild"
                        type="text"
                        // className="input1"
                        placeholder="Price nn "
                        value={inputvalueschild.pricechild}
                        onChange={handleInputChangeChild("text")}
                      />
                      <input
                        style={{ display: "none" }}
                        ref={ref}
                        name="filechild"
                        type="file"
                        onChange={handleInputChangeChild("file")}
                      />
                    </div> */}
                  <button onClick={handleClick} className="spacesboxb1">
                    <img src={upload} alt="" />
                    <p className="spacesboxp1">Choose photo</p>
                  </button>
                  <p className="spacesboxp2">{picname}</p>
                  <button onClick={handleEditSpace} style={{ background: primaryColor }} className="spacesboxb2">
                    Submit
                    </button>
                </Box>
              </Modal>
            </div>
            {finalRatingLength === 0 ? (
              ""
            ) : (
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
            )}

            <p style={{ color: primaryColor }} className="aslistproductp3">
              €
              {" "}
              {info.price}
            </p>
            {/* <Link
              // to="/physiotherapy-hub/spaces/:id"
              className="aslistproductl1"
            > */}
            <button style={{ background: primaryColor }} onClick={handleCookies} className="aslistproductb1">
              View
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSpace;
