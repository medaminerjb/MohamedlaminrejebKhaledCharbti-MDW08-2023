import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useNavigate } from "react-router-dom";

export default function EmployeLayout() {
  const {
    user,
    token,
    setUserRole,
    userRole,
    iduser,
    setUserid,
    setUser,
    setToken,
    notification,
  } = useStateContext();
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté et redirige vers son interface en fonction de son rôle
  if (token) {
    const isemploye = userRole.includes('employe');
    const isadmin = userRole.includes('admin');
    const isentreprise = userRole.includes('entreprise');

    if (!isemploye) {
      if (isadmin) {
        return <Navigate to="/admin" />;
      }
      if (isentreprise) {
        return <Navigate to="/" />;
      }
    }
  } else {
    return <Navigate to="/login" />;
  }

  // Fonction de déconnexion
  const onLogout = ev => {
    ev.preventDefault();

    axiosClient.post('/logout').then(() => {
      navigate('/login');
      setUser({});
      setToken(null);
      setUserid(null);
    });
  };

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/accueil">Accueil</Link>
        <Link to="/pointage">Pointage</Link>
        <Link to="/conji">Congé</Link>
        <Link to="/information">Information</Link>
      </aside>
      <div className="content">
        <header>
          <div>Employe interface</div>
          <div>
            {} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}
