import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Acceuil from "./views/acceuil.jsx";
import Signupn from "./views/signupvv.jsx";
import Station from "./views/station.jsx";
import Stations from "./views/stations.jsx";
import Lignes from "./views/lignes.jsx";
import Ligne from "./views/ligne.jsx";
import LigneClient from "./views/ligneclient.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import {useStateContext} from "./context/ContextProvider.jsx";
import React, { useEffect, useState } from "react";
const {user, setUser,token,setToken } = useState()
if(token){
    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
             
          })
    
      }, [])
if(user.role_id===3){const routeradmin = createBrowserRouter(



    [
    {
    path: '/',
      element: <AdminLayout/>,
      children: [
        
        {
          path: '/m',
          element: <Users/>
        }
  
      ]
    }])

}


}
else { const routeradmin = createBrowserRouter(



    [
   
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
       
        { 
          path:'/s'
          ,element:<Signupn/>
  
        }
        ,{
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
      path:'/accueil',
      element:<Acceuil/>
    },
    {
      path: "*",
      element: <NotFound/>
    },  {
      path: '/ligneclient/:depart/:arrive',
      element: <LigneClient key="ligneclient" />
    }
  ])}


export default routeradmin;
