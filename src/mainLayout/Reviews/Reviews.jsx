import React, { useState, useEffect } from "react";

//assets

//mui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetSPaceAllReview } from "../../services/Review";
import profile from "../../assets/profile.png";
import { baseURL } from "../../common/AxiosInstance";

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Reviews({ spaceName }) {
  const [value, setValue] = useState(1);
  const [valuestar, setValueStar] = useState(4);
  const [reviewAll, setReviewAll] = useState([]);
  const [datareview, setDataReview] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    GetSPaceAllReview(spaceName)
      .then((res) => {
        setReviewAll(res.datareview);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPrimary(item.primaryColor);
        setSecondary(item.secondaryColor);
      });
    });
  }, []);

  return (
    <div className="homelastDivd3">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <div className="topDivTestimonial topDivTestimonialReviewHub">
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { background: primaryColor, height: 80 },
            }}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <p className="testimonialsTxt"> Testimonials</p>
            {reviewAll?.map((item, index) => {
              return (
                <Tab
                  icon={<img src={profile} alt="" style={{ width: "70px" }} />}
                  iconPosition="start"
                  className={item?._id === datareview?._id ? "backendcolor" : ""}
                  label={`${item?.user?.username}`}
                  {...a11yProps(index)}
                  onClick={() => {
                    setDataReview(item);
                  }}
                  style={{
                    backgroundColor: item?._id === datareview?._id ? primaryColor : "rgb(255, 255, 255)",
                    color: item?._id === datareview?._id ? "#fff" : "",
                  }}
                />
              );
            })}

            <Tab label="Testimonials" {...a11yProps(0)} disabled />
            <div className="topDivTestimonial">
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { background: primaryColor, height: 80 },
                }}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <p className="testimonialsTxt"> Testimonials</p>
                {reviewAll?.map((item, index) => {
                  return (
                    <>
                        {item?.approve && (
                          <Tab
                            icon={<img src={profile} alt="" />}
                            iconPosition="start"
                            label={`${item?.user?.username}`}
                            {...a11yProps(index)}
                            onClick={() => {
                              setDataReview(item);
                            }}
                          />
                        )}
                      </>
                  );
                })}
                <Tab label="Testimonials" {...a11yProps(0)} disabled />
                <Tab
                  icon={<img src={profile} alt="" />}
                  iconPosition="start"
                  label="Robert Hoslin"
                  {...a11yProps(1)}
                />
                <Tab
                  icon={<img src={profile} alt="" />}
                  iconPosition="start"
                  label="Robert Hoslin"
                  {...a11yProps(2)}
                />
                <Tab
                  icon={<img src={profile} alt="" />}
                  iconPosition="start"
                  label="Robert Hoslin"
                  {...a11yProps(3)}
                />
              </Tabs>
            </div>
            {reviewAll?.map((item, index) => {
              return (
                <TabPanel
                  value={value}
                  index={index}
                  style={
                      {
                        // width: "-webkit-fill-available",
                      }
                    }
                >
                  <div className="tabdiv1" style={{ background: primaryColor }}>
                    <p className="expCommentTxt">It is great experience</p>
                    <Rating
                        // onClick={() => setValueStar(4)}
                        name="read-only"
                        // value={valuestar}
                        value={item?.rating}
                        readOnly
                      />
                    <p className="tabdivp1">{item?.review}</p>
                  </div>
                </TabPanel>
              );
            })}

            <TabPanel value={value} index={2}>
              <div className="tabdiv1">
                <Rating onClick={() => setValueStar(4)} name="read-only" value={valuestar} readOnly />
                <p className="tabdivp1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <div className="tabdiv1">
                <Rating onClick={() => setValueStar(4)} name="read-only" value={valuestar} readOnly />
                <p className="tabdivp1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </Box>
    </div>
  );
}

export default Reviews;
