import React from "react";
import UserAvatar from "../UserAvatar";
import { useModal } from "../../context/ModalContext";
import AvatarModal from "../modals/AvatarModal";
import * as s3Service from "../../api/services/s3Service";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";

const AvatarEditForm = () => {
  const { openModal, closeModal } = useModal();
  const { user, updateUser } = useUser();
  const { showAlert } = useAlert();

  const handleUpdateAvatar = () => {
    openModal({
      title: "Edit Your Photo",
      content: <AvatarModal />,
    });
  };

  const confirmDeleteAvatar = async () => {
    try {
      await s3Service.deleteAvatarFromS3(user.id);
      showAlert("error", "Warning", "Avatar deleted.");
      updateUser({ avatarUrl: "" });
      closeModal();
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  };

  const handleDeleteAvatar = () => {
    openModal({
      title: "Delete Avatar",
      content: "Are you sure you want to delete your avatar?",
      onConfirmAction: confirmDeleteAvatar,
      onCancelAction: closeModal,
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
      </div>
      <div className="p-7">
        <form action="#">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-14 w-14 rounded-full">
              <UserAvatar />
            </div>
            <div>
              <span className="mb-1.5 text-black dark:text-white">
                Edit your photo
              </span>
              <span className="flex gap-2.5">
                <button
                  className="text-sm hover:text-primary"
                  type="button"
                  onClick={handleDeleteAvatar}
                >
                  Delete
                </button>
                <button
                  className="text-sm hover:text-primary"
                  type="button"
                  onClick={handleUpdateAvatar}
                >
                  Update
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvatarEditForm;
