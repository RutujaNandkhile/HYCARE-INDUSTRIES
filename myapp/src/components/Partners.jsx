import "./Partners.css";

const Partners = () => {
  const logos = [
    { id: 1, name: "Logoipsum", icon: "bi bi-sun" },
    { id: 2, name: "Logoipsum", icon: "bi bi-lightning" },
    { id: 3, name: "Logoipsum", icon: "bi bi-water" },
    { id: 4, name: "Logoipsum", icon: "bi bi-hexagon" },
  ];

  return (
    <section className="partners">
      <h2>Our Partners</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </p>

      <div className="partners-grid">
        {logos.map((item) => (
          <div className="partner" key={item.id}>
            <i className={item.icon}></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
