import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css';
import WOW from 'wow.js';
import happy_boss from "../img/happy boss.jpg";
import happy_emp from "../img/happy employee.jpg";
import "../css/Home.css";
import { useNavigate } from 'react-router-dom';
import "../godfather_css/style.css";
import CategoryCard from '../components/CategoryCard'; // Importing reusable component

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    new WOW().init();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const categories = [
    { iconClass: 'fa-mail-bulk', title: 'Marketing', vacancies: 123 },
    { iconClass: 'fa-headset', title: 'Customer Service', vacancies: 123 },
    { iconClass: 'fa-user-tie', title: 'Human Resource', vacancies: 123 },
    { iconClass: 'fa-tasks', title: 'Project Management', vacancies: 123 },
    { iconClass: 'fa-chart-line', title: 'Business Development', vacancies: 123 },
    { iconClass: 'fa-hands-helping', title: 'Sales & Communication', vacancies: 123 },
    { iconClass: 'fa-book-reader', title: 'Teaching & Education', vacancies: 123 },
    { iconClass: 'fa-drafting-compass', title: 'Design & Creative', vacancies: 123 },
  ];

  const handleStudentSkillsForm = () => navigate("/job-search");
  const handleCompanySearchForm = () => navigate("/candidate-search");

  return (
    <div className="container-fluid p-0">
      {/* Carousel Section */}
      <Slider {...settings} className="header-carousel position-relative">
        {[{ src: happy_boss, title: 'Where Talent Meets Opportunity', desc: 'Connecting job seekers with roles that inspire and empower them to grow and succeed. Your dream career starts here.' },
        { src: happy_emp, title: 'Discover Talent That Drives Success', desc: 'Find top candidates who align with your vision and elevate your business to new heights.' }
        ].map((item, index) => (
          <div className="owl-carousel-item position-relative" key={index}>
            <img className="img-fluid" src={item.src} alt={item.title} />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(43, 57, 64, .5)' }}>
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-3 text-white animated slideInDown mb-4">{item.title}</h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">{item.desc}</p>
                    <button onClick={handleStudentSkillsForm} className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                      Search A Job
                    </button>
                    <button onClick={handleCompanySearchForm} className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">
                      Find A Talent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Search Section */}
      <div className="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style={{ padding: "35px" }}>
        <div className="container">
          <div className="row g-2">
            <div className="col-md-10">
              <div className="row g-2">
                {['Category', 'Category', 'Location'].map((placeholder, idx) => (
                  <div className="col-md-4" key={idx}>
                    <select className="form-select border-0">
                      <option value="" disabled>{placeholder}</option>
                      <option value="1">{placeholder} 1</option>
                      <option value="2">{placeholder} 2</option>
                      <option value="3">{placeholder} 3</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-2" style={{ marginTop: '13px' }}>
              <button className="btn btn-dark border-0 w-100">Search</button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h1>
          <div className="row g-4">
            {categories.map((category, idx) => (
              <CategoryCard
                key={idx}
                iconClass={category.iconClass}
                title={category.title}
                vacancies={category.vacancies|| 0}
              />
            ))}
          </div>
        </div>
      </div>

      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
};

export default Home;
