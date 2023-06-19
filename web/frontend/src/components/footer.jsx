import React from 'react';
import '../index2.css';

export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="container">
        <div className="box">
          <h3>Bus traffic<span> <img src="../../public/logo.png" alt="" height={150} width={150}/></span> </h3>

          
        </div>
        <div className="box"></div>
        <div className="box">
          <div className="line">
            <i className="fas fa-map-marker-alt fa-fw"></i>
            <div className="info">Tunisie, Djerba Midoun</div>
          </div>
          <div className="line">
            <i className="far fa-clock fa-fw"></i>
            <div className="info">Iset Djerba Midoun</div>
          </div>
          <div className="line">
            <i className="fas fa-phone-volume fa-fw"></i>
            <div className="info">
            <p className="text">
            Projet de fin de etude licence en technologie d'informatique
          </p>
            </div>
          </div>
        </div>
      </div>
      <p className="copyright">Made By RJB Company</p>
    </div>
  );
}
