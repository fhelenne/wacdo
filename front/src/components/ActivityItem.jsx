function ActivityItem({ title, description, timestamp }) {
  return (
    <div role="activity-item">
      <p>{title}</p>
      <p>{description}</p>
      <p>{timestamp}</p>
    </div>
  );
}

export default ActivityItem;