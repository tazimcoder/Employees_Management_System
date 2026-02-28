import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Features</h4>
          <ul>
            <li>
              <Link to="/employees">Employee Management</Link>
            </li>
            <li>
              <Link to="#">Attendance Management</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/employees">Employee Management System</Link>
            </li>
            <li>
              <Link to="#">Attendance Management</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#hr-guidelines">HR Guidelines</a>
            </li>
            <li>
              <a href="#hr-policies">HR Policies</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact Support</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        ©️ {new Date().getFullYear()} Employee Management System
      </div>
    </footer>
  );
}

export default Footer;
