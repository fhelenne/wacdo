function StatCard({ title, value, subtitle }) {
  return (
    <div role="stat-card">
      <div>
        <div>
          <h3 role="heading">
            {title}
          </h3>
          <div role="status">
            {value}
          </div>
        </div>
        {subtitle && (
          <div>
            <span role="note">
              {subtitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;