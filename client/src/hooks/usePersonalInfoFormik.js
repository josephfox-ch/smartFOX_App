import { useFormik } from "formik";
import { personalInfoValidationSchema } from "../components/forms/validationSchemas";
import { useUser } from "../context/UserContext";
import * as UserService from "../api/services/userService";
import * as s3Service from "../api/services/s3Service"
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

const usePersonalInfoFormik = () => {
  const { showAlert } = useAlert();
  const { user, updateUser } = useUser();
  const { logout } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      password: "",
    },
    validationSchema: personalInfoValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateUser(values);
        showAlert("success", "Success", "User updated successfully");
      } catch (error) {
        showAlert("error", "Error", "Could not update user")
        console.error("Error updating user:", error);
      }
    },
  });

  const deleteAccount = async () => {
    try {
      await s3Service.deleteAvatarFromS3(user.id);
      const result = await UserService.deleteUser();
      if (result.success) {
        showAlert("warning", "Warning", "Your Account deleted.");
        logout();
      } else {
        showAlert("error", "Error", result.message);
      }
    } catch (error) {
      showAlert("error", "Error", "Failed to delete user. Please try again later.")
    }
  };

  return { formik, deleteAccount };
};

export default usePersonalInfoFormik;
