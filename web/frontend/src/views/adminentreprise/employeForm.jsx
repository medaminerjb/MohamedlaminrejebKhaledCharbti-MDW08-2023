import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";

export default function EmployeForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id:'3'
  })
  const [employe, setEmploye] = useState({
    id: null,
    name: '',
   telephone:'',
   adresse:'',
   poste:'',
   cin:'',
   salaire:'',
   user_id:'',
   entreprise_id:''
  })

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [etape1, setEtape1] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }
  const onSubmit2 = ev => {
    ev.preventDefault()
   
         {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/users')


        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }
  employe.id=user.id
  if(etape1){
    useEffect(() => {
        
          axiosClient.get(`/getuser/${email}`).then(({data}) => {
            setLoading(false)
            setUser(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])

  }
  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          setEtape1(true)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created')
          setEtape1(true)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }
  employe.user_id=user.id
email=user.email
  employe.entreprise_id=id
  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
     
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
            <input value={user.name}  onChange={ev => setUser({...user, name: ev.target.value})}  setplaceholder="Name"/>
            <h3>email</h3>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <h3>cin</h3>
            <input type="text" onChange={ev => setEmploye({...employe, cin: ev.target.value})} placeholder="cin"/>
            <h3>password</h3>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>

            <button className="btn">Sauvgarder</button>
          </form>
        )}
        {!loading&&etape1&&
         <form onSubmit={onSubmit2}>
            <h3></h3>
         <input value={employe.telephone}  onChange={ev => setEmploye({...employe, telephone: ev.target.value})}  setplaceholder="Name"/>
 
         <input value={employe.adresse} onChange={ev => setEmploye({...employe, adresse: ev.target.value})} placeholder="Email"/>
         <input  value={employe.poste} onChange={ev => setEmploye({...user, password: ev.target.value})} placeholder="Password"/>
         <input  value={employe.salaire} onChange={ev => setEmploye({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
         

         <button className="btn">Save</button>
    </form> }
      </div>
    </>
  )
}
