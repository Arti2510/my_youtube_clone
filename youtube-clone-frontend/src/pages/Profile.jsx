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
      const videoRes = await axios.get(`http://localhost:5100/api/videos/user/${id}`, {
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
    <div className="flex w-full pt-[10px] pr-[13px] pb-0 pl-[13px] box-border bg-black text-white">
      <Sidebar SideNavbar={SideNavbar} />
      <div
        className={
          SideNavbar
            ? "flex flex-col overflow-x-hidden ml-[270px] mt-14 justify-center items-center w-3/4"
            : "flex flex-col overflow-x-hidden mt-14 justify-center items-center w-full"
        }
      >
        <div className="w-full flex pb-[20px]">
          <div className="w-[150px] h-[150px]">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col gap-[7px] px-[10px] w-[85%]">
            <div className="text-4xl font-semibold">{user?.username}</div>
            <div className="text-[16px] text-[rgb(153,153,153)]">
              {user?.username} • {videos.length} videos
            </div>
            <div className="text-[16px] text-[rgb(153,153,153)]">
              {user?.about}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="text-[22px] pb-2.5 text-[rgb(207,206,206)] font-medium flex items-center border-b border-[#999999]">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="flex gap-2.5 h-screen flex-wrap mt-5">
            {videos.map((item) => (
              <Link to={`/watch/${item?._id}`} key={item._id} className="w-[210px] cursor-pointer">
                <div className="w-full h-[140px]">
                  <img
                    src={item?.thumbnailUrl}
                    alt={item?.title}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full text-[16px] font-semibold">
                    {item?.title}
                  </div>
                  <div className="text-[#ababab] text-[13px]">
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
