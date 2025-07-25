function PageHeader({ title, description, actionButton, titleLevel = 'h1' }) {
  const TitleTag = titleLevel;
  
  return (
    <header>
      <TitleTag>{title}</TitleTag>
      {description && <p>{description}</p>}
      {actionButton && actionButton}
    </header>
  );
}

export default PageHeader;