"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/features/categorySlice";

const AdminCategories = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.category);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedImage, setUpdatedImage] = useState(null);



    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!title || !image) {
            console.error("Please provide a title and image");
            return;
        }

        // Convert Image to Base64
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        try {
            const base64Image = await convertToBase64(image); // Convert file to Base64

            const response = await axios.post("/api/category/Createcategories", {
                title,
                image: base64Image, // Send image as Base64 string
            });

            if (response.data.success) {
                console.log("Category added successfully");
                fetchCategories();
                setTitle("");
                setImage(null);
            }
        } catch (error) {
            console.error("Failed to add category:", error.response?.data || error.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!id) {
            console.error("Category ID is required");
            return;
        }

        try {
            const response = await axios.delete(`/api/category/${id}`);

            if (response.data.success) {
                console.log("Category deleted successfully");
                fetchCategories(); // Refresh data
            }
        } catch (error) {
            console.error("Failed to delete category:", error.response?.data || error.message);
        }
    };

    // Open Edit Modal
    const openEditModal = (category) => {
        setSelectedCategory(category._id);
        setUpdatedTitle(category.title);
        setUpdatedImage(category.image)
        setEditModalOpen(true);
    };

    // Close Modal
    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedCategory(null);
    };


    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        if (!selectedCategory || !updatedTitle || !updatedImage) {
            console.error("ID, Title, and Image are required", selectedCategory, updatedTitle, updatedImage);
            return;
        }

        // Convert Image to Base64
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        try {
            const base64Image = await convertToBase64(updatedImage);

            const response = await axios.put(`/api/category/${selectedCategory}`, {
                title: updatedTitle,
                image: base64Image, // Send image as Base64
            });

            if (response.data.success) {
                console.log("Category updated successfully");
                fetchCategories(); // Refresh data
            }
        } catch (error) {
            console.error("Failed to update category:", error.response?.data || error.message);
        }
    };


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = categories.filter((category) =>
            category.title.toLowerCase().includes(query)
        );

        setFilteredCategories(filtered);
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
                                        className="text-center p-6 text-gray-500 border-b border-gray-300"
                                    >
                                        No results.
                                    </td>
                                </tr>
                            ) : (
                                filteredCategories.map((category) => (
                                    <tr key={category._id} className="hover:bg-gray-100">
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <img
                                                src={category.image}
                                                alt={category.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">{category.title}</td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            {new Date(category.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <button
                                                onClick={() => openEditModal(category)}
                                                className="text-green-dark  px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category._id)}
                                                className="text-red-dark  rounded-lg hover:bg-red-700"
                                            >
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
                        <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
                        <form className="mt-4" onSubmit={handleAddCategory}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => {
                                        if (e.target.files.length > 0) {
                                            console.log("Selected File:", e.target.files[0]); // Debugging
                                            setImage(e.target.files[0]);
                                        }
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Add Category
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* edit model */}

            {editModalOpen && (
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
            )}
        </div>
    );
};

export default AdminCategories;
