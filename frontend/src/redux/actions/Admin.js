import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAsync from "../../utils/handleAsync";
import api from "../../utils/api";
import { setAdmin } from "../features/authSlice";
import Cookies from "js-cookie";

// Login Admin Function
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/admin/login", credentials, {
        withCredentials: true,
      });

      console.log("response of admin login", response);

      if (!response || !response.data || !response.data.user) {
        return rejectWithValue("Login failed. Please try again.");
      }

      // Set admin in Redux state
      dispatch(setAdmin(response.data.user));

      return response.data.user;
    } catch (error) {
      console.error("Admin login error:", error);
      return rejectWithValue("Login request failed");
    }
  }
);

// Read Admin from Cookie & Dispatch
export function initAdminFromCookie() {
  const adminCookie = Cookies.get("admin");

  if (adminCookie) {
    const adminJson = adminCookie.startsWith("j:") ? adminCookie.slice(2) : adminCookie;
    try {
      const admin = JSON.parse(adminJson);
      console.log(admin)
    } catch (error) {
      console.error("Failed to parse admin cookie:", error);
    }
  } else {
    console.log("Admin cookie not found");
  }
}

// Logout Admin Function
export const logOutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await handleAsync(() =>
      api.post("/admin/logout", {}, { withCredentials: true })
    );

    if (!response) {
      return rejectWithValue("Logout failed. Please try again.");
    }

    dispatch(setAdmin(null));
    return response.data;
  }
);
