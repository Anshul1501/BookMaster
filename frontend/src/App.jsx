import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from './pages/Singup/SignUp'
import Login from './pages/Login/Login'
import FlightSearchResult from './pages/FlightSearchResult/FlightSearchResult';

function App() { 

  return (
    <>
     <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flightSearchResult" element={<FlightSearchResult/>} />
        </Routes>
    </Router>
    </>
  )
}

export default App
