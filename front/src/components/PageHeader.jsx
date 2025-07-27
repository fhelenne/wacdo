import '../styles/components/PageHeader.css';

function PageHeader({ title, description, actionButton }) {
  return (
    <header role="banner">
      <div>
        <div>
          <h1>
            {title}
          </h1>
          {description && (
            <p role="doc-subtitle">
              {description}
            </p>
          )}
        </div>
        {actionButton && (
          <div>
            {actionButton}
          </div>
        )}
      </div>
    </header>
  );
}

export default PageHeader;