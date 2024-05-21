import React from "react";
import Modal from "react-modal";
import { useModal } from "../../context/ModalContext";

Modal.setAppElement("#root");

const DynamicModal = () => {
  const { isModalOpen, closeModal, confirmModal, modalTitle, modalContent } = useModal();

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={modalTitle}
      className="fixed inset-0 flex items-center justify-center z-50 raleway-font"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-grayC border border-graydark shadow-lg p-6 w-full max-w-md">
        <h2 className="text-center text-lg font-semibold mb-4">{modalTitle}</h2>
        <div className="text-center font-normal">{modalContent}</div>
        <div className="flex justify-around gap-4 mt-4">
          <button
            className="flex items-center gap-2 border border-graydark py-2 px-6 text-sm text-black hover:shadow-lg hover:bg-gray-400 transition duration-200"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="flex items-center border border-graydark gap-2 bg-foxColor py-2 px-6 text-sm text-white hover:bg-foxColorHover transition duration-200"
            onClick={confirmModal}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DynamicModal;




