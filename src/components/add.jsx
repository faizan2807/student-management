import axios from "axios"
import { useState } from "react"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function Add() {

const navigate = useNavigate();
const [addstudent, setAddStudent] = useState({id:"", FirstName:"", LastName:"", Email:"", Mobile:""});
  const formik = useFormik({
    initialValues :{
      id:'',
      FirstName:'',
      LastName:'',
      Email:'',
      Mobile:''
    },
    onSubmit: (values)=>{
      axios.post("http://127.0.0.1:4000/reg-students", values)
      .then(()=>{
        alert("studetn added successfully..")
        navigate("/home")
      })
     
    }
    
  })

    return (
             <div className="container-fluid d-flex justify-content-center mt-5">
             <form className="border border-1 border-dark w-50 p-5" onSubmit={formik.handleSubmit}>
              <h2>New Student</h2>
                    <dt>Id</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange} name="id" value={formik.values.id}/></dd>
                    <dt>FirstName</dt>
                    <dd><input type="text"  className="form-control" onChange={formik.handleChange}  name="FirstName" value={formik.values.FirstName}/></dd>
                    <dt>LastName</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="LastName" value={formik.values.LastName}/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" className="form-control" onChange={formik.handleChange} name="Email" value={formik.values.Email }/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange} name="Mobile" value={formik.values.Mobile}/></dd>
                    <button className="btn btn-info w-100" type="submit" >Add Std</button>
                </form>
           
        </div>
    )
}