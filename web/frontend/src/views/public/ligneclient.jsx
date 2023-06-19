import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link,useParams,useNavigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import  QRCode  from "react-qr-code";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import moment from 'moment';
import { addDays } from "date-fns";
import styled from "styled-components";
import {createRef} from "react";
import CarteCss from "./publiccss/cartecss.jsx";






export default function LigneClient(){
    const navigate = useNavigate();
    let {id} = useParams();
    let voyageid
    const [diisabledDates, setDisabledDates] = useState([]);
    const [errors, setErrors] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date());
   
      const [billet, setBillet] = useState({
        id: null,
        numero: '5',
        validite: 'valide',
        reservations_id: '',
        
      })
        const   [paye,setpaye] = useState({
          id : null,
          name : '',
        paymentdate:'',
        total:'',
        email:'',
        etat:'',
        methode:'',
        reservation_id:''
        })
       
      const [reserve, setReserve] = useState({
        id: null,
        date: '',
        voyage_id: '',
        entreprise_id : ''
        
      })

      const [reservatione , setReservation] = useState({
        id:null,
        nbrptotal:'50',
        nbrpoccupe:'1',
        voyagedate:'01/01/2022',
        etat: 'empty',
        voyage_id:'1',
        entreprise_id:''

      })
     
     
    
    const[voyage,setVoyage] = useState([]);
    
    const [lignes, setLignes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [reserveee, setReserveee] = useState(true);
  const [empty,setEmpty] = useState(false)
  const [reservationss, setReservationss] = useState(false);
  const [des, setDes] = useState({
    id: null,
   voyage_id:'',
   voyagedate:''
  })
  const[entreprise,setentreprise] = useState([]);
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      //recuprer les données de voyage tellque le ligne et voyage et reservations  
      axiosClient.get(`/gligne/${id}`)
        .then(({data}) => {
          setLoading(false)
          setLignes(data)
        }),
        axiosClient.get(`/voyage/${id}`).then(({data}) => {
          setLoading(false)
          setVoyage(data)
           if(data.length==0)
           {
            setNotification('il ne a pas des voyages disponible ')
            navigate('/accueil')
            setEmpty(true)
           }

        })
        .catch(() => {
          setLoading(false)
        })
        axiosClient.get('/getentreall').then(({data}) => {
          setLoading(false)
          setentreprise(data)
        })
    }, [])
  }



  const change=()=>{
    disab();
  }

  //recuprer le disaled date depuis le base de données
  const disab=()=>{
    useEffect(() => {
    
    axiosClient.get(`/getdate/${des.voyage_id}`)
      .then(({data}) => { 
        setDisabledDates(data)
      }) .catch(() => {
        setLoading(false)
      })
  }, [])
  
    }
    

  function Reserve() {
  
  if(!loading2){
   setLoading2(true)

  }
  else{setLoading2(false)}

}
const rjb=()=>{
  setLoading2(false);
  }
  let  date 
  const [error, setError] = useState(null)
  const [voyagedatee,setVoyagedate] = useState([]);


 // recuprer les date disponible pour une voyage 
  const getDate = (v_id ,e_id,prix) => {
    paye.total=prix
    reserve.voyage_id=v_id
    reserve.entreprise_id=e_id
    console.log(reserve.voyage_id+'test'+e_id)

    axiosClient.get(`getdate/${v_id}/${e_id}`)
      .then((reponse) => {

       setVoyagedate(reponse.data)
       console.log(reponse.data)
       setReservationss(true)
       console.log(voyagedatee.voyagedate)
      
        
      }).then (data=>{
        // Map API response to Moment.js objects
        const disabledDatesArray = data.map(date => moment(date, 'YYYY-MM-DD'));
        // Set disabled dates in state
        setDisabledDates(disabledDatesArray);
      console.log(diisabledDates)
      }).catch((error)=>
      {console.log(error)});
      
  }
  //change le date de object to array
  const disable = Object.keys(voyagedatee).map(index => {
    return`${voyagedatee[index].voyagedate}`;
  });
 
  const diss = voyagedatee.map(item => item.name);
  
  
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const isDisabled = disable.includes(selectedDate);
    if (isDisabled) {
      event.target.value = ''; // Clear the selected value
      alert('the date selected is full try other date please');
    }
  };


