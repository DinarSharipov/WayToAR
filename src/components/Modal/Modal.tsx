import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 text-slate-500">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 border-1 border-slate-200">
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
