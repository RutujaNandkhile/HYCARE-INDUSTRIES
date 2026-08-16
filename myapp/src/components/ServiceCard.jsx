const ServiceCard = ({ icon, title, desc, image }) => {
  return (
    <div className="service-card">
      {/* ICON */}
      <div className="service-icon">{icon}</div>

      {/* TITLE */}
      <h3>{title}</h3>

      {/* DESCRIPTION */}
      <p>{desc}</p>

      {/* HIDDEN IMAGE ON HOVER */}
      <div className="service-hover">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default ServiceCard;
