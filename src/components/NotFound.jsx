import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <h1>
      Page not found. Go back to <Link to="/">Home</Link>
    </h1>
  );
};

export default NotFound;
