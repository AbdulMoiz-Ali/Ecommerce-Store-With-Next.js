import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFiles } from "../../../store/slices/MobilePreviewSlice.js";
import OutlinePlusButton from "../OutlinePlusButton";

const VideoInputs = ({
  name,
  label,
  required = false,
  placeholder,
  disabled = false,
  className,
}) => {
  const [videoUrl, setVideoUrl] = useState(""); // State to store the video URL
  const [error, setError] = useState(""); // State for validation error
  const dispatch = useDispatch();

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)*(\.(mp4|mov|avi|mkv|webm|flv|wmv))|([a-zA-Z0-9-]+\.)+(youtu\.be|youtube\.com)(\/[^\s]*)?(\?[^\s]*)?$/i;
    return regex.test(url);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setVideoUrl(value);

    // if (value && !validateUrl(value)) {
    //   setError("Please enter a valid video URL.");
    // } else {
    //   setError(""); 
    // }
  };

  const handleAddVideo = () => {
    // if (videoUrl && !validateUrl(videoUrl)) {
    //   setError("Please enter a valid video URL.");
    //   return; 
    // }

    if (videoUrl) {
      dispatch(setFiles({ name, videoUrl }));
    }
  };

  return (
    <div className="flex flex-col gap-1 my-3 w-full">
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={name} className="text-white !font-[300] text-sm">
            {label} {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <input
            type="text"
            placeholder={placeholder}
            value={videoUrl}
            onChange={handleInputChange} 
            disabled={disabled}
            className={`w-full px-3 py-3 rounded-md text-sm font-light bg-darkest-bg text-white border-gray-300 ${className}`}
          />
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>

      <OutlinePlusButton
        title="Add video"
        onClick={handleAddVideo} 
        className="shrink-0 mt-8 grow-0"
        disabled={!!error || videoUrl === ""} 
      />
    </div>
  );
};

export default VideoInputs;
