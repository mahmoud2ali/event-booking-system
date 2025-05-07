import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { createCookieSessionStorage } from "react-router-dom";

export function registerUser(userData) {
  return async (dispatch) => {
    try {
      console.log("userData: ", userData)
      const response = await request.post("/auth/register", userData);
      dispatch(authActions.register(response.data.message));
      setTimeout(() => {
        dispatch(authActions.register(null));
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function loginUser(userData) {
    return async (dispatch) => {
        try {
        const response = await request.post("auth/login", userData);
        dispatch(authActions.login(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          toast.error(error.response.data.message);

        }
    };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      dispatch(authActions.logout());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}