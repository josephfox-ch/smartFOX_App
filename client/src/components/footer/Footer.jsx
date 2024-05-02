import React from "react";
import { Link } from "react-router-dom";
import "../../css/Footer.css";

const Footer = () => (
  <footer
    id="mainFooter"
    className="bg-white text-gray-600 text-center text-sm py-6 mt-3"
  >
    <ul className="flex justify-center space-x-1 mb-3">
      <li>
        <Link to="#" className="hover:text-blue-500">
          English(US)
        </Link>
      </li>
      <li>
        <Link to="#" className="hover:text-blue-500">
          Français
        </Link>
      </li>
      <li>
        <Link to="#" className="hover:text-blue-500">
          Deutsch
        </Link>
      </li>
      <li>
        <Link to="#" className="hover:text-blue-500">
          Italiano
        </Link>
      </li>
      <li>
        <Link to="#" className="hover:text-blue-500">
          日本語
        </Link>
      </li>
      <li>
        <Link to="#" className="hover:text-blue-500">
          Türkçe
        </Link>
      </li>
      <li>
        <Link to="#" className="hover:text-blue-500">
          Русский
        </Link>
      </li>
    </ul>
    <p className="mb-1">Rue des Dauphins, 00 1201 Genève</p>
    <p className="mb-3">&copy; 2024 smartFOX® Home Systems</p>
    <ul className="flex justify-center space-x-3">
      <li>
        <Link to="/policy/terms" className="hover:text-blue-500">
          Terms of Service
        </Link>
      </li>
      <li>
        <Link to="/policy/privacy" className="hover:text-blue-500">
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link to="/policy/cookie-policy" className="hover:text-blue-500">
          Cookie Policy
        </Link>
      </li>
      <li>
        <Link to="/marketing" className="hover:text-blue-500">
          Marketing
        </Link>
      </li>
      <li>
        <Link to="/support" className="hover:text-blue-500">
          Support
        </Link>
      </li>
      <li>
        <Link to="/contact" className="hover:text-blue-500">
          Contact
        </Link>
      </li>
      <li>
        <Link to="/about-us" className="hover:text-blue-500">
          About Us
        </Link>
      </li>
      <li>
        <Link to="/settings" className="hover:text-blue-500">
          Settings
        </Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
