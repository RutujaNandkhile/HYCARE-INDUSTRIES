const BenefitItem = ({ item }) => {
  return (
    <div className="benefit-item">
      <div className={`benefit-icon ${item.color}`}>
        <i className={item.icon}></i>
      </div>

      <div>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
