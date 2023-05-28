import jwtDecode from "jwt-decode";
import axios, { baseURL } from "../common/AxiosInstance";

export const signUp = (name, username, accountType, password) =>
  new Promise((resolve, reject) => {
    axios
      .post("/auth/signup", {
        name,
        username,
        accountType,
        password
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const logIn = (username, password) =>
  new Promise((resolve, reject) => {
    axios
      .post("/auth/login", { username, password })
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data;
        localStorage.setItem("rehub_token", response.data);
        const authorizedUser = loggedInUser();
        resolve(authorizedUser);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const googleSignUp = (tokenId, accountType, image) =>
  new Promise((resolve, reject) => {
    axios
      .post("/auth/google/signup", { tokenId, accountType, image })
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.token;
        localStorage.setItem("rehub_token", response.data.token);
        const authorizedUser = loggedInUser();
        resolve({ authorizedUser, message: response.data.message });
      })
      .catch((err) => {
        reject(err);
      });
  });
export const facebookSignup = (email, id, name, type, image) =>
  new Promise((resolve, reject) => {
    axios
      .post("/auth/facebook/signup", {
        email,
        id,
        username: name,
        signInType: "Facebook",
        accountType: type,
        image
      })
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.token;
        localStorage.setItem("rehub_token", response.data.token);
        const authorizedUser = loggedInUser();
        resolve({ authorizedUser, message: response.data.message });
      })
      .catch((err) => {
        reject(err);
      });
  });

export const googleLogin = (tokenId, accountType) =>
  axios
    .post("/auth/google/login", { tokenId, accountType })
    .then((response) => {
      if (response.data.error) {
        return { isPresent: false };
      } else {
        axios.defaults.headers.common.Authorization = response.data.token;
        localStorage.setItem("rehub_token", response.data.token);
        const authorizedUser = loggedInUser();
        return { isPresent: true, authorizedUser };
      }
    });

export const googleAccountCheck = (tokenId) =>
  axios.post("/auth/google/account", { tokenId }).then((response) => {
    return response.data?.existing;
  });

export const logOut = () => {
  localStorage.removeItem("rehub_token");
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("rehub_token");
  return token || false;
};

export const loggedInUser = () => {
  if (isLoggedIn()) {
    return jwtDecode(isLoggedIn());
  }
};

export const getLoggedinUser = () =>
  new Promise((resolve, reject) => {
    axios
      .get("/auth/user")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const forgotPassword = (email) =>
  axios.post("/auth/forgot-password", { email }).catch((err) => {
    throw err;
  });

export const updateAccountType = (spaceData) =>
  axios.put("/therapist/update/account-type", spaceData).catch((err) => {
    throw err;
  });

export const resetPassword = (email, password, token) =>
  axios
    .post("/auth/reset-password", {
      email,
      password,
      token
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });

export const confirmResetPasswordToken = (token) =>
  axios
    .post("/auth/confirm-reset-password", {
      token
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });

export const verifyEmail = (token) =>
  axios
    .post("/auth/verify-email", {
      token
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
