import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";



export default function Ligne() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [lignes, setLignes] = useState({
    id: null,
    numero: '',
    depart: '',
    arrive: '',
    prix: '',
    distance:''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

 

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/lignes/${id}`)
        .then(({data}) => {
          setLoading(false)
          setLignes(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (lignes.id) {
      axiosClient.put(`/lignes/${lignes.id}`, lignes)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/lignes')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/lignes', lignes)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/lignes')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }
  
const [station, setStation] = useState([]);
useEffect(() => {
  getStation();
}, [])
const getStation = () => {
  setLoading(true)
  axiosClient.get('/stations')
    .then(({ data }) => {
      setLoading(false)
      setStation(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
}
var stations = Object.values(station);
  return (
    <>
      {lignes.id && <h1>Update ligne: {lignes.id}</h1>}
      {!lignes.id && <h1>New ligne</h1>}
     
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <h3>numero</h3>
            <input value={lignes.numero} onChange={ev => setLignes({...lignes, numero: ev.target.value})} placeholder="numero "/>
          
        <select  value={lignes.depart} onChange={ev => setLignes({...lignes, depart: ev.target.value})} >
        <option value="--select point depart --"> --select ton depart --  </option>
        {
        stations.map(s => (
         <option key={s.id} value={s.station}>{s.station}</option>
        ))}
        </select>
        <select  value={lignes.arrive} onChange={ev => setLignes({...lignes, arrive: ev.target.value})} >
        <option value="--select point arrive --"> --select ton arrive --  </option>
        {stations.map(s => (
         <option key={s.id} value={s.station}>{s.station}</option>
        ))}
        </select>
        <h3>prix</h3>
            <input value={lignes.prix} onChange={ev => setLignes({...lignes, prix: ev.target.value})} placeholder="prix"/>
            <h3>distance</h3>
            <input value={lignes.distance} onChange={ev => setLignes({...lignes, distance: ev.target.value})} placeholder="distance"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
