import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Testimonials Component
const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Optional: to disable the previous/next arrows
  };

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <h1 className="text-center mb-5">Our Clients Say!!!</h1>
        <Slider {...settings} className="testimonial-carousel">
          {/* Testimonial Item 1 */}
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam
            </p>
            <div className="d-flex align-items-center">
              <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-1.jpg" alt="Client 1" style={{ width: '50px', height: '50px' }} />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          
          {/* Testimonial Item 2 */}
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam
            </p>
            <div className="d-flex align-items-center">
              <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-2.jpg" alt="Client 2" style={{ width: '50px', height: '50px' }} />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          
          {/* Testimonial Item 3 */}
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam
            </p>
            <div className="d-flex align-items-center">
              <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-3.jpg" alt="Client 3" style={{ width: '50px', height: '50px' }} />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          
          {/* Testimonial Item 4 */}
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam
            </p>
            <div className="d-flex align-items-center">
              <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-4.jpg" alt="Client 4" style={{ width: '50px', height: '50px' }} />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
