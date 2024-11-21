import React, { useState } from 'react';

const JobList = () => {
  const [activeTab, setActiveTab] = useState('tab-1');

  const jobListings = [
    {
      title: 'Software Engineer',
      location: 'New York, USA',
      jobType: 'Full Time',
      salary: '$123 - $456',
      companyLogo: 'img/com-logo-1.jpg',
      deadline: '01 Jan, 2045',
    },
    {
      title: 'Marketing Manager',
      location: 'New York, USA',
      jobType: 'Full Time',
      salary: '$123 - $456',
      companyLogo: 'img/com-logo-2.jpg',
      deadline: '01 Jan, 2045',
    },
    {
      title: 'Product Designer',
      location: 'New York, USA',
      jobType: 'Full Time',
      salary: '$123 - $456',
      companyLogo: 'img/com-logo-3.jpg',
      deadline: '01 Jan, 2045',
    },
    {
      title: 'Creative Director',
      location: 'New York, USA',
      jobType: 'Full Time',
      salary: '$123 - $456',
      companyLogo: 'img/com-logo-4.jpg',
      deadline: '01 Jan, 2045',
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      {/* Header */}
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Job List</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Pages</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Job List</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Job Listing */}
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>

          {/* Tabs */}
          <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'tab-1' ? 'active' : ''}`}
                  data-bs-toggle="pill"
                  href="#tab-1"
                  onClick={() => handleTabClick('tab-1')}
                >
                  <h6 className="mt-n1 mb-0">Featured</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'tab-2' ? 'active' : ''}`}
                  data-bs-toggle="pill"
                  href="#tab-2"
                  onClick={() => handleTabClick('tab-2')}
                >
                  <h6 className="mt-n1 mb-0">Full Time</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`d-flex align-items-center text-start mx-3 me-0 pb-3 ${activeTab === 'tab-3' ? 'active' : ''}`}
                  data-bs-toggle="pill"
                  href="#tab-3"
                  onClick={() => handleTabClick('tab-3')}
                >
                  <h6 className="mt-n1 mb-0">Part Time</h6>
                </a>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              <div id="tab-1" className={`tab-pane fade show p-0 ${activeTab === 'tab-1' ? 'active' : ''}`}>
                {jobListings.map((job, index) => (
                  <JobItem key={index} job={job} />
                ))}
              </div>
              <div id="tab-2" className={`tab-pane fade show p-0 ${activeTab === 'tab-2' ? 'active' : ''}`}>
                {jobListings.map((job, index) => (
                  <JobItem key={index} job={job} />
                ))}
              </div>
              <div id="tab-3" className={`tab-pane fade show p-0 ${activeTab === 'tab-3' ? 'active' : ''}`}>
                {jobListings.map((job, index) => (
                  <JobItem key={index} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// JobItem Component for rendering each job listing
const JobItem = ({ job }) => {
  return (
    <div className="job-item p-4 mb-4">
      <div className="row g-4">
        <div className="col-sm-12 col-md-8 d-flex align-items-center">
          <img className="flex-shrink-0 img-fluid border rounded" src={job.companyLogo} alt="" style={{ width: '80px', height: '80px' }} />
          <div className="text-start ps-4">
            <h5 className="mb-3">{job.title}</h5>
            <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{job.location}</span>
            <span className="text-truncate me-3"><i className="far fa-clock text-primary me-2"></i>{job.jobType}</span>
            <span className="text-truncate me-0"><i className="far fa-money-bill-alt text-primary me-2"></i>{job.salary}</span>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
          <div className="d-flex mb-3">
            <a className="btn btn-light btn-square me-3" href="#"><i className="far fa-heart text-primary"></i></a>
            <a className="btn btn-primary" href="#">Apply Now</a>
          </div>
          <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date Line: {job.deadline}</small>
        </div>
      </div>
    </div>
  );
};

export default JobList;
