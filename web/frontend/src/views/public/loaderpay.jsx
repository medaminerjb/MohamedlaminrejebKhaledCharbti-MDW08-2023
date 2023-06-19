
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import styled from 'styled-components';
import Loadercss from "./publiccss/loadercss.jsx";








export default function Loader(){
  const navigate = useNavigate();
let {id,voyage_id,lignes_id,reservation_id}=useParams();
const {setNotification} = useStateContext()
const [load,setload]= useState(false);
const [verfication,setverification]= useState(false);
const [refuse,setrefuse]=useState(false);

    const   [paye,setpaye] = useState({
      id : null,
    etat:'',
    
    })
    const [reservatione , setReservation] = useState({
      id:null,
      nbrptotal:'',
      nbrpoccupe:'',
      voyagedate:'',
      etat: '',
      voyage_id:'',
      entreprise_id:'0'

    })
    const [billet, setBillet] = useState({
      id: null,

      numero: '5',
      validite: 'valide',
      reservations_id: '0',
      entreprise_id:'0'
      
    })
    const [loading, setLoading] = useState(false);
    

   
    if(id&&reservation_id)
    {useEffect(() => {
      
     if((reservatione.id===null)&&(!loading))
     { axiosClient.get(`/payments/${id}`)
        .then(({data}) => {
          setpaye(data[0])

//test de validtion de paiment 
if(data.length!==0)
         { 
         if(data[0].etat=='non valid')
         {
          setLoading(false)
         }
          if(data[0].etat=='valid')
          {
            
            setLoading(true)
          }
          if (data[0].etat=='refuse')
          {
            setrefuse(true)
          }}
          else{navigate('/accueil')}
          
     
          
        })
        axiosClient.get(`/getrb/${reservation_id}`)
        .then(({data}) => {
          
        setReservation(data[0])
        if(data.length!==0)
        {
          
        }else{navigate('/accueil')}
        
        });
       
      }
    



      }
      
        );}
       
      let test=0

      const  gettest=()=>{
       if((reservatione.id!==null)&&paye)
        { if(reservatione.id&&paye.etat)
        {
          if(reservation_id==id)
          {
            test=1
            
          }
          
        }}
      }
       
       
        const getmyticket=()=> {

          billet.entreprise_id=reservatione.entreprise_id
         console.log('here')
         console.log(reservatione.id+'js')
          if((reservatione.id))
          {
            if(reservatione.nbrpoccupe =='50'){
            reservatione.etat='full'
            axiosClient.put(`/reserveputetat/${reservatione.id}`, reservatione)
            .then(() => {
            
           console.log('sayee')
              
            })
            setNotification('the reservation is full')
            console.log('hello')
            setload(true)
          }
  
          if( reservatione.nbrpoccupe < '50' )
        { 
      reservatione.nbrpoccupe=reservatione.nbrpoccupe+1
  billet.reservations_id=reservatione.id
      axiosClient.post(`newbillet/`, billet).then(response => {
        const data = response.data
        setBillet(data)
        console.log(response.data)
        navigate('/billet/'+response.data+'/'+voyage_id+'/'+lignes_id+'/'+billet.reservations_id)
      
  
      })
  
  
  
      axiosClient.put(`/reserveput/${reservatione.id}`, reservatione)
      .then(() => {
        setNotification('User was successfully updated')
     
        
      }).catch(console.log('eror'))
  
        setload(true)
        }}

        }
       
const getrefuse =() =>{
  navigate('/acceuil')
}



    return(
        <Loadercss>
     
{!loading&&!verfication&&!refuse&& test==0&&<div class="loader">
  <div class="bar1"><h1>L</h1> </div>
  <div class="bar2"><h1>O</h1></div>
  <div class="bar3"><h1>a</h1></div>
  <div class="bar4"><h1>d</h1> </div>
  <div class="bar5"><h1>i</h1>  </div>
  <div class="bar6"> <h1>n</h1> </div>
<div class="bar7" > <h1>g</h1> </div>
</div>
}
{loading&&!refuse&&!verfication&&test==0&& <div class="loader">


 <button onClick={getmyticket} class="btn">contiune vers le ticket</button>
</div>

}
{!loading&&refuse&&!verfication&& <div class="loader">

<button onClick={getrefuse} class="btn">on reserve nouveau</button>
</div>

}
{test==1&& <div class="loader">

<h1>il y ne pas</h1>
</div>

}

  
</Loadercss>


    )
}