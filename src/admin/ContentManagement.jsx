import React, { useState, useRef, useEffect } from "react";

import ColorPicker from "../mainLayout/ColorPickerModal/ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import { Alert } from "../common/Alert";
import { getContentApi } from "../redux/UserReducerApis";
import { baseURL } from "../common/AxiosInstance";
import Header from "../mainLayout/Header/Header";

function ContentManagement() {
  const dispatch = useDispatch();

  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);

  const [primaryColor2, setPrimary2] = useState();
  const [secondary2, setSecondary2] = useState();
  const [primarycolor, setPrimaryColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--primarycolor"),
  );
  const [secondarycolor, setSecondaryColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--secondarycolor"),
  );
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const [para1, setPara1] = useState();
  const [para2, setPara2] = useState();
  const [para3, setPara3] = useState();
  const handleClose2 = () => setOpen2(false);
  const [content, setContent] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const [values, setValues] = useState({
    text1: "",
    text2: "",
    text3: "",
  });

  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [rawMessage1, setrawMessage1] = useState();
  const [message1, setmessage1] = useState();
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
  const [rawMessage2, setrawMessage2] = useState();
  const [message2, setmessage2] = useState();
  const [editorState3, setEditorState3] = useState(EditorState.createEmpty());
  const [rawMessage3, setrawMessage3] = useState();
  const [message3, setmessage3] = useState("");
  const [contentId, setContetId] = useState();
  const [message11, setmessage11] = useState("");
  const [message22, setmessage22] = useState("");
  const [message33, setmessage33] = useState("");
  const [link1, setLink] = useState();
  const [link2, setLink1] = useState();
  const [link3, setLink2] = useState();
  const [platformFee, setFee] = useState();

  const [banner1, setBanner1] = useState({
    file: "",
    src: "",
  });

  const [banner2, setBanner2] = useState({
    file: "",
    src: "",
  });
  const [banner3, setBanner3] = useState({
    file: "",
    src: "",
  });
  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  /*   const onEditorStateChange = (editorState) => {
    if (checkbox1 === true) {
      setEditorState(editorState);
      setmessage11(
        convertToRaw(editorState.getCurrentContent()).blocks[0].text
      );
      setrawMessage1(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
    }
    if (checkbox2 === true) {
      setEditorState(editorState);
      setmessage22(
        convertToRaw(editorState.getCurrentContent()).blocks[0].text
      );

      setrawMessage2(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
    }
    if (checkbox3 === true) {
      setEditorState(editorState);
      setmessage33(
        convertToRaw(editorState.getCurrentContent()).blocks[0].text
      );

      setrawMessage3(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
    }
  }; */
  const handleEditorStateToMessage = () => {
    setmessage1(message11);
    setmessage2(message22);
    setmessage3(message33);
  };
  const handleBanner1 = (e) => {
    setBanner1({
      ...banner1,
      // file: URL.createObjectURL(e.target.files[0]),
      // name: e.target.files[0].name,
      file: e.target.files[0],
      src: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleBanner2 = (e) => {
    setBanner2({
      ...banner2,
      // file: URL.createObjectURL(e.target.files[0]),
      // name: e.target.files[0].name,
      file: e.target.files[0],
      src: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleBanner3 = (e) => {
    setBanner3({
      ...banner3,
      // file: URL.createObjectURL(e.target.files[0]),
      // name: e.target.files[0].name,
      file: e.target.files[0],
      src: URL.createObjectURL(e.target.files[0]),
    });
  };

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      res?.data?.data.map((item) => {
        setContetId(item._id);
        setmessage1(item.paragraph1);
        setmessage2(item.paragraph2);
        setmessage3(item.paragraph3);
        setFee(item.platFormFee);
        setPrimaryColor(item.primaryColor);
        setSecondaryColor(item.secondaryColor);
        setLink(item?.link1);
        setLink1(item?.link2);
        setLink2(item?.link3);
      });
    });
  }, []);

  useEffect(() => {}, []);

  //for uploading img
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const handleClick1 = (e) => {
    ref1.current.click();
  };
  const handleClick2 = (e) => {
    ref2.current.click();
  };
  const handleClick3 = (e) => {
    ref3.current.click();
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", primarycolor);
    document.documentElement.style.setProperty("--secondary", secondarycolor);
  });
  const fontFamilyArray = [
    "Arial",
    "Georgia",
    "Impact",
    "Tahoma",
    "Times New Roman",
    "Verdana",
    "Inter",
    "Courier New",
    "Calibri",
  ];

  const handleSubmit = async () => {
    let spacedata;
    spacedata = new FormData();

    spacedata.append("paragraph1", message1);
    spacedata.append("paragraph2", message2);
    spacedata.append("paragraph3", message3);
    spacedata.append("primaryColor", primarycolor);
    spacedata.append("secondaryColor", secondarycolor);
    spacedata.append("platFormFee", platformFee);
    spacedata.append("picture1", banner1?.file);
    spacedata.append("picture2", banner2?.file);
    spacedata.append("picture3", banner3?.file);

    try {
      const data = await axios.post(
        `${baseURL}/content/create`,

        spacedata,
      );
      Alert("success", "Content Added Successfully");
    } catch (error) {
      Alert("error", "Content not Added Successfully");
    }
  };
  //content edit
  const handleEditSpace = async () => {
    let spacedata;
    spacedata = new FormData();
    spacedata.append("paragraph1", message1);
    spacedata.append("paragraph2", message2);
    spacedata.append("paragraph3", message3);
    spacedata.append("primaryColor", primarycolor);
    spacedata.append("secondaryColor", secondarycolor);
    spacedata.append("platFormFee", platformFee);
    spacedata.append("link1", link1);
    spacedata.append("link2", link2);
    spacedata.append("link3", link3);

    spacedata.append("picture1", banner1?.file);
    spacedata.append("picture2", banner2?.file);
    spacedata.append("picture3", banner3?.file);

    try {
      if (contentId) {
        await axios.post(`${baseURL}/content/updateContent/${contentId}`, spacedata);
      } else {
        await axios.post(`${baseURL}/content/create`, spacedata);
      }

      Alert("success", "content Added successfully");
    } catch (error) {
      Alert("error", "Content not updated");
    }
  };

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary2(primayColorRedux);
    setSecondary2(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <>
      <Header />
      <div
        style={{
          background: "#f4f3f3",
        }}
      >
        <div className="ContentManagement">
          <div className="dashboardhiddendiv">HIDDEN</div>
          <div className="contentmangmain">
            <h6 className="contentmangmainh1">Text Editor</h6>
            {/* <div className="paracheckboxdiv">
              <TextareaAutosize
                name="text1"
                value={values.text1}
                onChange={handleInput}
                placeholder="Paragraph 1..."
                className="para1"
              />

            </div>

            <div className="paracheckboxdiv">
              <TextareaAutosize
                name="text2"
                value={values.text2}
                onChange={handleInput}
                placeholder="Paragraph 2..."
                className="para1"
              />

            </div>
            <div className="paracheckboxdiv">
              <TextareaAutosize
                name="text3"
                value={values.text3}
                onChange={handleInput}
                placeholder="Paragraph 3..."
                className="para1"
              />

            </div> */}

            {/*  <Editor
              initialEditorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={onEditorStateChange}
              expanded={true}
              toolbar={{
                fontFamily: {
                  options: fontFamilyArray,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                },
              }}
            /> */}
            <textarea
              id="txtid"
              placeholder="Paragraph 1..."
              className="para1"
              name="txtname"
              rows="4"
              value={message1}
              cols="50"
              maxLength="200"
              onChange={(e) => {
                setmessage1(e.target.value);
              }}
            />
            <textarea
              id="txtid"
              placeholder="Paragraph 2..."
              className="para1"
              name="txtname"
              rows="4"
              cols="50"
              value={message2}
              maxLength="200"
              onChange={(e) => {
                setmessage2(e.target.value);
              }}
            />

            <textarea
              id="txtid"
              placeholder="Paragraph 3..."
              className="para1"
              name="txtname"
              rows="4"
              value={message3}
              cols="50"
              maxLength="200"
              onChange={(e) => {
                setmessage3(e.target.value);
              }}
            />
            {/*
            <button
              // style={{ backgroundColor: primarycolor }}
              className="submitbtn mb-5"
              onClick={handleEditorStateToMessage}
              style={{ background: primaryColor2 }}
            >
              Add ParaGraph
            </button> */}

            <h6 className="contentmangmainh1">Color Editor</h6>
            <div className="contentmangmaind1">
              <div style={{ display: "flex" }} className="contentmangmaind5">
                <p className="contentmangmainp1">Primary Color </p>
                <span onClick={() => setOpen1(true)} className="contentmangmains1" />
              </div>
              <div style={{ display: "flex" }} className="contentmangmaind4">
                <p className="contentmangmainp1">Secondary Color </p>
                <span onClick={() => setOpen2(true)} className="contentmangmains2" />
              </div>
            </div>
            <ColorPicker open={open1} handleClose={handleClose1} setPrimaryColor={setPrimaryColor} />
            <ColorPicker open={open2} handleClose={handleClose2} setPrimaryColor={setSecondaryColor} />
            <h6 style={{ marginTop: "50px" }} className="contentmangmainh1">
              Banner Advertising Management
            </h6>

            <input
              value={platformFee}
              className="contentmangmaininpu1"
              placeholder="Rehub PlatForm Fee"
              type="number"
              onChange={(e) => setFee(e.target.value)}
            />
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div className="contentmangmaind2">
                  <input style={{ display: "none" }} ref={ref1} name="filechild" type="file" onChange={handleBanner1} />
                  <button onClick={handleClick1} style={{ background: primaryColor2 }} className="contentmangmainb1">
                    <UploadIcon />
                    <p className="contentmangmainp2">Choose Image</p>
                  </button>

                  {banner1?.src === "" ? (
                    ""
                  ) : (
                    <>
                      <img className="bannerimg" src={banner1?.src} alt="" />
                      <p className="contentmangmainp3">{banner1?.file?.name}</p>
                    </>
                  )}
                </div>
                <div>
                  <input
                    className="contentmangmaininpu1"
                    placeholder="Link 1"
                    value={link1}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div className="contentmangmaind2">
                  <input style={{ display: "none" }} ref={ref2} name="filechild" type="file" onChange={handleBanner2} />
                  <button onClick={handleClick2} style={{ background: primaryColor2 }} className="contentmangmainb1">
                    <UploadIcon />
                    <p className="contentmangmainp2">Choose Image</p>
                  </button>
                  {banner2.src === "" ? "" : <img className="bannerimg" src={banner2.src} alt="" />}
                  <p className="contentmangmainp3">{banner2?.file?.name}</p>
                </div>
                <div>
                  <input
                    className="contentmangmaininpu1"
                    placeholder="Link 2"
                    value={link2}
                    onChange={(e) => {
                      setLink1(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div className="contentmangmaind2">
                  <input style={{ display: "none" }} ref={ref3} name="filechild" type="file" onChange={handleBanner3} />
                  <button style={{ background: primaryColor2 }} onClick={handleClick3} className="contentmangmainb1">
                    <UploadIcon />
                    <p className="contentmangmainp2">Choose Image</p>
                  </button>
                  {banner3.src === "" ? "" : <img className="bannerimg" src={banner3?.src} alt="" />}
                  <p className="contentmangmainp3">{banner3?.file?.name}</p>
                </div>
                <div>
                  <input
                    className="contentmangmaininpu1"
                    placeholder="Link 3"
                    value={link3}
                    onChange={(e) => {
                      setLink2(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              // style={{ backgroundColor: primarycolor }}
              className="submitbtn mt-5"
              onClick={handleEditSpace}
              style={{ background: primaryColor2 }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentManagement;
