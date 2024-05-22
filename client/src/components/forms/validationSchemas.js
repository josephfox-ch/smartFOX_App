import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Required"),
});

export const signupValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .notRequired(),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  acceptCookies: Yup.bool(),
  acceptEmails: Yup.bool(),
});

export const personalInfoValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .notRequired(),
});

export const homeValidationSchema = Yup.object({
  name: Yup.string().required("House name is required"),
  streetAddress: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal code is required"),
  timeZone: Yup.string().required("Time zone is required"),
  latitude: Yup.number().required(
    "Latitude is required.Use get coordinates button."
  ),
  longitude: Yup.number().required(
    "Longitude is required.Use get coordinates button."
  ),
});


export const energyCertificateValidationSchema = Yup.object({
  buildingVolume: Yup.number()
    .nullable()
    .typeError('Building Volume must be a number'),
  constructionYear: Yup.number()
    .nullable()
    .typeError('Construction Year must be a number'),
  renewalDate: Yup.date()
    .nullable()
    .typeError('Renewal Date must be a date'),
  globalHeatLossCoefficient: Yup.number()
    .nullable()
    .typeError('Global Heat Loss Coefficient must be a number'),
  volumeOfHeatedZone: Yup.number()
    .nullable()
    .typeError('Volume Of Heated Zone must be a number'),
  heatEmissionCoefficient: Yup.number()
    .nullable()
    .typeError('Heat Emission Coefficient must be a number'),
  freeHeatGains: Yup.number()
    .nullable()
    .typeError('Free Heat Gains must be a number'),
});

