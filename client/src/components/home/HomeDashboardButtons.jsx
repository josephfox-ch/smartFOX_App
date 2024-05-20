import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useHomes } from "../../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { deleteHome } from "../../api/services/homeService";
import { useModal } from "../../context/ModalContext";
import ModalWrapper from "../modals/ModalWrapper";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAlert } from "../../context/AlertContext";

function HomeDashboardButtons() {
  const { fetchHomes, selectedHome, loading, error } = useHomes();
  const { openModal, closeModal, isModalOpen } = useModal();
  const { showAlert } = useAlert();
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleEditHome = () => {
    if (selectedHome) {
      console.log(`Editing home with ID: ${selectedHome.id}`);
      navigate(`/dashboard/my-home/edit-home`);
    }
  };

  const handleDeleteHome = async () => {
    setDeleting(true);
    if (selectedHome) {
      await deleteHome(selectedHome.id);
      closeModal();
      showAlert(
        "error",
        "Delete Home",
        "Your Home",
        selectedHome.name + " is succesfully deleted."
      );
      await fetchHomes();
      navigate("/dashboard/my-home");
    }

    console.log(`Deleting home with ID: ${selectedHome.id}`);
  };

  const handleEnergyCertificate = () => {
    if (selectedHome) {
      console.log(
        `Fetching energy certificate for home with ID: ${selectedHome.id}`
      );
      //energy certificate logic here
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-wrap items-center justify-center space-x-3">
      <button
        onClick={handleEnergyCertificate}
        className="flex items-center p-1 bg-transparent text-sm hover:text-foxColor hover:underline gap-1 rounded"
      >
        <AiOutlineSafetyCertificate size="18" /> Energy Certificate
      </button>
      <button
        onClick={handleEditHome}
        className="flex items-center justify-center p-1 bg-transparent text-sm hover:text-blue-600 hover:underline gap-1 rounded"
      >
        <FaEdit size="18" /> Edit
      </button>
      <button
        onClick={openModal}
        className="flex items-center justify-center p-1 bg-transparent text-sm hover:text-red-600 hover:underline gap-1 rounded"
      >
        <FaTrash size="18" /> Delete
      </button>
      <ModalWrapper
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Photo"
        title="Delete Home"
      >
        <div className=" text-center">
          Are you sure you want to delete this home?
        </div>

        <div className="flex justify-around gap-4 mt-4">
          <button
            className="flex items-center gap-2 border border-stroke py-2 px-6 text-sm text-black hover:shadow-lg hover:bg-gray-300 transition duration-200"
            onClick={closeModal}
          >
            <MdOutlineCancel size="15" /> Cancel
          </button>
          <button
            className="flex items-center gap-2 bg-red-600 py-2 px-6 text-sm text-white hover:bg-red-700 transition duration-200"
            onClick={handleDeleteHome}
          >
            <RiDeleteBin5Fill size="15" /> {deleting ? "Deleting.." : "Confirm"}
          </button>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default HomeDashboardButtons;
