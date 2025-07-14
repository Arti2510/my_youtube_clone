import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function VideoUpload() {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoType: "",
    videoUrl: "",
    thumbnailUrl: "",
    channelId: localStorage.getItem("channelId") || "",
  });

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const channelId = localStorage.getItem("channelId");
    if (channelId) {
      setInputField((prev) => ({
        ...prev,
        channelId: channelId,
      }));
    }
  }, []);

  const handleOnChangeInp = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  // ✅ Cloudinary Upload Function
  const uploadedImage = async (e, type) => {
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
        [fieldToUpdate]: url,
      }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file to Cloudinary");
    } finally {
      setLoader(false);
    }
  };

  // ✅ Submit to Your Backend
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("UserId");
    const channelId = localStorage.getItem("channelId");

    if (!userId || !channelId) {
      alert("Missing user or channel ID");
      return;
    }

    if (
      !inputField.title ||
      !inputField.description ||
      !inputField.videoUrl ||
      !inputField.thumbnailUrl
    ) {
      alert("Please fill all fields and wait for uploads to complete.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5100/api/${userId}/${channelId}/uploadvideo`,
        inputField,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert("✅ Video uploaded successfully!");
      setInputField({
        title: "",
        description: "",
        videoType: "",
        videoUrl: "",
        thumbnailUrl: "",
        channelId: channelId,
      });
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  return (
  <div className="pt-[56px] w-full flex flex-col items-center min-h-screen font-['Oswald','sans-serif'] bg-black text-white px-4">
    <div className="w-full max-w-md sm:max-w-xl mt-6 rounded-md shadow-[0.5px_0.5px_8px_white] p-6 bg-[#111]">
      {/* Heading */}
      <div className="flex justify-center items-center text-2xl sm:text-3xl font-medium">
        <img
          className="mr-2"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png"
          alt="YouTube Icon"
          width={35}
          height={35}
        />
        Upload Video
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6 mt-8 items-center w-full">
        <input
          type="text"
          value={inputField.title}
          onChange={(e) => handleOnChangeInp(e, "title")}
          placeholder="Title of Video"
          className="w-full h-11 px-4 bg-[#222222] border-0 rounded-md text-white"
        />
        <input
          type="text"
          value={inputField.description}
          onChange={(e) => handleOnChangeInp(e, "description")}
          placeholder="Description"
          className="w-full h-11 px-4 bg-[#222222] border-0 rounded-md text-white"
        />
        <input
          type="text"
          value={inputField.videoType}
          onChange={(e) => handleOnChangeInp(e, "videoType")}
          placeholder="Category"
          className="w-full h-11 px-4 bg-[#222222] border-0 rounded-md text-white"
        />

        {/* Thumbnail Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          <label className="text-white w-full sm:w-[100px]">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadedImage(e, "image")}
            className="w-full sm:w-auto file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
          />
        </div>

        {/* Video Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          <label className="text-white w-full sm:w-[100px]">Video</label>
          <input
            type="file"
            accept="video/mp4, video/webm, video/*"
            onChange={(e) => uploadedImage(e, "video")}
            className="w-full sm:w-auto file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
          />
        </div>

        {/* Loader */}
        {loader && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <div
          onClick={handleSubmit}
          className="py-2.5 px-6 border font-medium text-base rounded-md cursor-pointer hover:bg-white hover:text-black text-center"
        >
          Upload
        </div>
        <Link
          to="/"
          className="py-2.5 px-6 border font-medium text-base rounded-md cursor-pointer hover:bg-white hover:text-black text-center"
        >
          Home
        </Link>
      </div>
    </div>
  </div>
);
}

export default VideoUpload;
