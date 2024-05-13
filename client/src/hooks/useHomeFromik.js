import { useFormik } from "formik";
import { homeValidationSchema } from "../components/forms/validationSchemas";
import { createHome } from "../api/services/homeService";
import { useNavigate } from "react-router-dom";
import { useHomes } from "../context/HomeContext";

const useHomeFormik = () => {
  const navigate = useNavigate();
  const { fetchHomes, selectHome } = useHomes();

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
        await fetchHomes();
        selectHome(newHome.id);
        resetForm();
        alert("Your new home created");
        navigate("/dashboard/my-home", { replace: true });
      } catch (error) {
        console.error("Error creating home:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
};

export default useHomeFormik;





