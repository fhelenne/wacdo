function FormField({ 
  id, 
  name, 
  type = 'text', 
  label, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  role = 'input'
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        role={role}
        data-form-type="other"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;