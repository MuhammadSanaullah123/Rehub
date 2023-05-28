import React, { useState } from "react";
import "./Footer.scss";

//assets
//mui
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import footertwitter from "../../assets/footertwitter.svg";
import footerinsta from "../../assets/footerinsta.svg";
import footerfb from "../../assets/footerfb.svg";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <div className="Footer">
      <div className="hline" />
      <div className="both_img_p">
        <Link to="/home">
          <img className="both_img_p_logo" src={logo} alt="" />
        </Link>
        <div className="footerd2">
          <div className="footerrespd1">
            <div className="footerd1">
              {/* <h6 className="footerh6">Trending Searches</h6> */}
              <Link className="footerp" to="/list-center">
                List Centers
              </Link>
              <Link className="footerp" to="/about-us">
                About us
              </Link>
            </div>
            {/* <div className="footerd1">
                <h6 className="footerh6">Services</h6>
                <a className="footerp" href>
                  Service Providers
                </a>
                <a className="footerp" href>
                  Space Providers
                </a>
              </div> */}
          </div>
          <div className="footerrespd2">
            <div className="footerd1">
              {/* <h6 className="footerh6">
                About Us</h6> */}
              <Link className="footerp" to="/terms-of-service">
                Terms & Conditions
              </Link>
              <Link className="footerp" to="/privacy">
                Privacy Policy
              </Link>
            </div>
            <div className="footerd1">
              {/* <h6 className="footerh6">Follow us:</h6> */}
              <div className="footerimgdiv">
                <div className="imgcircle">
                  <a href="https://www.facebook.com/rehubcy">
                    <img src={footerfb} alt="" />
                  </a>
                </div>
                <div className="imgcircle">
                  <a href="https://www.instagram.com/rehub.cyprus">
                    <img src={footerinsta} alt="" />
                  </a>
                </div>
                <div className="imgcircle">
                  <a href="https://www.twitter.com/rehubcy">
                    <img src={footertwitter} alt="" />
                  </a>
                </div>
                <div className="imgcircle">
                  <a href="tel:00357 22770494" className="footer-link">
                    <StayCurrentPortraitIcon />
                  </a>
                </div>
                <div className="imgcircle">
                  <a href="mailto:rehubcy@gmail.com" className="footer-link">
                    <MailOutlineIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footermobile">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
              <h6 className="footerh6">Trending Searches</h6>
            </AccordionSummary>
            <AccordionDetails className="footermobiled1">
              <a className="footermobilea" href>
                Service Providers
              </a>
              <a className="footermobilea" href>
                Space Providers
              </a>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
              <h6 className="footerh6">Services</h6>
            </AccordionSummary>
            <AccordionDetails className="footermobiled1">
              <a className="footermobilea" href>
                Service Providers
              </a>
              <a className="footermobilea" href>
                Space Providers
              </a>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
              <h6 className="footerh6">About Us</h6>
            </AccordionSummary>
            <AccordionDetails className="footermobiled1">
              <Link className="footermobilea" to="/terms-of-service">
                Terms & Conditions
              </Link>
              <a className="footermobilea" href>
                About Us
              </a>
            </AccordionDetails>
          </Accordion>
          <div className="footermobilelastdiv">
            {/* <h6 className="footerh6">Follow us:</h6> */}
            <div className="footerimgdiv">
              <div className="imgcircle">
                <img src={footerfb} alt="" />
              </div>
              <div className="imgcircle">
                <img src={footerinsta} alt="" />
              </div>
              <div className="imgcircle">
                <img src={footertwitter} alt="" />
              </div>
              <div className="imgcircle">
                <StayCurrentPortraitIcon />
              </div>
              <div className="imgcircle">
                <MailOutlineIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
