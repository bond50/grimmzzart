import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

import {showToast} from "../../ui/Toast/toastNotifications";
import {setMessage} from "./message";


const user = JSON.parse(localStorage.getItem("user"));

const handleError = (error, thunkAPI) => {
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        "Something went wrong. Please try again later.";

    thunkAPI.dispatch(setMessage(message));
    showToast(message, "error", 4000, "350px");
    return thunkAPI.rejectWithValue();
};


export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, thunkAPI) => {
    try {
        const response = await AuthService.resetPassword(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, thunkAPI) => {
    try {
        const response = await AuthService.forgotPassword(email);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});


export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

export const login = createAsyncThunk("auth/login", async (userInfo, thunkAPI) => {
    try {
        const data = await AuthService.login(userInfo);
        const {user} = data;
        if (user.role && user.role.permissions) {
            user.permissions = user.role.permissions;
            delete user.role.permissions;
        }

        return {user};
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});


const initialState = user
    ? {
        isLoggedIn: true,
        user,
    }
    : {
        isLoggedIn: false,
        addressSaved: false,
        user: null,
    };


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.addressSaved = action.payload.user.address && action.payload.user.address.length > 0;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })

    },
});

const {reducer} = authSlice;

export default reducer;