function StatCard({ title, value, subtitle }) {
  return (
    <article role="stat-card">
      <dl>
        <dt>{title}</dt>
        <dd>{value}</dd>
      </dl>
      <div>{subtitle}</div>
    </article>
  );
}

export default StatCard;