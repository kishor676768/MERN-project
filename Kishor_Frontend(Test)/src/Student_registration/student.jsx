import React, { useState, useEffect } from "react";
import "./student.css";
import axios from "axios";
import BaseUrl from "../BaseURL";

function StudentRegistration() {
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [courseError, setCourseError] = useState("");

  const [formData, setFormData] = useState([]);
  const [isCourseValid, setIsCourseValid] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    course: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (nameRegex.test(value.trim())) {
        setFormValues({ ...formValues, [name]: value });
        setNameError("");
      } else {
        if (formValues.name.length <= 1) {
          setFormValues({ ...formValues, name: "" });
          setNameError("");
        } else {
          setNameError("Please enter correct name");
        }
      }
    }

    if (name === "phone") {
      let phoneValue = value.replace(/\D/g, "").slice(0, 10);
      if (phoneValue.startsWith("0")) {
        phoneValue = phoneValue.slice(1);
      }
      setFormValues({ ...formValues, [name]: phoneValue });
      if (phoneValue.length === 0 || phoneValue.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError("");
      }
    }

    if (name === "email") {
      validateEmail(value);
      setFormValues({ ...formValues, [name]: value });
    }

    if (name === "address") {
      setFormValues({ ...formValues, [name]: value });
    }

    if (name === "course") {
      setFormValues({ ...formValues, [name]: value });
      if (value.trim() === "") {
        setCourseError("Please enter your course");
        setIsCourseValid(false);
      } else {
        setCourseError("");
        setIsCourseValid(true);
      }
    }
  };

  const Submit = async (e) => {
    e.preventDefault();

    if (formValues.name === "") {
      alert("Please enter Name");
      return;
    } else if (formValues.phone.length !== 10) {
      alert("Please enter a 10 digit phone number");
      return;
    } else if (formValues.email === "") {
      alert("Please enter a valid Email ID");
      return;
    } else if (formValues.address === "") {
      alert("Please enter address");
      return;
    } else if (!isCourseValid) {
      alert("Please select a course");
      return;
    }

    try {
      const response = await axios.post(`${BaseUrl}/studentform/studentpost`, formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      await fetchData();

      alert("Form submitted successfully");

      setFormValues({
        name: "",
        phone: "",
        email: "",
        address: "",
        course: "",
      });
    } catch (error) {
      console.error("Error in posting:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/studentform/studentget`);
      setFormData(response.data.Student);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Complete_Form_onchange">
      <div className="Form_split" style={{ display: "flex" }}>
        <form className="Form1" onSubmit={Submit}>
          <h1>Student Registration Form</h1>

          <div className="Complete">
            <label>Name</label>
            <input type="text" name="name" value={formValues.name} onChange={handleChange} />
            <div style={{ minHeight: "20px", marginTop: "5px" }}>
              {nameError && <p style={{ margin: 0, color: "red", fontSize: "14px" }}>{nameError}</p>}
            </div>
          </div>

          <br />
          <div className="Complete">
            <label>Email ID</label>
            <input type="text" name="email" value={formValues.email} onChange={handleChange} />
            <div style={{ minHeight: "20px", marginTop: "5px" }}>
              {emailError && <p style={{ margin: 0, color: "red", fontSize: "14px" }}>{emailError}</p>}
            </div>
          </div>

          <br />
          <div className="Complete">
            <label>Phone Number:</label>
            <input type="text" placeholder="+91" name="phone" value={formValues.phone} onChange={handleChange} />
            <div style={{ minHeight: "20px", marginTop: "5px" }}>
              {phoneError && <p style={{ margin: 0, color: "red", fontSize: "14px" }}>{phoneError}</p>}
            </div>
          </div>

          <div className="Complete">
            <label>Address:</label>
            <br />
            <textarea rows="5" cols="30" name="address" value={formValues.address} onChange={handleChange}></textarea>
            <br />
          </div>

          <div className="Complete">
  <label>Course:</label>
  <input
    type="text"
    name="course"
    placeholder="Enter your course"
    value={formValues.course}
    onChange={handleChange}
  />
  <div style={{ minHeight: "20px", marginTop: "10px" }}>
    {courseError && <p style={{ margin: 0, color: "red", fontSize: "14px" }}>{courseError}</p>}
  </div>
</div>


          <button type="submit" id="button1">
            Submit
          </button>
        </form>
      </div>

      <div className="getData">
        <h2>Submitted Data</h2>
        {formData.length > 0 ? (
          formData.map((item, index) => (
            <div key={index} className="data_item">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Address:</strong> {item.address}</p>
              <p><strong>Course:</strong> {item.course}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default StudentRegistration;
