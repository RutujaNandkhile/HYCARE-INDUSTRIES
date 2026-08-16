const PhotoCard = ({ image, title }) => {
  return (
    <div className="photo-card">
      <img src={image} alt={title} />
      <h6>{title}</h6>
    </div>
  );
};

export default PhotoCard;
