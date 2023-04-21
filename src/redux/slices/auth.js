import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
})

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    })
  }
})

export const authReducer = authSlice.reducer;
