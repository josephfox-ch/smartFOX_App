import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalWrapper = ({
  title,
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      title={title}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-white  shadow-lg p-6 w-full max-w-md">
        <h2 className="text-center text-lg font-semibold mb-4 p-2 rounded">
          {title}
        </h2>
        {children}
      </div>
    </Modal>
  );
};

export default ModalWrapper;
