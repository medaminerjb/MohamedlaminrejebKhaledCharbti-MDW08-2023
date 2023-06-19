import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link, Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Reash from "../../form/resarch.jsx";
import { useNavigate } from "react-router-dom";

export default function Voyage() {
  const [voyage, setvoyage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pret, setPret] = useState(false);
  const [resh,setResh] = useState(true);
  const [news, setNews ] = useState(false); 
  
  const {setNotification} = useStateContext()

  useEffect(() => {
    getLignes();
    getStation();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${reservation.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getReservation()
      })
  }

  
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate();
  const [res, setRes] = useState({
    id: null,
    depart: '',
    arrive: ''
  })
  const [submit, setSubmit] = useState(false)

const [station, setStation] = useState([]);
const [lignes, setLignes] = useState([]);

const getLignes = () => {
  setLoading(true)
axiosClient.get('/ligness')
    .then(({ data }) => {
      setLoading(false)
      setLignes(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
}
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
let id

var stations = Object.values(station);
const lign=lignes.map((s => 
  {
      if((s.arrive == res.arrive )&&(s.depart===res.depart))
      {
         id=s.id;
     
     
      } 
    }))
    


    const OnSubmit=()=> {
      setLoading(true)
      setPret(true)
      axiosClient.get(`/voyage/${id}`)
        .then(({ data }) => {
          console.log('rjb')
      
          setvoyage(data)
         if(data.length > 0 ) 
         { setPret(false)
          setResh(false)
          setNews(true)}
          else{
            setErrors('donnée ne est pas validé ');
          }
        })
        .catch(() => {
          setLoading(false)
        })
    }

    
    const OnRefresh=()=> {
      setPret(true)
      setResh(true)
      setNews(false)
    }
    const New=()=> {
    
 navigate('/newvoyage/'+id);
    }
     
   let us
    const getReservation = us=> {
      
     navigate('/reservation/'+us.id+'/'+res.depart+'/'+res.arrive+'/'+us.temps)
    }
  
    
    


    

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Voyage</h1>
      
        <Link className="btn-add" to="/voyage/ " onClick={OnRefresh}>Refresh</Link>

       
        
      </div>
     
     
{

resh&&
  
  <div class= "card"> 
     <div className= "form2">
   
     <h2 className="title">BUS TRAFFIC &nbsp;&nbsp; </h2> <br />
     {errors && (
  <div className="alert">
    <p>{Object.keys(errors).map(key => errors[key]).join('')}</p>
  </div>
)}
     {

        <select value={res.depart} onChange={ev => setRes({...res, depart: ev.target.value})} >
        <option value="--select ton depart --"> --select ton depart --  </option>
        {stations.map(s => (
         <option key={s.id} value={s.station}>{s.station}</option>
        ))}
        </select>
      }
      {
        <select value={res.arrive} onChange={ev => setRes({...res, arrive: ev.target.value})}>
       <option value="--select ton destination --"> --select ton destination --  </option>
       
        {stations.map(s => (
         <option key={s.id} value={s.station}>{s.station}</option>
        ))}
        </select>
      }
      
      <button type="submit" onClick={OnSubmit} className="btn btn-block">recherche</button>
   
        
       </div>
    </div>
    }


    


    
      {!pret
      &&!resh&&
      
      
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>temps</th>
            <th>depart</th>
            <th>arrive</th>

            <th>action</th>
            <th></th>
            
          </tr>
          </thead>
          
          {
            <tbody>
            {voyage.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.temps}</td>
                <td>{res.depart}</td>
                <td>{res.arrive}</td>
           
                <td>
                <Link className="btn-edit" to={'/voyage/' +r.id}>Edit</Link>
        &nbsp;
                  <button className="btn-delete" onClick={ev => getReservation(r)}>Reservation</button>
                 
                </td>
                <td> <button className="btn-delete" onClick={ev => onDeleteClick(r)}>Delete</button></td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>}
    </div>
  )
}
