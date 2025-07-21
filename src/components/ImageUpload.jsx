import { uploadToBlob } from "@/utils/uploadToBlob";
import React from "react";

const ImageUpload = ({value, returnUrl}) => {
  const handleImageUpload =async (e) => {
    const file=e.target.files[0];
    const {url}=await uploadToBlob(file);
    returnUrl(url);
  };
  return (
    <div>
      <label>
        <div className=" py-5 border-2 border-dashed px-5 flex justify-center items-center text-lg cursor-pointer">
          Upload Image
        </div>
        <input type="file" onChange={handleImageUpload} hidden />
      </label>
    </div>
  );
};

export default ImageUpload;