/*  const isDateDisabled = date => {
    const formattedDate = date.toISOString().split('T')[0];
    return diisabledDates.includes(formattedDate);
  };*/



  const voyagess = voyage.map((v) => (
    <tr key={v.id}>
      <td>{lignes.numero}</td>
      <td>{v.temps}</td>
      <td>{lignes.depart}</td>
      <td>{lignes.arrive}</td>
      <td>{lignes.distance}km</td>
      <td>{lignes.prix} d</td>
      {entreprise.map((e) => (
        <>
          {e.id == v.entreprise_id && (
            <>
              <td>{e.name}</td>
              <td>
                <button className="btn-edit" onClick={(ev) => getDate(v.id, e.id, lignes.prix)}>Reserve</button>
              </td>
            </>
          )}
        </>
      ))}
    </tr>
  ));
   
    des.voyagedate=selectedDate
 
/*
var voyages = Object.values(voyage);
var voyagedat = Object.values(voyagedatee)*/
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const [paymentMethods, setPaymentMethods] = useState([]);

useEffect(() => {
  const fetchPaymentMethods = async () => {
    try {
      // Call the Stripe API library to load payment methods
      const methods = await loadPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      // Handle error in fetching payment methods
      console.error('Error loading payment methods:', error);
    }
  };

  fetchPaymentMethods();
}, []);

let schemes
// test pour vericiton d'une reservation 

const getpaymentmethode = () => {
  if (paye.email) {
    axiosClient.get(`getreserve/${reserve.voyage_id},${reserve.date}`)
      .then((data) => {
        setReservation(data.data[0]);
        console.log(data.data[0]);
        let reservatione = data.data[0];

        if (data.data.length === 0) {
          setReservation(data);
          console.log('rjb');
          setErrors('La date n\'est pas disponible pour le moment');
          setReserveee(true);
          setPayment(false);
        }

        if (reservatione) {
          if (reservatione.nbrpoccupe === '50') {
            reservatione.etat = 'full';
            axiosClient.put(`/reserveputetat/${reservatione.id}`, reservatione)
              .then(() => {
                setErrors('La réservation a atteint le maximum');
              });
          } else {
            setPayment(true);
          }
        }
      });
  }
  else{
    setErrors('email non valide')
  }
};

  
  
////// les données pour le paiment et ajouter un paiment si il y a un date validie 

  

console.log(reservatione.id)
const chiffre1 = createRef()
const chiffre2 = createRef()
const chiffre3 = createRef()
const chiffre4 = createRef()
const mois = createRef()
const year = createRef()
const cvv = createRef()
const name = createRef()

const currentDate = new Date();

const years = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if necessary
const day = String(currentDate.getDate()).padStart(2, '0'); // Pad with leading zero if necessary

const formattedDate = `${years}/${month}/${day}`;
console.log(paye.email)
const [cardNumber, setCardNumber] = useState('');
const [verificationResult, setVerificationResult] = useState('');
const [banknames ,setbanknames] = useState('')
const payss =async(ev) => {
  ev.preventDefault()

const payload = {
  number: chiffre1.current.value+chiffre2.current.value+chiffre3.current.value+chiffre4.current.value,
  mois: mois.current.value,
  name:  name.current.value,
  cvv: cvv.current.value,
  year: year.current.value,
 
}
console.log(payload)
try {
  //test de validition de carte 
  const response = await axios.get(`https://lookup.binlist.net/${payload.number}`);
  const { bank, scheme, type } = response.data;
 
 
  if (bank && scheme && type) {
    setVerificationResult('Valid card');
paye.paymentdate=formattedDate
paye.methode=scheme
paye.etat='valid'   

paye.reservation_id=reservatione.id
console.log(paye.email)

//si le carte est valide enoyver les données a base de donnée 
    setbanknames(bank)
   axiosClient.post('/payments',paye).then((data)=>{
    setpaye(data.data)
console.log(data.data)
console.log('payment est valid')
    navigate('/loader/'+data.data.id+'/'+reservatione.voyage_id+'/'+lignes.id+'/'+reservatione.id)
   })



  } else {
    setVerificationResult('Invalid card');
  }
} catch (error) {
  console.error(error);
  setVerificationResult('Error occurred');
}
};
console.log(banknames)
const bankLogoMapping = {
  'master card': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
  'visa': 'https://example.com/bank-b-logo.png',
  // Add other banks and logo URLs as needed
};


