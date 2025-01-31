import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch Categories AsyncThunk
export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/category/getall");
            console.log("API Response:", response.data.products);
            return response.data.products; // API should return an array of categories
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// ✅ Create Redux Slice
const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],  // ✅ Must match `useSelector(state => state.category.categories)`
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
                console.log("Redux Updated with Categories:", action.payload);
                state.loading = false;
                state.categories = action.payload; // ✅ Ensure this updates `categories`
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// ✅ Export Reducer
export default categorySlice.reducer;
