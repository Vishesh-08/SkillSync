import React from 'react';
import '../css/Company_dashboard.css';
import { useUserDetails } from "../contexts/UserContext";

const BusinessDashboard = () => {
  const { userDetails,isAuthenticated } = useUserDetails();

  

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome to {userDetails?.companyName || 'Company'}</h1>
      </header>

      <div className="dashboard-content">
        {/* Navigation */}
        <nav className="dashboard-nav">
          <ul>
            {[
              { href: '#company-info', label: 'Company Info', icon: '🏢' },
              { href: '#contact-info', label: 'Contact Info', icon: '📞' },
              { href: '#social-media', label: 'Social Media', icon: '🌐' },
              { href: '#website', label: 'Website', icon: '🌍' },
              { href: '#documents', label: 'Documents', icon: '📄' },
            ].map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Company Info Section */}
          <section id="company-info" className="section">
            <h2>Company Info</h2>
            <div className="flex-center-gap">
              <img
                src={userDetails?.companyLogo || '/default-logo.png'}
                alt="Company Logo"
                className="profile-image"
              />
              <div className="grid-two-column">
                <p><strong>Company Type:</strong> {userDetails?.companyType || 'N/A'}</p>
                <p><strong>Founded Year:</strong> {userDetails?.foundedYear || 'N/A'}</p>
                <p><strong>Number of Employees:</strong> {userDetails?.numberOfEmployees || 'N/A'}</p>
                <p><strong>Registration Number:</strong> {userDetails?.registrationNumber || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Contact Info Section */}
          <section id="contact-info" className="section">
            <h2>Contact Info</h2>
            <div className="flex-center-gap">
              <div className="grid-two-column">
                <p><strong>Contact Person:</strong> {userDetails?.contactPerson || 'N/A'}</p>
                <p><strong>Email:</strong> {userDetails?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {userDetails?.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {userDetails?.address || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Website Section */}
          <section id="website" className="section">
            <h2>Website</h2>
            <p>
              <a
                href={userDetails?.website || '#'}
                target="_blank"
                className="link"
                rel="noopener noreferrer"
                aria-label="Company Website"
              >
                {userDetails?.website || 'N/A'}
              </a>
            </p>
          </section>

          {/* Social Media Section */}
          <section id="social-media" className="section">
            <h2>Social Media</h2>
            <div className="flex-gap">
              {(userDetails?.socialMediaLinks || []).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label={`Visit ${social.platform}`}
                >
                  <i className={`fab ${social.iconClass} social-media-icon`} style={{ color: social.color }}></i>
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Documents Section */}
          <section id="documents" className="section">
            <h2>Verification Documents</h2>
            {userDetails?.verificationDocuments?.length > 0 ? (
              <ul>
                {userDetails?.verificationDocuments.map((document) => (
                  <li key={document.name}>
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Download ${document.name}`}
                    >
                      {document.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents uploaded</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
