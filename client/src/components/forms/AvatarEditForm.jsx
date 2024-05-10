import React, { useState } from "react";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import { useUser } from "../../context/UserContext";
import UserAvatar from "../UserAvatar";
import * as FileService from "../../api/services/fileService";
import { uploadToS3, canvasToBlob } from "../../utils/fileUtils";

Modal.setAppElement("#root");

const AvatarEditForm = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await FileService.deleteAvatar(user.id);
      console.log("Avatar deleted successfully");
      //todo: Optionally update the user context or state to reflect the deletion
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  };

  const handleSaveClick = async () => {
    if (editor) {
      try {
        setUploading(true);
        const canvas = editor.getImageScaledToCanvas();
        const blob = await canvasToBlob(canvas);
        const fileName = `${user.id}.png`;
        const { url, fields } = await FileService.getPresignedUrl(fileName, blob.type);

        await uploadToS3(url, fields, blob);
        console.log('Upload successful');
        //todo: Optionally update the user context or state with the new avatar URL
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
        setIsModalOpen(false);
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
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
                <button
                  className="text-sm hover:text-primary"
                  type="button"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
      <Modal
        className="fixed inset-0 flex items-center justify-center z-50"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Photo"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
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
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700 transition duration-200"
              onClick={handleSaveClick}
              disabled={uploading}
            >
              {uploading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarEditForm;


