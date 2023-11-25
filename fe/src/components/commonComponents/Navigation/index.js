import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Navigation() {
  const navigate = useNavigate();
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(AuthContext);
  const handleLogout = () => {
    axios
      .post("http://localhost:8000/logout")
      .then((res) => {
        console.log(res);
        setUserIsLoggedIn(false)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err)
      });
  };
  return (
    <div className="navigation">
      <Navbar expand="lg" className="site-nav" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="/">
            Manav
            <br />
            App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>

              <Nav.Link href="/login">Login</Nav.Link>

              <Nav.Link href="/signup">Signup</Nav.Link>
              {userIsLoggedIn && (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
