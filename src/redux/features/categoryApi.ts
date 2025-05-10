import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/category" }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "http://localhost:4000/categories",
        }),
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: "http://localhost:4000/categories",
                method: "POST",
                body: newCategory,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        editCategory: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `http://localhost:4000/categories/${id}`,
                method: "PUT",
                body: updatedData,
                headers: { "Content-Type": "application/json" },
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `http://localhost:4000/categories/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;