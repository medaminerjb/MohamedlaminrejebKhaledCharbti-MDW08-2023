
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import DatePicker from 'react-datepicker';
import all from "./publiccss/billet.css";
import html2canvas from "html2canvas";
import domtoimage from 'dom-to-image';
import jsPDF from "jspdf";
import Acceuil from "./acceuil.jsx";

// Fonction pour convertir en image
const convertToImg = () => {
  const element = document.getElementById('htmlContent');

  const options = {
    quality: 1, // Définir le niveau de qualité à 1 (le plus élevé)
  };

  domtoimage.toPng(element, options)
    .then(dataUrl => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'output.png';
      link.click();
    })
    .catch(error => {
      console.error('Erreur lors de la conversion de HTML en image :', error);
    });
};

// Fonction pour convertir en PDF
const convertToPDF = () => {
  const pdf = new jsPDF('p', 'pt', 'letter');
  const element = document.getElementById('htmlContent');

  pdf.html(element, {
    callback: () => {
      pdf.save('output.pdf');
    }
  });
};

export default function Billet() {
  const navigate = useNavigate();
  let { numero, reservation_id, lignes_id, id } = useParams();
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '/');

  const [billet, setBillet] = useState({
    id: null,
    numero: '',
    validite: '',
    reservations_id: '',
  });

  const [voyage, setVoyage] = useState({
    id: null,
    temps: '',
    lignes_id: '',
  });

  const [ligne, setLigne] = useState({
    id: null,
    numero: '',
    depart: '',
    arrive: '',
    prix: '',
    distance: ''
  });

  const [reservation, setReservation] = useState({
    id: null,
    nbrptotal: '',
    nbrpoccupe: '',
    voyagedate: '',
    etat: '',
    voyage_id: '',
  });

  const [ready, setready] = useState(false);
  const [rexx, setRex] = useState({});

  if (numero && !ready) {
    // Effectue une requête lorsque le numéro est présent et ready est faux
    useEffect(() => {
      // Récupère les données du billet
      axiosClient.get(`/billet/${numero}`)
        .then(({ data }) => {
          setBillet(data[0]);
          console.log(billet[0]);
        });

      // Récupère les données du voyage
      axiosClient.get(`/getvoyage/${reservation_id}`)
        .then(({ data }) => {
          setVoyage(data[0]);
        });

      // Récupère les données de la ligne
      axiosClient.get(`/vm/${lignes_id}`).then(({ data }) => {
        setLigne(data[0]);
      });

      // Récupère les données de la réservation
      axiosClient.get(`/getrb/${id}`)
        .then(({ data }) => {
          setReservation(data[0]);
        });
    }, []);

    console.log(reservation);
  }

  let billetetat;

  // Vérifie si le billet est valide ou non
  if (reservation && billet) {
    if ((reservation.voyagedate < formattedDate) && (billet.reservations_id == id)) {
      billetetat = "non valide";
      axiosClient.put(`/putbilletetat/${billet.id}`, billet).then(() => {
        // Fait quelque chose après la mise à jour
      });
    } else {
      billetetat = "valide";
    }
  }

  let test = 0;

  // Vérifie si le billet est réel ou non
  if (reservation && voyage && billet) {
    if ((reservation.id) && (billet.reservations_id)) {
      if (reservation.id !== billet.reservations_id) {
        test = 1;
        navigate('/accueil');
      } else {
        test = 2;
      }
    } else {
      test = 1;
    }
  } else {
    test = 1;
  }

  let bi = billet;
  let vo = voyage;
  let li = ligne;
  let res = reservation;

  return (
    <div class="body">
      <main class="ticket-system">
        <div class="top">
          <br />
          <br />
          {test == 0 && !li && <h1 class="title">Wait a second, your ticket is being printed</h1>}
          {bi && vo && li && test == 1 && <h1 class="title">Check if the ticket exists</h1>}
          {li && bi && vo && test == 2 && <button class="btn" onClick={convertToImg}>"Click to download"</button>}
          <div class="printer" />
        </div>

        {li && bi && vo && test == 2 &&
          <div>
            <div class="receipts-wrapper">
              <div class="receipts">
                <div class="receipt">
                  <div class="route">
                    <h2>{li.depart}</h2>
                    <h2>{li.arrive}</h2>
                  </div>
                  <div class="details">
                    <div class="item">
                      <span>Passenger</span>
                      <h3>bus</h3>
                    </div>
                    <div class="item">
                      <span>Ticket No.</span>
                      <h3>{numero}</h3>
                    </div>
                    <div class="item">
                      <span>Departure</span>
                      <h3>{vo.temps}</h3>
                    </div>
                    <div class="item">
                      <span>Prix</span>
                      <h3>{li.prix} d</h3>
                    </div>
                    <div class="item">
                      <span>Etat</span>
                      <h3>{billetetat}</h3>
                    </div>
                    <div class="item">
                      <span>Date</span>
                      <h3>{res.voyagedate}</h3>
                    </div>
                  </div>
                </div>
                <div class="receipt qr-code" id="htmlContent">
                  <QRCode value={"localhost:3000/billet/" + numero + "/" + reservation_id + "/" + lignes_id + '/' + id} size={69} />
                  <div class="description">
                    <h2>69Pixels</h2>
                    <p>Scan QR-code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div><br /><br /></div><div><br /><br /></div>
      </main>
    </div>
  );
}
