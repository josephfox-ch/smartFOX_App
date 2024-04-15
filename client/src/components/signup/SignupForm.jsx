import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Button, Container, Accordion, Card, FormCheck } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CountrySelect from "./CountrySelect";
import TimeZoneSelect from "./TimeZoneSelect";

const phoneRegex =
  /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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
    phoneNumber: Yup.string()
      .matches(phoneRegex, "Invalid phone number")
      .required("Primary phone number is required"),
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

const initialValues = [
  {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
  },
  {
    houseName: "",
    streetAddress: "",
    city: "",
    country: "CH",
    postalCode: "",
    timeZone: "Europe/Zurich",
  },
  {
    username: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    acceptTerms: false,
    acceptEmails: false,
  },
];

const formTitles = [
  "Contact Information",
  "Home Information",
  "Login Information",
];

const PhoneInputField = React.memo(({ field, form }) => (
  <PhoneInput
    international
    countryCallingCodeEditable={false}
    defaultCountry="CH"
    value={field.value}
    onChange={(value) => form.setFieldValue(field.name, value)}
    className="form-control mb-2"
  />
));

function CustomToggle({ title, eventKey, setActiveKey }) {
  const handleClick = () => {
    setActiveKey(eventKey);
  };

  return (
    <Card.Header onClick={handleClick} style={{ cursor: "pointer" }}>
      {title}
    </Card.Header>
  );
}

