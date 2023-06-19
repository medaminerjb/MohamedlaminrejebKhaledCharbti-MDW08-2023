import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Footer from "./footer";
import Header from "./header";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";

export default function GuestLayout() {
  const { user, token, userRole, iduser, setUserid } = useStateContext();

  if (token) {
    const isemploye = userRole.includes("employe");
    const isadmin = userRole.includes("admin");
    const isentreprise = userRole.includes("entreprise");

    if (isadmin) {
      return <Navigate to="/admin" />;
    }
    if (isentreprise) {
      return <Navigate to="/" />;
    }
    if (isemploye) {
      return <Navigate to="/information" />;
    }
  }

  return (
    <div>
      <Header />
      <div className="landing">
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
