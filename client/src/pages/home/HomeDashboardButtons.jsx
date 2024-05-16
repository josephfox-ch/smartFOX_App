import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useHomes } from "../../context/HomeContext";

function HomeDashboardButtons() {
  const { selectedHome, loading, error } = useHomes();

  const handleEditHome = () => {
    if (selectedHome) {
      console.log(`Editing home with ID: ${selectedHome.id}`);
    }
  };

  const handleDeleteHome = () => {
    if (selectedHome) {
      console.log(`Deleting home with ID: ${selectedHome.id}`);
    }
  };

  const handleEnergyCertificate = () => {
    if (selectedHome) {
      console.log(`Fetching energy certificate for home with ID: ${selectedHome.id}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center justify-center space-x-3">
      <button onClick={handleEnergyCertificate} className="flex items-center justify-center p-1 bg-transparent text-sm hover:text-foxColor hover:underline gap-2 rounded">
        <AiOutlineSafetyCertificate size="18" /> Energy Certificate
      </button>
      <button onClick={handleEditHome} className="flex items-center justify-center p-1 bg-transparent text-sm hover:text-blue-600 hover:underline gap-2 rounded">
        <FaEdit size="18" /> Edit
      </button>
      <button onClick={handleDeleteHome} className="flex items-center justify-center p-1 bg-transparent text-sm hover:text-red-600 hover:underline gap-2 rounded">
        <FaTrash size="18" /> Delete
      </button>
    </div>
  );
}

export default HomeDashboardButtons;

