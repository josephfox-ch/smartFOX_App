import { useFormik } from "formik";
import {
  homeValidationSchema,
  energyCertificateValidationSchema,
} from "../components/forms/validationSchemas";
import { createHomeWithEnergyCertificate } from "../api/services/homeService";
import { useNavigate } from "react-router-dom";
import { useHomes } from "../context/HomeContext";
import * as Yup from "yup";
import { useAlert } from "../context/AlertContext";

const combinedValidationSchema = Yup.object().shape({
  ...homeValidationSchema.fields,
  ...energyCertificateValidationSchema.fields,
});

const useHomeFormik = () => {
  const {showAlert} = useAlert();
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
      latitude: null,
      longitude: null,
      buildingVolume: null,
      heatLossCoefficient: null,
      constructionYear: null,
      renewalDate: null,
      globalHeatLossCoefficient: null,
      volumeOfHeatedZone: null,
      heatEmissionCoefficient: null,
      freeHeatGains: null,
    },
    validationSchema: combinedValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const {
          name,
          streetAddress,
          city,
          country,
          postalCode,
          timeZone,
          latitude,
          longitude,
          ...energyCertificateData
        } = values;
        const homeData = {
          name,
          streetAddress,
          city,
          country,
          postalCode,
          timeZone,
          latitude,
          longitude,
        };

        const newHome = await createHomeWithEnergyCertificate(
          homeData,
          energyCertificateData
        );
        console.log("New home created:", newHome);
        await fetchHomes();
        selectHome(newHome.id);
        resetForm();
        showAlert("success","Success",`Your new home ${newHome.name} created`);
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


