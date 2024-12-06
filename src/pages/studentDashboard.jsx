import React, { useContext } from 'react';
import { UserDetailsContext } from '../contexts/UserContext'; // Ensure correct import path
import '../css/Dashboard.css';

const StudentDashboard = () => {
  // const { userDetails } = useContext(UserDetailsContext);

  // if (!userDetails) {
  //   return <div>Loading user details...</div>;
  // }

  const userDetails = {
    name: "John Doe",
    profile: {
      image: "dhruv.jpeg",
      details: {
        Email: "jane.doe@example.com",
        Phone: "123-456-7890",
        Date_of_Birth: "01/01/2000",
        Location: "New York",
        University: "Harvard University",
        "Degree Program": "Computer Science",
        "Year of Study": "Senior",
        Graduation: "June 2024",
        GPA: "3.9",
      },
    },
    skills: ["Java", "React.js", "Node.js", "MongoDB"],
    certifications: ["Certified Java Developer", "AWS Certified Solutions Architect"],
    portfolio: { link: "https://janedoeportfolio.com" },
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/janedoe", iconClass: "fa-linkedin", color: "#0077b5" },
      { platform: "Twitter", url: "https://twitter.com/janedoe", iconClass: "fa-twitter", color: "#1DA1F2" },
      { platform: "GitHub", url: "https://github.com/janedoe", iconClass: "fa-github", color: "#333" },
    ],
    jobPreferences: ["Full-time", "Remote", "Hybrid"],
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome, {userDetails?.name || 'Student'}</h1>
      </header>

      <div className="dashboard-content">
        {/* Navigation */}
        <nav className="dashboard-nav">
          <ul>
            {[
              { href: '#profile', label: 'Profile', icon: '👤' },
              { href: '#skills', label: 'Skills', icon: '🛠️' },
              { href: '#certifications', label: 'Certifications', icon: '📜' },
              { href: '#portfolio', label: 'Portfolio', icon: '📁' },
              { href: '#social-media', label: 'Social Media', icon: '🌐' },
              { href: '#job-preferences', label: 'Job Preferences', icon: '🏢' },
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
          {/* Profile Section */}
          <section id="profile" className="section">
            <h2>Profile</h2>
            <div className="flex-center-gap">
              <img
                src={userDetails?.profile?.image || '/default-profile.png'}
                alt="Profile"
                className="profile-image"
              />
              <div className="grid-two-column">
                {Object.entries(userDetails.profile.details).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value || 'N/A'}
                    </p>
                  ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="section">
            <h2>Skills</h2>
            <div className="flex-wrap-gap">
              {(userDetails?.skills || []).map((skill) => (
                <span key={skill} className="badge">{skill}</span>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="section">
            <h2>Certifications</h2>
            <ul>
              {(userDetails?.certifications || []).map((certification) => (
                <li key={certification} className="list-item">{certification}</li>
              ))}
            </ul>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="section">
            <h2>Portfolio</h2>
            <p>
              <a
                href={userDetails?.portfolio?.link || '#'}
                target="_blank"
                className="link"
                rel="noopener noreferrer"
              >
                {userDetails?.portfolio?.link || 'N/A'}
              </a>
            </p>
          </section>

          {/* Social Media Section */}
          <section id="social-media" className="section">
            <h2>Social Media</h2>
            <div className="flex-gap">
              {(userDetails?.socialLinks || []).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <i className={`fab ${social.iconClass} social-media-icon`} style={{ color: social.color }}></i>
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Job Preferences Section */}
          <section id="job-preferences" className="section">
            <h2>Job Preferences</h2>
            <div className="flex-wrap-gap">
              {(userDetails?.jobPreferences || []).map((preference) => (
                <span key={preference} className="badge">{preference}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
