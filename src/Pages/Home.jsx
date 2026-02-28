import React from "react";
import bgPattern from "./images/bg-pattern.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="app-root">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-content">
          {/* LEFT TEXT */}
          <div className="hero-left">
            <h1>
              Employee <br /> Management System
            </h1>
            <p>
              Employee management is the process by which employers ensure
              workers perform their jobs to the best of their abilities so as to
              achieve business goals.
            </p>
          </div>

          {/* HERO IMAGE */}
          <div className="hero-right">
            <img src={bgPattern} alt="Hero Graphic" />
          </div>
        </div>
      </section>

      {/* ===== WHITE CONTAINER SECTION ===== */}
      <section className="page-wrapper">
        <div className="page-container">
          <h2 className="section-heading">Our Features</h2>

          <div className="cards-section">
            {/* CARD 1 */}
            <div className="info-card">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Employees"
              />
              <span className="card-tag">EMPLOYEES</span>
              <h3>Manage Employees</h3>
              <a href="#employees" className="read-link">
                Read More →
              </a>
            </div>

            {/* CARD 2 */}
            <div className="info-card">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Dashboard"
              />
              <span className="card-tag">DASHBOARD</span>
              <h3>Smart Dashboard</h3>
              <a href="#dashboard" className="read-link">
                Read More →
              </a>
            </div>

            {/* CARD 3 */}
            <div className="info-card">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3"
                alt="Security"
              />
              <span className="card-tag">SECURITY</span>
              <h3>Secure Data</h3>
              <a href="#security" className="read-link">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ===== THEORY CONTAINER ===== */}
      <section className="theory-container">
        <div className="theory-box">
          <div id="employees" className="theory-section">
            <h2>Manage Employees</h2>
            <p>
              Our employee management module helps organizations manage staff
              efficiently. You can add, update, and track employee records,
              salaries, departments, and performance in one place. It ensures
              smooth HR operations and better workforce productivity.
            </p>
          </div>

          <div className="theory-box">
            <div id="dashboard" className="theory-section">
              <h2>Smart Dashboard</h2>
              <p>
                The dashboard provides a real-time overview of your company’s
                performance. It displays employee statistics, attendance data,
                and important analytics so that managers can make quick and
                informed decisions with ease.
              </p>
            </div>

            <div id="security" className="theory-section">
              <h2>Secure Data</h2>
              <p>
                Security is our top priority. The system ensures that all
                employee information is protected using secure authentication
                and database protection. Only authorized users can access
                sensitive data, keeping your organization safe.
              </p>
            </div>

            <div id="hr-guidelines" className="theory-section">
              <h2>HR Guidelines</h2>
              <p>
                Our HR guidelines provide a framework for employee conduct,
                leave policies, performance evaluation, and reporting
                structures. They help maintain transparency and ensure smooth HR
                operations in the organization.
              </p>
            </div>

            <div id="hr-policies" className="theory-section">
              <h2>HR Policies</h2>
              <p>
                HR policies define the rules, benefits, and obligations for
                employees. This includes attendance, compensation, grievance
                handling, and disciplinary procedures to ensure a fair and
                compliant workplace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;