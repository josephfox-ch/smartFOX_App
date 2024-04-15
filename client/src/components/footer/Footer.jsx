import React from "react";
import { Link } from "react-router-dom";
import '../../css/Footer.css';

const Footer = () => (
  <footer id="mainFooter" className="text-muted text-center text-small">
    <ul className="list-language">
      <li className="list-inline-item">
        <Link to="#">English(US)</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Français</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Deutsch</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Italiano</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">日本語</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Türkçe</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Русский</Link>
      </li>
    </ul>
    <p>Rue des Dauphins, 00 1201 Genève</p>
    <p>&copy; 2024 smartFOX Systems</p>
    <ul className="list-pts mx-1">
      <li className="list-inline-item">
        <Link to="/policy?tab=terms">Terms of Service</Link>
      </li>
      <li className="list-inline-item">
        <Link to="/policy?tab=privacy">Privacy Policy</Link>
      </li>
      <li className="list-inline-item">
        <Link to="/policy?tab=cookiePolicy">Cookie Policy</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Marketing</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Support</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Contact</Link>
      </li>
      <li className="list-inline-item">
        <Link to="#">Settings</Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
