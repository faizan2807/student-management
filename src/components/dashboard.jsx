import { useNavigate } from "react-router-dom"
import './dashboard.css'


export function Dashboard(){

    let navigate = useNavigate();

    function handleLoginClick(){
        navigate("/login")
    }

    function handleRegisterClick(){
        navigate("/register")
    }

    return(
      <div className="container-fluid d-flex justify-content-center align-items-center banner ">
       
            <button className="btn btn-primary mx-3 " onClick={handleLoginClick}>Login</button>
            <button className="btn btn-warning" onClick={handleRegisterClick}>Register</button>
       
      </div>
    )
}