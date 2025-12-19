import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ErrorList from "../ErrorMessage/ErrorMessage";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAmount, selected } = location.state || { totalAmount: 0 };

  const validationSchema = Yup.object().shape({
    first: Yup.string()
      .matches(/^[A-Za-z]+$/, "First name must contain only letters")
      .max(20, "First name must be at most 20 characters")
      .required("First name is a required field"),
    last: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
      .max(30, "Last name must be at most 30 characters")
      .required("Last name is a required field"),
    email: Yup.string()
      .email("Email is incorrect")
      .required("Email is a required field"),
    phone: Yup.number()
      .typeError("Phone must be a number without spaces or symbols")
      .integer("Phone must be an integer number")
      .positive("Phone must be positive")
      .min(1000000, "Phone number is too short")
      .required("Phone is a required field"),
    address: Yup.string()
      .min(5, "Address is too short")
      .max(200, "Address is too long")
      .required("Address is a required field"),
  });

  const initialValues = {
    first: "",
    last: "",
    email: "",
    phone: "",
    address: "",
  };

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center fw-bold mb-4">Checkout</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          navigate("/success", {
            state: { total: totalAmount, email: values.email },
          });
        }}
      >
        {({ errors }) => (
          <Form>
            <ErrorList errors={errors} />

            <div className="row">
              <div className="col-6 mb-3">
                <label>First Name</label>
                <Field name="first" className="form-control" />
              </div>
              <div className="col-6 mb-3">
                <label>Last Name</label>
                <Field name="last" className="form-control" />
              </div>

              <div className="col-6 mb-3">
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
              </div>
              <div className="col-6 mb-3">
                <label>Phone</label>
                <Field name="phone" className="form-control" />
              </div>

              <div className="col-12 mb-3">
                <label>Address</label>
                <Field name="address" className="form-control" />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate("/cart")}
              >
                Go Back
              </button>

              <PrimaryButton
                className="btn-dark px-4"
                text="Place Order"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Checkout;
