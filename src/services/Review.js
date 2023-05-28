import axios from "../common/AxiosInstance";

export const AddReview = (userId, review, space, rating, bookingId) => new Promise((resolve, reject) => {
  axios
    .post("/auth/submit/review", {
      userId, review, space, rating, bookingId,
    })
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
});

export const GetAllReview = () => new Promise((resolve, reject) => {
  axios
    .get("/auth/all/review")
    .then((response) => {
      resolve(response?.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const GetAllReviewsByID = (spaceid) => new Promise((resolve, reject) => {
  axios
    .post("/auth/get/review", { spaceid })
    .then((response) => {
      resolve(response?.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const GetSPaceAllReview = (spaceName) => new Promise((resolve, reject) => {
  axios
    .post("/auth/singlespace/review", spaceName)
    .then((response) => {
      resolve(response?.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const UpdateSingleReview = (id, data) => new Promise((resolve, reject) => {
  axios
    .post("/auth/update/singlereview", { id, data })
    .then((response) => {
      resolve(response?.data);
    })
    .catch((err) => {
      reject(err);
    });
});
