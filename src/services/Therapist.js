import axios from "../common/AxiosInstance";

export const updateProfile = (
  firstName,
  lastName,
  phoneNumber,
  location,
  email,
  information,
  image,

  password,
) => new Promise((resolve, reject) => {
  axios
    .patch("/therapist/update/profile", {
      firstName,
      lastName,
      phoneNumber,
      location,
      email,

      information,
      image,

      password,
    })
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
});
