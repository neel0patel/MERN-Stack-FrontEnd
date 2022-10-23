import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div>
      <div id="contact-title">
        <h1>Contact</h1>
      </div>
      <div id="contact-image-holder">
        <div id="bg-text">
          <p>
            My name is <span className="highlight">Neel Patel</span> and the
            other members apart of our group would be{" "}
            <span className="highlight">Amanda Mendoza</span>,{" "}
            <span className="highlight">Bryan Valero</span> ,{" "}
            <span className="highlight">Brandon Extra</span>,{" "}
            <span className="highlight">Ibrahim Olayiwola</span>, and{" "}
            <span className="highlight">Thomas Christian</span>.
          </p>
          <p>
            We all are students aspiring to get into the sofftware development
            field and become software developers in the near future.
          </p>
          <a href="https://github.com/neel0patel">
            <i className="fab fa-github"> neel0patel</i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Contact;
