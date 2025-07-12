import React, {useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';

function Header ({sidenavbar, SideNavbar}) {

  const [userPic, setUserPic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s");
  const [userName, setUserName] = useState("");
  const [navbarModel, setNavbarModel] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const navigate = useNavigate();

  function handleClickModel() {
    setNavbarModel(prev=>!prev);
  }

  function sidenavbarfunc() {
    sidenavbar(!SideNavbar);
  }

  function handleProfile() {
    let userId = localStorage.getItem("UserId");
    navigate(`/user/${userId}`);
    setNavbarModel(false);
  }

  function setLOginModel() {
    setLogin(false);
  }

  function onClickOption(button) {
    setNavbarModel(false);
    if(button === "login") {
      setLogin(true)
    }
    else {
      localStorage.clear();
      setUserName("");                // Clear React state
      setUserPic("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s"); 
      window.dispatchEvent(new Event("authChanged"));                
      setIsLogedIn(false);           // Mark user as logged out

      getLogoutFunction();            // Make API call to backend logout

      navigate('/');
    }
  }

  function getLogoutFunction(){
    axios.post('http://localhost:5100/api/auth/logout', {}, {withCredentials: true})
    .then((res)=>{
      console.log(res);
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  

  useEffect(()=>{
    let userName = localStorage.getItem("UserName");
    console.log("username: ", userName);
    
    let userProfilePic = localStorage.getItem("avatar");  
    let val = localStorage.getItem("UserId");
    val !== null ? true : false;
    setIsLogedIn(val);
    if(userProfilePic!==null){
      setUserPic(userProfilePic);
    }
    if(userName!==null){
      setUserName(userName);
    }
  },[]);
  return(
    <div className='h-14 box-border py-[10px] px-[16px] flex items-center w-full justify-between top-0 fixed bg-black z-10'>
      <div className="gap-[10px] flex justify-center items-center w-fit">
        <div className="w-10 h-10 flex justify-center items-center cursor-pointer" onClick={sidenavbarfunc}>
          <MenuIcon sx={{color:"white"}}/>
        </div>
        <Link to={'/'} className='flex justify-center items-center cursor-pointer text-white no-underline'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="" height={"35px"} width={"35px"}/>
          <div className='text-[20px] font-sans font-normal not-italic ml-0.5'>YouTube</div>
        </Link>
      </div>
      <div className='flex gap-[10px] w-1/2'>
        <div className='flex w-4/5'>
          <input type="text" placeholder='Search' className='w-full h-[40%] rounded-tl-[20px] rounded-bl-[20px] border border-[rgb(58,57,57)] p-4 bg-[#121212] text-white text-base pl-[30px] focus:outline-none placeholder:text-[16px]'/>
          <div className='cursor-pointer w-[70px] border border-[rgb(42,42,42)] bg-[rgb(42,42,42)] flex justify-center items-center rounded-tr-[20px] rounded-br-[20px] h-[65%]'>
            <SearchIcon sx={{color:"white", fontSize:"28px"}}/>
          </div>

          <div className='flex justify-center items-center bg-[rgb(42,42,42)] rounded-full w-[40px] h-[40px]'>
            <KeyboardVoiceIcon sx={{color:"white"}}/>
          </div>
        </div>
      </div>
      <div className='flex gap-[10px] justify-center items-center relative'>
        {/* ➕ Create Channel button */}
          <button
            onClick={() => {
                const userId = localStorage.getItem("UserId");
                if (userId) {
                  navigate(`/${userId}/channel`);
                } else {
                  toast.error("Please login to create a channel");
                }
              }}
            className='text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-black text-sm font-medium rounded-[20px] cursor-pointer'
          >
            + Create Channel
          </button>
        <Link to={'/9897/upload'}>
          <VideoCallIcon sx={{color:"white", cursor:"pointer", fontSize:"30px"}}/>
        </Link>
        <NotificationsNoneIcon sx={{color:"white", cursor:"pointer", fontSize:"30px"}}/>
        <img src={userPic} alt="user_logo" className='w-[30px] rounded-full cursor-pointer' onClick={handleClickModel}/>
        <div className='bg-black text-white'>{userName}</div>
        { navbarModel && 
          <div className='absolute top-[35px] w-full z-[20] text-white'>
            {isLogedIn && <div className='bg-[rgb(85,85,85)] p-[10px] cursor-pointer hover:bg-[rgb(34,33,33)]' onClick={handleProfile}>Profile</div>}
            {!isLogedIn && <div className='bg-[rgb(85,85,85)] p-[10px] cursor-pointer hover:bg-[rgb(34,33,33)]' onClick={() => onClickOption("login")}>LogIn</div>}
            {isLogedIn && <div className='bg-[rgb(85,85,85)] p-[10px] cursor-pointer hover:bg-[rgb(34,33,33)]' onClick={() => onClickOption("logout")}>Logout</div>}
          </div>
        }
      </div>
        {
          login && <Login setLOginModel={setLOginModel}/>
        }
    </div>
  )
}

export default Header;