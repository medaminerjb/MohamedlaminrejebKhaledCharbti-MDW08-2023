import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import Selectl from "../../components/selectligne.jsx";
import { Link } from "react-router-dom";
import all from "./css.css";
import styled from 'styled-components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Fichedepaie from "./fichdepaiecss.jsx";
const convertToImg = () => {
    const element = document.getElementById('htmlContent');
  
    html2canvas(element, { useCORS: true })
      .then(canvas => {
        const imageData = canvas.toDataURL('image/png');
  
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'output.png';
        link.click();
      })
      .catch(error => {
        console.error('Error converting HTML to image:', error);
      });
  };
  const convertToPDF = () => {
    const pdf = new jsPDF('p', 'pt', 'letter');
    const element = document.getElementById('htmlContent');
  
    pdf.html(element, {
      callback: () => {
        pdf.save('output.pdf');
      }
    });
  };
export default function Fiche() {
  const navigate = useNavigate();
  const {iduser,setUserid}=useStateContext();
  const [loading, setLoading] = useState(false)
  const [verifpointage, setVerifpointage] = useState(false)
  const {setNotification} = useStateContext()
  const currentjour = new Date().getDate() 
  const currentMonth = new Date().getMonth()+1
  const currentyear = new Date().getFullYear()
  const [userinf, setUserinf] = useState({
    id: null,
    name: '',
    email: '',
    telephone: '',
    adresse: '',
    poste:'',
    salaire:'',
    entreprise_id:'',
    user_id:''
  })
  const [pointage, setPointage] = useState({
    id: null,
    nombredejour: '',
    currentjour: '',
    currentmois: '',
    conjirestant:'',
    user_id:''
  })
  const [fiche, setFiche] = useState({
    id: null,
    nombredejour: '0',
    conjirestant: '0',
    salaire: '0',
    entreprise_id:'',
    user_id:''
  })
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
        axiosClient.get(`/getfichedp/${iduser}`)
        .then(({data}) => {
          setLoading(false)
          setFiche(data[0])
          
        })
        .catch(() => {
          setLoading(false)
        });
        

    }, [])
  }

    if((currentMonth>pointage.currentmois)&&(pointage.currentmois>0))
    {
            fiche.conjirestant=pointage.nombredejour-26
           
           if(pointage.nombredejour>26)
            { fiche.salaire=userinf.salaire}
            else(fiche.salaire=(userinf.salaire/26)*pointage.nombredejour)
            fiche.nombredejour=pointage.nombredejour


        axiosClient.put(`/fiche/${fiche.id}`, fiche)
        .then(() => {
        
          
        })
        axiosClient.get(`/getfichedp/${iduser}`)
        .then(({data}) => {
          setLoading(false)
          setFiche(data[0])});
    }
   
    
     
return(
<Fichedepaie >

<body>

<h1>Telecharger votre fiche  <br/>  <button class="btn" onClick={convertToPDF}>" PDF  Click ici   "</button>
<br/> <br/>
<button class="btn" onClick={convertToImg}>"  Image Click ici   "</button>

</h1>
<br/>

     <div id="htmlContent">
       
       
        
		<header>
			<h1>Fiche de paie</h1>
			<address contenteditable>
				<p>{userinf.name}</p>
				<p>{userinf.adresse}<br/>{userinf.telephone}</p>
				
			</address>
			
		</ header>
		<article>
			<h1>FICHE DE PAIE</h1>
			<address contenteditable>
			
			</address>
			<table class="meta">
				<tr>
					<th><span contenteditable>Poste</span></th>
					<td><span contenteditable>{userinf.poste}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Date</span></th>
					<td><span contenteditable>{currentyear}/{currentMonth}/{currentjour}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Salaire de base</span></th>
					<td><span id="prefix" contenteditable>dinar </span><span>{userinf.salaire}</span></td>
				</tr>
			</table>
			<table class="inventory">
				<thead>
					<tr>
						<th><span contenteditable>nombre de jour</span></th>
                        <th><span contenteditable>salaire de base  </span></th>
						<th><span contenteditable>Congés Restant</span></th>
					
						
						<th><span contenteditable>Salaire recue</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
                    <td><span contenteditable>{!fiche.nombredejour&&0 }{fiche.nombredejour}</span></td>
						<td><span contenteditable>dinar{userinf.salaire}</span></td>
						
						<td><span data-prefix> </span><span contenteditable>{fiche.conjirestant+0.0}</span></td>
						<td><span data-prefix>dinar </span><span>{fiche.salaire }</span></td>
					</tr>
				</tbody>
			</table>
		
			<table class="balance">
				<tr>
					<th><span contenteditable>Total</span></th>
					<td><span data-prefix>dinar </span><span>{userinf.salaire}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Tax</span></th>
					<td><span data-prefix>dinar </span><span contenteditable>0.00</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Salaire de Obtenu</span></th>
					<td><span data-prefix>dinar</span><span>{fiche.salaire}</span></td>
				</tr>
			</table>
		</article>
		<aside>
			<h1><span contenteditable>Additional Notes</span></h1>
			<div contenteditable>
				<p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
			</div>
		</aside>
        </div> 
       
</body>
</Fichedepaie>
    )
}