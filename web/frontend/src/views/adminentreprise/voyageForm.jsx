import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";

export default function Voyageform() {
  const navigate = useNavigate();
  let {id} = useParams();
  let {lignes_id} = useParams();
  const [voyage, setvoyage] = useState({
    id: null,
    temps: '',
    lignes_id: '',
  })
 
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/voyage/${id}`)
        .then(({data}) => {
          setLoading(false)
          setvoyage(data[0])
          console.log(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (voyage.id) {
      axiosClient.put(`/users/${voyage.id}`, voyage)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/voyage')
          console.log(voyage.id)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/voyage', voyage)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/voyage')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }
  voyage.lignes_id=lignes_id
console.log(voyage.lignes_id)
  console.log(lignes_id)

  return (
    <>
      {id && <h1>Update User: </h1>}
      {!voyage.id && <h1> New User {lignes_id}</h1>}
     
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
           
            <input value={voyage.temps} onChange={ev => setvoyage({...voyage, temps: ev.target.value})} placeholder="temps"/>
            <button className="btn">Sauvgarder</button>
          </form>
        )}
      </div>
    </>)}