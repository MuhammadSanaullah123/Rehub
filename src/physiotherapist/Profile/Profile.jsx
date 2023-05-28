import React, { useState, useEffect } from "react";
import moment from "moment";
//components
//assets
import jwt_decode from "jwt-decode";
//mui
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getContentApi } from "../../redux/UserReducerApis";
import profile from "../../assets/profile.png";
import Footer from "../../mainLayout/Footer/Footer";
import Header from "../../mainLayout/Header/Header";
import { updateProfile } from "../../services/Therapist";
import { getLoggedinUser } from "../../services/Auth";
import { setAuthorizedUser } from "../../features/userSlice";
import { Alert } from "../../common/Alert";
import { baseURL, baseURLSecond, host } from "../../common/AxiosInstance";

function Profile() {
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const [showUpload, setShowUpload] = useState(true);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [location, setLocation] = useState();
  const [info, setInfo] = useState();
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState();

  const [pass, setPass] = useState("");
  const [imgPreview, setImgPreview] = useState();
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);

  const [conpass, setConPass] = useState("");
  const [values1, setValues1] = useState({
    showPassword1: false,
  });
  const [values2, setValues2] = useState({
    showPassword2: false,
  });
  const authorizedUser = useSelector((state) => state?.user?.value);
  const usertype = authorizedUser?.usertype;
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorizedUser) {
      setFName(authorizedUser?.firstName);
      if (authorizedUser?.lastName === undefined) {
        setLName("");
      } else {
        setLName(authorizedUser?.lastName);
      }
      if (authorizedUser?.user?.email === undefined) {
        setEmail("");
      } else {
        setEmail(authorizedUser?.user?.email);
      }

      if (authorizedUser?.phoneNumber === undefined) {
        setContact("");
      } else {
        setContact(authorizedUser?.phoneNumber);
      }
      if (authorizedUser.information === undefined) {
        setLocation("");
      } else {
        setLocation(authorizedUser?.location);
      }
      if (authorizedUser?.user?.image) {
        setAvatar(authorizedUser?.user?.image);
      }
      if (authorizedUser.information === undefined) {
        setInfo("");
      } else {
        setInfo(authorizedUser.information);
      }
      // if (authorizedUser?.user?.value?.imagezzz === undefined) {
      //   setImage(null);
      // } else {
      //   setImage(authorizedUser?.user?.value?.image);
      // }
      setUserName(authorizedUser?.userName);
    }
  }, [authorizedUser]);

  const saveChanges = async () => {
    let spacedata;
    spacedata = new FormData();
    spacedata.append("firstName", fname);
    spacedata.append("lastName", lname);
    spacedata.append("phoneNumber", contact);
    spacedata.append("location", value);
    spacedata.append("information", info);
    spacedata.append("email", email);
    spacedata.append("image", image);
    spacedata.append("password", pass);

    try {
      const data = await axios.patch(`${baseURL}/therapist/update/profile`, spacedata);

      const authorizedUser = await getLoggedinUser();
      dispatch(setAuthorizedUser(authorizedUser));

      Alert("success", "Profile updated successfully");

      // alert("space updated successfully")
    } catch (error) {
      // alert("space not updated")
      Alert("error", "Profile  2 not updated");
    }
  };

  // const saveChanges = async () => {
  //   try {
  //     if (pass && pass !== conpass) {
  //       Alert("error", "Passwords do not match");
  //     } else {
  //       await updateProfile(
  //         fname,
  //         lname,
  //         contact,
  //         location,
  //         email,
  //         info,
  //         // image,
  //         pass
  //       );
  //       let authorizedUser = await getLoggedinUser();
  //       dispatch(setAuthorizedUser(authorizedUser));
  //       Alert("success", "Changes saved successfully");
  //       setPass("");
  //       setConPass("");
  //     }
  //   } catch (error) {
  //     Alert("error", "Changes could not be saved");
  //   }
  // };
  useEffect(() => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          setValue(data.locality);
        });
    };
    const error = () => {
      setValue("Not able to retrieve your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const handleClickShowPassword1 = () => {
    setValues1({
      ...values1,
      showPassword1: !values1.showPassword1,
    });
  };
  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword2: !values2.showPassword2,
    });
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);
  const uploadOption = () => {
    setShowUpload(true);
  };

  const uploadOptionLeave = () => {
    setShowUpload(false);
  };
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    setImage(selected);

    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      // setError(true);
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    getGeocode({ address: val }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
    });
    setValue(val, false);

    clearSuggestions();

    // Get latitude and longitude via utility functions
  };
  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />);

    return (
      <>
        {suggestions}
        <li className="logo">
          <img
            src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/092010/google.png?itok=QoMRDjGG"
            alt="Powered by Google"
            width="150px"
            height="60px"
            style={{ objectFit: "contain" }}
          />
        </li>
      </>
    );
  };

  const token = localStorage.getItem("rehub_token");
  const datass = jwt_decode(token);
  return (
    <>
      <Header />
      <div className="Profile">
        <div className="profileinfo">
          <h6 className="profileinfoh1">
            Basic Information
            <span className="accepted-at">
              Accepted Terms & Condition at
              {" "}
              {moment(authorizedUser.createdAt).format("DD/MM/YYYY")}
            </span>
          </h6>
          <div className="profileinfoline1" />
          <div className="profileinfod1">
            <div className="profileinfod5">
              <div
                className={usertype !== "simple" ? "relative d-none" : "topImageBasicInfo"}
                onMouseEnter={uploadOption}
                onMouseLeave={uploadOptionLeave}
              >
                {/*   {!imgPreview && (
                  <img
                    onMouseEnter={uploadOption}
                    onMouseLeave={uploadOptionLeave}
                    src={profilePictureImg}
                    className="profileImgDefault"
                  />
                )} */}

                {imgPreview ? (
                  <div
                    className="profileIconCircle"
                    style={{
                      background: `url("${imgPreview}") no-repeat center/cover`,
                      height: "70px",
                      width: "70px",
                    }}
                    onMouseEnter={uploadOption}
                    onMouseLeave={uploadOptionLeave}
                  />
                ) : (
                  avatar && (
                    <div
                      className="profileIconCircle"
                      style={{
                        background: `url("${`${avatar.startsWith("http") ? avatar : `${baseURLSecond}/${avatar}`}`}") no-repeat center/cover`,
                        height: "70px",
                        width: "70px",
                      }}
                      onMouseEnter={uploadOption}
                      onMouseLeave={uploadOptionLeave}
                    />
                  )
                )}

                {showUpload && (
                  <div className="editBtnProImg" onMouseLeave={uploadOptionLeave} onMouseEnter={uploadOption}>
                    <input type="file" id="file" className="inputfile" onChange={handleImageChange} />
                    <label className="labelInputImg" htmlFor="file">
                      <CameraAltIcon
                        sx={{
                          color: "lightgrey",
                          fontSize: "2.5rem",
                          position: `${imgPreview && "relative"}`,
                          bottom: `${imgPreview && "70px"}`,
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="profileinfod2">
                <div className="profileinfod3">
                  <Input
                    className="input1"
                    placeholder="First Name"
                    type="text"
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                  />

                  {/*  <input
                    type="text"
                    className="input1"
                    placeholder="First Name"
                    name="fname"
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                  /> */}
                  <Input
                    type="text"
                    className="input2"
                    placeholder="Last Name"
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>
                <Input
                  className="input3"
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <Input type="email" className="input3" placeholder="Email" value={userName} />
                {/* <Input
                  type="text"
                  className="input3"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                /> */}

                <Combobox
                  onSelect={handleSelect}
                  aria-labelledby="demo"
                  style={{ width: "100%" }}
                  className="comboxTop"
                >
                  <ComboboxInput
                    style={{ width: "100%", border: "1px solid #CCF4EC" }}
                    value={value}
                    //   id="txtPlace"
                    className="city-input w-full pl-5 box-border"
                    placeholder="Enter the city name "
                    onChange={handleInput}
                    disabled={!ready}
                  />
                  <ComboboxPopover>
                    <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
                  </ComboboxPopover>
                </Combobox>
                <div className="profileinfod4">
                  <h6 className="profileinfoh2" style={{ color: primaryColor }}>
                    Why its important
                  </h6>
                  <p className="profileinfop1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.Lorem ipsu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profilesecurity">
          <h6 className="profilesecurityh1"> Change your Password</h6>
          <div className="profilesecurityline"></div>
          <div className="profilesecurityd1">
            {authorizedUser ? (
              <div className="profilesecurityd2">
                <FormControl variant="standard">
                  <Input
                    placeholder="Password"
                    className="profilesecurityi1"
                    type={values1.showPassword1 ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                        >
                          {values1.showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
                <FormControl
                  style={{
                    marginTop: "10px",
                  }}
                  variant="standard"
                >
                  <Input
                    placeholder="Confirm Password"
                    className="profilesecurityi1"
                    type={values2.showPassword2 ? "text" : "password"}
                    value={conpass}
                    onChange={(e) => setConPass(e.target.value)}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                        >
                          {values2.showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="profilesavebtndiv">
          <button className="profilesavebtn" style={{ background: primaryColor }} onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
