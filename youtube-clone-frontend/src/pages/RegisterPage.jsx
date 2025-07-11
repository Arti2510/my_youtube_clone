
// // src/pages/RegisterPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import React, {useState} from 'react'

function RegisterPage() {
  const [uploadedImgaeUrl, setuploadedImgaeUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s")
  const [signUpField, setSignUpField] = useState({"channelName":"", "userName":"", "password":"", "about":"", "profilePic":uploadedImgaeUrl});
  function handleInpField(event, name) {
    setSignUpField({
      ...signUpField,[name]:event.target.value
    })
  }

  console.log(signUpField);

  async function uploadedImage(e) {
    const files = e.target.files;   
    const data = new FormData();
    data.append('file', files[0]);
    //youtube-clone
    data.append('upload_preset', 'youtube-clone');
    try {
      // cloudName = "df3tu2rjt"
      const response = await axios.post("https://api.cloudinary.com/v1_1/df3tu2rjt/image/upload", data);
      const imageUrl = response.data.url;
      setuploadedImgaeUrl(imageUrl);
      setSignUpField({
      ...signUpField,"profilePic":imageUrl
    })
    } catch(err){
      console.log(err);
      
    }
  }
  return (
    <div className='mt-14 text-white w-full flex flex-col items-center h-screen bg-black'>
      <div className='w-[40%] border py-[15px] px-[25px] mt-[30px] flex flex-col items-center justify-center shadow-[0.5px_0.5px_8px_white]'>
        <div className='flex gap-5 w-full justify-center items-center text-[32px] font-["Oswald", "sans-serif"] font-normal non-italic' style={{ fontOpticalSizing: 'auto' }}>
          <img className='mr-1.5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="" height={"35px"} width={"35px"}/>
          SignUp
        </div>
        <div className='gap-5 w-full flex justify-center items-center flex-col mt-[30px]'>
            <input type="text" placeholder='Channel Name' value={signUpField.channelName} onChange={(e)=>handleInpField(e,"channelName")} className='w-[60%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]'/>
            <input type="text" placeholder='User Name' value={signUpField.userName} onChange={(e)=>handleInpField(e, "userName")} className='w-[60%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]'/>
            <input type="password" placeholder='Password' value={signUpField.password} onChange={(e)=>handleInpField(e, "password")} className='w-[60%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]'/>
            <input type="text" placeholder='About your Channel' value={signUpField.about} onChange={(e)=>handleInpField(e, "about")} className='w-[60%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]'/>

            <div className='flex gap-[30px]'>
              <input 
                type="file" onChange={(e)=>uploadedImage(e)}
                className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1] ml-28"
              />
              <div className='w-full h-full'>
                <img src={uploadedImgaeUrl} alt="" className='w-full h-full rounded-full'/>
              </div>
            </div>

            <div className='w-full flex items-center gap-[30px] justify-center'>
                <div className='p-2.5 text-[18px] font-medium rounded-[5px] border cursor-pointer text-white no-underline hover:bg-white hover:text-black'>SignUp</div>
                <Link to={'/'} className='p-2.5 text-[18px] font-medium rounded-[5px] border cursor-pointer text-white no-underline hover:bg-white hover:text-black'>HomePage</Link>
              </div>
         </div>
      </div>
    </div>
  )
}

export default RegisterPage
