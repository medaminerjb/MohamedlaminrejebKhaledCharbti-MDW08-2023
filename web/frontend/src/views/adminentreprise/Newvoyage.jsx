import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";

export default function Newvoyage() {
  const navigate = useNavigate();
  let {id} = useParams();
  const {setIden,iden} = useStateContext();
  const [lignes, setLignes] = useState([]);
  const [voyage, setvoyage] = useState({
    id: null,
    temps: '',
    lignes_id: '',
    entreprise_id: iden
  })
  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/lignes/${id}`)
        .then(({data}) => {
          setLoading(false)
          setLignes(data)
          console.log(lignes)
        }).catch(() => {
          setLoading(false)
        })
    }, [])
  }
 
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  voyage.lignes_id=id

  const onSubmit = ev => {
    ev.preventDefault()
    
      axiosClient.post('/postvoyage', voyage)
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
  
 console.log(voyage)
 console.log(lignes)


  return (
    <>
      
      {!loading && <h1> New voyage {lignes.depart } vers {lignes.arrive}</h1>}
     
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
            <h3>temps</h3><br/>
            <input value={voyage.temps} onChange={ev => setvoyage({...voyage, temps: ev.target.value})} placeholder="temps"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>)}