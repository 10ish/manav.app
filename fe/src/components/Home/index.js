import "./index.css";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { FaRegIdCard } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Heading from "../commonComponents/Heading";
export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-page">
      <Heading text={"Home Page"} />
      <Container>
        
          <Row className="home-option" onClick={()=>{
          navigate('/signup')
          }}>
    
            <FaRegIdCard className="home-option-icon" />
          
            <h2>Register</h2>
          </Row>
          <Row className="home-option" onClick={()=>{
            navigate('/login')
            }} >
            <CiLogin className="home-option-icon" />
            <h2>Login</h2>
          </Row>
      
      </Container>
    </div>
  );
}
