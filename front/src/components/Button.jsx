import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Button({ children, icon, variant = 'primary', color = 'default', onClick, type = 'button', disabled = false, to }) {
  const buttonElement = (
    <button
      role="button"
      data-variant={variant !== 'primary' ? variant : undefined}
      className={color !== 'default' ? color : undefined}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: children ? 8 : 0 }} />}
      {children}
    </button>
  );

  if (to) {
    return (
      <Link to={to}>{buttonElement}</Link>
    );
  }

  return buttonElement;
}

export default Button;