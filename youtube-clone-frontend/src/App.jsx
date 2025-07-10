import Header from "./components/Header";
import "./App.css";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import VideoDetailPage from "./pages/VideoDetailPage";
import Profile from "./pages/Profile";


function App() {
  const [SideNavbar, setSideNavBar] = useState(true);
  const sidenavbar = (value) => {
    setSideNavBar(value);
  }
  return (
    <div className="App">
      <Header sidenavbar={sidenavbar} SideNavbar={SideNavbar}/>
      <Routes>
        <Route path="/" element={<HomePage SideNavbar={SideNavbar}/>}></Route>
        <Route path="/watch/:id" element={<VideoDetailPage />}></Route>
        <Route path="/user/:id" element={<Profile SideNavbar={SideNavbar}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;


// homepage => mainpage
//navbar => header

