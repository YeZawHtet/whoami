import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
//! firebase starts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOxGhnWH824Jt12sjNX5cOtcLsAGd1U-M",
  authDomain: "whoami-21.firebaseapp.com",
  databaseURL:
    "https://whoami-21-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "whoami-21",
  storageBucket: "whoami-21.appspot.com",
  messagingSenderId: "645360418167",
  appId: "1:645360418167:web:963468e3861746cf2b3572",
  measurementId: "G-C600RQLCBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//! firebase end
function QRCodeComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    telegramAccount: "",
    streetAddress: "",
  });

  const [qrValue, setQrValue] = useState("");
  const [qrDataStored, setQrDataStored] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine all form data values into a single string
    const combinedData = Object.values(formData).join(",");
    setQrValue(combinedData);
    // Create a JSON object containing form data and QR code value
    const qrData = {
      ...formData,
      qrValue: combinedData,
    };
    // Store the JSON object
    setQrDataStored(qrData);

    // Update JSON data through API route
    updateData(qrData);
    navigate("/home");
  };

  const updateData = async (data) => {
    try {
      const response = await fetch("https://whoami-data.vercel.app/Tbl_Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telegramAccount" className="form-label">
            Telegram Account:
          </label>
          <input
            type="text"
            className="form-control"
            id="telegramAccount"
            name="telegramAccount"
            value={formData.telegramAccount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="streetAddress" className="form-label">
            Street Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="mt-5">
        <h2>Generated QR Code</h2>
        {/* QR code component */}
        <QRCode value={qrValue} />
        {/* Download JSON button */}
      </div>
    </div>
  );
}

export default QRCodeComponent;
