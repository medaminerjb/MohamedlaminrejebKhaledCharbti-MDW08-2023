import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const { user, token, setUser, userRole, setUserRole, setToken, notification } =
    useStateContext();

  const [loading, setLoading] = useState(false);
// logout function
  const onLogout = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      setUserRole("");
    });
  };

  if (token) {
    const isemploye = userRole.includes("employe");
    const isadmin = userRole.includes("admin");
    const isentreprise = userRole.includes("entreprise");
    if (!isadmin) {
      if (isentreprise) {
        return <Navigate to="/employes" />;
      }
      if (isemploye) {
        return <Navigate to="/information" />;
      }
    }
  } else {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div id="defaultLayout">
        <aside>
        <Link to="/accueil">accueil</Link>
          <Link to="/admin">admin</Link>
          <Link to="/entreprise/new">entreprise</Link>
        </aside>
        <div className="content">
          <header>
            <div>Header</div>
            <div>
              &nbsp; &nbsp;
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
    </div>
  );
}
