import React from 'react';

function Modal({ isOpen, onClose, children, className = 'max-w-md w-full' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className={`bg-white rounded-lg shadow-xl ${className} mx-4 relative`}>
                {/* Botão de fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                    ×
                </button>

                {/* Conteúdo do modal */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
