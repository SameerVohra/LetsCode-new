function Input({
  label,
  placeholder = "Enter value",
  type = "text",
  className = "",
  ...props
}) {
  return (
    <>
      <label className="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`${className}`}
        {...props}
      />
    </>
  );
}

export default Input;
