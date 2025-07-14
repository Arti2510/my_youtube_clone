// src/pages/EditChannel.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditChannel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [channelData, setChannelData] = useState({
    channelName: "",
    description: "",
    channelBanner: ""
  });

  useEffect(() => {
    const fetchChannel = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5100/api/userchannel/channel/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChannelData({
          channelName: res.data.channelName,
          description: res.data.description,
          channelBanner: res.data.channelBanner || ""
        });
      } catch (err) {
        console.error("Error loading channel for editing", err);
      }
    };
    fetchChannel();
  }, [id]);

  const handleChange = (e) => {
    setChannelData({ ...channelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5100/api/userchannel/channel/${id}`, channelData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/channel/${id}`);
    } catch (err) {
      console.error("Error updating channel", err);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg p-6 sm:p-8 bg-gray-900 rounded-md shadow-lg"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-center sm:text-left">
        Edit Channel
      </h2>

      <label className="block mb-4 text-sm sm:text-base">
        Channel Name
        <input
          type="text"
          name="channelName"
          value={channelData.channelName}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </label>

      <label className="block mb-4 text-sm sm:text-base">
        Description
        <textarea
          name="description"
          value={channelData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </label>

      <label className="block mb-6 text-sm sm:text-base">
        Banner Image URL
        <input
          type="text"
          name="channelBanner"
          value={channelData.channelBanner}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold transition duration-200"
      >
        Save Changes
      </button>
    </form>
  </div>
);
}

export default EditChannel;
