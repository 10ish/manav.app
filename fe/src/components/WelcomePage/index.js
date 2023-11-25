import { Card, Button } from "react-bootstrap";
import "./index.css";
import { useEffect, useState } from "react";
import Heading from "../commonComponents/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function WelcomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const handleLogout = () => {
    axios
      .post("http://localhost:8000/logout")
      .then((res) => {
        console.log(res);
        navigate("/");
        window.location.reload(false)
      })
      .catch((err) => {
        console.log("Unable to logout due to error " + err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/userDetails")
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="welcome-page">
      <Heading text={`Welcome ${userData.fullName}`} />
      <Card style={{ width: "28rem" }} className="mb-5">
        <Card.Img
          variant="top"
          src="https://xsgames.co/randomusers/avatar.php?g=female"
        />
        <Card.Body>
          <Card.Title>Your Details</Card.Title>
          <Card.Text>
            <strong>Name : </strong> {userData.fullName}
          </Card.Text>
          <Card.Text>
            <strong>Email: </strong> {userData.email}
          </Card.Text>
          <Card.Text>
            <strong>Phone Number : </strong> {userData.phoneNumber}
          </Card.Text>
          <Card.Text>
            <strong>Address : </strong> {userData.address}
          </Card.Text>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