const SignupForm = ({ onSubmit }) => {
  const [activeKey, setActiveKey] = useState("0");
  const [formData, setFormData] = useState({});

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    const updatedFormData = { ...formData, ...values };
    const currentStep = parseInt(activeKey, 10);

    if (currentStep < validationSchemas.length - 1) {
      setFormData(updatedFormData);
      setActiveKey(`${currentStep + 1}`);
      setSubmitting(false);
    } else {
      console.log("updated formData", updatedFormData);
      onSubmit(updatedFormData, { setSubmitting, setErrors });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ maxHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <Accordion flush activeKey={activeKey}>
          {validationSchemas.map((schema, index) => (
            <Card key={index}>
              <CustomToggle
                eventKey={`${index}`}
                setActiveKey={setActiveKey}
                title={<h6 className=" m-2 form-title">{formTitles[index]}</h6>}
              />
              <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                  <Formik
                    initialValues={initialValues[index]}
                    validationSchema={schema}
                    onSubmit={handleFormSubmit}
                    enableReinitialize
                    validateOnBlur={true}
                    validateOnChange={false}
                  >
                    {(formikProps) => (
                      <FormikForm>
                        {index === 0 && (
                          <>
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="firstName"
                              placeholder="First Name *"
                              className="form-control mb-2 "
                            />

                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="lastName"
                              placeholder="Last Name *"
                              className="form-control mb-2"
                            />

                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="email"
                              type="email"
                              placeholder="Email *"
                              className="form-control mb-2"
                            />

                            <ErrorMessage
                              name="confirmEmail"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="confirmEmail"
                              type="email"
                              placeholder="Confirm Email *"
                              className="form-control mb-2"
                            />

                            <ErrorMessage
                              name="phoneNumber"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="phoneNumber"
                              component={PhoneInputField}
                            />
                            <p className="signup-form-notes mt-3">
                              All fields are required (*) unless noted.
                            </p>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <ErrorMessage
                              name="houseName"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="houseName"
                              placeholder="House Name *"
                              className="form-control mb-2"
                            />

                            <ErrorMessage
                              name="streetAddress"
                              component="div"
                              className="text-danger form-required-message"
                            />

                            <Field
                              name="streetAddress"
                              placeholder="Street Address *"
                              className="form-control mb-2"
                            />

                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="city"
                              placeholder="City *"
                              className="form-control mb-2"
                            />

                            <ErrorMessage
                              name="postalCode"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="postalCode"
                              placeholder="Postal Code *"
                              className="form-control mb-2"
                            />

                            <ErrorMessage
                              name="country"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field name="country">
                              {({ form, field }) => (
                                <CountrySelect
                                  value={field.value}
                                  onChange={(option) =>
                                    form.setFieldValue(
                                      field.name,
                                      option ? option.value : ""
                                    )
                                  }
                                />
                              )}
                            </Field>

                            <ErrorMessage
                              name="timeZone"
                              component="div"
                              className="text-danger form-required-message"
                            />
                            <Field
                              name="timeZone"
                              component={({ field, form }) => (
                                <TimeZoneSelect
                                  value={field.value}
                                  onChange={(option) =>
                                    form.setFieldValue(field.name, option.value)
                                  }
                                />
                              )}
                            />

                            <p className="signup-form-notes mt-3">
                              Please provide a name, address, and time zone for
                              your home. This provides access to location-based
                              functionality within smartFOX® Home and ensures
                              scheduled events occur at the correct time.
                            </p>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <p className="fw-bold signup-form-notes">
                              THIS INFORMATION IS YOUR KEY FOR USING smartFOX®
                              HOME. MAKE SURE YOU CAN REMEMBER YOUR USERNAME AND
                              PASSWORD OR YOU WILL LOSE ACCESS TO smartFOX®
                              HOME!
                            </p>
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="text-danger form-required-message"
                            />

                            <Field
                              name="username"
                              className="form-control mb-2"
                              placeholder="Username *"
                            />

                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger form-required-message"
                            />

                            <Field
                              name="password"
                              type="password"
                              className="form-control mb-2"
                              placeholder="Password *"
                            />

                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="text-danger form-required-message"
                            />

                            <Field
                              name="confirmPassword"
                              type="password"
                              className="form-control mb-2"
                              placeholder="Confirm Password *"
                            />

                            <ErrorMessage
                              name="securityQuestion"
                              component="div"
                              className="text-danger form-required-message"
                            />

                            <Field
                              name="securityQuestion"
                              className="form-control mb-2"
                              placeholder="Security Question *"
                            />

                            <ErrorMessage
                              name="securityAnswer"
                              component="div"
                              className="text-danger form-required-message"
                            />

                            <Field
                              name="securityAnswer"
                              className="form-control mb-2"
                              placeholder="Security Answer *"
                            />

                            <FormCheck
                              id="acceptTerms"
                              label="I accept the smartFOX® Home Terms and Conditions "
                              checked={formikProps.values.acceptTerms}
                              onChange={() =>
                                formikProps.setFieldValue(
                                  "acceptTerms",
                                  !formikProps.values.acceptTerms
                                )
                              }
                              className="form-check mb-3"
                            />

                            <FormCheck
                              id="acceptEmails"
                              label="By checking this box, I agree to receive emails from smartFOX® Home regarding products, services, and promotional offers."
                              checked={formikProps.values.acceptEmails}
                              onChange={() =>
                                formikProps.setFieldValue(
                                  "acceptEmails",
                                  !formikProps.values.acceptEmails
                                )
                              }
                              className="form-check mb-3"
                            />

                            <p className="signup-form-notes">
                              Please refer to our <Link to="/policy?tab=privacy">Privacy Policy</Link>
                              or <Link to="/contact">Contact smartFOX® Home</Link> for more
                              details.
                            </p>

                            <p className="signup-form-notes">
                              Please accept BOTH smartFOX® Home products and
                              services email and smartFOX® Home Terms and
                              Conditions to continue
                            </p>
                          </>
                        )}
                        <Button
                          type="submit"
                          variant={
                            index < validationSchemas.length - 1
                              ? "primary"
                              : "success"
                          }
                          className="mt-3 w-100"
                          disabled={
                            index === 2 &&
                            (!formikProps.values.acceptTerms ||
                              !formikProps.values.acceptEmails)
                          }
                        >
                          {index < validationSchemas.length - 1
                            ? "Save & Continue"
                            : "Create My Account"}
                        </Button>
                      </FormikForm>
                    )}
                  </Formik>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default SignupForm;
