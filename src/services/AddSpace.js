import axios from "../common/AxiosInstance";

export const AddSpaceApi = (name, price, address, spaceimage, userid) => new Promise((resolve, reject) => {
  axios
    .post("/api/space/addspace", {
      name,
      price,
      address,
      spaceimage,
      userid,
    })
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
});
export const getIndividualSpace = (id) => new Promise((resolve, reject) => {
  axios
    .get(`/space/getspace/${id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getUserleSpace = (id) => new Promise((resolve, reject) => {
  axios
    .get(`space/getspaceByUser/${id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getAllSpace = () => new Promise((resolve, reject) => {
  axios
    .get("/space/getspace")
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getSpaceDataPostById = (id) => new Promise((resolve, reject) => {
  axios
    .get(`/space/getspaces/bywhopost/${id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getSellerInfoNameInBooking = (name) => new Promise((resolve, reject) => {
  axios
    .post("/space/getuser/sellerspacename", { name })
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
});
