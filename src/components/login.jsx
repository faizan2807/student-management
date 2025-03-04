import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});  
  const [cookies, setCookie] = useCookies(['username', 'password']);  

  
  const usernameRegex = /^[A-Z][a-zA-Z0-9]{3,14}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,15}$/;

  
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(usernameRegex, "Username must start with an uppercase letter and be 4-15 characters long.")
      .required("Username is required."),
    password: Yup.string()
      .matches(passwordRegex, "Password must be 4-15 characters long, with at least one uppercase letter, one lowercase letter, and one digit.")
      .required("Password is required.")
  });

  
  function handleChange(e) {
    setUserName(e.target.value);
  }

 
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  
  async function handleLoginClick() {
    try {
      
      await validationSchema.validate({ username, password }, { abortEarly: false });
      
      
      setCookie('username', username);
      setCookie('password', password);
      navigate("/home");
    } catch (err) {
      const errorObj = {};
      err.inner.forEach(error => {
        errorObj[error.path] = error.message;
      });
      setErrors(errorObj);
    }
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <form className="border border-2 border-dark rounded mt-5 w-25 p-4">
        <h2 className="bi bi-person-fill"> User Login</h2>
        <dl>
          <dt>UserName</dt>
          <dd>
            <input 
              type="text" 
              className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
              placeholder="Username" 
              onChange={handleChange} 
              value={username}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </dd>
          <dt>Password</dt>
          <dd>
            <input 
              type="password" 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              placeholder="Password" 
              onChange={handlePassword} 
              value={password}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </dd>
        </dl>
        <button className="btn btn-primary w-100" onClick={handleLoginClick} type="button">Login</button><br />
        <span className="fw-bold fs-3 d-flex justify-content-center">Or</span>
        <button className="btn btn-warning w-100" onClick={handleRegisterClick} type="button">Register</button>
      </form>
    </div>
  );
}
