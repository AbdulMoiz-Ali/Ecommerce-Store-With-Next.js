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
    }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;
