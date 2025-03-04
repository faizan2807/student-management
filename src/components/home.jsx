import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:4000/students")
      .then(res => {
        setArr(res.data);
      });
  }, []);

  function handleEditClick(item) {

    navigate('/edit', { state: { student: item } });
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`http://127.0.0.1:4000/delete-std/${id}`)
        .then(() => {
          alert("Student deleted successfully.");
          setArr(arr.filter(item => item.id !== id));
        });
    }
  }

  function handleAddClick() {
    navigate('/add')
  }

  function handleLogoutClick() {
    navigate('/login')
  }

  return (
    <div className="container-fluid my-3">
      <div>
        <h3>Students Data <button className="btn btn-outline-success bi-plus ms-5" onClick={handleAddClick}>Add Student</button> <button className="btn btn-outline-danger bi-power float-end mx-5" onClick={handleLogoutClick}> Log out</button></h3>

      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {arr.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.FirstName}</td>
              <td>{item.LastName}</td>
              <td>{item.Email}</td>
              <td>{item.Mobile}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEditClick(item)}>Edit</button>
              </td>
              <td>
              <button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
