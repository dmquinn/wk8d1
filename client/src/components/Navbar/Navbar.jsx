import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          {isLoggedIn ? (
            <>
              <button className="form-control me-2" onClick={logOutUser}>
                Log Out
              </button>
              <img
                src="https://avatars.githubusercontent.com/u/73913084?v=4"
                className="profileIcon"
                alt=""
              />
              <p>{user.name}</p>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>

              <Link to="/login">
                <button>Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
  // return (
  //   <nav>
  //     <Link to="/">
  //       <button>Home</button>
  //     </Link>

  //     {isLoggedIn && (
  //       <>
  //         <button onClick={logOutUser}>Logout</button>

  //         <Link to="/profile">
  //           <button>Profile</button>
  //           {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
  //         </Link>

  //         <span>{user && user.name}</span>
  //       </>
  //     )}

  //     {!isLoggedIn && (
  //       <>
  //         <Link to="/signup">
  //           {" "}
  //           <button>Sign Up</button>{" "}
  //         </Link>
  //         <Link to="/login">
  //           {" "}
  //           <button>Login</button>{" "}
  //         </Link>
  //       </>
  //     )}
  //   </nav>
  // );
}

export default Navbar;
