import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import { useEffect } from "react";

export function Edit() {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;


  const validationSchema = Yup.object({
    FirstName: Yup.string().required("First name is required"),
    LastName: Yup.string().required("Last name is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
      .required("Mobile number is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: ""
    },
    validationSchema, 
    onSubmit: (values) => {
      axios.put(`http://127.0.0.1:4000/update-std/${values.id}`, values)
        .then(() => {
          alert("Student updated successfully...");
          navigate('/home');
        });
    }
  });

  useEffect(() => {
    if (student) {
      formik.setValues(student);
    }
  }, [student]);

  function handleBack() {
    navigate('/home');
  }

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="border-dark border w-50 p-5">
        <div className="btn btn-close float-end" onClick={handleBack}></div>
        <form onSubmit={formik.handleSubmit}>
          <h2>Edit Student</h2>
          <dl>
            <dt>Id</dt>
            <dd><input type="text" name="id" value={formik.values.id} className="form-control" disabled /></dd>

            <dt>FirstName</dt>
            <dd>
              <input type="text" name="FirstName" onChange={formik.handleChange} value={formik.values.FirstName} className="form-control" />
              {formik.touched.FirstName && formik.errors.FirstName && (
                <div className="text-danger">{formik.errors.FirstName}</div>
              )}
            </dd>

            <dt>LastName</dt>
            <dd>
              <input type="text" name="LastName" onChange={formik.handleChange} value={formik.values.LastName} className="form-control" />
              {formik.touched.LastName && formik.errors.LastName && (
                <div className="text-danger">{formik.errors.LastName}</div>
              )}
            </dd>

            <dt>Email</dt>
            <dd>
              <input type="email" name="Email" onChange={formik.handleChange} value={formik.values.Email} className="form-control" />
              {formik.touched.Email && formik.errors.Email && (
                <div className="text-danger">{formik.errors.Email}</div>
              )}
            </dd>

            <dt>Mobile</dt>
            <dd>
              <input type="text" name="Mobile" onChange={formik.handleChange} value={formik.values.Mobile} className="form-control" />
              {formik.touched.Mobile && formik.errors.Mobile && (
                <div className="text-danger">{formik.errors.Mobile}</div>
              )}
            </dd>
          </dl>
          <button className="btn btn-success w-100" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
