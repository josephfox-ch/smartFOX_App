import { useFormik } from "formik";
import { homeValidationSchema } from "../components/forms/validationSchemas";
import { createHome } from "../api/services/homeService";
import { useNavigate } from "react-router-dom";

const useHomeFormik = () => {
  const navigate = useNavigate();

  return useFormik({
    initialValues: {
      name: "",
      streetAddress: "",
      city: "",
      country: "CH",
      postalCode: "",
      timeZone: "Europe/Zurich",
      latitude: "",
      longitude: "",
    },
    validationSchema: homeValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const newHome = await createHome(values);
        console.log("New home created:", newHome);
        resetForm();
        navigate("/dashboard/my-home");
        alert("Your new home created");
        //todo: show a success message
      } catch (error) {
        console.error("Error creating home:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
};

export default useHomeFormik;
