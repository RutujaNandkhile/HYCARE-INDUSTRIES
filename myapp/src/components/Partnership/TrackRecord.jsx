const TrackRecord = ({ stats, industries }) => {
  return (
    <div className="track-record">
      <h3>Our Track Record</h3>

      <div className="stats-grid">
        {stats.map((item, i) => (
          <div key={i} className="stat">
            <h2>{item.value}</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <hr />

      <h4>Industries Served</h4>
      <div className="industry-tags">
        {industries.map((ind, i) => (
          <span key={i}>{ind}</span>
        ))}
      </div>
    </div>
  );
};

export default TrackRecord;
