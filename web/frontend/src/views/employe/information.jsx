import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";
import { Link } from "react-router-dom";

export default function Information() {
  const navigate = useNavigate();
 
  const [usernb ,setUsernb]= useState({})
  const {iduser,setUserid} = useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    role_id:''
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

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (iduser) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/getuser/${iduser}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
         
        })
        .catch(() => {
          setLoading(false)
        });
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
  }



 
console.log(user)
  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${userinf.user_id}`, user)
        .then(() => {
          console.log(user.email)
          setNotification('ton information est modifier')
          axiosClient.put(`/putemploye/${userinf.id}`, userinf)
          .then(() => {
            setNotification('User was successfully updated')
         
           navigate('/pointage')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
       




    } 
  }
  var rjb=user.name ; 

  console.log(user.id)

  return (
    <>
      
    <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
      <h1>information</h1>
    
     

      
    </div>
   
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
            <h3>nom</h3>
      
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <h3>poste</h3>
         
            <input value={userinf.poste} onChange={ev => setUserinf({...userinf, poste: ev.target.value})} placeholder="poste de employe"/>
           <h3>telephone</h3>
          
            <input value={userinf.telephone} minLength={8} maxLength={8} onChange={ev => setUserinf({...userinf, telephone: ev.target.value})} placeholder="telephone"/>
            <h3>adresse</h3>
           
            <input value={userinf.adresse}  onChange={ev => setUserinf({...userinf, adresse: ev.target.value})} placeholder="adresse"/>
            <h3>email</h3>
            
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <h3>password</h3>
          
            
            <input  type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="New Password"/>
           

            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
