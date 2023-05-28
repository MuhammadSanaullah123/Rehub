import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import "./GoogleCalender.css";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { gapi } from "gapi-script";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getContentApi } from "../../redux/UserReducerApis";
// var gapi=window.gapi;

/* global gapi */
function GoogleCalender(props) {
  const dispatch = useDispatch();
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();

  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const userMail = useSelector((state) => state?.userReducer?.user?.value?.user?.email);

  const CLIENT_ID = "615021829008-escfim5jvcvlnudmu866dhokqak30hqm.apps.googleusercontent.com";
  const API_KEY = "AIzaSyCUl03WH-nZd89aImw1grjXBun7Coec1dQ";

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  const google = window.google;

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "", // defined later
    });
    gisInited = true;
    maybeEnableButtons();
  }

  /**
   * Enables user interaction after all libraries are loaded.
   */
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
    }
  }

  function handleAuthClick() {
    gisLoaded();
    gapiLoaded();

    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      // document.getElementById('signout_button').style.visibility = 'visible';
      document.getElementById("authorize_button").innerText = "Add to Goole Calender";
      await listUpcomingEvents();
    };

    if (gapi?.client?.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }
  function handleSignoutClick() {
    const token = gapi?.client?.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token?.access_token);
      gapi?.client?.setToken("");

      // document.getElementById('authorize_button').innerText = 'Authorize';
      // document.getElementById('signout_button').style.visibility = 'hidden';
    }
  }

  // var propsDate=moment(props.bookingdata[0]?.bookingDate,"YYYY-MM-DDThh:mm:ss+00:00").format("YYYY-MM-DDThh:mm:ss+00:00");

  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };
      response = await gapi.client.calendar.events.list(request);
      let event;
      props.bookingdata.map((item) => {
        const dte = new Date();
        const changedatetest = item.bookingDate.split("/");
        const dateday = changedatetest[0];
        const datayear = changedatetest[2];
        const datemonth = changedatetest[1];
        const concatdatasd = `${datayear}/${datemonth}/${dateday}`;

        const newDate = moment(concatdatasd).format("YYYY-MM-DDThh:mm:ss+00:00");

        event = {
          summary: "Booking Reminder",
          location: "",
          description: `Space Name: ${item.spaceName} Your time slots ${item.bookingTime} and Booking Id is ${item.bookingInvoiceNumber}`,

          start: {
            dateTime: newDate,
            timeZone: "America/Los_Angeles",
          },
          end: {
            dateTime: newDate,
            timeZone: "America/Los_Angeles",
          },
          recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
          attendees: [{ email: userMail }],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        };
      });

      const event1 = [
        {
          summary: "Awesome Event!",
          location: "800 Howard St., San Francisco, CA 94103",
          start: {
            dateTime: "2020-06-28T09:00:00-07:00",
            timeZone: "America/Los_Angeles",
          },
        },
      ];

      const request1 = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      request1.execute((event) => {
        window.open(event.htmlLink);
      });
    } catch (err) {
      document.getElementById("content").innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
      document.getElementById("content").innerText = "No events found.";
      return;
    }
    // Flatten to string to display
    const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      "Events:\n",
    );
    document.getElementById("content").innerText = output;
  }

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <>
      {/* <button id="authorize_button" onClick={handleAuthClick}>Authorize</button>
    <button id="authorize_button" onClick={handleAuthClick}>Authorize</button> */}

      {/* <button className="recieptb1" onClick={handleAuthClick}>Add to Google Calender</button> */}

      <div className="recieptd2">
        <button
          id="authorize_button"
          className="recieptb1"
          style={{ background: primaryColor }}
          onClick={handleAuthClick}
        >
          Add to Google Calender
        </button>
      </div>
    </>
  );
}

export default GoogleCalender;
