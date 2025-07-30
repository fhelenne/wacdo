import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({ children, icon, variant = 'primary', color = 'default', onClick, type = 'button', disabled = false }) {
  return (
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
}

export default Button;