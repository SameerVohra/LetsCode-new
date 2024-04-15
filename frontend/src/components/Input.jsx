function Input({
  label,
  placeholder = "Enter value",
  type = "text",
  className = "",
  ...props
}) {
  return (
    <>
      <label className="mr-4">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`border-2 ${className}`}
        {...props}
      />
    </>
  );
}

export default Input;
