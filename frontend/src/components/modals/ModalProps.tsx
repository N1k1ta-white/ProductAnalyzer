
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const ModalProps: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-20">
            <div className={`${className} bg-white p-6 rounded-lg shadow-lg w-96 relative z-20`}>
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    ✖
                </button>
                {children}
            </div>
        </div>

    );
};

export default ModalProps;
