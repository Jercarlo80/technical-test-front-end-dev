import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL API
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Async Thunks untuk Fetch, Add, Update, dan Delete User
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const response = await axios.post(API_URL, newUser);
  return { ...response.data, id: Date.now() }; // ID dibuat secara lokal
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  await axios.put(`${API_URL}/${user.id}`, user);
  return user;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  await axios.delete(`${API_URL}/${userId}`);
  return userId;
});

// Slice Redux Toolkit
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    searchTerm: "",
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => { 
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
export const { setSearchTerm } = userSlice.actions;