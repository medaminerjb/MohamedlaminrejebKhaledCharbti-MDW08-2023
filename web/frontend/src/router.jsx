import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/adminentreprise/UserForm.jsx";
import Acceuil from "./views/public/acceuil.jsx";

import Station from "./views/adminentreprise/station.jsx";
import Stations from "./views/adminentreprise/stations.jsx";
import Lignes from "./views/adminentreprise/lignes.jsx";
import Ligne from "./views/adminentreprise/ligne.jsx";
import LigneClient from "./views/public/ligneclient.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ConjiForm from "./views/employe/conjForm.jsx";
import Billet from "./views/public/billet.jsx";
import ConjiEtat from "./views/adminentreprise/conjietat.jsx";

import Voyage from "./views/adminentreprise/voyage.jsx";
import Voyageform from "./views/adminentreprise/voyageForm.jsx";
import Newvoyage from "./views/adminentreprise/Newvoyage.jsx";
import Reservation from "./views/adminentreprise/reservation.jsx";
import Newreservation from "./views/adminentreprise/newreservation.jsx";
import EmployeLayout from "./components/EmployeLayout.jsx";
import EntrepriseForm from "./views/adminapp/entrpriseForm.jsx";
import Information from "./views/employe/information.jsx";
import Pointage from "./views/employe/pointage.jsx";
import Fiche from "./views/employe/fichedepaie.jsx";
import Employes from "./views/adminentreprise/employes.jsx";
import Loader from "./views/public/loaderpay.jsx";





const router = createBrowserRouter(



  [
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
  
      {
        path: '/station',
        element: <Station />
      },
      {
        path: '/stations',
        element: <Stations />
      },
      {
        path: '/lignes',
        element: <Lignes />
      },
      {
        path: '/',
        element: <Navigate to="/employes"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
     
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/stations/new',
        element: <Station key="stationCreate" />
      },
      {
        path: '/stations/:id',
        element: <Station key="stationUpdate" />
      },
      {
        path: '/lignes/new',
        element: <Ligne key="lignesCreate" />
      },
      {
        path: '/lignes/:id',
        element: <Ligne key="lignesUpdate" />
      },   
      {
        path: '/users',
        element: <Users/>
      },
       
      {
        path:'/conjietat',element:<ConjiEtat />
      },
      {
        path:'voyage',element:<Voyage />
      }
      ,{
        path: '/voyage/new',
        element: <Voyageform key="voyagecreate" />
      },  {
        path: '/voyage/:id',
        element: <Voyageform key="voyagenedit" />
      }, 
      {
        path: '/newvoyage/:id',
        element: <Newvoyage key="newvoyage" />
      } ,{
        path: '/reservation/:id/:depart/:arrive/:temps',
        element: <Reservation key="reservation" />
      } ,{
        path: '/newreservation/:id/:depart/:arrive/:temps',
        element: <Newreservation key="reservation" />
      } , {
        path:'/employes',
        element: <Employes key="employes"/>
      }

    ]
  },
  {
    
    path: '/',
    element: <EmployeLayout />,
    children: [
      
      {
        path: '/dashboarde',
        element: <Dashboard/>
      },
     {
      path:'/conji',element:<ConjiForm />
    },
    {
      path:'/information',element:<Information />
    }, {
      path:'/pointage',element:<Pointage />
    },


    ]
  },
  
  {
  path: '/',
    element: <AdminLayout/>,
    children: [
      
      {
        path: '/admin',
        element: <Users/>
      },{
        path: '/entreprise/new',
        element: <EntrepriseForm key="userCreate" />
      },
      

    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
     
     
     
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
    
    ]
  },
  
  
  {
    path: "*",
    element: <NotFound/>
  },
  {
    path:"/accueil",
    element : <Acceuil />
  }, 
  {
    path: '/ligneclient/:id',
    element: <LigneClient key="ligneclient" />
  },
  {
    path :'/billet/:numero/:reservation_id/:lignes_id/:id',
    element : <Billet key="billet"/>
  },
  {
    path:'/fiche',element:<Fiche />
  },
  {
    path:'/loader/:id/:voyage_id/:lignes_id/:reservation_id',element: <Loader key="loader"/>
  }
])

export default router;
