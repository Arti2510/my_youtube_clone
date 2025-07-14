import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

function CreateChannel() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [channelData, setChannelData] = useState({
    channelName: "",
    description: "",
    thumbnail: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setChannelData({ ...channelData, [e.target.name]: e.target.value });
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "youtube-clone");

    try {
      setLoader(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/df3tu2rjt/image/upload",
        data
      );
      setChannelData({ ...channelData, thumbnail: res.data.url });
      toast.success("Thumbnail uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setLoader(false);
    }
  };

  // Submit to backend
  const handleSubmit = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("UserId");

  if (!channelData.channelName || !channelData.description || !channelData.thumbnail) {
    toast.error("All fields are required!");
    return;
  }

  const payload = {
    channelName: channelData.channelName,
    description: channelData.description,
    channelBanner: channelData.thumbnail,
  };

  try {
    setLoader(true);
    const res = await axios.post(
      `http://localhost:5100/api/userchannel/${userId}/channel`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const channelId = res.data?.channel?._id || res.data?._id;

    if (channelId) {
      localStorage.setItem("channelId", channelId); // ✅ Save channelId
      toast.success("Channel created successfully");
      navigate(`/channel/${channelId}`); // ✅ Navigate to the channel page
    } else {
      toast.error("Channel ID not returned by server");
    }

  } catch (err) {
    console.error("Error creating channel:", err);
    toast.error("Channel creation failed");
  } finally {
    setLoader(false);
  }
};

  return (
  <div className="text-white bg-black min-h-screen flex justify-center items-center flex-col px-4 pt-20 sm:pt-24">
    <ToastContainer />
    <div className="w-full max-w-lg border border-white p-6 sm:p-8 rounded shadow-lg bg-[#111]">
      <h2 className="text-2xl sm:text-3xl mb-6 text-center font-bold">Create Channel</h2>

      {/* Channel Name */}
      <input
        type="text"
        name="channelName"
        placeholder="Channel Name"
        value={channelData.channelName}
        onChange={handleChange}
        className="w-full mb-4 p-2 bg-[#222] text-white rounded"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Channel Description"
        value={channelData.description}
        onChange={handleChange}
        rows={4}
        className="w-full mb-4 p-2 bg-[#222] text-white rounded"
      ></textarea>

      {/* Banner Upload */}
      <div className="text-center font-medium mb-2">Channel Banner</div>
      <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
        />
      </div>

      {/* Thumbnail Preview */}
      {channelData.thumbnail && (
        <div className="flex justify-center mb-4">
          <img
            src={channelData.thumbnail}
            alt="Banner"
            className="w-32 h-32 object-cover rounded-full border"
          />
        </div>
      )}

      {/* Loader */}
      {loader && <LinearProgress className="mb-4" />}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loader}
        className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded ${
          loader ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        Create Channel
      </button>
    </div>
  </div>
);
}

export default CreateChannel;
