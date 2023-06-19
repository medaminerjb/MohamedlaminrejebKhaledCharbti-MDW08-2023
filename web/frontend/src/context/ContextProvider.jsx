import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,

  userRole: null,
  iden : null,
 iduser : null,
  notification: null,

  setUser: () => {},
 setUserid: ()=> {},
 setIden : ()=>{},
  setToken: () => {},
  setUserRole: () => {},
  setNotification: () => {}
})

export const ContextProvider = ({children}) => {


  const [user, setUser] = useState({});
  const [userRole, _setUserRole] = useState(localStorage.getItem('ACCESS_ROLE'));
  const [iden, _setIden] = useState(localStorage.getItem('ACCESS_IDEN'));
  const [iduser,_setUserid] = useState(localStorage.getItem('ACCES_ID'))
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');
  const setIden =(iden) =>{
    _setIden(iden)
    if(iden){
      localStorage.setItem('ACCESS_IDEN',iden);
    }else{localStorage.removeItem('ACCESS_IDEN');}
    }


const setUserRole =(userRole) =>{
_setUserRole(userRole)
if(userRole){
  localStorage.setItem('ACCESS_ROLE',userRole);
}else{localStorage.removeItem('ACCESS_ROLE');}
}
const setUserid =(iduser) =>{
  _setUserid(iduser)
  if(iduser){
    localStorage.setItem('ACCES_ID',iduser);
  }else{localStorage.removeItem('ACCES_ID');}
  }

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
   
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setNotification = message => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
    
      
      user,
      setUser,
      userRole,
      setUserRole,
      setIden,
      iden,
      setUserid,
      iduser,
      token,
      setToken,
      notification,
      setNotification
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
