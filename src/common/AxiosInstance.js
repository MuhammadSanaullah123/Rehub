import axios from "axios";
// uploads/advertise1.png
// export const host = "http://localhost:5000";
export const host = process.env.REACT_APP_API_HOST;
export const baseURL = `${host}/api/api`;
export const baseURLSecond = `${host}/api`;

const authInterceptorCallback = (config) => {
  const token = localStorage.getItem("rehub_token");
  config.headers = {
    ...config.headers,
    Authorization: token
  };
  return config;
};

axios.interceptors.request.use(authInterceptorCallback);

const instance = axios.create({ baseURL });
instance.interceptors.request.use(authInterceptorCallback);

export default instance;
