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
    return message;
};


export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, thunkAPI) => {
    try {
        const response = await AuthService.resetPassword(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        handleError(error, thunkAPI);
        throw error;
    }
});
export const changePassword = createAsyncThunk("auth/changePassword", async ({ userId, data }, thunkAPI) => {
    try {
        const response = await AuthService.changePassword(userId, data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        handleError(error, thunkAPI);
        throw error;
    }
});


export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, thunkAPI) => {
    try {
        const response = await AuthService.forgotPassword(email);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        handleError(error, thunkAPI);
        throw error;
    }
});


export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});
export const login = createAsyncThunk("auth/login", async (userInfo, thunkAPI) => {
    console.log(userInfo)
    try {
        return await AuthService.login(userInfo);

    } catch (error) {
        handleError(error, thunkAPI);
        throw error;
    }
});
export const verify2FA = createAsyncThunk("auth/verify2FA", async (data, thunkAPI) => {
    try {
        const response = await AuthService.verify2FA(data);

        const {user} = response;
        if (user.role && user.role.permissions) {
            user.permissions = user.role.permissions;
            delete user.role.permissions;
        }
        return {user};
    } catch (error) {
        handleError(error, thunkAPI);
        throw error;
    }
});

const initialState = user
    ? {
        isLoggedIn: true,
        user,
    }
    : {
        isLoggedIn: false,
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
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(verify2FA.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(verify2FA.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            });

    },
});

const {reducer} = authSlice;

export default reducer;