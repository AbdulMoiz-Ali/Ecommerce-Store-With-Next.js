import { ChevronDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import MultySelectModal from "./MultySelectModal";

const MultySelectField = ({
  label,
  required = false,
  name,
  validationError,
  selectedValues,
  onChange,
  placeholder,
  options,
  top,
  bottom,
  right,
  left,
}) => {
  const {
    register,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const removeOptionFromValue = (value) => {
    const index = selectedValues.findIndex((opt) => opt === value);
    selectedValues.splice(index, 1);
  };

  useEffect(() => {
    if (selectedValues.length > 0) {
      setValue(name, selectedValues); // Store as an array
      clearErrors(name);
    } else if (required) {
      setError(name, {
        type: "required",
        message: validationError || "Please select at least one value",
      });
    }
  }, [
    selectedValues,
    setValue,
    setError,
    clearErrors,
    name,
    required,
    validationError,
  ]);

  return (
    <div className="relative z-9 w-full">
      {/* Label */}
      {label && <p className="text-sm text-gray-400  !font-[500]">{label}</p>}

      {/* Dropdown Trigger */}
      <div
        className="flex items-center justify-between bg-[var(--darkest-bg)] w-full py-2 rounded-sm px-3 cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center z-24 overflow-auto max-h-12 flex-wrap gap-2">
          {selectedValues.length > 0 ? (
            selectedValues.map((opt, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-[var(--darker-bg)] rounded-md px-2 py-1 text-sm"
              >
                <span className="text-[#fff]">{opt}</span>
                <X
                  size={15}
                  color="var(--primary)"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOptionFromValue(opt);
                    onChange([...selectedValues]); // Trigger change
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
        </div>

        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={20} color="var(--primary)" />
        </span>
      </div>

      {/* Error Message */}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}

      {/* Dropdown Modal */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full">
          <MultySelectModal
            options={options}
            selectedOptions={selectedValues}
            onClick={onChange}
            bottom={bottom}
            top={top}
            right={right}
            left={left}
            setModalState={setIsOpen}
          />
        </div>
      )}
    </div>
  );
};

export default MultySelectField;
