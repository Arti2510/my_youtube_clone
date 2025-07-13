import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Login({setLOginModel}) {
  const [loader, setLoader] = useState(false);
  const [loginField, setloginField] = useState({"email":"", "password":""});

  function handleOnChangeInp(event, name) {
    setloginField({
      ...loginField,[name]:event.target.value
    })
  }
  async function handleLogin() {
    setLoader(true);
    try {
      const res = await axios.post('http://localhost:5100/api/auth/login', loginField);

      setLoader(false);
      toast.success(res.data.message);

      const { token, user } = res.data;

      // Save user details
      localStorage.setItem('token', token);
      localStorage.setItem("UserId", user.id);
      localStorage.setItem("UserName", user.username);
      localStorage.setItem("Email", user.email);
      localStorage.setItem("channels", user.channels);
      localStorage.setItem("avatar", user.avatar);

      // 🔽 Fetch the user's channel
      try {
  console.log("→ Getting channel for user ID:", res.data); // ✅

  const channelRes = await axios.get(
    `http://localhost:5100/api/userchannel/channel/user/${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("✅ Channel response received:", channelRes); // ✅
  console.log("✅ channelRes.data:", channelRes.data); // ✅
        const channelId = channelRes.data?._id;
        if (channelId) {
          localStorage.setItem("channelId", channelId); // ✅ Save channel ID
        }
      } catch (channelErr) {
        console.warn("No channel found for this user");
        localStorage.removeItem("channelId");
      }

      window.dispatchEvent(new Event("authChanged"));
      window.location.reload();
    } catch (err) {
      setLoader(false);
      toast.error("Invalid Credentials.");
      console.log(err);
    }
  }

  return (
    <div style={{ fontOpticalSizing: 'auto' }} className='w-full h-full bg-[hsla(0,0%,0%,1)] fixed top-0 text-white flex justify-center font-["Oswald", "sans-serif"] font-normal not-italic' >
      <div className='w-[40%] h-[60%] mt-[100px] bg-black box-border p-[60px] flex flex-col items-center shadow-[0.5px_0.5px_8px_white]'>
        <div className='flex w-full justify-center items-center text-[28px]'>
          <img className='mr-1.5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="" height={"35px"} width={"35px"}/>
          Login
        </div>
        <div className='flex flex-col gap-[30px] mt-[25px] w-full items-center justify-center'>
          <div className='w-full flex items-center justify-center'>
            <input type="email" value = {loginField.email} onChange={(e)=> handleOnChangeInp(e, "email")} placeholder='Email' className='w-[60%] h-[45px] text-white border-0 rounded-[5px] bg-[#222222] px-[10px] py-0' />
          </div>
          <div className='w-full flex items-center justify-center'>
            <input type="password" value = {loginField.password} onChange={(e)=> handleOnChangeInp(e, "password")} placeholder='Password' className='w-[60%] h-[45px] text-white border-0 rounded-[5px] bg-[#222222] px-[10px] py-0' />
          </div>
        </div>
        <div className='w-[60%] flex justify-between mt-[30px]'>
          <div className='w-[25%] border h-[35px] flex justify-center items-center rounded-[5px] text-[18px] font-semibold cursor-pointer no-underline hover:text-black hover:bg-white' onClick={handleLogin}>Login</div>
          <Link to={'/signup'} className='w-[25%] border h-[35px] flex justify-center items-center rounded-[5px] text-[18px] font-semibold cursor-pointer no-underline hover:text-black hover:bg-white' onClick={() => setLOginModel()}>SignUp</Link>
          <div className='w-[25%] border h-[35px] flex justify-center items-center rounded-[5px] text-[18px] font-semibold cursor-pointer no-underline hover:text-black hover:bg-white' onClick={() => setLOginModel()}>Cancel</div>
        </div>
        { loader && 
                <Box sx={{ width: '100%' }}>
                  <CircularProgress />
                </Box>
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login