import React, { useState, useEffect, useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";

function Header({ sidenavbar, SideNavbar }) {
  const [userPic, setUserPic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s");
  const [userName, setUserName] = useState("");
  const [navbarModel, setNavbarModel] = useState(false);
  const { searchTitle, setSearchTitle } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState(searchTitle);
  const [login, setLogin] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    let userId = localStorage.getItem("UserId");
    navigate(`/user/${userId}`);
    setNavbarModel(false);
  };

  const setLOginModel = () => setLogin(false);

  const onClickOption = (button) => {
    setNavbarModel(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      setUserName("");
      setUserPic("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s");
      setIsLogedIn(false);
      window.dispatchEvent(new Event("authChanged"));
      getLogoutFunction();
    }
  };

  const getLogoutFunction = () => {
    axios.post('http://localhost:5100/api/auth/logout', {}, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let userName = localStorage.getItem("UserName");
    let userProfilePic = localStorage.getItem("avatar");
    let val = localStorage.getItem("UserId");
    setIsLogedIn(!!val);
    if (userProfilePic) setUserPic(userProfilePic);
    if (userName) setUserName(userName);
  }, []);

  useEffect(() => {
    setInputValue(searchTitle);
  }, [searchTitle]);

  const handleClickModel = () => setNavbarModel((prev) => !prev);
  const sidenavbarfunc = () => sidenavbar(!SideNavbar);

  const triggerSearch = () => {
    setSearchTitle(inputValue);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("searchVideo", { detail: inputValue }));
    }, 0);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black z-50 border-b border-gray-800">
  <div className="flex items-center justify-between flex-wrap px-4 py-2 gap-3">
    
    {/* Left: Logo + Menu */}
    <div className="flex items-center gap-2">
      <button className="text-white" onClick={sidenavbarfunc}>
        <MenuIcon />
      </button>
      <Link to="/" className="flex items-center gap-1 text-white text-xl font-semibold">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png"
          alt="logo"
          className="w-7 h-7"
        />
        <span>YouTube</span>
      </Link>
    </div>

    {/* Center: Search bar (always visible now) */}
    <div className="flex flex-1 justify-center max-w-[500px] min-w-[180px]">
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
          className="w-full px-4 py-1.5 text-sm rounded-l-full bg-[#121212] border border-gray-700 text-white placeholder:text-sm focus:outline-none"
        />
        <button
          onClick={triggerSearch}
          className="px-4 py-1.5 bg-[#2a2a2a] rounded-r-full border border-l-0 border-gray-700 flex items-center justify-center"
        >
          <SearchIcon sx={{ color: "white", fontSize: 24 }} />
        </button>
      </div>
    </div>

    {/* Right: Buttons */}
    <div className="flex items-center gap-3 text-white">
      <button
        onClick={() => {
          const userId = localStorage.getItem("UserId");
          if (userId) {
            navigate(`/${userId}/channel`);
          } else {
            toast.error("Please login to create a channel");
          }
        }}
        className="text-white border border-white px-3 py-1 rounded-full text-sm hover:bg-white hover:text-black whitespace-nowrap"
      >
        + Create Channel
      </button>

      {localStorage.getItem("UserId") && (
        <Link to={`/${localStorage.getItem("UserId")}/upload`}>
          <VideoCallIcon sx={{ color: "white", fontSize: 26 }} />
        </Link>
      )}

      <NotificationsNoneIcon sx={{ color: "white", fontSize: 26 }} />
      <img
        src={userPic}
        alt="user"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={handleClickModel}
      />

      {/* Show username on md+ only */}
      <span className="hidden md:inline-block text-white">{userName}</span>
    </div>
  </div>

  {/* Dropdown */}
  {navbarModel && (
    <div className="absolute right-4 top-[56px] w-40 bg-[#333] text-white rounded-md shadow-md z-50">
      {isLogedIn && (
        <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={handleProfile}>
          Profile
        </div>
      )}
      {!isLogedIn && (
        <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => onClickOption("login")}>
          Login
        </div>
      )}
      {isLogedIn && (
        <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => onClickOption("logout")}>
          Logout
        </div>
      )}
    </div>
  )}

  {/* Login Modal */}
  {login && <Login setLOginModel={setLOginModel} />}
</div>
  )
}


export default Header;
