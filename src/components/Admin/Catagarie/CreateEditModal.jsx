import React from "react";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { GiTireIronCross } from "react-icons/gi";
import { FormProvider } from "react-hook-form";
import TextInputs from "./../../GlobalInputs/TextInputs"
import FileInput from "./../../GlobalInputs/FileInputs";

const CreateEditModal = ({ editMode, toggleModal, onSubmit, methods, loading, success }) => {

    return (
        <>
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
                            <p className="mt-3 text-gray-700">{editMode ? "Updating Category..." : "Creating Category..."}</p>
                        </div>
                    ) : success ? (
                        <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg animate-fade-in">
                            <span className="text-3xl text-green-500">
                                <AiOutlineCheck />
                            </span>
                            <p className="mt-3 text-green-700">{editMode ? "Category Updated Successfully!" : "Category Created Successfully!"}</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-full flex px-2 justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">{editMode ? "Edit Category" : "Add New Category"}</h3>
                                <GiTireIronCross className="pointer-cursore cursor-pointer" onClick={toggleModal} />
                            </div>
                            <FormProvider {...methods}>
                                <form
                                    className="flex flex-col w-[100%] bg-[#fff] gap-3"
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                >
                                    <TextInputs
                                        required={true}
                                        validationError={"Title is required"}
                                        bgcolour={"#fff"}
                                        name={"title"}
                                        label={"Name"}
                                        className="w-full p-2 rounded-lg text-black"
                                    />

                                    <FileInput
                                        required={editMode ? false : true}
                                        validationErrors={editMode ? "" : "Image is required"}
                                        maxFileSize={"1mb"}
                                        labelType="button"
                                        label={editMode ? "Change Image (Optional)" : "Image"}
                                        accept={"image/*"}
                                        name={"image"}
                                        isAddDropZone={true}
                                    />

                                    {editMode && (
                                        <p className="text-gray-500 text-sm italic">
                                            Leave the image field empty if you don't want to change the image.
                                        </p>
                                    )}

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
        </>
    )
}

export default CreateEditModal