import React, { useContext } from 'react';
import { useUserDetails } from '../contexts/UserContext'; // Ensure correct import path
import '../css/Dashboard.css';

const StudentDashboard = () => {
   const { userDetails } = useUserDetails();

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  /*const userDetails = {
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
  };*/

  return(
    <div className="bg-gradient-to-r from-gray-100 via-blue-50 to-blue-50 min-h-screen flex flex-col items-center font-inter">
      {/* Header */}
      <header className="bg-blue-700 text-white text-center py-8 w-full shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">Welcome, {userDetails.fullName}</h1>
      </header>

      {/* Body Container */}
      <div className="flex w-11/12 max-w-6xl mx-auto mt-8 items-start gap-8">
        {/* Sidebar */}
        <nav className="bg-blue-700 text-white rounded-lg p-6 w-full lg:w-64 shadow-xl flex-shrink-0">
          <ul className="space-y-6">
            {[
              { href: "#profile", label: "Profile", icon: "👤" },
              { href: "#skills", label: "Skills", icon: "🛠️" },
              { href: "#certifications", label: "Certifications", icon: "📜" },
              { href: "#portfolio", label: "Portfolio", icon: "📁" },
              { href: "#social-media", label: "Social Media", icon: "🌐" },
              { href: "#job-preferences", label: "Job Preferences", icon: "🏢" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-blue-500 transform transition-transform hover:scale-105 text-lg font-semibold"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="bg-white flex-1 rounded-lg shadow-xl p-8 animate-fadeIn">
          {/* Profile Section */}
          <section id="profile" className="mb-10">
            <h2 className="text-blue-700 text-3xl font-bold border-b-4 border-blue-300 pb-3 mb-6">Profile</h2>
            <div className="flex items-center gap-10">
              <img
                src={userDetails.profile?.image}
                alt="Profile Picture"
                className="h-36 w-36 rounded-full border-4 border-blue-300 shadow-lg transform transition-transform hover:scale-105"
              />
              <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-gray-700 text-lg">
                {Object.entries(userDetails.details).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="mb-10">
            <h2 className="text-blue-700 text-3xl font-bold border-b-4 border-blue-300 pb-3 mb-6">Skills</h2>
            <div className="flex flex-wrap gap-6">
              {userDetails.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full shadow-md font-medium transform transition-transform hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="mb-10">
            <h2 className="text-blue-700 text-3xl font-bold border-b-4 border-blue-300 pb-3 mb-6">Certifications</h2>
            <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
              {userDetails?.certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="mb-10">
            <h2 className="text-blue-700 text-3xl font-bold border-b-4 border-blue-300 pb-3 mb-6">Portfolio</h2>
            <p>
              <a
                href={userDetails.portfolio.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                {userDetails.portfolio.link}
              </a>
            </p>
          </section>

          {/* Social Media Section */}
          <section id="social-media" className="mb-10">
            <h2 className="text-blue-700 text-3xl font-bold border-b-4 border-blue-300 pb-3 mb-6">Social Media</h2>
            <div className="flex gap-6">
              {userDetails.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:opacity-80 transition"
                >
                  <i className={`fab ${social.iconClass} text-2xl`} style={{ color: social.color }}></i>
                  <span className="text-blue-700">{social.platform}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Job Preferences Section */}
          <section id="job-preferences">
            <h2 className="text-blue-700 text-3xl font-bold border-b-4 border-blue-300 pb-3 mb-6">Job Preferences</h2>
            <div className="flex flex-wrap gap-6">
              {userDetails.jobPreferences.map((preference) => (
                <span
                  key={preference}
                  className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full shadow-md font-medium transform transition-transform hover:scale-105"
                >
                  {preference}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

