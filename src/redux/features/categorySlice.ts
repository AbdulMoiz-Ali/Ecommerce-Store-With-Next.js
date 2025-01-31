import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Ensure `fetchCategories` is exported correctly
export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/category/getall");
            return response.data.products; // API should return the categories array
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// ✅ Ensure this is exported
export default categorySlice.reducer;
