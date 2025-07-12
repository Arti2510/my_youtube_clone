import Button from '@mui/material/Button';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function VideoUpload() {
    const [inputField, setinputField] = useState({"title":"", "description":"", "category":"", "videoLink":"", "thumbnail":""});
    const [loader, setLoader] = useState(false);
    function handleOnChangeInp(event, name) {
    setinputField({
      ...inputField,[name]:event.target.value
    })
  }
async function uploadedImage(e, type) {
    setLoader(true);
    const files = e.target.files;   
    const data = new FormData();
    data.append('file', files[0]);
    //youtube-clone
    data.append('upload_preset', 'youtube-clone');
    try {
      // cloudName = "df3tu2rjt"
      const response = await axios.post(`https://api.cloudinary.com/v1_1/df3tu2rjt/${type}/upload`, data);
      const url = response.data.url;
      let val = type==="image"?"thumbnail":"videoLink";
        setinputField({
        ...inputField,[val]:url
      })  
      setLoader(false);       
    } catch(err){
        setLoader(false)
      console.log(err);
      
    }
  }

  console.log(inputField);
  
  return (
    <div style={{ fontOpticalSizing: 'auto' }} className='pt-[56px] w-full flex flex-col items-center h-[92vh] font-["Oswald", "sans-serif"] font-normal not-italic bg-black text-white'>
        <div className='w-[45%] rounded-[5px] mt-5 shadow-[0.5px_0.5px_8px_white] p-[25px]'>
            <div className='flex w-full justify-center items-center text-[28px]'>
                <img className='mr-1.5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="" height={"35px"} width={"35px"}/>
                Upload Video
            </div>

            <div className='flex flex-col gap-[30px] mt-[30px] items-center'>
                <input type="text" value={inputField.title} onChange={(e)=>handleOnChangeInp(e,"title")} placeholder='Title of Video' className='w-[70%] h-[45px] px-[20px] py-0 text-white box-border bg-[#222222] border-0 rounded-[5px]' />
                <input type="text" value={inputField.description} onChange={(e)=>handleOnChangeInp(e,"description")} placeholder='Description' className='w-[70%] h-[45px] px-[20px] py-0 text-white box-border bg-[#222222] border-0 rounded-[5px]' />
                <input type="text" value={inputField.category} onChange={(e)=>handleOnChangeInp(e, "category")} placeholder='Category' className='w-[70%] h-[45px] px-[20px] py-0 text-white box-border bg-[#222222] border-0 rounded-[5px]' />
                <div class="flex items-center gap-2">
                    <label className="text-white">Thumbnail</label>
                    <input 
                    type="file" 
                    accept="image/*" onChange={(e)=>uploadedImage(e, "image")}
                    className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
                    />
                </div>
                <div class="flex items-center gap-2">
                    <label className="text-white">Video</label>
                    <input 
                    type="file" 
                    accept="video/mp4, video/webm, video/*" onChange={(e)=>uploadedImage(e, "video")}
                    className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
                    />
                </div>
                {
                    loader && <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                }
            </div>
            <div className='flex gap-[30px] justify-center mt-[30px]'>
                <div className='py-[10px] px-[20px] border font-medium text-[18px] rounded-[5px] cursor-pointer text-white no-underline hover:bg-white hover:text-black'>Upload</div>
                <Link to={'/'} className='py-[10px] px-[20px] border font-medium text-[18px] rounded-[5px] cursor-pointer text-white no-underline hover:bg-white hover:text-black'>Home</Link>
            </div>
        </div>
    </div>
  )
}

export default VideoUpload;