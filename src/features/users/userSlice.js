import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, userAdapter.setAll)
    }
})

export default userSlice.reducer

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = userAdapter.getSelectors(state => state.users)