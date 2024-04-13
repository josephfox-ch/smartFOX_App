import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = ({ onSubmit}) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      rememberMe: Yup.boolean(),
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
            <label htmlFor="email">Email or Username</label>
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
          <div className="form-group form-check mb-3">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.rememberMe}
              className="form-check-input"
            />
            <label htmlFor="rememberMe" className="form-check-label">
              Remember me
            </label>
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
            <Link style={{ textDecoration: "none" }} to="">
              forgot password?
            </Link>
          </div>
          <span className="form-title">
            Ready to join smartFOX® systems?
          </span>
          <button type="button" onClick={() => navigate("/signup")} className="btn  signup-button w-100">
            Sign Up Now
          </button>
          <hr className="my-2" />
          <small style={{ fontSize: "12px" }} className="text-muted ">
            By signing up, you agree to the <a href="">Terms of Service</a> and{" "}
            <a href="">Privacy Policy</a>, including <a href="">Cookie Use</a>.
          </small>
          <div className="d-flex justify-content-around p-3">
            <a href="#">
              <img height="30px" width="90px" src="appStore.png" alt="" />
            </a>{" "}
            <a href="#">
              <img height="30px" width="90px" src="googleStore.png" alt="" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
