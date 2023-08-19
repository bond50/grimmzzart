import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import orderService from '../../services/order.service';


// Thunks
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({token, query}) => {
    const response = await orderService.listOrders(token, query);
    return response.data;
});

export const fetchOrder = createAsyncThunk('orders/fetchOrder', async ({token, orderId}) => {
    const response = await orderService.getOrder(token, orderId);
    return response.data;
});

export const updateOrder = createAsyncThunk('orders/updateOrder', async ({token, orderId, status}) => {
    const response = await orderService.updateOrderStatus(token, orderId, status);
    return response.data;
});

export const removeOrder = createAsyncThunk('orders/removeOrder', async ({token, orderId}) => {
    const response = await orderService.deleteOrder(token, orderId);
    return response.data;
});

export const getTotalOrders = createAsyncThunk('orders/getTotalOrders', async (token) => {
    const response = await orderService.countTotalOrders(token);
    return response.data;
});

export const fetchTotalAmount = createAsyncThunk('orders/fetchTotalAmount', async (token) => {
    const response = await orderService.getTotalAmount(token);
    return response.data;
});
// Slice
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        totalOrders: 0,
        totalAmount: 0,
        loading: false,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchTotalAmount.pending]: (state, action) => {
            state.status = 'loading';
            state.loading = true;
        },
        [fetchTotalAmount.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.totalAmount = action.payload;
            state.loading = false;
        },
        [fetchTotalAmount.rejected]: (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.error.message;
        },
        [fetchOrders.pending]: (state, action) => {
            state.status = 'loading';
            state.loading = true;  // Set loading to true
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.orders = action.payload;
            state.loading = false;  // Set loading to false
        },
        [fetchOrders.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = false;  // Set loading to false
        },

        [fetchOrder.pending]: (state, action) => {
            state.status = 'loading';
            state.loading = true;
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.orders.push(action.payload);
            state.loading = false;
        },
        [fetchOrder.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = false;
        },

        [updateOrder.pending]: (state, action) => {
            state.status = 'loading';
            state.loading = true;  // Add this line
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const index = state.orders.findIndex(order => order._id === action.payload._id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
            state.loading = false;  // Add this line
        },
        [updateOrder.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = false;  // Add this line
        },

        [removeOrder.pending]: (state, action) => {
            state.status = 'loading';
            state.loading = true;
        },
        [removeOrder.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.orders = state.orders.filter(order => order._id !== action.payload._id);
            state.loading = false;
        },
        [removeOrder.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = false;
        },
        [getTotalOrders.pending]: (state, action) => {
            state.status = 'loading';
            state.loading = true;
        },
        [getTotalOrders.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.totalOrders = action.payload;
            state.loading = false;
        },
        [getTotalOrders.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = false;
        }
    }
});

const {reducer} = orderSlice;

export default reducer;
