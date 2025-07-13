import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function VideoUpload() {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoType: "",
    videoUrl: "",
    thumbnailUrl: ""
  });

  const [loader, setLoader] = useState(false);

  function handleOnChangeInp(event, name) {
    setInputField({
      ...inputField,
      [name]: event.target.value
    });
  }

  // ✅ Cloudinary Upload Function
  async function uploadedImage(e, type) {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/df3tu2rjt/${type}/upload`,
        data
      );
      const url = response.data.secure_url;
      const fieldToUpdate = type === "image" ? "thumbnailUrl" : "videoUrl";

      setInputField((prev) => ({
        ...prev,
        [fieldToUpdate]: url
      }));

      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.error("Upload error:", err);
      alert("Error uploading file to Cloudinary");
    }
  }

  // ✅ Submit to Your Backend
  const handleSubmit = async () => {
    if (!inputField.title || !inputField.description || !inputField.videoUrl || !inputField.thumbnailUrl) {
      alert("Please fill all fields and wait for uploads to complete.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5100/api/video', inputField, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert("✅ Video uploaded successfully!");
      setInputField({
        title: "",
        description: "",
        videoType: "",
        videoUrl: "",
        thumbnailUrl: ""
      });
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  return (
    <div className='pt-[56px] w-full flex flex-col items-center h-[92vh] font-["Oswald", "sans-serif"] bg-black text-white'>
      <div className='w-[45%] rounded-[5px] mt-5 shadow-[0.5px_0.5px_8px_white] p-[25px]'>
        <div className='flex justify-center items-center text-[28px]'>
          <img className='mr-1.5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="" height={"35px"} width={"35px"} />
          Upload Video
        </div>

        <div className='flex flex-col gap-[30px] mt-[30px] items-center'>
          <input type="text" value={inputField.title} onChange={(e) => handleOnChangeInp(e, "title")} placeholder='Title of Video' className='w-[70%] h-[45px] px-[20px] bg-[#222222] border-0 rounded-[5px] text-white' />
          <input type="text" value={inputField.description} onChange={(e) => handleOnChangeInp(e, "description")} placeholder='Description' className='w-[70%] h-[45px] px-[20px] bg-[#222222] border-0 rounded-[5px] text-white' />
          <input type="text" value={inputField.videoType} onChange={(e) => handleOnChangeInp(e, "videoType")} placeholder='Category' className='w-[70%] h-[45px] px-[20px] bg-[#222222] border-0 rounded-[5px] text-white' />

          <div className="flex items-center gap-2">
            <label className="text-white">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadedImage(e, "image")}
              className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white">Video</label>
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              onChange={(e) => uploadedImage(e, "video")}
              className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
            />
          </div>

          {loader && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        <div className='flex gap-[30px] justify-center mt-[30px]'>
          <div onClick={handleSubmit} className='py-[10px] px-[20px] border font-medium text-[18px] rounded-[5px] cursor-pointer hover:bg-white hover:text-black'>
            Upload
          </div>
          <Link to='/' className='py-[10px] px-[20px] border font-medium text-[18px] rounded-[5px] cursor-pointer hover:bg-white hover:text-black'>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
