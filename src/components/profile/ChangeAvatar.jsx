// File ChangeAvatar.js
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

const ChangeAvatar = ({ user, onSave, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 z-50">
      <h2 className="text-xl font-bold text-black mb-4">Thay đổi ảnh đại diện</h2>
      <div className="flex items-center mb-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-full">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt="Selected file" className="w-full h-full rounded-full object-cover" />
            ) : (
              <FaCamera size={24} />
            )}
          </div>
        </label>
      </div>
      <div className="flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2" onClick={handleSave}>Cập nhật</button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400" onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default ChangeAvatar;
