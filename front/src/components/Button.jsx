function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false }) {
  return (
    <button
      role="button"
      data-variant={variant !== 'primary' ? variant : undefined}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;