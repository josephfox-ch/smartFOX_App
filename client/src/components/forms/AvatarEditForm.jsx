import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import * as s3Service from "../../api/services/s3Service";
import { uploadToS3, canvasToBlob } from "../../utils/s3Utils";
import { useUser } from "../../context/UserContext";
import UserAvatar from "../UserAvatar";
import ModalWrapper from "../modals/ModalWrapper";
import { useModal } from "../../context/ModalContext";

const AvatarEditForm = () => {
  const { user, updateUser } = useUser();
  const { openModal, closeModal, isModalOpen } = useModal();
  const [selectedFile, setSelectedFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [uploading, setUploading] = useState(false);

  const avatarBaseUrl = import.meta.env.VITE_AVATAR_BASE_URL;

  const handleUpdateAvatar = () => {
    openModal();
  };

  const handleDeleteAvatar = async () => {
    try {
      await s3Service.deleteAvatarFromS3(user.id);
      console.log("Avatar deleted successfully");
      updateUser({ avatarUrl: "" });
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  };

  const handleSaveAvatar = async () => {
    if (editor) {
      try {
        setUploading(true);
        const canvas = editor.getImageScaledToCanvas();
        const blob = await canvasToBlob(canvas);
        const fileName = `${user.id}.png`;
        const { url, fields } = await s3Service.getPresignedUrl(
          fileName,
          blob.type
        );

        await uploadToS3(url, fields, blob);
        console.log("Upload successful");

        const newAvatarUrl = `${avatarBaseUrl}${fileName}?t=${Date.now()}`;
        await updateUser({ avatarUrl: newAvatarUrl });
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
        closeModal();
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
      <ModalWrapper
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Photo"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-center text-lg font-semibold mb-4 p-2 rounded">
            Edit Your Photo
          </h2>
          <div className="flex flex-col items-center mb-4">
            <input
              className="mb-4"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <AvatarEditor
                ref={(ref) => setEditor(ref)}
                image={selectedFile}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
                scale={1.2}
              />
            )}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="border border-stroke py-2 px-6 text-sm text-black hover:shadow-lg hover:bg-gray-100 transition duration-200"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700 transition duration-200"
              onClick={handleSaveAvatar}
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default AvatarEditForm;
