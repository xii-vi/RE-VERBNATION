import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify"

const userInfo = JSON.parse(localStorage.getItem('userData')) || ""
const tokenDetails = localStorage.getItem("token") || ""
const initialState = {
    encodedToken: !!tokenDetails,
    user: userInfo,
    isLoading: false,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, {rejectWithValue}) => {
        const { email, password } = user;
        try {
            const {
                data: { foundUser, encodedToken },
            } = await axios.post("/api/auth/login", {
                email,
                password
            });
            localStorage.setItem("token", encodedToken)
            localStorage.setItem('userData', JSON.stringify(foundUser));
            return { foundUser, encodedToken };
        } catch (error) {
            toast.error("Some Error Occured");
            return rejectWithValue("Email or password is incorrect");
        }
    }
);

export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/auth/signup", user);
        return response.data;
    } catch (error) {
        if (error.response.status === 422) {
        return rejectWithValue("User already Exist!");
        } else {
        return rejectWithValue("Cannot signup right now!");
        }
    }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    logoutUser: (state) => {
        state.user = null;
        state.encodedToken = null;
        localStorage.removeItem("loginToken");
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("encodedToken");
    }
    },
    extraReducers: {
    [loginUser.pending]: (state) => {
        state.isLoading = true;
    },
    [loginUser.rejected]: (state) => {
        state.isLoading = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.foundUser;
        state.encodedToken = payload.encodedToken;
    },
    [signUpUser.pending]: (state) => {
        state.isLoading = true;
    },
    [signUpUser.rejected]: (state) => {
        state.isLoading = false;
    },
    [signUpUser.fulfilled]: (state) => {
        state.isLoading = false;
    },
    },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;