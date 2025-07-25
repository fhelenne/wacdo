function Button({ children, onClick, type = 'button', role = 'button', ...props }) {
  return (
    <button
      type={type}
      role={role}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;