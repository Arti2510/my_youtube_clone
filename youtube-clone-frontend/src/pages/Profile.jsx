import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Profile({ SideNavbar }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  async function fetchProfileData() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      // Fetch user profile
      const res = await axios.get(`http://localhost:5100/api/auth/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User data:", res.data);
      setUser(res.data);

      // Fetch user's videos separately
      const videoRes = await axios.get(`http://localhost:5100/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User's videos:", videoRes.data);
      setVideos(videoRes.data);

    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }

  useEffect(() => {
    fetchProfileData();

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      if (!token) navigate("/");
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, [id, navigate]);

  if (!user) {
    return <div className="text-white flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
  <div className="flex flex-col md:flex-row w-full pt-2 px-3 box-border bg-black text-white min-h-screen">
    {/* Sidebar: show only on md+ screens if enabled */}
    {SideNavbar && (
      <div className="hidden md:block w-[270px] fixed left-0 top-0 h-full z-10">
        <Sidebar SideNavbar={SideNavbar} />
      </div>
    )}

    {/* Main content */}
    <div
      className={`flex flex-col overflow-x-hidden mt-14 w-full ${
        SideNavbar ? "md:ml-[270px]" : ""
      } px-2 sm:px-4`}
    >
      {/* User Info Section */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6">
        <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]">
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 sm:px-4 text-center sm:text-left w-full">
          <div className="text-2xl sm:text-4xl font-semibold">{user?.username}</div>
          <div className="text-sm sm:text-base text-gray-400">
            {user?.username} • {videos.length} videos
          </div>
          <div className="text-sm sm:text-base text-gray-400">{user?.about}</div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="w-full">
        <div className="text-xl sm:text-2xl pb-2.5 text-gray-300 font-medium flex items-center border-b border-gray-600">
          Videos &nbsp; <ArrowRightIcon />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {videos.map((item) => (
            <Link to={`/watch/${item?._id}`} key={item._id} className="cursor-pointer">
              <div className="w-full h-[140px] sm:h-[160px]">
                <img
                  src={item?.thumbnailUrl}
                  alt={item?.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col mt-2">
                <div className="text-base sm:text-lg font-semibold truncate">{item?.title}</div>
                <div className="text-sm text-gray-400">
                  Created at {item?.createdAt ? item.createdAt.slice(0, 10) : "N/A"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default Profile;
