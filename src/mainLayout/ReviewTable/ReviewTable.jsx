import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//components
//mui
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useSelector } from "react-redux";
import { getSpaces } from "../../services/Spaces";
import SimpleAlert from "../../common/Swal Alert";
import Toggle from "./Toggle";
import { getBookingAll } from "../../services/Books";
import LoadingProgressBar from "../../common/LoadingProgressBar";
import { GetAllReview } from "../../services/Review";
import { baseURL } from "../../common/AxiosInstance";

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange,
  } = props;
  const [testLoader, setTestLoader] = useState(true);

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  useEffect(() => {
    getBookingAll(setTestLoader).then((res) => {});
  }, []);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function ReviewTable({ loading }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [check, setCheck] = useState(false);
  const [indexToggle, setIndexToggle] = useState();
  const [indexSwitch, setIndexSwitch] = useState(null);
  const [switchInputData, setSwitchInputData] = useState(null);

  const datagetAllbooking = useSelector((state) => state?.booking?.bookingDataAdmin);
  let rowsPerPage = 12;
  const path = window.location.pathname;

  if (path === "/admin/reviewmanagement") {
    rowsPerPage = 12;
  } else {
    rowsPerPage = 18;
  }

  const handleChange = (event, value) => {
    setPage(value - 1);
  };
  const location = useLocation();

  const pathname = location.pathname;

  function createData(BookingDate, BT, NOP, SpaceName, ReviewID, Rating, Review, Approve) {
    return {
      BookingDate,
      BT,
      NOP,
      SpaceName,
      ReviewID,
      Rating,
      Review,
      Approve,
    };
  }

  const review = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique magna sit amet purus. Suspendisse sed nisi lacus sed viverra. Ut aliquam purus sit amet luctus venenatis lectus magna";
  const rows = [
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",

      "123",
      <Rating name="read-only" value={2} readOnly />,
      review,
      <Toggle name="one" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="two" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="three" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="four" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="five" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="six" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="seven" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="eight" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="nine" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="ten" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="eleven" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="twelve" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="thirteen" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="fourteen" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="fifteen" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="sixteen" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="seventeen" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="eighteen" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="ninteen" />,
    ),
    createData(
      "22-sep-2022",
      "12:00pm - 1:00pm",
      "COD",

      "kazuya’s Space",
      "123",
      <Rating name="read-only" value={4} readOnly />,
      review,
      <Toggle name="twenty" />,
    ),
  ];
  useEffect(() => {
    GetAllReview()
      .then((response) => {
        const newPerson = response?.person.filter((item) => {
          return item.rating !== "0";
        });
        setData(newPerson);
        // SimpleAlert("success", "Sucessfully Data get");
      })
      .catch((error) => {
        // SimpleAlert("error", error);
      });
  }, []);

  const handleChangeCheck = (user, index) => {
    // setCheck(!check);
    // setIndexSwitch(index);
    // setSwitchInputData(rows);
    // handleInputDataUpdateReview(index, rows);

    user.approve = !user.approve;
    const oldData = [...data];
    oldData[index] = user;
    setIndexToggle(index);
    setData(oldData);
    axios.patch(`${baseURL}/auth/update/review`, {
      id: user._id,
      approvedata: user.approve,
    });

    // setIndexToggle(index);

    // setCheck((prev) => {
    //   return prev === index ? !check : !check;
    // });
  };

  const handleInputDataUpdateReview = (index, rows) => {
    if (index === indexSwitch) {
    } else {
    }
  };
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
    <div className="BookingTable">
      <div className="dashboardbookingsd1">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead style={{ position: "sticky", top: "0", zIndex: "10" }}>
              <TableRow className="firstrow" style={{ background: primaryColor }}>
                <TableCell className="firstrowcellreview">Booking Date</TableCell>
                <TableCell className="firstrowcellreview">Booking Time</TableCell>
                <TableCell className="firstrowcellreview">Name of Physiotherapist</TableCell>
                <TableCell className="firstrowcellreview">Space Name</TableCell>
                <TableCell className="firstrowcellreview">Review ID</TableCell>
                <TableCell className="firstrowcellreview">Rating</TableCell>
                <TableCell className="firstrowcellreview">Review</TableCell>
                <TableCell className="firstrowcellreview">Approve</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />

                  <TableCell>
                    <div
                        className={
                          pathname === "/physiotherapy-hub/dashboard"
                            ? "progressbardivdashboard"
                            : "progressbardivreviews"
                        }
                      >
                        <LoadingProgressBar />
                      </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {/*        {datagetAllbooking?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="cell" style={{ width: 160 }}>
                          {row.bookingDate}
                        </TableCell>
                        <TableCell className="cell" style={{ width: 225 }}>
                          {row.bookingTime}
                        </TableCell>
                        <TableCell
                          className="cell"
                          style={{ width: 160, fontWeight: "600" }}
                        >
                          {row.userName}
                        </TableCell>
                        <TableCell className="cell" style={{ width: 185 }}>
                          {row.spaceName}
                        </TableCell>

                        <TableCell className="cell" style={{ width: 160 }}>
                          {`$${row.spacePrice}`}
                        </TableCell>
                        <TableCell
                          className="cell"
                          style={{
                            width: 160,
                            color: "#1CBB67",
                            fontWeight: "500",
                          }}
                        >
                          {row.status}
                        </TableCell>
                      </TableRow>
                    ))} */}
                  {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(
                      (rows, index) => (
                        <TableRow key={index}>
                          <TableCell className="cellreview" style={{ width: 160 }}>
                            {rows?.booking?.bookingDate}
                          </TableCell>
                          <TableCell className="cellreview" style={{ width: 160 }}>
                            {rows?.booking?.bookingTime}
                          </TableCell>
                          <TableCell className="cellreview" style={{ width: 160 }}>
                            {rows?.booking?.userName}
                          </TableCell>
                          <TableCell className="cellreview" style={{ width: 225 }}>
                            {rows?.space?.name}
                          </TableCell>
                          <TableCell className="cellreview" style={{ width: 160, fontWeight: "600" }}>
                            {rows?._id}
                          </TableCell>
                          <TableCell className="cellreview" style={{ width: 160 }}>
                            <Rating name="read-only" value={rows?.rating} readOnly />
                          </TableCell>
                          <TableCell className="reviewtablecell" style={{ width: 160, textAlign: "left" }}>
                            <div className="reviewcell">
                              {" "}
                              {rows?.review}
                              {/* Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Tristique magna sit amet purus.
                            Suspendisse sed nisi lacus sed viverra. Ut aliquam
                            purus sit amet luctus venenatis lectus magna */}
                            </div>
                          </TableCell>
                          <TableCell className="cellreview" style={{ width: 160 }}>
                            <Toggle
                              name="three"
                              handleChangeCheck={() => handleChangeCheck(rows, index)}
                              check={rows.approve === true}
                            />
                            {/* <Toggle
                            name="three"
                            // handleChangeCheck={(e) =>
                            //   handleChangeCheck(e, index, rows)
                            // }
                            handleChangeCheck={handleChangeCheck}
                            check={rows?.approve ? rows?.approve : check}
                            // indexSwitch={indexSwitch}
                            // indextest={index}
                            // rows={rows}
                          /> */}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div className="pagecontroldiv">
          <Stack className="stackPaginationReview" spacing={2}>
            <Pagination
              count={Math.ceil(data.length / rowsPerPage)}
              onChange={handleChange}
            />
          </Stack>
        </div> */}
    </div>
  );
}

export default ReviewTable;
