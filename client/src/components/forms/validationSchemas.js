import * as Yup from 'yup';



export const homeValidationSchema = Yup.object({
  name: Yup.string().required("House name is required"),
  streetAddress: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal code is required"),
  timeZone: Yup.string().required("Time zone is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
});


