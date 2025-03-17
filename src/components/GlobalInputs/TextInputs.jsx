import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// import HideIcon from "../../../assets/svg/Hide.webp";
// import { useValidContext, ValidContext } from "../../../context/validCtx";
// import { IoEye } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import { setValues } from "../../../store/slices/MobilePreviewSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setErrorOpen } from "@/redux/features/validSlice";

const TextInputs = ({
  name,
  placeholder,
  type = "text",
  label,
  required = false,
  validationError,
  className,
  parentClassName,
  passwordInputStyles,
  restValidations,
  minLength,
  maxLength,
  disabled = false,
  height,
  pattern,
  onChange,
  isParentSetsError = false,
  InputlineHeight,
  bgcolour,
  value,
}) => {
  const {
    register,
    formState: { errors },
    setError,
  } = useFormContext();
  const [seePassword, setSeePassword] = useState(false);
  // const { isErrorOpen, SetErrorOpen } = useValidContext(ValidContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors[name]?.message) {
      console.log(errors);
      // SetErrorOpen(true);
      dispatch(setErrorOpen(true));
    } else {
      return;
    }
    console.log(errors[name]?.message);
  }, [errors[name]?.message]);
  return (
    <div className={`flex flex-col gap-1 my-3 w-full  ${parentClassName}`}>
      <div className="flex flex-col gap-2" style={passwordInputStyles}>
        {label && (
          <label htmlFor={name} className="text-white !font-[300] text-sm">
            {label} {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <input
            value={value}
            {...register(name, {
              required: required && `${validationError}`,
              ...(pattern && {
                pattern: {
                  value: pattern.pattern,
                  message: pattern.patternValidationMessage,
                },
              }),
              onChange: (event) => {
                // dispatch(setValues({ name: name, value: event.target.value }));
                isParentSetsError && onChange && onChange(event, setError);
                onChange && onChange(event);
              },
              ...(minLength && {
                minLength: {
                  value: minLength?.value,
                  message: minLength?.message,
                },
              }),
              ...restValidations,
            })}
            {...(maxLength && { maxLength: maxLength })}
            type={seePassword && type === "password" ? "text" : type}
            {...(maxLength && { maxLength: maxLength })}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            style={{ lineHeight: InputlineHeight || "normal" }}
            className={`w-full bg-[var(--darkest-bg)] h-[${height}]  px-3 border-none focus:outline focus:outline-[var(--primary)] transition-all py-3 rounded-md text-sm font-light bg-[${
              bgcolour ? bgcolour : "var(--darkest-bg)"
            }] text-[#fff] 
              ${errors[name] ? "border-red-500" : "border-gray-300"} 
              ${className}`}
          />
          {/* {type === "password" &
          & (
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setSeePassword(!seePassword)}
            >
              <img src={HideIcon} alt="Toggle Password" />
            </span>
          )} */}
        </div>
      </div>
      {errors[name] && (
        <span className="text-sm text-red-500">
          {errors[name]?.message || errors[name]?.pattern?.message}
        </span>
      )}
    </div>
  );
};

export default TextInputs;
