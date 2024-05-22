import { useFormik } from "formik";
import {
  homeValidationSchema,
  energyCertificateValidationSchema,
} from "../components/forms/validationSchemas";
import { updateHomeWithEnergyCertificate } from "../api/services/homeService";
import { useNavigate } from "react-router-dom";
import { useHomes } from "../context/HomeContext";
import * as Yup from "yup";
import { useAlert } from "../context/AlertContext";
import { formatDate } from "../utils/utils";

const combinedValidationSchema = Yup.object().shape({
  ...homeValidationSchema.fields,
  ...energyCertificateValidationSchema.fields,
});

const useEditHomeFormik = (homeId) => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { fetchHomeDetails, fetchHomes, selectedHome } = useHomes();

  const formik = useFormik({
    initialValues: {
      name: selectedHome?.name || "",
      streetAddress: selectedHome?.streetAddress || "",
      city: selectedHome?.city || "",
      country: selectedHome?.country || "CH",
      postalCode: selectedHome?.postalCode || "",
      timeZone: selectedHome?.timeZone || "Europe/Zurich",
      latitude: selectedHome?.latitude || "",
      longitude: selectedHome?.longitude || "",
      buildingVolume: selectedHome?.EnergyCertificate?.buildingVolume || null,
      globalHeatLossCoefficient:
        selectedHome?.EnergyCertificate?.globalHeatLossCoefficient || null,
      constructionYear:
        selectedHome?.EnergyCertificate?.constructionYear || null,
      renewalDate:
        formatDate(selectedHome?.EnergyCertificate?.renewalDate) || null,
      globalHeatLossCoefficient:
        selectedHome?.EnergyCertificate?.globalHeatLossCoefficient || null,
      volumeOfHeatedZone:
        selectedHome?.EnergyCertificate?.volumeOfHeatedZone || null,
      heatEmissionCoefficient:
        selectedHome?.EnergyCertificate?.heatEmissionCoefficient || null,
      freeHeatGains: selectedHome?.EnergyCertificate?.freeHeatGains || null,
    },
    enableReinitialize: true,
    validationSchema: combinedValidationSchema,

    onSubmit: async (values, { setSubmitting }) => {
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

        const updatedHome = await updateHomeWithEnergyCertificate(
          homeId,
          homeData,
          energyCertificateData
        );
        console.log("Home updated:", updatedHome);
        await fetchHomes();
        await fetchHomeDetails(homeId);
        showAlert("success", "Success", `Home ${updatedHome.name} updated`);
        navigate("/dashboard/my-home/edit-home", { replace: true });
      } catch (error) {
        console.error("Error updating home:", error);
        showAlert("error", "Error", "Could not update the home");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};

export default useEditHomeFormik;
