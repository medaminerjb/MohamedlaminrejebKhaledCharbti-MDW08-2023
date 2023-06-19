import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Stations() {
  const [stations, setstations] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getStation();
  }, [])

  const onDeleteClick = stations => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/stations/${stations.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getStation()
      })
  }
  

  const getStation = () => {
    setLoading(true)
    axiosClient.get('/stations')
      .then(({ data }) => {
        setLoading(false)
        setstations(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>stations</h1>
        <Link className="btn-add" to="/stations/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>NOM</th>
        
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
            {stations.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.station}</td>
             
               {/* <td>
                  <Link className="btn-edit" to={'/stations/' +s.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(s)}>Delete</button>
            </td>*/}
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
