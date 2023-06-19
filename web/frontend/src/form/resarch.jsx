import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import Selectl from "../components/selectligne";
import { useNavigate } from "react-router-dom";

export default function reash() {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [res, setRes] = useState({
    id: null,
    depart: '',
    arrive: ''
  });
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState([]);
  const [lignes, setLignes] = useState([]);

  useEffect(() => {
    getStation();
    getLignes();
  }, []);

  const getLignes = () => {
    setLoading(true);
    axiosClient
      .get('/ligness')
      .then(({ data }) => {
        setLoading(false);
        setLignes(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getStation = () => {
    setLoading(true);
    axiosClient
      .get('/stations')
      .then(({ data }) => {
        setLoading(false);
        setStation(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  var stations = Object.values(station);
  const lign = lignes.map((s) => {
    if (s.arrive === res.arrive && s.depart === res.depart && submit) {
      const id = s.id;
      console.log(id);
      navigate(`/ligneclient/${id}`);
    }
  });

  const OnSubmit = () => {
    setSubmit(true);
  };

  return (
    <div class="login-signup-form animated fadeInDown">
      <div className="form2">
        <form onSubmit={OnSubmit}>
          <h1 className="title">BUS TRAFFIC</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

          <select
            value={res.depart}
            onChange={(ev) => setRes({ ...res, depart: ev.target.value })}
          >
            <option value="--select ton depart --"> --select ton depart -- </option>
            {stations.map((s) => (
              <option key={s.id} value={s.station}>
                {s.station}
              </option>
            ))}
          </select>

          <select
            value={res.arrive}
            onChange={(ev) => setRes({ ...res, arrive: ev.target.value })}
          >
            <option value="--select ton destination --"> --select ton destination -- </option>

            {stations.map((s) => (
              <option key={s.id} value={s.station}>
                {s.station}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-block">
            recherche
          </button>
        </form>
      </div>
    </div>
  );
}
