import Heading from "../commonComponents/Heading";
import "./index.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswordField] = useState(null);
  const [confirmPassword, setConfirmPassowordField] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState('')

  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);
  useEffect(() => {
    if (password === confirmPassword) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [password, confirmPassword]);
  const formData = {
    fullName,
    email,
    password,
    phoneNumber,
    gender,
    address,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/signup", formData)
      .then((res) => {
        console.log(res);
        navigate('/login')
      })
      .catch((err) => {

        setShowErrorMessage(true);
        setErrorMessage(err.response.data.message)
      });
  };

  return (
    <div className="home-page">
      <Heading text={"Signup"} />{" "}
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-dark"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    {showErrorMessage && (
                      <p style={{ color: "red" }}>
                      {errorMessage}
                      </p>
                    )}
                    <Form
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <Form.Group className="mb-3" controlId="Full name">
                        <Form.Label className="text-center">
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Enter Name"
                          onChange={(event) => {
                            setFullName(event.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Email">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          required
                          placeholder="Enter email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="Password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          required
                          placeholder="Password"
                          onChange={(e) => {
                            setPasswordField(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="confirmPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          required
                          onChange={(e) => {
                            setConfirmPassowordField(e.target.value);
                          }}
                        />
                        {password && confirmPassword !== "" ? (
                          password !== confirmPassword ? (
                            <p style={{ color: "red" }}>
                              The passwords do not match
                            </p>
                          ) : (
                            <p style={{ color: "green" }}>Passwords Match</p>
                          )
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="">
                        <Form.Label className="text-center">Gender</Form.Label>
                        <br />
                        <Form.Select
                          aria-label="Default select example"
                          className="p-1 m-2 rounded"
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        >
                          <option>Select type ..</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="both">Both</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className="text-center">
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter phone number"
                          onChange={(event) => {
                            setPhoneNumber(event.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="text-center">Adrress</Form.Label>
                        <Form.Control
                          as={"textarea"}
                          placeholder="Enter Adress"
                          onChange={(event) => {
                            setAddress(event.target.value);
                          }}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          variant="outline-dark"
                          disabled={!submitEnabled}
                          type="submit"
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link
                          to={"/applicants/login"}
                          className="text-primary fw-bold"
                        >
                          Login
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
