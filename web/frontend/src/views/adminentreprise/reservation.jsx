import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link, Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Reash from "../../form/resarch.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Reservation() {
    const [reservation, setReservation] = useState([]);
    const [loading, setLoading] = useState(false);
    let {id,depart,arrive,temps} = useParams();
    if (id) {
        useEffect(() => {
          setLoading(true)
          axiosClient.get(`/getrall/${id}`)
            .then(({data}) => {
              setLoading(false)
              setReservation(data)
              console.log(data)
            })
            .catch(() => {
              setLoading(false)
            })
        }, [])
      }
    
      return (
        <div>
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            <h1>Reservation pour {depart} vers {arrive} a {temps}</h1>
            <Link className="btn-add" to={'/newreservation/'+id+'/'+depart+'/'+arrive+'/'+temps}>Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>voyage date</th>
                <th>nombre place total </th>
                <th> nombre occupe </th>
                <th>etat</th>
                <th> Actions</th>
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
                {reservation.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.voyagedate}</td>
                    <td>{u.nbrptotal}</td>
                    <td>{u.nbrpoccupe}</td>
                    <td>{u.etat}</td>
                    <td>
                      <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                      &nbsp;
                      <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
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
    

