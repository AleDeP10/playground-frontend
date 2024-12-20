import axios from "axios";
import { useEffect } from "react";
import { useSpinnerStore } from "./store/index.js";

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

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use((config) => {
      if (!disableSpinner)
        setShowSpinner(true); 
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } 
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    const responseInterceptor = apiClient.interceptors.response.use((response) => {
      if (!disableSpinner)
        setShowSpinner(false); 
      return response;
    }, (error) => {
      if (!disableSpinner)
        setShowSpinner(false); 

      if (error.response && error.response.status === 403) {
        // Gestione dell"errore 403 Forbidden
        //alert("Accesso negato. Sarai reindirizzato alla pagina di login.");
        window.location.reload() // Redirect alla pagina di login
      }

      return Promise.reject(error);
    });

    // Pulizia degli intercettori quando il componente viene smontato
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [setShowSpinner]);

  // Restituisci apiClient per consentirne l"utilizzo nel componente
  return apiClient;
};

export default useApiClientInterceptors;
