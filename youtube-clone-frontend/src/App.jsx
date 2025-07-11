import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import VideoDetailPage from "./pages/VideoDetailPage";
import Profile from "./pages/Profile";
import VideoUpload from "./pages/VideoUpload";
import RegisterPage from "./pages/RegisterPage";


function App() {
  const [SideNavbar, setSideNavBar] = useState(true);

  // useEffect(()=>{
  //   axios.get('http://localhost:5100/api/getallvideo')
  //   .then((res)=>{
  //     console.log(res);      
  //   })
  //   .catch((err)=>{
  //     console.log(err);      
  //   })
  // },[]);

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
        <Route path="/:id/upload" element={<VideoUpload />}></Route>
        <Route path="/signup" element={<RegisterPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;


// homepage => mainpage
//navbar => header

