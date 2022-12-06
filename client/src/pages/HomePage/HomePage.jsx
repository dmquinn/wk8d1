import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <Link to="/posts">projects</Link>
    </div>
  );
}

export default HomePage;
