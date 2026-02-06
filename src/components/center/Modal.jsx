import React from 'react';

function Modal({ isOpen, onClose, children, className = 'max-w-md w-full' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className={`bg-white rounded-lg shadow-2xl ${className} relative`} onClick={(e) => e.stopPropagation()}>
                {/* Botão de fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none z-10"
                >
                    ×
                </button>

                {/* Conteúdo do modal */}
                <div className="p-6 h-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
