import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoriesRender = ({ categories = [], isLoading, handleEdit, openDeleteModal }) => {
    return (
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
                    ) : categories.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center w-full p-6 text-gray-500 border-b border-gray-300">
                                No results.
                            </td>
                        </tr>
                    ) : (
                        categories.map((category) => (
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
                                        onClick={() => handleEdit(category)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(category)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
    );
};


export default CategoriesRender