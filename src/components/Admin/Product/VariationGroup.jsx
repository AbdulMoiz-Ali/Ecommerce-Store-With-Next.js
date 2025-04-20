// VariationGroup.jsx
import { useFieldArray, useFormContext } from "react-hook-form";

const VariationGroup = ({ index, removeVariation }) => {
    const { control, register } = useFormContext();
    const optionName = `variations.${index}.options`;

    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: optionName,
    });

    return (
        <div className="border p-3 rounded shadow-sm flex flex-col gap-3">
            <input
                {...register(`variations.${index}.attribute`, { required: "Attribute name is required" })}
                placeholder="Attribute (e.g. Color)"
                className="p-2 border rounded"
            />

            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600">Options</p>
                {optionFields.map((option, optIndex) => (
                    <div key={option.id} className="flex gap-2 items-center">
                        <input
                            {...register(`${optionName}.${optIndex}`)}
                            placeholder="Option (e.g. Red)"
                            className="p-2 border rounded w-full"
                        />
                        <button
                            type="button"
                            onClick={() => removeOption(optIndex)}
                            className="text-red-500 hover:underline text-sm"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => appendOption("")}
                    className="text-white bg-gray-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Add Option
                </button>
            </div>

            <button
                type="button"
                onClick={() => removeVariation(index)}
                className="text-red-600 hover:underline text-sm self-end"
            >
                Remove Variation
            </button>
        </div>
    );
};

export default VariationGroup;
