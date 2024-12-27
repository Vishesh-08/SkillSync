import React, { useEffect, useState } from 'react';
import '../css/PotentialCandidates.css'; // Add corresponding CSS styles here

const PotentialCandidates = ({ studentsData }) => {
  return (
    <div className="pc-container">
      <h1 className="pc-heading">Potential Candidates for Job Role</h1>
      <table className="pc-candidate-table">
        <thead>
          <tr>
            <th className="pc-table-header">Name</th>
            <th className="pc-table-header">Photo</th>
            <th className="pc-table-header">Resume</th>
            <th className="pc-table-header">CGPA</th>
            <th className="pc-table-header">Skills</th>
            <th className="pc-table-header">Contact Details</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((candidate, index) => (
            <tr key={index} className="pc-table-row">
              <td className="pc-table-cell">{candidate.name}</td>
              <td className="pc-table-cell">
                <img src={candidate.image} alt={`${candidate.name} Photo`} className="pc-candidate-photo" />
              </td>
              <td className="pc-table-cell">
                <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="pc-resume-link">
                  View Resume
                </a>
              </td>
              <td className="pc-table-cell">{candidate.gpa}</td>
              <td className="pc-table-cell">{candidate.skills.join(', ')}</td>
              <td className="pc-table-cell">{candidate.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PotentialCandidates;

