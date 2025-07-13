import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function Channel({ SideNavbar }) {
  const { id } = useParams(); // channel ID from URL
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    console.log("Avatar from localStorage: ", localStorage.getItem("avatar"));
    const profilePic = localStorage.getItem("avatar");
        if (profilePic) {
        setProfilePic(profilePic); // ✅ This should happen
        }

    const fetchChannel = async () => {
      try {
        const res = await axios.get(`http://localhost:5100/api/userchannel/channel/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Channel Data:", res.data);
        setChannel(res.data);
      } catch (err) {
        console.error("Error loading channel:", err);
        if (err.response?.status === 404) {
          alert("Channel not found.");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id, navigate]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!channel) return <div className="text-red-500 p-10 my-50">Channel not found or failed to load.</div>;

  return (
    <div className="flex w-full pt-[10px] pr-[13px] pb-0 pl-[13px] box-border bg-black text-white h-screen">
      <Sidebar SideNavbar={SideNavbar} />
      <div className={`flex flex-col mt-14 px-4 w-full ${SideNavbar ? "ml-[270px]" : ""}`}>
        
        {/* Banner */}
        <div className="w-full h-[200px] mb-4">
          <img
            src={channel.channelBanner || "https://img.freepik.com/free-vector/gradient-colored-youtube-banner_52683-78650.jpghttps://via.placeholder.com/800x200"}
            alt="Channel Banner"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Channel Info */}
        <div className="flex gap-5 items-center mb-6">
          <img
            src={profilePic || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{channel.channelName}</h1>
            <p className="text-gray-400">
              {channel.owner?.username || "Unknown"} &middot; {channel.subscribers} subscribers
            </p>
            <p className="text-sm text-gray-400">{channel.description}</p>
          </div>
        </div>

        {/* Videos */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Videos</h2>
          <div className="flex flex-wrap gap-4">
            {channel.video?.map((vid) => (
              <Link to={`/watch/${vid._id}`} key={vid._id} className="w-[240px]">
                <div className="w-full h-[140px] mb-2">
                  <img
                    src={vid.thumbnailUrl || "https://via.placeholder.com/240x140"}
                    alt={vid.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium truncate">{vid.title}</h3>
                  <p className="text-sm text-gray-400">
                    {vid.createdAt ? vid.createdAt.slice(0, 10) : "Unknown date"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channel;
