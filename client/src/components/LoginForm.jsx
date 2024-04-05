import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = ({ onSubmit, changeForm }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: onSubmit,
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ maxHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <form onSubmit={formik.handleSubmit} className="p-4 shadow rounded">
          <h6 className="form-title">Subscriber Login</h6>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.email}</div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.password}</div>
          </div>
          {formik.errors.general && (
            <div className="alert alert-danger error-message" role="alert">
              {formik.errors.general}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={formik.isSubmitting}
          >
            Log In
          </button>
          <div className="text-center mb-2">
            <a style={{ textDecoration: "none" }} href="">
              forgot password?
            </a>
          </div>
          <span className="form-title">
            Ready to join smartFOX&#8482; systems?
          </span>
          <button onClick={changeForm} className="btn  signup-button w-100">
            Sign Up Now
          </button>
          <div className="d-flex justify-content-around p-3">
            <a href="#">
              <img height='30px' width="90px" src="appStore.png" alt="" />
            </a>{" "}
            <a href="#">
              <img height='30px' width="90px" src="googleStore.png" alt="" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
