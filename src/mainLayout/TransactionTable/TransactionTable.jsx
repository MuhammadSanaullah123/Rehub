import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//mui
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
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

import { useSelector } from "react-redux";
import { getSpaces } from "../../services/Spaces";
import SimpleAlert from "../../common/Swal Alert";
import { getBookingAll } from "../../services/Books";
import LoadingProgressBar from "../../common/LoadingProgressBar";
import { baseURL } from "../../common/AxiosInstance";

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

function createData(TransactionDate, TT, NOP, SpaceName, SpaceOwner, SpaceID) {
  return {
    TransactionDate, TT, NOP, SpaceName, SpaceOwner, SpaceID,
  };
}
const rows = [
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",

    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
  createData(
    "22-sep-2022",
    "12:00pm - 1:00pm",
    "COD",

    "kazuya’s Space",
    "XYZ",
    "123",
  ),
];

function TransactionTable({ loading }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();

  const datagetAllbooking = useSelector((state) => state?.booking?.bookingDataAdmin);
  let rowsPerPage = 12;
  const path = window.location.pathname;

  if (path === "/admin/dashboard") {
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
    // getBookingAll()
    //   .then((response) => {
    //     setData(response?.data);
    //     SimpleAlert("success", "Sucessfully Data get");
    //   })
    //   .catch((error) => {
    //     SimpleAlert("error", error);
    //   });
  }, []);
  let sortDate = [];
  // = datagetAllbooking.sort((a, b) => b.bookingDate - a.bookingDate);
  if (datagetAllbooking) {
    sortDate = [...datagetAllbooking].sort((a, b) => a.bookingDate.split("/").reverse().join().localeCompare(b.bookingDate.split("/").reverse().join()));
  }

  useEffect(() => {
    axios.get(`${baseURL}/content/find`).then((res) => {
      // setApiData(res?.data?.data);

      res?.data?.data.map((item) => {
        setPrimary(item?.primaryColor);
        setSecondary(item?.secondaryColor);
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
                <TableCell className="firstrowcell">Transaction Date</TableCell>
                <TableCell className="firstrowcell">Transaction Time</TableCell>
                <TableCell className="firstrowcell">Name of Physiotherapist</TableCell>
                <TableCell className="firstrowcell">Space Name</TableCell>
                <TableCell className="firstrowcell">Space Owner</TableCell>
                <TableCell className="firstrowcell">Space ID</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell />
                  <TableCell />

                  <TableCell>
                    <div className="progressbardivdashboard">
                        <LoadingProgressBar />
                      </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {sortDate?.map((row, index) => (
                      <TableRow key={index}>
                        {/* {row?.spacePickDate?.map((item) => {
                      return (
                        <>
                          <TableCell className="cell" style={{ width: 160 }}>
                            {item.dateofAvailibilty}
                          </TableCell>
                        </>
                      );
                    })} */}

                        <TableCell className="cell" style={{ width: 160 }}>
                          {row.bookingDate}
                        </TableCell>
                        <TableCell className="cell" style={{ width: 225 }}>
                          {row.bookingTime}
                        </TableCell>
                        <TableCell className="cell" style={{ width: 160, fontWeight: "600" }}>
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
                    ))}
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

export default TransactionTable;
