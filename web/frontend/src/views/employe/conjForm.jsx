import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";


export default function ConjiForm() {
  const navigate = useNavigate();
  const {user,setUser}=useStateContext();
  const [conjicheck, setConjicheck] = useState(false)
   const {iduser,setUserid} = useStateContext();
  const [employe, setEmploye]=useState([])
  const [conji, setConji] = useState({
    id: null,
    name: '',
  reason:'',
  nbrjr:'',
  date:'',
user_id:'',
etat:'non verifé'
  })
  
  const [conji2, setConji2] = useState({
    id: null,
    name: '',
  reason:'',
  nbrjr:'',
  date:'',
user_id:'',
entreprise_id:'',
etat:''
  })
  const [userinf, setUserinf] = useState({
    id: null,
    name: '',
    telephone: '',
    adresse: '',
    poste:'',
    salaire:'',
    entreprise_id:'',
    user_id:''
  })

conji.user_id=iduser

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
 
  useEffect(() => {
    setLoading(true)
    axiosClient.get(`/conjicheck/${iduser}`)
      .then(({data}) => {
        setLoading(false)
        setConji2(data)
        console.log(data)
       
      }).catch(() => {
        setLoading(false)
      })
      axiosClient.get(`/getemploye/${iduser}`)
        .then(({data}) => {
          setLoading(false)
          setUserinf(data[0])
          console.log(data[0])
        })
        .catch(() => {
          setLoading(false)
        });



  }, [])
   console.log(userinf)
const clickold = ()=>{
  if(!conjicheck)
  {setConjicheck(true)}
 else{setConjicheck(false)}

}
  
  const onSubmit = ev => {
    ev.preventDefault()
    conji.entreprise_id=userinf.entreprise_id
      axiosClient.post('/conji', conji)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/pointage')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    
  }
  var co  = Object.values(conji2); 
  console.log(co)

 const currentMonth = new Date().getDate() 


 console.log(currentMonth+1)
 function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

  return (
    <>
       <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
      <h1>Congé</h1>
    
     

      {!loading&&!conjicheck&&<button className="btn-add" to="/voyage/" onClick={clickold} >conji all  </button>}
      {!loading&&conjicheck&&<button className="btn-add" to="/fiche" onClick={clickold}>New Conji </button> }
    </div>
     <br />
   
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
     
        {!loading && !conjicheck&&  (
          <form onSubmit={onSubmit}>
           <h3>nom</h3>
            <input value={conji.name} onChange={ev => setConji({...conji, name: ev.target.value})} placeholder="Name"/>
            <h3>raison</h3>
            <input value={conji.reason} onChange={ev => setConji({...conji, reason: ev.target.value})} placeholder="reasan"/>
            <h3>nombre de jour demandé</h3>
            <input value={conji.nbrjr} onChange={ev => setConji({...conji, nbrjr: ev.target.value})} placeholder="nbr dejour"/>
            <h3>date</h3>
            <input min={getFormattedDate()} type="date" onChange={ev => setConji({...conji, date: ev.target.value})} placeholder="nbr dejour"/>
          

            <button className="btn">Sauvgarder</button>
          </form>
        )}
      {!loading&&conjicheck&&  
     <div>
        <h1 > All congés</h1>
        <br/>
        <table >
          <thead>
          <tr>
            <th>nombre de jour congé</th>
            <th>date de congés</th>
            <th>etat</th>
            <th>action</th>
           
          
            
          </tr>
          </thead>
          <tbody>
           
          {co.map(c => (
              <tr key={c.id}>
                <td>{c.nbrjr}</td>
                <td>{c.dateconji}</td>
                <td>{c.etat}</td>
              
                <td>
                 
                 
                </td>
              </tr>
            ))}
            </tbody>
            </table>
         </div>
      }
</div>
      </>


  )
}
