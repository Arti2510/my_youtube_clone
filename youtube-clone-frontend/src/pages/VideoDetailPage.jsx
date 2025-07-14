import React, { useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VideoDetailPage() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [profilePic, setProfilePic] = useState("")
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    let profileImage = localStorage.getItem("avatar");
    setProfilePic(profileImage)
  },[])

  useEffect(() => {
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5100/api/auth/current", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUserId(res.data._id);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  fetchCurrentUser();
}, []);

  const fetchVideoById = async () => {
  const token = localStorage.getItem("token");
  if (!token) return navigate("/");

  try {
    const res = await axios.get(`http://localhost:5100/api/getVideoById/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    
    setData(res.data);
    setVideoUrl(res.data?.videoUrl);

    // ✅ Decode user ID from token to check like/dislike status
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken._id || decodedToken.id;

    if (userId) {
      const liked = res.data.likes?.some(uid => uid === userId);
      const disliked = res.data.dislikes?.some(uid => uid === userId);
      setLiked(liked);
      setDisliked(disliked);
    }
    console.log((userId));
    

  } catch (err) {
    console.error(err);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }
};
  const handleLike = async () => {
  const token = localStorage.getItem("token");
  if (!token) return navigate("/");

  try {
    const res = await axios.put(
      `http://localhost:5100/api/video/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setData((prevData) => ({
  ...prevData,
  likes: res.data.likes,
  dislikes: res.data.dislikes,
}));

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
const userId = decodedToken._id || decodedToken.id;1

    if (userId) {
      setLiked(res.data.likes?.some(uid => uid === userId));
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
const userId = decodedToken._id || decodedToken.id;

setDisliked(res.data.dislikes?.some(uid => uid === userId));
setLiked(false);
    }

  } catch (err) {
    console.error("Like failed", err);
  }
};

const handleDislike = async () => {
  const token = localStorage.getItem("token");
  if (!token) return navigate("/");

  try {
    const res = await axios.put(
      `http://localhost:5100/api/video/${id}/dislike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setData((prevData) => ({
  ...prevData,
  likes: res.data.likes,
  dislikes: res.data.dislikes,
}));
    setDisliked(res.data.dislikes?.some(dislike => dislike === res.data.uploader._id));
    setLiked(false);
  } catch (err) {
    console.error("Dislike failed", err);
  }
};



  const getCommentsByVideoId = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    try {
      const res = await axios.get(`http://localhost:5100/api/videocomment/comment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token || !message.trim()) return;

    try {
      await axios.post(
        `http://localhost:5100/api/videocomment/comment/${id}`,
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(""); // Clear the input
      getCommentsByVideoId(); // Refresh comments
    } catch (err) {
      console.error("Failed to post comment:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchVideoById();
    getCommentsByVideoId();

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      if (!token) navigate("/");
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, [id, navigate]);

  return (
    <div className="mt-[56px] bg-black text-white flex flex-col lg:flex-row py-6 px-4 lg:px-12 gap-6">
  {/* Left: Video Section */}
  <div className="flex-1 max-w-full">
    {/* Video Player */}
    <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
      {videoUrl ? (
        <video controls autoPlay className="w-full h-full object-contain">
          <source src={videoUrl} type="video/mp4" />
          Your Browser does not support the video tag.
        </video>
      ) : (
        <div className="text-center py-10">Loading video...</div>
      )}
    </div>

    {/* Video Info */}
    <div className="mt-4">
      <h1 className="text-xl font-bold">{data?.title}</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-3">
        {/* Channel Info */}
        <div className="flex items-center gap-3">
          <Link to={`/channel/${data?.channelId?._id}`}>
            <img
              src={data?.uploader?.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="uploader"
            />
          </Link>
          <div>
            <p className="font-semibold text-base">{data?.channelId?.[0]?.channelName}</p>
            <p className="text-sm text-gray-400">{data?.channelId?.[0]?.createdAt?.slice(0, 10)}</p>
          </div>
          <span className="ml-4 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
            {data?.channelId?.[0]?.subscribers} Subscribers
          </span>
        </div>

        {/* Like/Dislike */}
        <div className="flex gap-4 bg-[#ffffff1a] rounded-full px-4 py-2">
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
            <ThumbUpOffAltIcon className={liked ? "text-sky-400" : ""} />
            <span>{data?.likes?.length}</span>
          </div>
          <div className="w-px bg-gray-500 h-5" />
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleDislike}>
            <ThumbDownOffAltIcon className={disliked ? "text-red-500" : ""} />
            <span>{data?.dislikes?.length}</span>
          </div>
        </div>
      </div>

      {/* Description Box */}
      <div className="bg-[#ffffff1a] p-4 rounded-lg mt-4">
        <p className="text-sm font-medium text-gray-300">{data?.createdAt?.slice(0, 10)}</p>
        <p className="mt-2 text-gray-200 whitespace-pre-wrap">{data?.description}</p>
      </div>
    </div>

    {/* Comments */}
    <div className="mt-6">
      <p className="text-xl font-medium">{comments.length} Comments</p>

      {/* Comment Input */}
      <div className="flex items-start gap-3 mt-4">
        <img src={profilePic} className="w-9 h-9 rounded-full" alt="profile" />
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a comment..."
            className="bg-transparent border-b border-gray-600 text-white placeholder:text-sm focus:outline-none"
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setMessage("")}
              className="text-white border px-4 py-1 rounded-full text-sm hover:bg-white hover:text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleCommentSubmit}
              disabled={!message.trim()}
              className={`border px-4 py-1 rounded-full text-sm ${
                message.trim()
                  ? "text-white hover:bg-white hover:text-black"
                  : "text-white opacity-50 cursor-not-allowed"
              }`}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="mt-6 flex flex-col gap-4">
        {comments.map((item) => (
          <div key={item._id} className="flex gap-3">
            <img src={item?.user?.avatar} className="w-9 h-9 rounded-full" alt="user" />
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="font-semibold">{item?.user?.username}</span>
                <span className="text-xs text-gray-500">{item?.createdAt?.slice(0, 10)}</span>
              </div>
              <p className="text-white mt-1">{item?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Right Sidebar (Suggested Videos) */}
  <aside className="w-full lg:w-[400px] flex flex-col gap-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex gap-3 cursor-pointer">
        <div className="w-2/5 h-24 rounded overflow-hidden">
          <img
            src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between text-sm">
          <p className="font-semibold leading-tight line-clamp-2">
            T20 world cup final #India.
          </p>
          <p className="text-gray-400 text-xs">Cricket 320</p>
          <p className="text-gray-500 text-xs">136K views · 1 day ago</p>
        </div>
      </div>
    ))}
  </aside>
</div>
  );
}

export default VideoDetailPage;
