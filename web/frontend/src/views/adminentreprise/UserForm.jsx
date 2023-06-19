import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const {iduser,setUserid,setIden,iden} = useStateContext();
  const currentjour = new Date().getDate() 
const currentMonth = new Date().getMonth()+1
const currentyear = new Date().getFullYear()
 
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id:'3'
  })
  const [userinf, setUserinf] = useState({
    id: null,
    name: 'name',
    email: 'name@email.com',
    telephone: '0',
    adresse: '0',
    cin:'',
    poste:'',
    salaire:'',
    nombredejour: '0',
    currentjour: '0',
    currentmois: '0',
    conjirestant:'0',
    entreprise_id:'',
    user_id:''
  })
  const [pointage, setPointage] = useState({
    id: null,
   
    user_id:'',
    entreprise_id:''
  });
  const [fiche, setFiche] = useState({
    id: null,
    nombredejour: '0',
    conjirestant: '0',
    salaire: '0',
    entreprise_id:'',
    user_id:''
  })

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [etape2, setetape2] = useState(false)
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
        axiosClient.get(`/getemploye/${id}`).then((
          {data})=>{
            setUserinf(data[0])
          }
        ) 


    }, [])
  }
  
 

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('Utilisateur est modifier avec succes')
          navigate('/users')

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
          setNotification('Utilisateur est crér avec succes ')
          setUser(data.data)
          setetape2(true)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
       
        })
       
      
        console.log(user)

        




    }
  }
  userinf.entreprise_id=iden

  const onSubmis = ev => {
    ev.preventDefault()
    userinf.currentjour = currentjour
     
    userinf.currentmois=currentMonth
    userinf.name=user.name
    userinf.user_id=user.id
    
    axiosClient.post('/employeinf', userinf)
    .then(() => {
      setNotification('employe est ajouter avec succes')
     setetape2(false)
      
    })
    
    fiche.entreprise_id=iden
          fiche.user_id=userinf.user_id
          axiosClient.post('/newfiche', fiche)
          .then(() => {
            setNotification('fiche creted succes ')
            navigate('/employes')
          })


    


  }
  console.log(user.password)
  user.password=user.name+userinf.cin
  return (
    <>
      {user.id && <h1> Employe: {user.name}</h1>}
      {!user.id && <h1>Ajouter un employé </h1>}
     
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

        
        {!loading &&!etape2&& (
          <form onSubmit={onSubmit}>
            <h3>nom</h3>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <h3>nom</h3>

            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <h3>email</h3>
           <input  value={userinf.cin} minLength={8} maxLength={8} type="number" onChange={ev => setUserinf({...userinf, cin: ev.target.value})} placeholder="cin"/>
           

            <button className="btn">Sauvgarder </button>
          </form>
        )}
        {!loading &&etape2&& (
          <form onSubmit={onSubmis}>
            
        
            
            <h3>poste</h3>
            <input value={userinf.poste} onChange={ev => setUserinf({...userinf, poste: ev.target.value})} placeholder="poste de employe"/>
            <h3>salaire</h3>
            <input value={userinf.salaire} onChange={ev => setUserinf({...userinf, salaire: ev.target.value})} placeholder="salaire"/>
            
         
            <button className="btn">Sauvgarder </button>
          </form>
        )}
      </div>
    </>
  )
}
