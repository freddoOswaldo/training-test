import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import User from "./components/pages/User";
import SignIn from "./components/pages/SignIn";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
