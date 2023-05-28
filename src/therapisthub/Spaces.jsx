import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Alert } from "../common/Alert";
import { getUserleSpace } from "../services/AddSpace";
import upload from "../assets/upload.svg";
import { getContentApi } from "../redux/UserReducerApis";
import Map from "../mainLayout/GoogleMap/Map";
import AddSpace from "../mainLayout/AddSpace/AddSpace";
import Footer from "../mainLayout/Footer/Footer";
import { baseURL } from "../common/AxiosInstance";
import BackdropLoader from "../common/BackdropLoader";
import Header from "../mainLayout/Header/Header";

function Spaces() {
  const [picname, setPicName] = useState("");
  const [, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState([]);

  const loginid = useSelector((state) => state?.user?.value?.user?._id);
  const logiddetail = useSelector((state) => state?.user);
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const userId = logiddetail?.value?._id;
  const loginuser = useSelector((state) => state?.user?.value?.user?.accountType);
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openaddress, setOpenAddress] = useState(false);
  const handleOpenAddress = () => setOpenAddress(true);
  const handleCloseAddress = () => setOpenAddress(false);
  const [primaryColor, setPrimary] = useState();
  const [, setSecondary] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/space/deletespace/${id}`).finally(() => {
      getSpace();
    });
  };
  const handleEditId = (id) => {
    setActiveId(id);
  };

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  //pagination

  const getSpace = () => {
    getUserleSpace(userId)
      .then((response) => {
        setInfo(response);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getSpace();
  }, []);

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
    flexDirection: "column"
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
    flexDirection: "column"
  };

  const [inputvalues, setValues] = useState({
    name: "",
    address: "",
    price: "",
    file: "",
    detailedInformation: ""
  });

  const handleInputChange = (file) => (e) => {
    if (file === "file") {
      setValues({
        ...inputvalues,
        [e.target.name]: e.target.files[0]
      });
      setPicName(e.target.files[0].name);
    } else {
      const Value = e.target.value;
      setValues({
        ...inputvalues,
        [e.target.name]: Value
      });
    }
  };

  const ref = useRef();
  const handleClick = () => {
    ref.current.click();
  };

  const handleSubmit = async () => {
    if (!inputvalues.name || !inputvalues.price || !inputvalues.address || !inputvalues.file) {
      Alert("error", "Please enter all fields");
      return;
    }

    let spacedata;
    spacedata = new FormData();
    // latitude,longitude
    spacedata.append("name", inputvalues.name);
    spacedata.append("price", inputvalues?.price);
    spacedata.append("address", inputvalues.address);
    spacedata.append("detailedInformation", inputvalues.detailedInformation);
    spacedata.append("spaceImage", inputvalues.file);
    spacedata.append("userId", loginid);
    spacedata.append("latitude", latitude);
    spacedata.append("longitude", longitude);
    spacedata.append("unConsectiveSlots", "");

    if (loginuser === "Host") {
      try {
        setIsLoading(true);
        await axios.post(
          `${baseURL}/space/addspace`,

          spacedata
        );
        Alert("success", "Space created successfully");
        setShow(true);
        setOpen(false);

        // info.push(data);
        // dispatch(addSpaceData(data));
        // setInfo([...info, data?.data?.result]);
        // history.push({
        //   pathname: `/physiotherapy-hub/spaces/${data.data.result._id}`,
        // });
        getSpace();
      } catch (error) {
        Alert("success", "Space created successfully");
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert("Failure", "Physiotherapists cannot create a space");
    }
  };

  // useEffect(() => {
  //   dispatch(addSpaceData(info));
  // }, [info]);

  const getHourFormat = (timeString) => {
    return moment(timeString, ["h:mm A"]).format("HH:mm");
  };

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <div className="Spaces w-full">
        <div className="dashboardhiddendiv">HIDDEN</div>
        <div className="spacesmain">
          <div className="spacesd1">
            <button
              style={{
                background: primaryColor
              }}
              onClick={handleOpen}
              className="spacesb1"
            >
              <AddIcon className="spacesb1img" />
              <p className="spacesb1p1">Add Space</p>
            </button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="spacesbox" sx={style}>
                <h6 className="spacesboxh1">Add Space</h6>
                <div className="spacesboxd1">
                  <Input
                    name="name"
                    type="text"
                    className="input1"
                    placeholder="Name"
                    value={inputvalues.name}
                    onChange={handleInputChange("text")}
                  />
                  <Input
                    name="address"
                    type="text"
                    className="input1"
                    placeholder="Address"
                    value={inputvalues.address}
                    onChange={handleInputChange("text")}
                    onClick={handleOpenAddress}
                  />

                  <Modal
                    open={openaddress}
                    onClose={handleCloseAddress}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={styleaddress}>
                      <Map
                        inputvalues={inputvalues}
                        handleCloseAddress={handleCloseAddress}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                        //setStates={setStates}
                      />
                    </Box>
                  </Modal>
                </div>
                <div className="spacesboxd2">
                  <div className="input5" style={{ border: "0.5px solid #b4b4b4" }}>
                    €
                    <Input
                      name="price"
                      type="text"
                      className="input5"
                      placeholder="Price"
                      value={inputvalues.price}
                      style={{ marginLeft: "10px" }}
                      onChange={handleInputChange("text")}
                    />
                  </div>
                  <input
                    style={{ display: "none" }}
                    ref={ref}
                    name="file"
                    type="file"
                    onChange={handleInputChange("file")}
                  />
                  <Input
                    name="detailedInformation"
                    type="text"
                    className="input-detail"
                    maxRows={3}
                    multiline
                    placeholder="Detailed Information"
                    value={inputvalues.detailedInformation}
                    onChange={handleInputChange("text")}
                  />
                </div>

                <button onClick={handleClick} className="spacesboxb1">
                  <img src={upload} alt="" />
                  <p className="spacesboxp1">Choose photo</p>
                </button>
                <p className="spacesboxp2">{picname}</p>
                <button onClick={handleSubmit} style={{ background: primaryColor }} className="spacesboxb2">
                  Submit
                </button>
              </Box>
            </Modal>
          </div>
          <h6 className="spacesh1">Your Spaces</h6>
          <p className="spacesd2d1p1">Please click on View button to edit that spaces availability on the calendar.</p>

          <div className="spacesd2">
            {info?.length === 0 ? (
              <p className="spacesd2d1p1">
                You do not have any space added yet. Click on Add Space to start adding space.
              </p>
            ) : (
              <>
                {info?.reverse()?.map((item, index) => {
                  return (
                    <div key={item._id}>
                      <AddSpace
                        index={index}
                        // setEditTemp={setEditTemp}
                        // setBoolEdit={setBoolEdit}
                        // setEditIndex={setEditIndex}
                        isActive={activeId === item._id}
                        handleDelete={handleDelete}
                        handleEditId={handleEditId}
                        handleAfterSubmit={getSpace}
                        info={item}
                        primaryColor={primaryColor}
                        spaceid={item?._id}

                        //states={states}
                      />
                    </div>
                  );
                })}

                {/* <ReactPaginate
                  // previousLabel={"Previous"}
                  // nextAriaLabel="Next"
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"pagination"}
                  previousLinkClassName="previous"
                  nextLinkClassName="next"
                  disabledClassName="paginationDisable"
                  activeClassName="activePagination"
                /> */}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {isLoading && <BackdropLoader />}
    </>
  );
}

export default Spaces;
