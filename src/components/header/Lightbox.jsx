import React, { useState } from 'react'
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

const Lightbox = ({ images, imageIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(imageIndex);
  
    const handleNext = () => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="relative">
          <img src={images[currentIndex].text} className="max-w-full max-h-full" />
          <button onClick={handlePrev} disabled={currentIndex === 0} className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <GrCaretPrevious />
          </button>
          <button onClick={handleNext} disabled={currentIndex === images.length - 1} className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <GrCaretNext />
          </button>
          <button onClick={onClose} className="absolute top-0 right-0 p-2 text-white">
          <IoMdClose />
          </button>
        </div>
      </div>
    );
  };
  

export default Lightbox
