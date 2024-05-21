import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [onConfirm, setOnConfirm] = useState(null);
  const [onCancel, setOnCancel] = useState(null);

  const openModal = ({ title, content, onConfirmAction, onCancelAction }) => {
    setModalTitle(title);
    setModalContent(content);
    setOnConfirm(() => onConfirmAction);
    setOnCancel(() => onCancelAction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
    setModalContent(null);
    setOnConfirm(null);
    setOnCancel(null);
  };

  const confirmModal = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  const cancelModal = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, confirmModal, cancelModal, modalTitle, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);



