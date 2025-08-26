import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer--flex">
        <div className="footer-start">
          <p>
            2021 © Elegant Dashboard -{" "}
            <a
              href="elegant-dashboard.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              elegant-dashboard.com
            </a>
          </p>
        </div>
        <ul className="footer-end">
          <li>
            <a href="##">About</a>
          </li>
          <li>
            <a href="##">Support</a>
          </li>
          <li>
            <a href="##">Puchase</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
