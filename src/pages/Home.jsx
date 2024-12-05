import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css';
import WOW from 'wow.js';
import happy_boss from "../img/happy boss.jpg";
import happy_emp from "../img/happy employee.jpg";
import "../css/Home.css";
import { NavLink, useNavigate } from 'react-router-dom';
import "../godfather_css/style.css";
import axios from 'axios';

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

  const checkLoginStatusStudent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/students/login',{}, {
        withCredentials: true,
      });
      if(response.data.redirect){
        
        navigate(response.data.redirect)
      }

      
    } catch (error) {
      
        navigate(error.response.data.redirect || "/studentlogin");
      
  };}

  const checkLoginStatusCompany = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/companies/login',{}, {
        withCredentials: true,
      });
      console.log(response?.cookie)
      
      if(response.data.redirect){
        
        navigate(response.data.redirect);
      }

      
    } catch (error) {
      
        navigate(error.response.data.redirect || "/businesslogin");
      
  };}
  

  return (
    <div className="container-fluid p-0">
      {/* Carousel Section */}
      <Slider {...settings} className="header-carousel position-relative">
        <div className="owl-carousel-item position-relative">
          <img className="img-fluid" src={happy_boss} alt="Happy Employee" />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(43, 57, 64, .5)' }}>
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-10 col-lg-8">
                  <h1 className="display-3 text-white animated slideInDown mb-4">Where Talent Meets Opportunity</h1>
                  <p className="fs-5 fw-medium text-white mb-4 pb-2">Connecting job seekers with roles that inspire and empower them to grow and succeed. Your dream career starts here.</p>
                  <button onClick={checkLoginStatusStudent} className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                    Search A Job
                  </button>
                  <button onClick={checkLoginStatusCompany} className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">
                    Find A Talent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="owl-carousel-item position-relative">
          <img className="img-fluid" src={happy_emp} alt="Happy Boss" />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(43, 57, 64, .5)' }}>
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-10 col-lg-8">
                  <h1 className="display-3 text-white animated slideInDown mb-4">Discover Talent That Drives Success</h1>
                  <p className="fs-5 fw-medium text-white mb-4 pb-2">Find top candidates who align with your vision and elevate your business to new heights.</p>
                  <button onClick={checkLoginStatusStudent} className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                    Search A Job
                  </button>
                  <button onClick={checkLoginStatusCompany} className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">
                    Find A Talent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>

      {/* Search Section */}
      <div className="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style={{ padding: "35px" }}>
        <div className="container">
          <div className="row g-2">
            <div className="col-md-10">
              <div className="row g-2">
                <div className="col-md-4">
                  <select className="form-select border-0">
                    <option value="" disabled>Category</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select className="form-select border-0">
                    <option value="" disabled>Category</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select className="form-select border-0">
                    <option value="" disabled>Location</option>
                    <option value="1">Location 1</option>
                    <option value="2">Location 2</option>
                    <option value="3">Location 3</option>
                  </select>
                </div>
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
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-mail-bulk text-primary mb-4"></i>
                <h6 className="mb-3">Marketing</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                <h6 className="mb-3">Customer Service</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                <h6 className="mb-3">Human Resource</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-tasks text-primary mb-4"></i>
                <h6 className="mb-3">Project Management</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-chart-line text-primary mb-4"></i>
                <h6 className="mb-3">Business Development</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-hands-helping text-primary mb-4"></i>
                <h6 className="mb-3">Sales & Communication</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-book-reader text-primary mb-4"></i>
                <h6 className="mb-3">Teaching & Education</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a className="cat-item rounded p-4" href="">
                <i className="fa fa-3x fa-drafting-compass text-primary mb-4"></i>
                <h6 className="mb-3">Design & Creative</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
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
