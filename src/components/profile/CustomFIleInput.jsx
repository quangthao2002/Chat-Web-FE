import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

const CustomFileInput = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
          {selectedFile ? (
            <img src={selectedFile} alt="Selected file" className="w-full h-full rounded-full object-cover" />
          ) : (
            <FaCamera size={25} />
          )}
        </div>
      </label>
    </div>
  );
};

export default CustomFileInput;
