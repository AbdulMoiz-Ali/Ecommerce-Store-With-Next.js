"use client";
// import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// import { useValidContext, ValidContext } from "../../../context/validCtx";
// import { useDispatch } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setErrorOpen } from "@/redux/features/validSlice";
// import image from "../../../../../public/images/icons/icon-star.svg"
// import {
//   deleteFile,
//   uploadFile,
// } from "../../../store/slices/MobilePreviewSlice";
// import OutlinePlusButton from "../OutlinePlusButton";

const convertToBytes = (sizeString) => {
  const match = sizeString.match(/^(\d+)([a-zA-Z]+)$/);
  if (!match) return 0;

  const size = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "b":
      return size;
    case "kb":
      return size * 1024;
    case "mb":
      return size * 1024 * 1024;
    case "gb":
      return size * 1024 * 1024 * 1024;
    default:
      return 0;
  }
};

const FileInput = ({
  label = "",
  accept,
  required,
  name,
  validationErrors,
  acceptedFileType,
  maxFileSize,
  onChange = "",
  imageUploaderIcon,
  showMaximumSizeLabel = true,
  labelType = "button",
  isAddDropZone = false,
  multiple = false,
  className,
  alignMaxiumFileLabel = "center",
  isRemoveUploadedFile = false,
  removeFile,
  labelbutton
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    setError,
  } = useFormContext();
  const dispatch = useDispatch();
  const maxSizeInBytes = maxFileSize ? convertToBytes(maxFileSize) : 0;
  const [addFile, setAddFile] = useState([]);
  const [dragging, setDragging] = useState(false);
  // const { isErrorOpen, SetErrorOpen } = useValidContext(ValidContext);

  const handleFileChange = (event) => {
    const file = event?.target?.files;
    const newFiles = [...addFile, file[0]];
    setAddFile(newFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleFileValidation = () => {
    const file = addFile;
    if (required && !file.length > 0) return `${validationErrors}`;
    const fileType = file[0]?.type;
    if (
      acceptedFileType &&
      !acceptedFileType.includes(fileType) &&
      !acceptedFileType?.includes("*")
    )
      return `Only ${acceptedFileType?.join(" , ")} files are allowed`;
    if (maxSizeInBytes && file[0].size > maxSizeInBytes)
      return `File size must be less than ${maxSizeInBytes / (1024 * 1024)} MB`;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event?.dataTransfer?.files;
    // dispatch(uploadFile(file[0], name));
    const newFiles = [...addFile, file[0]];
    setAddFile(newFiles);
    onChange && onChange(newFiles);
    setValue(name, newFiles);
  };

  const fileUploader = (event) => {
    const file = event?.target?.files;
    const newFiles = [...addFile, file[0]];
    setAddFile(newFiles);
    onChange && onChange(newFiles);
    setValue(name, newFiles);
  };

  useEffect(() => {
    if (errors[name]?.message) {
      dispatch(setErrorOpen(true));
    } else {
      return;
    }
    console.log(errors[name]?.message);
  }, [errors[name]?.message]);

  const handleFileRemoval = (file) => {
    const updatedFiles = addFile.filter((item) => item?.name !== file?.name);
    setAddFile(updatedFiles);
    setValue(name, updatedFiles)
    // dispatch(deleteFile(file?.name, name));
  };
  useEffect(() => {
    if (isRemoveUploadedFile) {
      console.log(removeFile);
      handleFileRemoval(removeFile);
      setTimeout(() => {
        SetErrorOpen(false);
      }, 100);
    }
  }, [removeFile]);
  return (
    <div className="flex flex-col w-[100%]">
      <div
        className={` ${isAddDropZone &&
          " w-[100%] mx-auto rounded-lg p-8 flex flex-col items-center justify-center border border-[4px] border-dotted border-[#000]"
          }`}
        {...(isAddDropZone
          ? {
            onDragOver: (e) => handleDragOver(e),
            onDragLeave: (e) => handleDragLeave(e),
            onDrop: (e) => handleDrop(e),
          }
          : {})}
      >
        <div>
          <label
            htmlFor={name}
            className="flex items-center cursor-pointer gap-2 transition-colors w-[fit-content]"
          >
            {labelType !== "button" ? (
              <img src={imageUploaderIcon} />
            ) : labelbutton ?
              (
                <span
                  onClick={() => document.getElementById(name)?.click()} // Simulate a click on the input

                >
                  {/* <OutlinePlusButton title={labelbutton} /> */}
                  {labelbutton}
                </span>

              )
              : (
                <span className="flex items-center cursor-pointer gap-2 bg-gray-6 font-semibold text-white px-6 py-2 rounded-md">
                  {/* <Upload className="w-4 h-4" /> */}
                  Upload {label}
                </span>
              )
            }
          </label>
          <input
            type="file"
            accept={accept}
            id={name}
            {...register(name, {
              validate: handleFileValidation,
              onChange: (event) => {
                // dispatch(uploadFile(event?.target?.files[0], name));
                if (event.target?.files?.length < 1) {
                  setError(name, {
                    type: "manual",
                    message: `${validationErrors}.`,
                  });
                } else {
                  setError(name, {
                    type: "manual",
                    message: "",
                  });
                }
                fileUploader(event);
              },
            })}
            className={`input-feild-dark hidden`}
          />
          {showMaximumSizeLabel && maxFileSize && (
            <p
              className={`text-sm text-gray-300 mt-2 !font-[300]`}
              style={{ textAlign: alignMaxiumFileLabel }}
            >
              Maximum size: {maxFileSize}
            </p>
          )}
        </div>
      </div>
      {errors && errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FileInput;
