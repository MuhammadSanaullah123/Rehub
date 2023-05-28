import axios from "../common/AxiosInstance";

export const updateProfile = (firstName, lastName, phoneNumber, location, email, information, password) => new Promise((resolve, reject) => {
  axios
    .patch("/therapisthub/update/profile", {
      firstName,
      lastName,
      phoneNumber,
      location,
      email,
      information,
      password,
    })
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
});
