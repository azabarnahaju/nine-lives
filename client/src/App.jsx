import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App

/* 
   
        <Route path="/mycats" element={<MyCats />}></Route>
        <Route path="/mycats/:id" element={<CatProfile />}></Route>
        <Route path="/breeds" element={<Breeds />}></Route>
        <Route path="/breeds/:id" element={<BreedProfile />}></Route>
        <Route path="/profile" element={<Profile />}></Route> 
*/