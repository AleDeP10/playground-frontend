import axios from "axios";
import { useEffect } from "react";
import { useSpinnerStore } from "./store/index.js";
import { useLogoutStore } from "./store/index.js";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Content-Type": "application/json"
  },
  //withCredentials: true
});

// Funzione che gestisce gli intercettori
const useApiClientInterceptors = (disableSpinner = false) => {
  const setShowSpinner = useSpinnerStore((state) => state.setShowSpinner);
  const setLogout = useLogoutStore((state) => state.setLogout);

  useEffect(() => {
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
      console.error("Error:", error);
      if (error.response) {
        // Se è un errore Axios
        if (error.response.status === 403) {
          // Gestione dell'errore 403 Forbidden
          // window.location.reload(); // Redirect alla pagina di login
          setLogout(true); // Imposta lo stato di logout
        } else {
          jsonData = {
            error: `Request failed with status ${error.response.status}: ${error.response.statusText}`
          };
        }
      } else if (error.request) {
        // Errore di richiesta, ma nessuna risposta ricevuta
        jsonData = {
          error: "No response received: " + error.message
        };
      } else {
        // Qualsiasi altro errore
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

      return Promise.reject(jsonData); // Restituisce l'oggetto { error }
    });

    // Pulizia degli intercettori quando il componente viene smontato
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [setShowSpinner, setLogout]);

  // Restituisci apiClient per consentirne l'utilizzo nel componente
  return apiClient;
};

export default useApiClientInterceptors;
