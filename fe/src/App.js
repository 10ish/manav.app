import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navigation from "./components/commonComponents/Navigation";
import axios from "axios";
import WelcomePage from "./components/WelcomePage";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
function App() {
  const {userIsLoggedIn} = useContext(AuthContext)
  axios.defaults.withCredentials = true
  return (
    <div className="App">
    <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={userIsLoggedIn&&<WelcomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
