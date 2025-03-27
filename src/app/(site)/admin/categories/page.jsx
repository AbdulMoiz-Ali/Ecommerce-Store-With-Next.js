"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"
import { fetchCategories } from "@/redux/features/categorySlice";
import { GiTireIronCross } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";
import TextInputs from "./../../../../components/GlobalInputs/TextInputs"
import { useCreateCategoryMutation, useGetCategoriesQuery } from "@/redux/features/apiSlice";

const AdminCategories = () => {
    const [filteredCategories, setFilteredCategories] = useState([]);
    const methods = useForm();
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [createCategory] = useCreateCategoryMutation(); // Create category mutation
    const { data, isLoading, error } = useGetCategoriesQuery(); // ✅ Fetch categories
    const { handleSubmit, control } = useForm();

    // create catagaries funcation
    const onSubmit = async (data) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(data.image[0]); // Convert image to Base64
            reader.onloadend = async () => {
                await createCategory({ title: data.title, image: reader.result }).unwrap();
                methods.reset();
                setIsOpen(false);
            };
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    // handelSearch Funcation

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data?.categories?.filter((category) =>
            category.title?.toLowerCase().includes(query)
        );

        setFilteredCategories(filtered);
        // console.log("filteredCategories",filteredCategories)
    };


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 sm:mt-12 sm:ml-64">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
                    <button
                        className="bg-blue-600 text-white bg-gray-6 px-6 py-2 rounded-lg hover:bg-blue-700 shadow-lg"
                        onClick={toggleModal}
                    >
                        + Add Category
                    </button>
                </div>
                <p className="text-gray-600 mb-6">Manage categories for your store</p>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-3 mb-6 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="overflow-x-auto">

                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-800">Image</th>
                                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-800">Title</th>
                                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-800">Date</th>
                                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-800"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="text-center w-full p-6 text-gray-500 border-b border-gray-300"
                                    >
                                        No results.
                                    </td>
                                </tr>
                            ) : (
                                filteredCategories.map((category) => (
                                    <tr key={category._id} className="hover:bg-gray-100">
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <img
                                                src={category.image} // ✅ Fixed image source
                                                alt={category.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">{category.title}</td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            {new Date(category.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <button className="text-green-dark px-4 py-2 rounded-lg hover:bg-blue-700 mr-2">
                                                Edit
                                            </button>
                                            <button className="text-red-dark rounded-lg hover:bg-red-700">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={toggleModal}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full flex px-2 justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
                            <GiTireIronCross className="pointer-cursore" onClick={toggleModal} />
                        </div>
                        <FormProvider {...methods}>
                            <form
                                className="flex flex-col w-[100%] bg-[#000]"
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >

                                <TextInputs name={"title"} label={"Name"} className="w-full p-2 border border-gray-300 rounded-lg" />
                                <input type="file" accept="image/*" {...methods.register("image")} />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Add Category
                                </button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;


// const [editModalOpen, setEditModalOpen] = useState(false);
// const [selectedCategory, setSelectedCategory] = useState(null);
// const [updatedTitle, setUpdatedTitle] = useState("");
// const [updatedImage, setUpdatedImage] = useState(null);

//   // Open Edit Modal
//   const openEditModal = (category) => {
//     setSelectedCategory(category._id);
//     setUpdatedTitle(category.title);
//     setUpdatedImage(category.image)
//     setEditModalOpen(true);
// };

// // Close Modal
// const closeEditModal = () => {
//     setEditModalOpen(false);
//     setSelectedCategory(null);
// };

{/* {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                        <form onSubmit={handleUpdateCategory}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">Upload New Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setUpdatedImage(e.target.files[0])}
                                    className="w-full p-3 rounded-lg border border-gray-300"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="bg-gray-500  px-4 py-2 rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}