import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import axios from "axios";


export default function Station() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [s, setStation] = useState({
    id: null,
    station: ''
    
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/stations/${id}`)
        .then(({data}) => {
          setLoading(false)
          setStation(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (s.id) {
        axiosClient.put(`/stations/${s.id}`, s)
          .then(() => {
            setNotification('User was successfully updated')
            navigate('/stations')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
        })
    } else {
      axiosClient.post('/stations', s)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/stations')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {s.id && <h1>Update User: {s.station}</h1>}
      {!s.id && <h1>New User</h1>}
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
          <h3>station</h3>
            <input value={s.station} onChange={ev => setStation({...s, station: ev.target.value})} placeholder="station"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
