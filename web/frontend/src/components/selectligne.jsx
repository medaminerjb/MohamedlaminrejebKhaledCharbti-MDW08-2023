import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Selectl() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState([]);
  
  useEffect(() => {
    getStation();
  }, []);

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

  const handleStationChange = (e) => {
    setStation(e.target.value);
  };

  return (
    <div>
      <div>
        {!loading && (
          <select onChange={handleStationChange}>
            {station.map((s) => (
              <option key={s.id} value={s.station}>
                {s.station}
              </option>
            ))}
          </select>
        )}
      </div>

      <select value={station} onChange={handleStationChange}>
        {station.map((s) => (
          <option key={s.id} value={s.station}>
            {s.station}
          </option>
        ))}
      </select>
    </div>
  );
}
