import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function ConjiEtat() {
  const {iden , setiden}= useStateContext();
    const [conji, setConji] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reject, setReject] = useState(false);
    const [accept, setAccept] = useState(false);
    const [employe, setEmploye] = useState(false);
    const {setNotification} = useStateContext()
    const getConji = etat => {
if(etat==="Reject conji ")
{setReject(true)
    setAccept(false)
console.log(etat)

}
if(etat==="accept conji")
{setAccept(true)
 setReject(false)
console.log(etat)

}
if(etat==="non verifé")
{
    setReject(true)
    setAccept(true)

}

        setLoading(true)
        axiosClient.get(`/getconji/${etat}/${iden}`)
          .then(({ data }) => {
            setLoading(false)
            setConji(data)
            console.log(data)

          })
          .catch(() => {
            setLoading(false)
          })
      }


      let s 

      
      var con = Object.values(conji);
      console.log(con)
      const onReject = conji => {
        setLoading(true)
        if (!window.confirm("are you sure to reject conji employe")) {
          return
        }
        axiosClient.put(`/rejectconji/${conji.id}`)
          .then(() => {
           
            setNotification('rejected conji saye ')
            getConji(conji.etat)
            setLoading(false)
          })
      }
      const onAccept = conji => {
        setLoading(true)
        if (!window.confirm("are you sure to accept conji employe")) {
          return
        }
        axiosClient.put(`/accpectconji/${conji.id}`)
          .then(() => {
            
            setNotification('acppted conji saye')
            console.log(conji.etat)
          
            setLoading(false)
            getConji(conji.etat)

          })
      }

   
const getEmploye =()=>{


}
    return (

        
        <div>

        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            <h1>Congés</h1>
            
            <button className="btn-add" onClick={ev => getConji(s="accept conji")}>accpeté</button>
            <button className="btn-add" onClick={ev => getConji(s="Reject conji ")}>rejecté</button>
            <button className="btn-add" onClick={ev => getConji(s="non verifé")}>no verifié </button>
        
          </div>
          {
          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
               
                <th>Nombre De Jour</th>
                <th>Date de Congé</th>
               
               
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
              {!loading &&
                <tbody>
               {conji.map(u => {
  const currentDate = new Date(); // Get the current date and time
  const conjiDate = new Date(u.dateconji); // Assuming `dateconji` is in a valid date format

  const isDatePassed = conjiDate < currentDate; // Compare the conjiDate with the current date

  // Display the row only if the date hasn't passed yet
  if (!isDatePassed) {
    return (
      <tr key={u.id}>
        <td>{u.name}</td>
        <td>{u.reason}</td>
        <td>{u.nbrjr}</td>
        <td>{u.dateconji}</td>
        
        <td>
          {reject && <button className="btn-add" onClick={ev => onAccept(u)}>Accept</button>}
          &nbsp;
          {accept && <button className="btn-delete" onClick={ev => onReject(u)}>Reject</button>}
        </td>
      </tr>
    );
  }

  return null; // Return null if the date has already passed
})}
                </tbody>
              }
            </table>
          </div>
}
        </div>
      )
    }
    