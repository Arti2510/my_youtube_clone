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
    <div className="mt-[56px] flex py-[30px] px-0 justify-center bg-black text-white">
      <div className="w-full max-w-[875px] flex flex-col">
        {/* Video Player */}
        <div className="w-full">
          {videoUrl ? (
            <video
              width={"400"}
              controls
              autoPlay
              className="w-full rounded-[10px]"
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your Browser does not support the video tag.
            </video>
          ) : (
            <div className="text-white text-center">Loading video...</div>
          )}
        </div>

        {/* Video Details */}
        <div className="flex flex-col">
          <div className="text-[20px] font-bold">{data?.title}</div>
          <div className="flex justify-between mt-[10px]">
            <div className="flex gap-[15px]">
              <Link to={`/channel/${data?.channelId?._id}`} className="w-[35px] h-[35px] cursor-pointer">
                <img
                  src={data?.uploader?.avatar}
                  alt=""
                  className="w-full rounded-full h-full"
                />
              </Link>
              <div className="flex flex-col">
                <div className="font-medium text-base">{data?.channelId?.[0]?.channelName}</div>
                <div className="text-sm text-[#AAAAAA]">
                  {data?.channelId?.[0]?.createdAt.slice(0, 10)}
                </div>
              </div>
              <div className="bg-white text-black py-0 px-[16px] rounded-[18px] flex justify-center items-center h-[36px] font-semibold cursor-pointer text-sm">
                {data?.channelId?.[0]?.subscribers} Subscribers
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#a5a5a538] justify-center items-center p-[10px] box-border rounded-[18px] cursor-pointer">
              <div className="flex gap-[10px] bg-[#a5a5a538] justify-center items-center p-[10px] box-border rounded-[18px]">
  <div className="flex gap-[10px] cursor-pointer" onClick={handleLike}>
    {liked ? (
      <ThumbUpOffAltIcon style={{ color: "skyblue" }} />
    ) : (
      <ThumbUpOffAltIcon />
    )}
    <div className="font-medium">{data?.likes?.length}</div>
  </div>
  <div className="w-0 h-[20px] border"></div>
  <div className="flex gap-[10px] cursor-pointer" onClick={handleDislike}>
    {disliked ? (
      <ThumbDownOffAltIcon style={{ color: "red" }} />
    ) : (
      <ThumbDownOffAltIcon />
    )}
    <div className="font-medium">{data?.dislikes?.length}</div>
  </div>
</div>
            </div>
          </div>
          <div className="flex flex-col bg-[#a5a5a538] w-full rounded-[10px] p-[12px] font-medium text-[14px] gap-[10px] mt-[10px] box-border">
            <div>{data?.createdAt?.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="flex flex-col mt-5">
          <div className="text-[20px] font-medium">{comments.length} Comments</div>
          <div className="flex mt-2.5 gap-2.5">
            <img
              src={profilePic}
              alt=""
              className="w-9 h-9 rounded-full"
            />
            <div className="flex flex-col w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a Comment"
                className="w-full bg-black text-white h-9 border-0 text-base border-b border-gray-500 focus:outline-none placeholder:text-[16px]"
              />
              <div className="flex justify-end gap-4 mt-2.5">
                <div
                  onClick={() => setMessage("")}
                  className="py-[8px] px-[16px] rounded-[18px] border cursor-pointer hover:bg-white hover:text-black"
                >
                  Cancel
                </div>
                <div
                  onClick={handleCommentSubmit}
                  className={`py-[8px] px-[16px] rounded-[18px] border cursor-pointer hover:bg-white hover:text-black ${
                    message.trim() ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Comment
                </div>
              </div>
            </div>
          </div>

          {/* Comment List */}
          <div className="flex flex-col gap-2.5">
            {comments?.map((item) => (
              <div key={item._id} className="flex mt-2.5 gap-2.5">
                <img
                  src={item?.user?.avatar}
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex gap-2.5">
                    <div className="text-sm font-medium">{item?.user?.username}</div>
                    <div className="text-sm text-[#AAAAAA]">{item?.createdAt.slice(0, 10)}</div>
                  </div>
                  <div className="mt-2.5">{item?.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Suggested Videos */}
      <div className="w-full max-w-[406px] py-[10px] px-[15px] gap-[15px] flex flex-col text-white">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-[15px] cursor-pointer">
            <div className="w-[168px] h-[94px]">
              <img
                src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg"
                alt=""
                className="w-inherit"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="text-[15px] font-medium mb-[5px]">
                T20 world cup final #India.
              </div>
              <div className="text-[#ffffff9c] text-[12px]">Cricket 320</div>
              <div className="text-[#ffffff9c] text-[12px]">136K views · 1 day ago</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoDetailPage;
