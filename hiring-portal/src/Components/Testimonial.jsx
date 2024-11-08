import React, { useEffect, useState } from 'react';

const Testimonials = () => {
  const [active, setActive] = useState(3);
  const items = [
    {
      img: "https://img.freepik.com/free-vector/gradient-professional-sarah-smith-linkedin-personal-profile-picture_742173-13011.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid",
      stars: "★★★★★",
      text: "HireHub transformed my job search! The seamless application process and instant feedback on coding assessments made a huge difference. Highly recommend it for job seekers!",
      name: "- Sita Reddy",
      jobTitle: "Software Engineer",
      location: "Location: Bengaluru, India"
    },
    {
      img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid",
      stars: "★★★★",
      text: "Applying for jobs on HireHub is effortless! The email notifications keep me updated, and the integrated assessments showcase my skills effectively. I feel more confident now!",
      name: "- Vikram Rao",
      jobTitle: "Data Analyst",
      location: "Location: Mumbai, India"
    },
    {
      img: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
      stars: "★★★★★",
      text: "HireHub simplifies recruitment! The intuitive dashboard makes managing job postings easy, and the coding assessments streamline candidate evaluation. A fantastic tool for any hiring manager!",
      name: "- Anita Desai",
      jobTitle: "HR Manager at Tech Innovations",
      location: "Location: Ahmedabad, India"
    },
    {
      img: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
      stars: "★★★★",
      text: "HireHub has transformed our hiring process. Quick company registration, easy job management, and effective coding assessments make it essential for efficient recruitment!",
      name: "- Rajesh Kumar",
      jobTitle: "CTO at Web Solutions Inc.",
      location: "Location: Chennai, India"
    },
    {
      img: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
      stars: "★★★★★",
      text: "Managing HireHub operations is seamless. Real-time monitoring of job postings and candidates ensures quality and integrity. A powerful platform for any recruitment process!",
      name: "- Priya Sharma",
      jobTitle: "Platform Administrator",
      location: "Location: Pune, India"
    }
  ];

  useEffect(() => {
    loadShow();
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % items.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [items.length]);

  const loadShow = () => {
    const itemsElement = document.querySelectorAll('.slider .item');
    itemsElement[active].style.transform = `none`;
    itemsElement[active].style.zIndex = 1;
    itemsElement[active].style.filter = 'none';
    itemsElement[active].style.opacity = 1;

    let stt = 0;
    for (let i = active + 1; i < itemsElement.length; i++) {
      stt++;
      itemsElement[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
      itemsElement[i].style.zIndex = 0;
      itemsElement[i].style.filter = 'blur(5px)';
      itemsElement[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (let i = (active - 1); i >= 0; i--) {
      stt++;
      itemsElement[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
      itemsElement[i].style.zIndex = 0;
      itemsElement[i].style.filter = 'blur(5px)';
      itemsElement[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  };

  return (
    <>
      <h1 style={{ fontWeight: 'bold', fontSize: '3rem', textAlign: 'center' }}>
        What Our Users Say About HireHub
      </h1>
      <div className="slider" style={{ position: 'relative', marginTop: '100px', width: '100%', height: '550px', overflow: 'hidden' }}>
        {items.map((item, index) => (
          <div className="item" key={index} style={{
            position: 'absolute',
            width: '350px',
            height: '430px',
            textAlign: 'justify',
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            transition: '0.5s',
            left: 'calc(50% - 150px)',
            top: '0',
            marginBottom: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <img src={item.img} alt="John Doe" style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '20px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            <div className="stars" style={{ color: '#ffd700', fontSize: '1.6em', marginTop: '1rem' }}>{item.stars}</div>
            <p style={{ textAlign: 'justify', fontSize: '0.9em', marginBottom: '20px' }}>{item.text}</p>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2em' }}>{item.name}</h2>
            <div className="job-title" style={{ color: '#007BFF', fontWeight: 'bold', margin: '0 0 5px 0', fontSize: '1.2rem' }}>{item.jobTitle}</div>
            <div className="location" style={{ color: '#000408', fontStyle: 'italic', margin: '0 0 15px 0' }}>{item.location}</div>
          </div>
        ))}

        <button id="next" style={{
          position: 'absolute',
          top: '40%',
          color: '#000',
          background: 'none',
          border: 'none',
          fontSize: 'xxx-large',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          opacity: 0.5,
          transition: 'opacity 0.5s',
          zIndex: 10,
          right: '50px',
          cursor: 'pointer'
        }} onClick={() => setActive(prev => (prev + 1 < items.length ? prev + 1 : prev))}>{">>"}</button>
        <button id="prev" style={{
          position: 'absolute',
          top: '40%',
          color: '#000',
          background: 'none',
          border: 'none',
          fontSize: 'xxx-large',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          opacity: 0.5,
          transition: 'opacity 0.5s',
          zIndex: 10,
          left: '50px',
          cursor: 'pointer'
        }} onClick={() => setActive(prev => (prev - 1 >= 0 ? prev - 1 : prev))}>{"<<"}</button>
      </div>
    </>
  );
};

export default Testimonials;
