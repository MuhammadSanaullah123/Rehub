import axios from "../common/AxiosInstance";

export const addBooking = (booking, user) => new Promise((resolve, reject) => {
  axios
    .post("/booking/add", { booking, user })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getBookingAll = (setTestLoader) => new Promise((resolve, reject) => {
  axios
    .get("/booking/getAll")
    .then((response) => {
      resolve(response.data);
      setTestLoader(false);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getBookingsByUserId = (id, setTestLoader) => new Promise((resolve, reject) => {
  axios
    .get(`/booking/getAllB/${id}`)
    .then((response) => {
      resolve(response.data);
      setTestLoader(false);
    })
    .catch((err) => {
      reject(err);
    });
});

export const Bookingdatatest = (data) => new Promise((resolve, reject) => {
  axios
    .post("/booking/delete/booking", data)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const deleteBookingdata = (id) => new Promise((resolve, reject) => {
  axios
    .delete(`/booking/deletebooking/${id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const checkbookingIsExist = (userName, bookingDate, bookingTime, spaceId, spaceName) => new Promise((resolve, reject) => {
  axios
    .post("/booking/checkbooking/exist", {
      userName,
      bookingDate,
      bookingTime,
      spaceId,
      spaceName,
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const updateBookingAll = (datatest) => new Promise((resolve, reject) => {
  axios
    .patch("/booking/updatebooking", { datatest })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getBookingBySpaceName = (spaceName) => new Promise((resolve, reject) => {
  axios
    .post("/booking/getbooking/byname", { spaceName })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});
