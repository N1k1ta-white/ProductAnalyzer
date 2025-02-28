import React from "react";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const ModalError: React.FC<ModalErrorProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-bold">{title || "Error"}</h2>
        <p className="mt-2">{message || "Something went wrong."}</p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalError;
