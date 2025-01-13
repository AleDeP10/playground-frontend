import axios from "axios";
import { useSpinnerStore } from "./store/index.js";
import { useLogoutStore } from "./store/index.js";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const setupInterceptors = (disableSpinner = false) => {
  const setShowSpinner = useSpinnerStore.getState().setShowSpinner;
  const setLogout = useLogoutStore.getState().setLogout;

  const requestInterceptor = apiClient.interceptors.request.use((config) => {
    if (!disableSpinner) setShowSpinner(true);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const responseInterceptor = apiClient.interceptors.response.use((response) => {
    if (!disableSpinner) setShowSpinner(false);
    return response;
  }, (error) => {
    if (!disableSpinner) setShowSpinner(false);

    let jsonData;
    if (error.response) {
      if (error.response.status === 403) {
        setLogout(true);
      } else {
        jsonData = {
          error: `Request failed with status ${error.response.status}: ${error.response.statusText}`
        };
      }
    } else if (error.request) {
      jsonData = {
        error: "No response received: " + error.message
      };
    } else {
      const err = error.error;
      let message;
      if (err) {
        message = err;
      } else {
        message = "Error in setting up request: " + error.message;
      }
      jsonData = {
        error: message
      };
    }

    return Promise.reject(jsonData);
  });

  return () => {
    apiClient.interceptors.request.eject(requestInterceptor);
    apiClient.interceptors.response.eject(responseInterceptor);
  };
};

const useApiClientInterceptors = (disableSpinner = false) => {
  setupInterceptors(disableSpinner);
  return apiClient;
};

export default useApiClientInterceptors;
export { apiClient, setupInterceptors };


