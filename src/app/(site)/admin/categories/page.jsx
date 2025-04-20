"use client";

import React, { useEffect, useState } from "react"
import { useCreateCategoryMutation, useGetCategoriesQuery, useEditCategoryMutation, useDeleteCategoryMutation } from "@/redux/features/categoryApiApi";
import CreateEditModal from "../../../../components/Admin/Catagarie/CreateEditModal"
import DeleteModal from "../../../../components/Admin/Catagarie/DeleteModal"
import CategoriesRender from "../../../../components/Admin/Catagarie/CategoriesRender"
import { useForm } from "react-hook-form";

const AdminCategories = () => {
    const [filteredCategories, setFilteredCategories] = useState([]);
    const methods = useForm();
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
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

    // create or edit categories function
    const onSubmit = async (data) => {
        setLoading(true);
        setSuccess(false);
        try {

            if (editMode) {
                // Edit Category logic
                let updatedData = { title: data.title };

                // Only process image if it exists and is a File object
                if (data.image && data.image.length > 0 && data.image[0]) {

                    const reader = new FileReader();
                    reader.readAsDataURL(data.image[0]); // Convert image to Base64

                    reader.onloadend = async () => {
                        updatedData.image = reader.result;

                        // Call edit API with image
                        await editCategory({
                            id: editCategoryId,
                            updatedData: updatedData,
                        }).unwrap();

                        handleSubmitSuccess();
                    };
                } else {
                    // Include the existing image when no new image is provided
                    const existingCategory = filteredCategories.find(cat => cat._id === editCategoryId);
                    if (existingCategory && existingCategory.image) {
                        updatedData.image = existingCategory.image;
                    }

                    // Call edit API with the existing image
                    await editCategory({
                        id: editCategoryId,
                        updatedData: updatedData,
                    }).unwrap();

                    handleSubmitSuccess();
                }
            } else {
                // Create Category logic - image is required
                const reader = new FileReader();
                reader.readAsDataURL(data.image[0]); // Convert image to Base64

                reader.onloadend = async () => {
                    await createCategory({
                        title: data.title,
                        image: reader.result
                    }).unwrap();

                    handleSubmitSuccess();
                };
            }
        } catch (error) {
            console.error("Error with category operation:", error);
            setLoading(false);
        }
    };

    // Handle success for both create and edit operations
    const handleSubmitSuccess = () => {
        methods.reset();
        setLoading(false);
        setSuccess(true);

        // Hide check mark after 2 seconds
        setTimeout(() => {
            setSuccess(false);
            setIsOpen(false);
            setEditMode(false);
            setEditCategoryId(null);
        }, 2000);
        refetch();
    };

    // Open delete confirmation modal
    const openDeleteModal = (category) => {
        setCategoryToDelete(category);
        setDeleteModalOpen(true);
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteLoading(false);
        setDeleteSuccess(false);
        setTimeout(() => {
            setCategoryToDelete(null);
        }, 300);
    };

    // Actually perform the delete after confirmation
    const confirmDelete = async () => {
        if (!categoryToDelete) return;

        try {
            setDeleteLoading(true);
            await deleteCategory(categoryToDelete._id).unwrap();
            setDeleteLoading(false);
            setDeleteSuccess(true);

            // Show success for 1.5 seconds then close the modal and refresh
            setTimeout(() => {
                closeDeleteModal();
                refetch();
            }, 1500);
        } catch (error) {
            console.error("Delete Error:", error);
            setDeleteLoading(false);
        }
    };

    // Handle Edit Button Click
    const handleEdit = (category) => {
        methods.setValue("title", category.title);
        // Don't set the image value - it will be optional during edit
        setEditCategoryId(category._id);
        setEditMode(true);
        setIsOpen(true);
    };

    // handleSearch Function
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
                <CategoriesRender
                    categories={filteredCategories}
                    isLoading={isLoading}
                    handleEdit={handleEdit}
                    openDeleteModal={openDeleteModal}
                />
            </div>

            {/* Create/Edit Modal */}
            {isOpen && (
                <CreateEditModal editMode={editMode} loading={loading} success={success} methods={methods} onSubmit={onSubmit} toggleModal={toggleModal} />
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && categoryToDelete && (
                <DeleteModal closeDeleteModal={closeDeleteModal} confirmDelete={confirmDelete} deleteLoading={deleteLoading} deleteSuccess={deleteSuccess} categoryToDelete={categoryToDelete} />
            )}
        </div>
    );
};

export default AdminCategories;