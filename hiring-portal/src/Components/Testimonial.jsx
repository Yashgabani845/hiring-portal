import React from 'react';
import '../CSS/testimonial.css';

const Testimonial = () => {
  return (
    <>
      <section className="body-background">
        <div className="container">
          <div className="grid">
            <div className="grid-item-1">
              <h2 className="title">HireHub Client Testimonials...</h2>
              <p className="description">
              Discover the success stories from professionals who have found their dream jobs through HireHub. 
              </p>
              <div className="navigation-buttons">
                <button className="see-more-button">
                  See More
                </button>
              </div>
            </div>

            <div className="grid-item-2">
              <div className="card">
                <div className="stars">
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                </div>
                <h3 className="card-title"> Marketing Specialist</h3>
                <p className="card-description">
                Finding a new job can be daunting, but HireHub made it an incredibly smooth and rewarding journey.The application process was straightforward, and I received valuable job alerts that kept me informed about new openings. Thanks to Hire Hub, I secured a fantastic role as a Marketing Specialist at a dynamic company. I highly recommend this platform to anyone looking to advance their career.
                </p>
                <p className="author">— Michael Scott</p>
              </div>

              <div className="card">
                <div className="stars">
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                  <i className="fas fa-star star-icon"></i>
                </div>
                <h3 className="card-title"> Project Manager</h3>
                <p className="card-description">
                My experience with HireHub was nothing short of amazing. The site offered a wide range of job listings and the support tools necessary for a successful job hunt. I received tailored job recommendations and insightful career advice. Ultimately, I secured a wonderful position as a Project Manager. Thank you, HireHub, for making this possible!
                </p>
                <p className="author">— John Doe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
