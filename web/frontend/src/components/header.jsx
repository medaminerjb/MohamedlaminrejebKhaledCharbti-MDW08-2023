import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import all from '../index2.css'
export default function Header(){

  const {token,setToken,setUserRole,userRole} = useStateContext();
  
  const isemploye = userRole.includes('employe');
  const isadmin = userRole.includes('admin');
  const isentreprise = userRole.includes('entreprise');

    return(

        <div class="header" id="header">
        <div class="container">
          <a href="" class="logo"> <img src="../../public/logo.png" height={50} width={50}/> Bus Traffic</a>
          <ul class="main-nav">
            <li><Link to="/accueil" href="" >Accueil</Link></li>
            {token&&
            <li><Link to="/employes">Dashboard</Link></li>
                 }
            {!token&&
            <li><Link to="/login">Login</Link></li>
                 }
          </ul>
        </div>
      </div>
    )


}