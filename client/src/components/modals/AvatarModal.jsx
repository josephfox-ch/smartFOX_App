import React, { useState } from "react";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";
import { useUser } from "../../context/UserContext";
import * as s3Service from "../../api/services/s3Service";
import { uploadToS3, canvasToBlob } from "../../utils/s3Utils";
import { useAlert } from "../../context/AlertContext";

Modal.setAppElement("#root");

const AvatarModal = () => {
  const { isModalOpen, closeModal, modalTitle } = useModal();
  const { user, updateUser } = useUser();
  const { showAlert } = useAlert();
  const [selectedFile, setSelectedFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [uploading, setUploading] = useState(false);

  const avatarBaseUrl = import.meta.env.VITE_AVATAR_BASE_URL;

  const handleSaveAvatar = async () => {
    if (editor) {
      try {
        setUploading(true);
        const canvas = editor.getImageScaledToCanvas();
        const blob = await canvasToBlob(canvas);
        const fileName = `${user.id}.png`;
        const { url, fields } = await s3Service.getPresignedUrl(fileName, blob.type);

        await uploadToS3(url, fields, blob);
        console.log("Upload successful");

        const newAvatarUrl = `${avatarBaseUrl}${fileName}?t=${Date.now()}`;
        await updateUser({ avatarUrl: newAvatarUrl });
        showAlert("success", "Success", "Avatar updated.");
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
        closeModal();
      }
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={modalTitle}
      className="fixed inset-0 flex items-center justify-center z-50 raleway-font"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-grayC shadow-lg p-6 w-full max-w-md border border-graydark">
        <h2 className="text-center text-lg font-semibold mb-4">{modalTitle}</h2>
        <div className="flex flex-col items-center mb-4">
          <input
            className="mb-4"
            type="file"
            accept="image/*"
            onChange={(event) => setSelectedFile(event.target.files[0])}
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
        <div className="flex justify-around gap-4 mt-4">
          <button
            className="flex items-center gap-2 border border-graydark py-2 px-6 text-sm text-black hover:shadow-lg hover:bg-gray-400 transition duration-200"
            onClick={closeModal}
          >
            <MdOutlineCancel size="15" /> Cancel
          </button>
          <button
            className="flex items-center gap-2 bg-blue-600 border border-graydark py-2 px-6 text-sm text-white hover:bg-blue-700 transition duration-200"
            onClick={handleSaveAvatar}
            disabled={uploading}
          >
            <FaRegSave size="15" />
            {uploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AvatarModal;
