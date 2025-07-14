import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function Channel({ SideNavbar }) {
  const { id } = useParams();
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

    const avatar = localStorage.getItem("avatar");
    if (avatar) setProfilePic(avatar);

    const fetchChannel = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5100/api/userchannel/channel/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChannel(res.data);
        if (res.data._id) {
          localStorage.setItem("channelId", res.data._id);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setChannel(null);
        } else {
          console.error("Error loading channel:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchChannel();
  }, [id, navigate]);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  if (!channel) {
    return (
      <div className="flex bg-black text-white h-screen">
        <Sidebar SideNavbar={SideNavbar} />
        <div className={`flex justify-center items-center text-2xl w-full ${SideNavbar ? "ml-[270px]" : ""}`}>
          ❌ No Channel Created Yet
        </div>
      </div>
    );
  }

  const userId = localStorage.getItem("UserId");
console.log("UserId:", userId);
channel.video.map((vid) => {
  console.log("vid.uploader:", vid.uploader);
  console.log("Logged-in userId:", userId)});



  return (
    <div className="flex flex-col md:flex-row w-full pt-2 px-3 box-border bg-black text-white min-h-screen">
    {/* Sidebar - only visible on md+ screens */}
    {SideNavbar && (
      <div className="hidden md:block w-[270px] fixed left-0 top-0 h-full z-10">
        <Sidebar SideNavbar={SideNavbar} />
      </div>
    )}

    {/* Main Content */}
    <div className={`flex flex-col mt-14 px-2 sm:px-4 w-full ${SideNavbar ? "md:ml-[270px]" : ""}`}>
      {/* Banner */}
      <div className="w-full h-[200px] mb-4">
        <img
          src={channel.channelBanner || "https://via.placeholder.com/800x200"}
          alt="Channel Banner"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row gap-5 items-center mb-6">
        <img
          src={channel?.user?.avatar || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">{channel.channelName}</h1>
          <p className="text-gray-400">
            {channel.user?.username || "Unknown"} &middot; {channel.subscribers} subscribers
          </p>
          <p className="text-sm text-gray-400">{channel.description}</p>
        </div>
      </div>

      {/* Videos Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {channel.video?.length > 0 ? (
            channel.video.map((vid) => (
              <div key={vid._id} className="w-full">
                <Link to={`/watch/${vid._id}`}>
                  <div className="w-full h-[140px] sm:h-[160px] mb-2">
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

                {/* Edit/Delete Buttons if uploader is current user */}
                {vid.uploader?._id === userId && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Link to={`/video/edit/${vid._id}`}>
                      <button className="text-sm bg-blue-600 rounded px-2 py-1 hover:bg-blue-700">
                        ✏️ Edit
                      </button>
                    </Link>
                    <button
                      className="text-sm bg-red-600 rounded px-2 py-1 hover:bg-red-700"
                      onClick={async () => {
                        const confirmDelete = window.confirm("Delete this video?");
                        if (confirmDelete) {
                          try {
                            await axios.delete(`http://localhost:5100/api/video/${vid._id}`, {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                              },
                            });
                            setChannel((prev) => ({
                              ...prev,
                              video: prev.video.filter((v) => v._id !== vid._id),
                            }));
                          } catch (err) {
                            console.error("Delete video failed:", err);
                            alert("Failed to delete the video.");
                          }
                        }
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No videos uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Channel Edit/Delete Buttons */}
      <div className="flex flex-wrap gap-3 mt-10">
        <button
          onClick={() => navigate(`/channel/edit/${channel._id}`)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
        >
          ✏️ Edit Channel
        </button>
        <button
          onClick={async () => {
            const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
            if (confirmDelete) {
              try {
                await axios.delete(`http://localhost:5100/api/userchannel/channel/${channel._id}`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                localStorage.removeItem("channelId");
                navigate("/");
              } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete the channel.");
              }
            }
          }}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
        >
          🗑️ Delete Channel
        </button>
      </div>
    </div>
  </div>
  );
}

export default Channel;
