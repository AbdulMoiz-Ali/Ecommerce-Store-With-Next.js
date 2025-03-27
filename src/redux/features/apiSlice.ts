import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/category" }),
    endpoints: (builder) => ({
        getCategories: builder.query({  // ✅ Change mutation to query
            query: () => "/getall", // ✅ No need for method in GET requests
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