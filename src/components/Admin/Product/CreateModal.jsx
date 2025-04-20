import React from "react";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { GiTireIronCross } from "react-icons/gi";
import { FormProvider, useFieldArray } from "react-hook-form";
import TextInputs from "../../GlobalInputs/TextInputs"
import FileInput from "../../GlobalInputs/FileInputs";
import VariationGroup from "./VariationGroup"

const CreateModal = ({ editMode, toggleModal, onSubmit, methods, loading, success, control, register }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "description",
    });
    const { fields: additionalFields, append: addAdditional, remove: removeAdditional } = useFieldArray({
        control,
        name: "additionalInfo",
    });
    // Inside your CreateModal component
    // For variations
    const { fields: variations, append: appendVariation, remove: removeVariation } = useFieldArray({
        control,
        name: "variations",
    });
    return (
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.4)] bg-opacity-10"
                onClick={toggleModal}
            >
                <div
                    className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-[80%] border-2 border-[#000] h-[80%] overflow-y-auto
                    "
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* {loading ? (
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
                    ) : ( */}
                    <>
                        <div className="w-full flex px-2 justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">{editMode ? "Edit Category" : "Add New Category"}</h3>
                            <GiTireIronCross className="pointer-cursore cursor-pointer" onClick={toggleModal} />
                        </div>
                        <FormProvider {...methods}>
                            <form
                                className="flex flex-col w-[100%] bg-[#fff] gap-3 overflow-y-auto"
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >
                                <TextInputs
                                    required={true}
                                    validationError={"Product Name is required"}
                                    bgcolour={"#fff"}
                                    name={"name"}
                                    label={"Product Name"}
                                    placeholder={"iPhone 14 Plus"}
                                    className="w-full p-2 rounded-lg text-black"
                                />

                                <TextInputs
                                    required={true}
                                    validationError={"Price is required"}
                                    bgcolour={"#fff"}
                                    name={"price"}
                                    label={"Product price"}
                                    placeholder={"899"}
                                    className="w-full p-2 rounded-lg text-black"
                                />

                                <TextInputs
                                    required={false}
                                    bgcolour={"#fff"}
                                    name={"discount"}
                                    label={"Discount in percentage"}
                                    placeholder={"10%"}
                                    className="w-full p-2 rounded-lg text-black"
                                    type="number"
                                />

                                <FileInput
                                    required={true}
                                    validationErrors={"Images is required"}
                                    maxFileSize={"1mb"}
                                    labelType="button"
                                    label={"Image"}
                                    accept={"image/*"}
                                    name={"image"}
                                    isAddDropZone={true}
                                />

                                {fields.map((item, index) => (
                                    <div key={item.id} className="flex flex-col gap-2 border border-gray-300 p-2 rounded-lg mb-1">
                                        <input
                                            {...register(`description.${index}.heading`, { required: "Heading is required" })}
                                            placeholder="Heading (e.g. Specifications)"
                                            className="p-2 border rounded"
                                        />
                                        <textarea
                                            {...register(`description.${index}.details`, { required: "Details are required" })}
                                            placeholder="Details (e.g. Clean with dry cloth...)"
                                            className="p-2 border rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-600 hover:underline self-end"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => append({ heading: "", details: "" })}
                                    className="text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    + Add Description
                                </button>

                                <h4 className="text-md font-semibold mt-4">Additional Info</h4>
                                {additionalFields.map((item, index) => (
                                    <div key={item.id} className="flex gap-2 mb-2 items-center">
                                        <input
                                            {...register(`additionalInfo.${index}.key`, { required: true })}
                                            placeholder="Key (e.g. Brand)"
                                            className="w-1/2 p-2 border rounded"
                                        />
                                        <input
                                            {...register(`additionalInfo.${index}.value`, { required: true })}
                                            placeholder="Value (e.g. Apple)"
                                            className="w-1/2 p-2 border rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeAdditional(index)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addAdditional({ key: "", value: "" })}
                                    className="text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    + Add Info
                                </button>


                                <div className="flex flex-col gap-1">
                                    <label className="font-medium text-gray-800">Selection Mode</label>
                                    <select
                                        {...methods.register("selectionMode")}
                                        className="p-2 border rounded bg-white text-black"
                                        defaultValue="auto"
                                    >
                                        <option value="auto">Auto</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>


                                <div className="flex flex-col gap-4 border border-gray-300 p-3 rounded-lg">
                                    <h4 className="text-lg font-semibold text-gray-700">Variations</h4>

                                    {variations.map((variation, index) => (
                                        <VariationGroup key={variation.id} index={index} removeVariation={removeVariation} />
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => appendVariation({ attribute: "", options: [""] })}
                                        className="text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        + Add Variation Group
                                    </button>
                                </div>

                                {/* {editMode && ( <p className="text-gray-500 text-sm italic">
                                            Leave the image field empty if you don't want to change the image.
                                        </p>
                                       
                                    )} */}

                                <button
                                    // disabled={loading} // Disable button when loading
                                    type="submit"
                                    className="w-full text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    {/* {loading ? "Processing..." : editMode ? "Update Category" : "Add Category"} */}
                                    Add products
                                </button>
                            </form>
                        </FormProvider>
                    </>
                    {/* )} */}
                </div>
            </div>
        </>
    )
}

export default CreateModal