import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/product" }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => ({
                url: "/Product",
                method: "POST",
                body: productData,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useCreateProductMutation } = productApi;
