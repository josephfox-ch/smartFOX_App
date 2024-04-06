import React from "react";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  InputGroup,
  FormControl,
  FormCheck,
} from "react-bootstrap";

const validationSchemas = [
  Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Emails must match")
      .required("Confirm email is required"),
    phoneNumber: Yup.string().required("Primary phone number is required"),
  }),
  Yup.object({
    houseName: Yup.string().required("House name is required"),
    streetAddress: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.string().required("Postal code is required"),
    timeZone: Yup.string().required("Time zone is required"),
  }),
  Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    securityQuestion: Yup.string().required("Security question is required"),
    securityAnswer: Yup.string().required("Security answer is required"),
    acceptTerms: Yup.bool().oneOf([true], "You must accept the terms"),
    acceptEmails: Yup.bool(),
  }),
];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  phoneNumber: "",
  houseName: "",
  streetAddress: "",
  city: "",
  country: "",
  postalCode: "",
  timeZone: "",
  username: "",
  password: "",
  confirmPassword: "",
  securityQuestion: "",
  securityAnswer: "",
  acceptTerms: false,
  acceptEmails: false,
};

const SignupForm = ({ step, onSubmit }) => {

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ maxHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step]}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <FormikForm className="p-4 shadow rounded">
              {step === 0 && (
                <>
                  <h6 className=" mb-4 form-title">Your Contact Information</h6>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="firstName"
                    placeholder="First Name"
                    className="form-control mb-2 "
                  />

                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="confirmEmail"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="confirmEmail"
                    type="email"
                    placeholder="Confirm Email"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="phoneNumber"
                    placeholder="Primary Phone Number"
                    className="form-control mb-2"
                  />
                </>
              )}
              {step === 1 && (
                <>
                  <h6 className=" mb-4 form-title">Your Home Information</h6>
                  <ErrorMessage
                    name="houseName"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="houseName"
                    placeholder="House Name"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="text-danger"
                  />

                  <Field
                    name="streetAddress"
                    placeholder="Street Address"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="city"
                    placeholder="City"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="country"
                    placeholder="Country"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="postalCode"
                    placeholder="Postal Code"
                    className="form-control mb-2"
                  />

                  <ErrorMessage
                    name="timeZone"
                    component="div"
                    className="text-danger"
                  />
                  <Field
                    name="timeZone"
                    placeholder="Time Zone"
                    className="form-control mb-2"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <h6 className="mb-4 form-title">Your Login Information</h6>
                  <InputGroup className="mb-2">
                    <Field
                      name="username"
                      as={FormControl}
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-danger"
                    />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <Field
                      name="password"
                      type="password"
                      as={FormControl}
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <Field
                      name="confirmPassword"
                      type="password"
                      as={FormControl}
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-danger"
                    />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <Field
                      name="securityQuestion"
                      as={FormControl}
                      placeholder="Security Question"
                    />
                    <ErrorMessage
                      name="securityQuestion"
                      component="div"
                      className="text-danger"
                    />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <Field
                      name="securityAnswer"
                      as={FormControl}
                      placeholder="Security Answer"
                    />
                    <ErrorMessage
                      name="securityAnswer"
                      component="div"
                      className="text-danger"
                    />
                  </InputGroup>

                  <FormCheck
                    id="acceptTerms"
                    label="I accept terms and conditions"
                    checked={values.acceptTerms}
                    onChange={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                    className="mb-3"
                  />

                  <FormCheck
                    id="acceptEmails"
                    label="Accept emails from SmartFox about products"
                    checked={values.acceptEmails}
                    onChange={() =>
                      setFieldValue("acceptEmails", !values.acceptEmails)
                    }
                    className="mb-3"
                  />
                </>
              )}

              <Button
                type="submit"
                variant={step < 2 ? "primary" : "success"}
                className="w-100 mt-4"
              >
                {step < 2 ? "Continue" : "Create My Account"}
              </Button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignupForm;
