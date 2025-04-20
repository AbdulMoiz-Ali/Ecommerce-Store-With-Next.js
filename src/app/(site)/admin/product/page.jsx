"use client"


import TextInputs from "@/components/GlobalInputs/TextInputs";
import FileInput from "@/components/GlobalInputs/FileInputs";
import React, { useEffect, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";
import CreateModal from "../../../../components/Admin/Product/CreateModal"

const AdminProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const methods = useForm();


    const methods = useForm({
        defaultValues: {
            name: "",
            price: "",
            discount: "",
            image: [],
            description: [{ heading: "", details: "" }]
        }
    });


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const { handleSubmit, control, register } = methods;

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

                    {/* Modal */}
                    {isOpen && (
                        <CreateModal
                            editMode={false}
                            loading={false}
                            success={false}
                            methods={methods}
                            onSubmit={onSubmit}
                            toggleModal={toggleModal}
                            control={control}
                            register={register}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminProduct