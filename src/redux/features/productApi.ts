import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/product" }),
    endpoints: (builder) => ({
        // Get all products
        getProducts: builder.query({
            query: () => "/Product"
        }),

        // Get a single product by ID
        getProductById: builder.query({
            query: (id) => `/Product/${id}`
        }),

        // Create a new product
        createProduct: builder.mutation({
            query: (productData) => {
                return {
                    url: "/Product",
                    method: "POST",
                    body: productData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            }
        }),

        // Update an existing product
        updateProduct: builder.mutation({
            query: ({ id, ...productData }) => ({
                url: `/product/Product/${id}`,
                method: "PUT",
                body: productData,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),

        // Delete a product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/Product/${id}`,
                method: "DELETE",
            })
        }),

        // Upload a file
        uploadFile: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append("file", file);

                return {
                    url: "/upload",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUploadFileMutation,
} = productApi;