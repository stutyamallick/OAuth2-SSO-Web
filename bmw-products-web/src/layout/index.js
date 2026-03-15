import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./index.less";


export default function Layout() {

  const [username, setUsername] = useState(null);
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    axios.get("/api/user-info")
      .then(function (response) {
        console.log(response.data);
        setUsername(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setUsername("NA");
      })
  }, []);

  const handleCarSelected = (id) => {
    console.log(id)
    axios.get("/api/car/" + id)
      .then(function (response) {
        console.log(response.data);
        setCarDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setCarDetails(null);
      })
  }

  const cars = [
    { id: "340i", display: "BMW - 340i" },
    { id: "540i", display: "BMW - 540i" },
    { id: "740i", display: "BMW - 740i" }
  ]

  return (
    <>
      <div className="header">
        <div className="welcome">Welcome {username ? username : "User"}</div>
        <div className="logo">BMW</div>
      </div>

      <div className="title">AVAILABLE CARS</div>

      <div className="card-container">
        {cars.map(car =>
          <div className="card" id={car.id} onClick={() => handleCarSelected(car.id)}>
            <div className="icon">🚘</div>
            <div>{car.display}</div>
          </div>
        )}
      </div>

      {carDetails &&
        <div className="details">
          <strong>PRICE</strong>
          {carDetails.price}

          <strong>ENGINE</strong>
          {carDetails.engineCc}
        </div>
      }

      <div className="bottom-line"></div>
    </>
  );
}
