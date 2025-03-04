import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export function Register() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['username', 'password']);

   
    const validationSchema = Yup.object({
        username: Yup.string()
            .matches(/^[A-Z][a-zA-Z0-9]{3,14}$/, "Username must start with an uppercase letter and be 4-15 characters long.")
            .required("Username is required."),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits.")
            .required("Mobile number is required."),
        dob: Yup.date()
            .required("Date of Birth is required."),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,15}$/, "Password must be 4-15 characters with at least one uppercase letter, one lowercase letter, and one digit.")
            .required("Password is required.")
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            mobile: '',
            dob: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setCookie('username', values.username, { path: '/' });
            setCookie('password', values.password, { path: '/' });
            alert('Registered successfully');
            navigate("/login");
        }
    });

    return (
        <div className="container-fluid d-flex justify-content-center my-5">
            <form className="w-25 border border-2 border-dark p-4" onSubmit={formik.handleSubmit}>
                <h2 className="bi bi-person">User Register</h2>
                <div>
                    <dl>
                        <dt>Username</dt>
                        <dd>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className="text-danger">{formik.errors.username}</div>
                            )}
                        </dd>
                        <dt>Mobile</dt>
                        <dd>
                            <input
                                type="text"
                                className="form-control"
                                name="mobile"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile}
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <div className="text-danger">{formik.errors.mobile}</div>
                            )}
                        </dd>
                        <dt>Date Of Birth</dt>
                        <dd>
                            <input
                                type="date"
                                className="form-control"
                                name="dob"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dob}
                            />
                            {formik.touched.dob && formik.errors.dob && (
                                <div className="text-danger">{formik.errors.dob}</div>
                            )}
                        </dd>
                        <dt>Password</dt>
                        <dd>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-danger">{formik.errors.password}</div>
                            )}
                        </dd>
                    </dl>
                </div>
                <label htmlFor="Confirm">Register</label>
                <div className="form-switch">
                    <input className="form-check-input" type="checkbox" name="Register" required />
                    <label className="form-check-label"> Yes </label>
                </div>
                <button className="btn btn-warning w-100" type="submit">Register</button>
            </form>
        </div>
    );
}
