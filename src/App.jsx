import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    const { dob, phone } = formData;

    if (!dob || new Date(dob) > new Date()) {
      formErrors.dob = alert(
        "Invalid Date of Birth. Date of Birth cannot be in future."
      );
    }

    if (!phone || phone.length !== 10 || isNaN(phone)) {
      formErrors.phone = alert(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      closeModal();
      alert("Form submitted successfully!");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  return (
    <div>
      <div className="opener">
        <h1>User Details Modal</h1>
        <div>
          <button
            className="button"
            onClick={openModal}
            style={{ backgroundColor: "#1384db" }}
          >
            Open Form
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
