import { Link } from "react-router-dom";

function LinkBtn({ to = "/", text = "Button", className = "", ...props }) {
  return (
    <Link
      to={to}
      className={`border-2 border-black text-white text-xl ${className}`}
      {...props}
    >
      {text}
    </Link>
  );
}

export default LinkBtn;
