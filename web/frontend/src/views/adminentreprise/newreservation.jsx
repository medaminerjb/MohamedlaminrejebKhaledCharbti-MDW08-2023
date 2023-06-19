import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link, Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Reash from "../../form/resarch.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Newreservation(){
    const navigate = useNavigate();
    const [voyagedatee,setVoyagedate] = useState([]);
    const {setIden,iden} = useStateContext();
    let {id} = useParams();
    useEffect(() => {
        getDate();
      
      }, [])

    const getDate = () => {
       
        console.log(id)
        axiosClient.get(`getdateall/${id}`)
          .then((reponse) => {
    
           setVoyagedate(reponse.data)
           console.log(reponse.data)
           setReservationss(true)
           console.log(voyagedatee.voyagedate)
          
            
          }).catch((error)=>
          {console.log(error)});
          
      }
      const disable = Object.keys(voyagedatee).map(index => {
        return`${voyagedatee[index].voyagedate}`;
      });
      let bn=disable.concat(disable);
       console.log(bn)
  
  console.log(bn)

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const isDisabled = disable.includes(selectedDate);
    if (isDisabled) {
      event.target.value = ''; // Clear the selected value
      alert('Date is disabled');
    }
  };

const [reservatione , setReservation] = useState({
    id:null,
    nbrptotal:'50',
    nbrpoccupe:'0',
    voyagedate:'',
    etat: 'empty',
    voyage_id:'1',
    entreprise_id: iden

  })
reservatione.voyage_id = id
console.log(reservatione.voyage_id)
  const onReserve = ev => {
    ev.preventDefault()
    axiosClient.post('/newreserve', reservatione).then(()=>{
   
     navigate('/voyage')
    })

}
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
  return (
    <div>
         <form onSubmit={onReserve}>
      <label htmlFor="myDateInput">Select a date:</label>
      <input type="date" id="myDateInput" min={getFormattedDate()} onChange={ev=>{handleDateChange(ev),setReservation({...reservatione,voyagedate:ev.target.value})}} />
      <button className="btn">submit</button>
      </form>

    </div>
  );
}