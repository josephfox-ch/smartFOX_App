import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useHomes } from "../../context/HomeContext";
import { useNavigate } from "react-router-dom";
import {deleteHome} from '../../api/services/homeService'

function HomeDashboardButtons() {
  const { selectedHome, loading, error } = useHomes();
  const navigate = useNavigate();

  const handleEditHome = () => {
    if (selectedHome) {
      console.log(`Editing home with ID: ${selectedHome.id}`);
      navigate(`/dashboard/my-home/edit-home`);
    }
  };

  const handleDeleteHome = async () => {
    if (selectedHome) {
      if (window.confirm("Are you sure you want to delete this home?")) {
        await deleteHome(selectedHome.id);
        navigate("/dashboard/my-home", { replace: true });
      }
      console.log(`Deleting home with ID: ${selectedHome.id}`);
      // Add your delete logic here
    }
  };

  const handleEnergyCertificate = () => {
    if (selectedHome) {
      console.log(
        `Fetching energy certificate for home with ID: ${selectedHome.id}`
      );
      // Add your energy certificate logic here
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
        onClick={handleDeleteHome}
        className="flex items-center justify-center p-1 bg-transparent text-sm hover:text-red-600 hover:underline gap-1 rounded"
      >
        <FaTrash size="18" /> Delete
      </button>
    </div>
  );
}

export default HomeDashboardButtons;