const cancel=()=>{
  setReservationss(false)
}



return(
  <div>
 
  <Header/>
  
  
  <div class="landing">
        
  <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "right"}}>
     
     
     { !payment&& <div><br />  <br />  <br /></div>}
        
      </div>



    { !payment&& <div className="card animated fadeInDown">
      
      <h1 >ligne {lignes.depart} vers {lignes.arrive}</h1>
      <br/>
        <table>
          <thead>
          <tr>
            <th>numero</th>
            <th>temps</th>
            <th>depart</th>
            <th>arrive</th>
            <th>distance</th>
            <th>prix</th>
            <th>Entrprise</th>
            <th>action</th>
            

        
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
          {!loading&&empty&&<tbody>
            <tr>
              <td colSpan="5" class="text-center">
                il ne pas des voyages disponible 
              </td>
            </tr>
            </tbody>

          }
          {!loading &&
            <tbody>
         {voyagess}
       
    
    
            </tbody>
          }
        </table>
        <div className="formticket">
      <div className="form3">
  <br />
  {
    reservationss&&
    <section class="previous-background">
      <section class="sectionres">
    
      {errors && (
  <div className="alert">
    <p>{Object.keys(errors).map(key => errors[key]).join('')}</p>
  </div>
)}
    
     
            <h3>email</h3>
   <input type="email"  id="myDateInput" onChange={ev=>{setpaye({...paye,email:ev.target.value})}}/> 
   <h3>date</h3>
    <input   min={getFormattedDate()} type="date" id="myDateInput" onChange={ev=>{handleDateChange(ev),setReserve({...reserve,date:ev.target.value})}} />
    
    
 
    <button className="btn-add" onClick={getpaymentmethode} >Valide</button>
    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <button className="btn-delete" onClick={cancel}>Annuler</button>
    
    </section>
    
    </section>
    
     
     }

 
      
    </div>
    
    
    
    </div>

      </div>}
{payment&&
  <div class= "login-signup ">
  <CarteCss>
 <body>
  <div class="checkout">
  <div class="credit-card-box">
    <div class="flip">
      <div class="front">
        <div class="chip"></div>
        <div class="logo">
 
        <img src="./images/mc.png"/>
        {schemes}
        </div>
        <div class="number"></div>
        <div class="card-holder">
          <label>Card holder</label>
          <div></div>
        </div>
        <div class="card-expiration-date">
          <label>Expires</label>
          <div></div>
        </div>
      </div>
      <div class="back">
        <div class="strip"></div>
        <div class="logo">
         

        </div>
        <div class="ccv">
          <label>CCV</label>
          <div></div>
        </div>
      </div>
    </div>
  </div>
  <form class="form" onSubmit={payss}>
    
      <label for="card-holder">Card Number</label>
      <fieldset>
      
      <input type="num"   class="input-cart-number"  maxLength="4" minLength="4" ref={chiffre1} />
      <input type="num"  class="input-cart-number" maxlength="4" minLength="4" ref={chiffre2} />
      <input type="num"  class="input-cart-number" maxlength="4" minLength="4" ref={chiffre3}/>
      <input type="num"  class="input-cart-number" maxlength="4" minLength="4" ref={chiffre4}/>
      </fieldset>
    <fieldset>
      <label for="card-holder">Card holder</label>
      <input type="text" id="card-holder"  ref={name} />
    </fieldset>
   
    <fieldset class="fieldset-expiration">
      <label for="card-expiration-month">Expiration date</label>
      <div class="select">
        <select id="card-expiration-month" ref={mois}>
          <option></option>
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
      </div>
      <div class="select">
        <select id="card-expiration-year" ref={year}>
          
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
    </fieldset>
    <fieldset class="fieldset-ccv">
      <label for="card-ccv" ref={cvv}>CCV</label>
      <input type="text" id="card-ccv" maxlength="3"  minLength="3"/>
    </fieldset>
    <button class="btn"><i class="fa fa-lock"></i> submit</button>
    {verificationResult && <p>{schemes}{verificationResult}</p>}
  </form>

</div>



</body>
</CarteCss>
</div>
}


    </div>
      
     </div>
    
     <Footer />
     </div>
   
  )}