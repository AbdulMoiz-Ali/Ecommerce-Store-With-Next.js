"use client"


import TextInputs from "@/components/GlobalInputs/TextInputs";
import FileInput from "@/components/GlobalInputs/FileInputs";
import React, { useEffect, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";

const AdminProduct = () => {


    const [Products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedImage, setUpdatedImage] = useState(null);
    const methods = useForm();

    // const handleSearch = (e) => {
    //     const query = e.target.value.toLowerCase();
    //     setSearchQuery(query);

    //     const filtered = Products.filter((category) =>
    //         category.title?.toLowerCase().includes(query)
    //     );

    //     setFilteredProducts(filtered);
    // };


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log("Form data ===>", data);
    };


    return (
        <>
            <div className="bg-gray-100 min-h-screen p-6 sm:mt-12 sm:ml-64">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Product</h1>
                        <button
                            className="bg-blue-600 text-white bg-gray-6 px-6 py-2 rounded-lg hover:bg-blue-700 shadow-lg"
                            onClick={toggleModal}
                        >
                            + Add Product
                        </button>
                    </div>
                    <p className="text-gray-600 mb-6">Manage Product for your store</p>
                    {/* <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full p-3 mb-6 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /> */}
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
                            {/* <tbody>
                                {Products.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="text-center w-full p-6 text-gray-500 border-b border-gray-300"
                                        >
                                            No results.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((products) => (
                                        <tr key={products._id} className="hover:bg-gray-100">
                                            <td className="border-b border-gray-300 p-4 text-gray-700">
                                                <img
                                                    src={products.image}
                                                    alt={products.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="border-b border-gray-300 p-4 text-gray-700">{products.title}</td>
                                            <td className="border-b border-gray-300 p-4 text-gray-700">
                                                {new Date(products.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="border-b border-gray-300 p-4 text-gray-700">
                                                <button
                                                    onClick={() => openEditModal(products)}
                                                    className="text-green-dark  px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(products._id)}
                                                    className="text-red-dark  rounded-lg hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody> */}
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
                            className="relative bg-black rounded-lg shadow-lg p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: "black"
                            }}
                        >
                            <div className="w-full flex px-2 justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">Add New products</h3>
                                <GiTireIronCross className="pointer-cursore" onClick={toggleModal} />
                            </div>

                            <FormProvider {...methods}>
                                <form
                                    className="flex flex-col w-[100%] bg-black"
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                >

                                    <TextInputs required={true} validationError={"Name is required"} name={"name"} label={"Name"} className="w-full p-2 border border-red-400 rounded-lg" />
                                    <FileInput required={true} validationError={"file is required"} accept={"*"} name={"image"} label="image" />
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Add Product
                                    </button>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default AdminProduct