import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

//mui
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getContentApi } from "../../redux/UserReducerApis";

import { getSpaces } from "../../services/Spaces";
import SimpleAlert from "../../common/Swal Alert";
import { getBookingAll } from "../../services/Books";
import LoadingProgressBar from "../../common/LoadingProgressBar";
import { getSpaceDataPostById } from "../../services/AddSpace";

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange,
  } = props;

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

function createData(BookingDate, BT, NOP, SpaceName, BA, S) {
  return {
    BookingDate, BT, NOP, SpaceName, BA, S,
  };
}

function BookingTable2({
  loading, testLoader, selectedDate, filterbook, name,
}) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [showCount, setShowCount] = useState(0);
  const [currentTherpistHub, setCurrentTherpistHub] = useState([]);

  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const dispatch = useDispatch();
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);
  const datagetAllbooking = useSelector((state) => state?.booking?.bookingDataAdmin);
  const userData = useSelector((state) => state.user);

  let rowsPerPage = 12;
  const path = window.location.pathname;

  if (path === "/physiotherapy-hub/dashboard") {
    rowsPerPage = 12;
  } else {
    rowsPerPage = 18;
  }
  const handleChange = (event, value) => {
    setPage(value - 1);
  };
  const location = useLocation();

  const pathname = location.pathname;

  useEffect(() => {
    getSpaceDataPostById(userData?.value?._id)
      // getSpaceDataPostById("6359db377d7d0bbc068d1409")
      .then((res) => {
        setCurrentTherpistHub(res?.data);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    getBookingAll()
      .then((response) => {
        const arrayb = response?.data?.data;
        const arraya = [...currentTherpistHub];

        const resultFilter = arrayb?.filter((elem1) => arraya?.some((elem2) => elem2?.name === elem1?.spaceName && elem1.status === "Upcomming"));
        const newData = response?.data?.data.filter((item) => {
          return item.bookingDate !== "Invalid date";
        });
        setData(resultFilter);
      })
      .catch((error) => {});
  }, [currentTherpistHub]);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  let sortDate = [];
  // = datagetAllbooking.sort((a, b) => b.bookingDate - a.bookingDate);
  if (datagetAllbooking) {
    sortDate = [...datagetAllbooking].sort((a, b) => a.bookingDate.split("/").reverse().join().localeCompare(b.bookingDate.split("/").reverse().join()));
  }

  useEffect(() => {
    getBookingAll()
      .then((response) => {
        const newData = response?.data?.data.filter((item) => {
          return item.bookingDate !== "Invalid date";
        });
        setData(newData);
      })
      .catch((error) => {});
  }, [name, selectedDate]);

  useEffect(() => {
    if (selectedDate && sortDate.length === 0) {
      setShowCount(1);
    }
    if (filterbook && selectedDate && sortDate.length === 0) {
      setShowCount(1);
    }
    if (filterbook && selectedDate && sortDate.length === 0) {
      setShowCount(1);
    }
    if (filterbook && name && sortDate.length === 0) {
      setShowCount(1);
    }
    if (name && sortDate.length === 0) {
      setShowCount(1);
    }
  }, [selectedDate, filterbook, name]);

  return (
    <div className="BookingTable">
      <div className="dashboardbookingsd1">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead style={{ position: "sticky", top: "0", zIndex: "10" }}>
              <TableRow className="firstrow" style={{ background: primaryColor }}>
                <TableCell className="firstrowcell">Booking Date</TableCell>
                <TableCell className="firstrowcell">Booking Time</TableCell>
                <TableCell className="firstrowcell">Name of Physiotherapist</TableCell>
                <TableCell className="firstrowcell">Space Name</TableCell>
                <TableCell className="firstrowcell">Booking Amount</TableCell>
                <TableCell className="firstrowcell">Status</TableCell>
                <TableCell className="firstrowcell">Payment Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && testLoader ? (
                <TableRow>
                  <TableCell />
                  <TableCell />

                  <TableCell>
                    <div
                        className={
                          pathname === "/physiotherapy-hub/dashboard"
                            ? "progressbardivdashboard"
                            : "progressbardivbookings"
                        }
                      >
                        <LoadingProgressBar />
                        ;
                      </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {showCount === 1 && sortDate?.length === 0 ? (
                      <div>Data Not Found</div>
                    ) : sortDate?.length === 0 ? (
                      data?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="cell" style={{ width: 160 }}>
                            {/* {moment()?.format("MM/DD/YYYY")} */}
                            {row?.bookingDate}
                          </TableCell>
                          <TableCell className="cell" style={{ width: 225 }}>
                            {row.bookingTime}
                          </TableCell>
                          <TableCell className="cell" style={{ width: 160, fontWeight: "600" }}>
                            {(row?.userName).replace("undefined", "")}
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
                          <TableCell
                            className="cell"
                            style={{
                              width: 200,
                              color: "#1CBB67",
                              fontWeight: "500",
                            }}
                          >
                            {row.paymentStatus}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      sortDate?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="cell" style={{ width: 160 }}>
                            {/* {moment()?.format("MM/DD/YYYY")} */}
                            {row.bookingDate}
                          </TableCell>
                          <TableCell className="cell" style={{ width: 225 }}>
                            {row.bookingTime}
                          </TableCell>
                          <TableCell className="cell" style={{ width: 160, fontWeight: "600" }}>
                            {(row?.userName).replace("undefined", "")}
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
                          <TableCell
                            className="cell"
                            style={{
                              width: 200,
                              color: "#1CBB67",
                              fontWeight: "500",
                            }}
                          >
                            {row.paymentStatus}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div className="pagecontroldiv">
          <Stack className="stackPagination" spacing={2}>
            <Pagination
              count={Math.ceil(rows.length / rowsPerPage)}
              onChange={handleChange}
            />
          </Stack>
        </div> */}
    </div>
  );
}

export default BookingTable2;
