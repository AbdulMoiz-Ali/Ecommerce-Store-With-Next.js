import React from "react";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { GiTireIronCross } from "react-icons/gi";

const DeleteModal = ({ closeDeleteModal, deleteLoading, deleteSuccess, confirmDelete ,categoryToDelete}) => {
    return (
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.4)] bg-opacity-10"
                onClick={closeDeleteModal}
            >
                <div
                    className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md border-2 border-[#000]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {deleteLoading ? (
                        <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg animate-fade-in">
                            <span className="animate-spin text-3xl text-red-500">
                                <AiOutlineLoading3Quarters />
                            </span>
                            <p className="mt-3 text-gray-700">Deleting Category...</p>
                        </div>
                    ) : deleteSuccess ? (
                        <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg animate-fade-in">
                            <span className="text-3xl text-green-500">
                                <AiOutlineCheck />
                            </span>
                            <p className="mt-3 text-green-700">Category Deleted Successfully!</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-full flex px-2 justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Delete Category</h3>
                                <GiTireIronCross className="pointer-cursore cursor-pointer" onClick={closeDeleteModal} />
                            </div>
                            <div className="text-center mb-6">
                                <p className="text-gray-700 mb-3">
                                    Are you sure you want to delete the category "{categoryToDelete.title}"?
                                </p>
                                <p className="text-gray-500 text-sm">
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={closeDeleteModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg bg-red-dark"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default DeleteModal