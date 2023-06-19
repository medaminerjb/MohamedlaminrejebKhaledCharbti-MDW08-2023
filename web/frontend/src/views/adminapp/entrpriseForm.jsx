import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";
/*import nodemailer from 'nodemailer';*/

export default function EntrepriseForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [usernb ,setUsernb]= useState({})
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id:'2'
  })
  const [userinf, setUserinf] = useState({
    id: null,
    name: 'name',
    pays: 'pays',
    adresse:'adresse',
    telephone: 'telephone',
    user_id:''
  })
  userinf.name=user.name
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
          console.log(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }
 
console.log(userinf)
  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/users')
          console.log(user.id)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then((data) => {
          setNotification('User was successfully created')
          setUsernb(data.data)
          console.log(data.data.id)
      /*  const transporter = nodemailer.createTransport({
    service: 'your_email_service',
    auth: {
      user: 'admin@admin.com',
      pass: ''
    }
  });

  // Define the email content
  const mailOptions = {
    from: 'admin@admin.com',
    to: user.email,
    subject: 'authentifition',
    text: 'ton adresse email est '+user.email+'ton passwordest'+user.password,
    html: '<h1>Email body</h1>'
  };*/
        userinf.user_id=data.data.id
          axiosClient.post('/entrepriseinf', userinf)
      .then(() => {
        navigate('/admin')
       
        
      })
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
       
        userinf.user_id=usernb.id
        console.log('theis'+usernb.id)
    if(usernb.id)
    {
      userinf.user=usernb.id
      
    }




    }
  }
user.password= userinf.pays+user.name

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New entreprise</h1>}
     
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
            
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={userinf.pays} onChange={ev => setUserinf({...userinf, pays: ev.target.value})} placeholder="pays"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
         
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
