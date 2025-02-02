import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaPeopleRoof } from "react-icons/fa6";
import { useHomes } from "../../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { deleteHome } from "../../api/services/homeService";
import { useModal } from "../../context/ModalContext";
import { useAlert } from "../../context/AlertContext";
import DynamicModal from "../modals/DynamicModal";

function HomeDashboardButtons() {
  const { fetchHomes, selectedHome, loading, error } = useHomes();
  const { openModal, closeModal } = useModal();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleEditHome = () => {
    if (selectedHome) {
      console.log(`Editing home with ID: ${selectedHome.id}`);
      navigate(`/dashboard/my-home/edit-home`);
    }
  };
  const handleResidents = () => {
    if (selectedHome) {
      console.log(`Fetching residents for home with ID: ${selectedHome.id}`);
      //residents logic here
    }
  };

  const handleDeleteHome = async () => {
    if (selectedHome) {
      openModal({
        title: "Delete Home",
        content: "Are you sure you want to delete this home?",
        onConfirmAction: async () => {
          await deleteHome(selectedHome.id);
          showAlert("warning", "Warning", `Home ${selectedHome.name} deleted.`);
          await fetchHomes();
          navigate("/dashboard/my-home");
          closeModal();
        },
        onCancelAction: closeModal,
      });
    }
  };

  const handleEnergyCertificate = () => {
    if (selectedHome) {
      console.log(`Fetching energy certificate for home with ID: ${selectedHome.id}`);
      //energy certificate logic here
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-wrap items-center justify-center space-x-3">
      <button
        onClick={handleEnergyCertificate}
        className="flex items-center p-1 bg-transparent text-sm font-bold  hover:text-foxColor hover:underline gap-1 rounded"
      >
        <AiOutlineSafetyCertificate size="18" /> Energy Certificate
      </button>
      <button
        onClick={handleResidents}
        className="flex items-center justify-center p-1 bg-transparent text-sm font-bold hover:text-green-600 hover:underline gap-1 rounded"
      >
        <FaPeopleRoof size='18' /> Residents
      </button>
      <button
        onClick={handleEditHome}
        className="flex items-center justify-center p-1 bg-transparent text-sm font-bold  hover:text-blue-600 hover:underline gap-1 rounded"
      >
        <FaEdit size="18" /> Edit
      </button>
      <button
        onClick={handleDeleteHome}
        className="flex items-center justify-center p-1 bg-transparent text-sm font-bold  hover:text-red-600 hover:underline gap-1 rounded"
      >
        <FaTrash size="18" /> Delete
      </button>
      <DynamicModal />
    </div>
  );
}

export default HomeDashboardButtons;


