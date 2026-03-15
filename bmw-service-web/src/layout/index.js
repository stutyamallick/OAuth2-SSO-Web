import React, { useEffect, useState } from "react";
import "./index.less";
import axios from "axios";

const Layout = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);

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

  const togglePopup = (e) => {
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const getInitials = (username) => {
    if (!username) return "";

    const parts = username.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  const handleOptionSelection = (optionType) => {
    axios.get("/api/contactDetails/"+optionType)
      .then(function (response) {
        console.log(response.data);
        setContactDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setContactDetails(null);
      })
  }

  return (
    <div className="container" onClick={closePopup}>

      <header>
        <div className="welcome">Welcome User</div>

        <div
          className="avatar"
          onClick={togglePopup}
        >
          {username ? getInitials(username) : "NA"}
        </div>
      </header>

      {showPopup && (
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <p><strong>Full Name: </strong>{username ? username : "NA"}</p>
          <button className="logout-btn">Logout</button>
        </div>
      )}

      <div className="main">

        <div className="card">
          <button type="button" onClick={() => handleOptionSelection("service")}>Fetch Details</button>
          <p>Book Service</p>
        </div>

        <div className="card">
          <button type="button" onClick={() => handleOptionSelection("accessories")}>Fetch Details</button>
          <p>Buy Accessories</p>
        </div>

        <div className="card">
          <button type="button" onClick={() => handleOptionSelection("bodyShop")}>Fetch Details</button>
          <p>Body Shop</p>
        </div>

      </div>

      {contactDetails
        ? <div className="detailsMain">

          <div className="detailsCard">
            <p>Based on your location and car you own. Find below the details-</p>
            <p>Dealer Name: <strong>{contactDetails.dealerName}</strong></p>
            <p>Address: <strong>{contactDetails.address}</strong></p>
            <p>Contact Number: <strong>{contactDetails.contactNumber}</strong></p>
          </div>

        </div>
        : null
      }

    </div>
  );
};

export default Layout;