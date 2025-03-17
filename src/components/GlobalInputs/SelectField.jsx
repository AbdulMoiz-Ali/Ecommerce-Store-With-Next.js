import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import SelectModal from "../../shared/form/Select";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";

const SelectField = ({
  placeholder,
  options,
  name,
  required,
  validationError,
  label,
  value,
  setValue,
  width,
  title,
  height,
  top,
  bottom,
  right,
  left,
  className,
  onChange,
  bgcolour = "bg-[var(--dark-bg)]",
  restValidations,
  optionKey = "option",
  iconKey = "icon",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={`flex flex-col gap-2  ${className} relative h-[fit-content]`}
    >
      {label && (
        <p className="text-sm  text-[#fff] !font-[300]">
          {label}
          {/* {required && <span className="text-red-500 ml-1">*</span>} */}
        </p>
      )}
      <p className="text-[#ccc9c9] text-[16px]">{title}</p>
      <div
        className={`flex items-center justify-between p-2 rounded-sm  h-[fit-content] cursor-pointer`}
        style={{
          width: width,
          height: height,
          backgroundColor: bgcolour,
          zIndex: 100000,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          readOnly
          value={value}
          placeholder={placeholder}
          className="text-[#ccc9c9] border-none outline-none cursor-pointer !font-[300]"
          {...register(name, {
            required: required && `${validationError}`,
            ...(restValidations && {
              ...restValidations,
            }),
          })}
        />
        <span>
          <ChevronDown
            size={28}
            className={`text-[var(--primary)] ${
              isOpen && "rotate-180"
            } transition-all duration-200`}
          />
        </span>
      </div>
      {isOpen && (
        <SelectModal
          options={options}
          selectedOption={value}
          setSelectedOption={setValue}
          setModalState={setIsOpen}
          bottom={bottom}
          left={left}
          right={right}
          top={top}
          optionKey={optionKey ? optionKey : ""}
          iconKey={iconKey ? iconKey : ""}
          onClick={onChange}
          placeholder={placeholder}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectField;
