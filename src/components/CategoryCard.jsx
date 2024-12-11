import React from 'react';

const CategoryCard = ({ iconClass, title, vacancies }) => {
  return (
    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
      <a className="cat-item rounded p-4" href="">
        <i className={`fa fa-3x ${iconClass} text-primary mb-4`}></i>
        <h6 className="mb-3">{title}</h6>
        <p className="mb-0">{vacancies} Vacancy</p>
      </a>
    </div>
  );
};

export default CategoryCard;
