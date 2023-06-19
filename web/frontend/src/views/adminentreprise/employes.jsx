import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Employes() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {iden , setiden}= useStateContext();
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = (user,id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/deleteemploy/${user}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
    axiosClient.delete(`/deleteuser/${id}`)
      .then(() => {
        setNotification('User was successfully deleted')
      })
     
      
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get(`/getallemploys/${iden}`)
      .then(({ data }) => {
        setLoading(false)
        setUsers(data)
        console.log(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  console.log(users)

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>employes</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Telephone</th>
            <th>adresse</th>
            <th>poste</th>
            <th>salaire</th>
            <th>action</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
        
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.telephone}</td>
                <td>{u.adresse}</td>
                <td>{u.poste}</td>
                <td>{u.salaire}</td>
              
                
                <td>
                  <Link className="btn-edit" to={'/users/' + u.user_id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u.id,u.user_id)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
