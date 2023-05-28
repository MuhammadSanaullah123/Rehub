import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption,
} from "@reach/combobox";
import { setAuthorizedUser } from "../features/userSlice";
import { Alert } from "../common/Alert";
import { getContentApi } from "../redux/UserReducerApis";
import { getLoggedinUser } from "../services/Auth";
import "@reach/combobox/styles.css";
import { baseURL } from "../common/AxiosInstance";
import Header from "../mainLayout/Header/Header";

function AdProfile() {
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const profilePictureImg = useSelector((state) => state?.user?.value?.user?.image);

  const currentUser = useSelector((state) => state?.user?.value);

  const [fname, setFName] = useState(currentUser?.firstName);
  const [lname, setLName] = useState(currentUser?.lastName);
  const [email, setEmail] = useState(currentUser?.user?.email);
  const [contact, setContact] = useState(currentUser?.phoneNumber);
  const [location, setLocation] = useState(currentUser?.location);
  const [info, setInfo] = useState(currentUser?.information);
  const [pass, setPass] = useState("");
  const [conpass, setConPass] = useState("");
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [showUpload, setShowUpload] = useState(true);
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState();
  const [address, setAddress] = useState("");
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null,
  });

  const [values1, setValues1] = useState({
    showPassword1: false,
  });
  const [values2, setValues2] = useState({
    showPassword2: false,
  });
  const authorizedUser = useSelector((state) => state.user.value);
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
      if (authorizedUser.information === undefined) {
        setInfo("");
      } else {
        setInfo(authorizedUser.information);
      }
      if (authorizedUser?.user?.value?.image === undefined) {
        setImage("");
      } else {
        setImage(authorizedUser?.user?.value?.image);
      }
    }
  }, [authorizedUser]);
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

  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const saveChanges = async () => {
    let spacedata;
    spacedata = new FormData();
    spacedata.append("firstName", fname);
    spacedata.append("lastName", lname);
    spacedata.append("phoneNumber", contact);
    spacedata.append("location", "daddsads");
    spacedata.append("information", info);
    spacedata.append("email", email);
    spacedata.append("image", image);
    spacedata.append("password", pass);
    spacedata.append("usertype", "simple");

    try {
      const data = await axios.patch(`${baseURL}/therapisthub/update/profile`, spacedata);

      const authorizedUser = await getLoggedinUser();
      dispatch(setAuthorizedUser(authorizedUser));

      Alert("success", "Profile updated successfully");

      // alert("space updated successfully")
    } catch (error) {
      // alert("space not updated")
      Alert("error", "Profile not updated");
    }
  };

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

  return (
    <>
      <Header />
      <div className="AdProfile">
        <div className="dashboardhiddendiv">HIDDEN</div>
        <div className="adprofilemain">
          <div className="adprofileinfo">
            <h6 className="adprofileinfoh1">Basic Information</h6>
            <div className="adprofileinfoline1" />
            <div className="adprofileinfod1">
              {/* <img className="adprofileinfoimg1" src={profile} alt="" /> */}

              <div className="topImageBasicInfo" onMouseEnter={uploadOption} onMouseLeave={uploadOptionLeave}>
                {/*   {!imgPreview && (
                  <img
                    onMouseEnter={uploadOption}
                    onMouseLeave={uploadOptionLeave}
                    src={profilePictureImg}
                    className="profileImgDefault"
                  />
                )} */}

                {imgPreview && (
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
                )}

                {showUpload && (
                  <div className="editBtnProImg" onMouseLeave={uploadOptionLeave} onMouseEnter={uploadOption}>
                    <input
                      type="file"
                      id="file"
                      // value={image}
                      accept="image/png , image/jpeg, image/webp"
                      className="inputfile"
                      onChange={handleImageChange}
                    />
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

              <div className="adprofileinfod5">
                <div className="adprofileinfod2">
                  <div className="adprofileinfod3">
                    <Input
                      className="input1"
                      placeholder="First Name"
                      type="text"
                      value={fname}
                      onChange={(e) => setFName(e.target.value)}
                    />
                    <div className="personal_input">{/* Location */}</div>

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
                  <Input
                    type="email"
                    className="input3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                      className="city-input"
                      placeholder="Enter the city name "
                      onChange={handleInput}
                      disabled={!ready}
                    />
                    <ComboboxPopover>
                      <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
                    </ComboboxPopover>
                  </Combobox>

                  <TextField
                    className="input4"
                    placeholder="Information"
                    multiline
                    rows={8}
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    variant="standard"
                  />
                </div>
                <div className="adprofileinfod4">
                  <h6 className="adprofileinfoh2" style={{ color: primaryColor }}>
                    Why its important
                  </h6>
                  <p className="adprofileinfop1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.Lorem ipsu
                  </p>
                </div>
              </div>
            </div>
          </div>
          {authorizedUser.usertype ? (
            <div className="profilesecurity">
              <h6 className="profilesecurityh1">Change Your Password</h6>
              <div className="profilesecurityline"> </div>
              <div className="profilesecurityd1">
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
                            {values1.showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                  <FormControl
                    style={{
                      marginTop: "15px",
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
                            {values2.showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="profilesavebtndiv">
            <button className="profilesavebtn" style={{ background: primaryColor }} onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdProfile;
