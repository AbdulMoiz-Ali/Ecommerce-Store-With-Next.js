import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageInputCropper = ({ onCropComplete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImage = () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) return;

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { x, y, width, height } = completedCrop;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(
      image,
      x, y, width, height,
      0, 0, width, height
    );

    const croppedImageUrl = canvas.toDataURL("image/png");
    onCropComplete(croppedImageUrl);
  };

  return (
    <div className="bg-[var(--dark-bg)]" style={{ textAlign: "center" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      { selectedImage && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1} // Square cropping
          >
            <img ref={imgRef} src={selectedImage} alt="Crop preview" />
          </ReactCrop>

          <div className="btn btn-primary w-[200px] mx-auto my-2" onClick={getCroppedImage}>Crop Image</div>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
};

export default ImageInputCropper;
