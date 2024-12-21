import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

const useSecureAxios = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("api response error status", error.status);
        if (error.status === 401 || error.status === 403) {
          logOut()
            .then(() => {
              // redirect to the login page
              navigate("/auth/login");
            })
            .catch((err) => console.log(err));
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useSecureAxios;
