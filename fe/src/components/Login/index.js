import "./index.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../commonComponents/Heading";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate()
  const {setUserIsLoggedIn} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    axios
      .post("http://localhost:8000/login", loginData)
      .then((res) => {
        console.log(res);
        setUserIsLoggedIn(true);
        navigate('/welcome')
      })
      .catch((err) => {
        console.log(err)
        if(err.response){
          setErrorText(err.response.data.message)
        }
        
      });
  };
  return (
    <div className="home-page">
      <Heading text={"Login"} />
      <Container>
        <Row className="vh-60 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-dark"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <p className=" mb-5">Please enter your login and password!</p>
                  <p className="mb-3" style={{ color: "red" }}>
                    {errorText}
                  </p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="outline-success" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to={"/signup"} className="text-primary fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
