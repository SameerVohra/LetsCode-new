import { Link } from "react-router-dom";

function LinkBtn({ to = "/", text = "Button", className = "", ...props }) {
  return (
    <Link
      to={to}
      className={`${className} border-2 border-black  text-xl`}
      {...props}
    >
      {text}
    </Link>
  );
}

export default LinkBtn;
