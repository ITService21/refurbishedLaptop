import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { COOKIES } from "../config/constants";

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      if (response?.success) {
        // Store token in cookie
        Cookies.set(COOKIES.authToken, response.data.token, { expires: 7 });
        if (response.data.user?.user_id) {
          Cookies.set(COOKIES.userId, response.data.user.user_id, { expires: 7 });
        }
        return response.data;
      }
      return rejectWithValue(response?.message || "Login failed");
    } catch (error) {
      return rejectWithValue(error?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "login/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      if (response?.success) {
        // Store token in cookie if returned
        if (response.data?.token) {
          Cookies.set(COOKIES.authToken, response.data.token, { expires: 7 });
          if (response.data.user?.user_id) {
            Cookies.set(COOKIES.userId, response.data.user.user_id, { expires: 7 });
          }
        }
        return response.data;
      }
      return rejectWithValue(response?.message || "Registration failed");
    } catch (error) {
      return rejectWithValue(error?.message || "Registration failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "login/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getProfile();
      if (response?.success) {
        return response.data;
      }
      return rejectWithValue(response?.message || "Failed to fetch profile");
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch profile");
    }
  }
);

const initialState = {
  isLogin: !!Cookies.get(COOKIES.authToken),
  loginPopup: false,
  user: null,
  userData: {},
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action) {
      const token = action.payload;
      if (token) {
        Cookies.set(COOKIES.authToken, token, { expires: 7 });
        state.isLogin = true;
      }
    },
    logout(state) {
      Cookies.remove(COOKIES.authToken);
      Cookies.remove(COOKIES.userId);
      state.isLogin = false;
      state.user = null;
      state.userData = {};
    },
    toggleLoginPopup(state, action) {
      state.loginPopup = action.payload;
    },
    userData(state, action) {
      state.userData = action.payload;
      state.isLogin = true;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = action.payload.user;
        state.userData = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.token) {
          state.isLogin = true;
          state.user = action.payload.user;
          state.userData = action.payload.user;
        }
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userData = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectIsLoggedIn = (state) => state.login.isLogin;
export const selectUser = (state) => state.login.user;
export const selectUserData = (state) => state.login.userData;
export const selectAuthLoading = (state) => state.login.loading;
export const selectAuthError = (state) => state.login.error;

export const { setLogin, logout, toggleLoginPopup, userData, setUser, clearError } = loginSlice.actions;
export default loginSlice.reducer;
