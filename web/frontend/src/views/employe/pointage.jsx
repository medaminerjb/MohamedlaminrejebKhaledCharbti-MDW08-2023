import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";
import { Link } from "react-router-dom";

export default function Pointage() {
  const navigate = useNavigate();
  const {iduser,setUserid}=useStateContext();
  const [loading, setLoading] = useState(false)
  const [verifpointage, setVerifpointage] = useState(false)
  const {setNotification} = useStateContext()

  const [userinf, setUserinf] = useState({
    id: null,
    name: '',
    email: '',
    telephone: '',
    adresse: '',
    poste:'',
    nombredejour: '',
    currentjour: '',
    currentmois: '',
    conjirestant:'',
    salaire:'',
    entreprise_id:'',
    user_id:''
  });
  const [pointage, setPointage] = useState({
    id: null,
    nombredejour: '0',
    currentjour: '0',
    currentmois: '0',
    conjirestant:'0',
    user_id:'',
    entreprise_id:''
  });
  
  const currentjour = new Date().getDate() 
const currentMonth = new Date().getMonth()+1
const currentyear = new Date().getFullYear()
 
  if (iduser) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/getemploye/${iduser}`)
        .then(({data}) => {
          setLoading(false)
          setUserinf(data[0])
         
        })
        .catch(() => {
          setLoading(false)
        });
        axiosClient.get(`/getpointage/${iduser}`)
        .then(({data}) => {
          setLoading(false)
          setPointage(data[0])
          
        })
        .catch(() => {
          setLoading(false)
        });


    }, [])
  }
  console.log(pointage)
  
let test=0

if(userinf)
{
  if((userinf.currentjour==currentjour)&&(currentMonth==userinf.currentmois))
{
    test=1

}}



const pointe = () =>{


  if(userinf) { if((currentMonth>pointage.currentmois)&&(userinf.currentmois))
    {userinf.nombredejour=0}
    userinf.currentjour=currentjour
    userinf.nombredejour=userinf.nombredejour+1
    userinf.currentmois=currentMonth

   if(currentjour==24){ if (!window.confirm("ce le primer jour de mois est ce que tu as prendré fiche de paie")) {
        return
      }}



     axiosClient.put(`/putemploye/${userinf.id}`, userinf)
    .then(() => {
      setNotification('vous etes pointe avec succes ')
   
      
    })}
    


}






console.log(pointage)

return(
    <div>
    <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
      <h1>Pointage</h1>
    
     

      {test==0&&<button className="btn-add" to="/voyage/" onClick={pointe}>Pointé </button>}
      <Link className="btn-add" to="/fiche" >fiche de paie </Link> <br /> 
    </div>
   
    <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>nombre de jour travaillé</th>
            <th>dernier jour pointage</th>
            <th>congé restant</th>
           
          
            
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading&&userinf&&
            <tbody>
           
              <tr >
                <td>{userinf.nombredejour}</td>
                <td>{currentyear}/{userinf.currentmois}/{userinf.currentjour}</td>
                <td> {userinf.conjirestant}</td>
            
             
        
              </tr>
        
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
