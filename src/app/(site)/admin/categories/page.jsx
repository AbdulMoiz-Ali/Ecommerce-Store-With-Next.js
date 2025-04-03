"use client";

import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { GiTireIronCross } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";
import TextInputs from "./../../../../components/GlobalInputs/TextInputs"
import { useCreateCategoryMutation, useGetCategoriesQuery, useEditCategoryMutation, useDeleteCategoryMutation } from "@/redux/features/apiSlice";
import FileInput from "@/components/GlobalInputs/FileInputs";

const AdminCategories = () => {
    const [filteredCategories, setFilteredCategories] = useState([]);
    const methods = useForm();
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [createCategory] = useCreateCategoryMutation(); // Create category mutation
    const [editCategory] = useEditCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation();
    const { data, isLoading, error, refetch } = useGetCategoriesQuery(); // ✅ Fetch categories
    const { handleSubmit, control } = useForm();

    useEffect(() => {
        if (data?.categories) {
            const sortedCategories = [...data.categories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFilteredCategories(sortedCategories);
        }
    }, [data]);

   // create catagaries funcation
//    const onSubmit = async (data) => {
//     setLoading(true);
//     setSuccess(false);
//     try {
//         const reader = new FileReader();
//         reader.readAsDataURL(data.image[0]); // Convert image to Base64
//         reader.onloadend = async () => {
//             await createCategory({ title: data.title, image: reader.result }).unwrap();
//             methods.reset();
//             // setIsOpen(false);
//             setLoading(false);
//             setSuccess(true);

//             // ✅ Hide check mark after 2 seconds
//             setTimeout(() => {
//                 setSuccess(false);
//                 setIsOpen(false);
//             }, 2000);
//             refetch()
//         };
//     } catch (error) {
//         console.error("Error creating category:", error);
//         setLoading(false);
//     }
// };

    // create catagaries funcation
    const onSubmit = async (data) => {
        setLoading(true);
        setSuccess(false);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(data.image[0]); // Convert image to Base64
            reader.onloadend = async () => {
                // await createCategory({ title: data.title, image: reader.result }).unwrap();
                const categoryData = { title: data.title, image: reader.result };
              
                if (editMode) {
                    console.log(...categoryData)
                    // ✅ Edit Category API Call
                    await editCategory({ id: editCategoryId, ...categoryData }).unwrap();
                    
                    debugger 
                } else {
                    // ✅ Create Category API Call
                    await createCategory(categoryData).unwrap();
                }

                methods.reset();
                // setIsOpen(false);
                setLoading(false);
                setSuccess(true);

                // ✅ Hide check mark after 2 seconds
                setTimeout(() => {
                    setSuccess(false);
                    setIsOpen(false);
                    setEditMode(false);
                    setEditCategoryId(null);
                }, 2000);
                refetch()
            };
        } catch (error) {
            console.error("Error creating category:", error);
            setLoading(false);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await deleteCategory(id).unwrap();
                refetch();
                alert("Category deleted successfully!");
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Error deleting category!");
            }
        }
    };

    // Handle Edit Button Click
    const handleEdit = (category) => {
        methods.setValue("title", category.title);
        setEditCategoryId(category._id);
        setEditMode(true);
        setIsOpen(true);
    };
    // handelSearch Funcation
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data?.categories
            ?.filter((category) => category.title?.toLowerCase().includes(query))
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting latest first

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
                        // onClick={toggleModal}
                        onClick={() => {
                            setEditMode(false);
                            methods.reset();
                            setIsOpen(true);
                        }}
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
                            {isLoading ? (
                                // ✅ Skeleton Loader (Show when loading)
                                [...Array(5)].map((_, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <Skeleton width={64} height={64} borderRadius={8} />
                                        </td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <Skeleton width={120} />
                                        </td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <Skeleton width={100} />
                                        </td>
                                        <td className="border-b border-gray-300 p-4 text-gray-700">
                                            <Skeleton width={80} />
                                        </td>
                                    </tr>
                                ))
                            ) : filteredCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center w-full p-6 text-gray-500 border-b border-gray-300">
                                        No results.
                                    </td>
                                </tr>
                            ) : (
                                // ✅ Actual Data (Show when loaded)
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
                                            <button onClick={() => handleEdit(category)} className="text-green-dark px-4 py-2 rounded-lg hover:bg-blue-700 mr-2">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(category._id)} className="text-red-dark rounded-lg hover:bg-red-700">
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.4)] bg-opacity-10"
                    onClick={toggleModal}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md border-2 border-[#000]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {loading ? (
                            <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg animate-fade-in">
                                <span className="animate-spin text-3xl text-blue-500">
                                    <AiOutlineLoading3Quarters />
                                </span>
                                <p className="mt-3 text-gray-700">Creating Category...</p>
                            </div>
                        ) : success ? (
                            <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg animate-fade-in">
                                <span className="text-3xl text-green-500">
                                    <AiOutlineCheck />
                                </span>
                                <p className="mt-3 text-green-700">Category Created Successfully!</p>
                            </div>
                        ) : (
                            <>
                                <div className="w-full flex px-2 justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">{editMode ? "Edit Category" : "Add New Category"}</h3>
                                    <GiTireIronCross className="pointer-cursore" onClick={toggleModal} />
                                </div>
                                <FormProvider {...methods}>
                                    <form
                                        className="flex flex-col w-[100%] bg-[#fff] gap-3"
                                        onSubmit={methods.handleSubmit(onSubmit)}
                                    >
                                        <TextInputs required={true} validationError={"Title is required"} bgcolour={"#fff"} name={"title"} label={"Name"} className="w-full p-2 rounded-lg text-black" />
                                        <FileInput required={true} validationErrors={"Image is required"} maxFileSize={"1mb"} labelType="button" label="Image" accept={"image/*"} name={"image"} isAddDropZone={true} />
                                        <button
                                            disabled={loading} // Disable button when loading
                                            type="submit"
                                            className="w-full text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            {loading ? "Processing..." : editMode ? "Update Category" : "Add Category"}
                                        </button>
                                    </form>
                                </FormProvider>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminCategories;