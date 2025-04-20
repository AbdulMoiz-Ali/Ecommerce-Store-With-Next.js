import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/category" }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "/getall",
        }),
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: "/Createcategories",
                method: "POST",
                body: newCategory,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        editCategory: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: updatedData,
                headers: { "Content-Type": "application/json" },
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
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