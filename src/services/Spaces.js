import axios from "../common/AxiosInstance";

export const getSpaces = (setLoading) => new Promise((resolve, reject) => {
  axios
    .get("/space/getspace")
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    })
    .finally(() => {
      setLoading(false);
    });
});

export const getSpaceWithFilter = (date, location, temptime) => new Promise((resolve, reject) => {
  axios
    .post("/space/getspaceinbooking", { date, location, temptime })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const updateSpaceSingleAfterBook = (id, pickDate) => new Promise((resolve, reject) => {
  axios
    .patch(`/space/addavailability/${id}`, { pickDate })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export const getSingleSpace = (id) => new Promise((resolve, reject) => {
  axios
    .get(`/space/getspace/${id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});
