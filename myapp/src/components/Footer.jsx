import React from "react";

const Footer = () => {
  return (
   <>
    <footer className="bg-dark text-white pt-4">
      {/* Map */}
      <div className="container mb-4">
        <iframe
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15122.67581410143!2d73.835865!3d18.633954!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b86ca5f396a5%3A0xadc580931e9255f8!2s10%2F3%2F4%2F152%2C%20J%20Block%2C%20MIDC%2C%20Bhosari%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411018!5e0!3m2!1sen!2sin!4v1768733542386!5m2!1sen!2sin"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer sections */}
      <div className="container d-flex justify-content-between flex-wrap py-4 border-top border-secondary">
        {/* Navigation */}
        <div className="mb-3">
          <h5>Navigation</h5>
          <ul className="list-unstyled">
            <li>Home</li>
           
            <li>About Us</li>
            <li>Services</li>
          </ul>
        </div>

        {/* Quick Link */}
        <div className="mb-3">
          <h5>Quick Link</h5>
          <ul className="list-unstyled">
            <li>Contact Us</li>
            <li>FAQs</li>
            
          </ul>
        </div>

        {/* Services */}
        <div className="mb-3">
          <h5>Services</h5>
          <ul className="list-unstyled">
            <li>Home</li>
            <li>Contact</li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mb-3">
  <h5>Contact</h5>

  {/* Phone Number - clickable */}
  <p>
    📞 
    <a href="tel:+7620335231" className="text-decoration-none">
      7620335231
    </a>
  </p>

  {/* Email */}
  <p>
    <a href="mailto:hycareengineering23@gmail.com" className="text-decoration-none">
      hycareengineering23@gmail.com
    </a>
  </p>

  {/* Social icons */}
  <div className="d-flex gap-3">
    {/* Facebook */}
    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-facebook fs-4"></i>
    </a>

    {/* Twitter */}
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-twitter fs-4"></i>
    </a>

    {/* YouTube */}
    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-youtube fs-4"></i>
    </a>

    {/* WhatsApp */}
    <a
  href="https://wa.me/917620335231?text=Hello%20I%20am%20interested%20in%20your%20services"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="bi bi-whatsapp fs-4 text-success"></i>
</a>

  </div>
</div>

      </div>

      {/* Bottom bar */}
      <div className="container d-flex justify-content-between align-items-center py-3 border-top border-secondary">
        <a href="#" className="btn btn-outline-light">
          Visit site
        </a>
        <p className="mb-0">&copy; 2026 Nursee. All rights reserved.</p>
      </div>
    </footer>
   </>
  );
};

export default Footer;
