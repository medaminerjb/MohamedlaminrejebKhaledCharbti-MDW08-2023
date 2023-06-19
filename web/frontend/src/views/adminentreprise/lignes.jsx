import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link,Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Lignes() {
  const [lignes, setLignes] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getLignes();
  
  }, [])

  const onDeleteClick = lignes => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/lignes/${lignes.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getLignes()
      })
  }
  

  const getLignes = () => {
    setLoading(true)
axiosClient.get('/lignes')
      .then(({ data }) => {
        setLoading(false)
        setLignes(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  
  const lign=lignes.map((l => (
    <tr key={l.id}>
      <td>{l.id}</td>
      <td>{l.numero}</td>
      <td>{l.depart}</td>
      <td>{l.arrive}</td>
      <td>{l.distance}</td>
      <td>{l.prix}</td>
       <td><Link className="btn-edit" to={'/newvoyage/'+ l.id}>ajouter</Link></td>
   
    </tr>
  )))

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>lignes </h1>
        <Link className="btn-add" to="/lignes/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>numero</th>
            <th>depart</th>
            <th>arrive</th>
            <th>distance</th>
            <th>prix</th>
            <th>new voyage</th>

        
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
            {lign}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
