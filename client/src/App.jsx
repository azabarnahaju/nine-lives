import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Signup from './pages/Signup/Signup';
import MyCats from './pages/MyCats/MyCats';
import AppContext from './contexts/userContext';
import CatProfile from './pages/CatProfile/CatProfile';
import HealthRecord from './pages/HealthRecord/HealthRecord';
import Profile from './pages/Profile/Profile';

function App() {
    return (
      <BrowserRouter>
        <AppContext>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/mycats" element={<MyCats />}></Route>
            <Route path="/mycats/:catID" element={<CatProfile />}></Route>
            <Route path="/newhealthrecord" element={<HealthRecord />}></Route>
            <Route path="/profile/:userID" element={<Profile />}></Route>
          </Routes>
        </AppContext>
      </BrowserRouter>
    );
}

export default App;

/* 
   
       
        <Route path="/breeds" element={<Breeds />}></Route>
        <Route path="/breeds/:id" element={<BreedProfile />}></Route>
        
*/
