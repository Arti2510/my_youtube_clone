import React, { useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function VideoDetailPage() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  let commentData;
  async function fetchVideoById() {
    const token = localStorage.getItem("token");
    await axios
      .get(`http://localhost:5100/api/getVideoById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // ✅ add Authorization header
      }
    })
      .then((res) => {
        let data = res.data;
        console.log(data);
        setData(data);
        setVideoUrl(data?.videoUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getCommentsByVideoId() {
    const token = localStorage.getItem("token");
    await axios
      .get(`http://localhost:5100/api/videocomment/comment/${id}`,{
        
        headers: {
        Authorization: `Bearer ${token}` // ✅ add Authorization header
      }
      })
      .then((res) => {
        commentData = res.data;
        console.log(commentData);
        setComments(commentData);
        // setData(data);
        // setVideoUrl(data?.videoUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchVideoById();
    getCommentsByVideoId();
  }, []);

  // function handleOnChangeInp(event, name) {
  //   setComment({
  //     ...comment,[name]:event.target.value
  //   })
  // }
  return (
    <div className="mt-[56px] flex py-[30px] px-0 justify-center bg-black text-white">
      <div className="w-full max-w-[875px] flex flex-col">
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

        <div className="flex flex-col">
          <div className="text-[20px] font-bold">{data?.title}</div>
          <div className="flex justify-between mt-[10px]">
            <div className="flex gap-[15px]">
              <Link
                to={`/user/${data?.uploader?._id}`}
                className="w-[35px] h-[35px] cursor-pointer"
              >
                <img
                  src={data?.uploader?.avatar}
                  alt=""
                  className="w-full rounded-full h-full"
                />
              </Link>
              <div className="flex flex-col">
                <div className="font-medium text-base">
                  {data?.channelId?.[0]?.channelName}
                </div>
                <div className="text-sm text-[#AAAAAA]">
                  {data?.channelId?.[0]?.createdAt.slice(0, 10)}
                </div>
              </div>
              <div className="bg-white text-black py-0 px-[16px] rounded-[18px] flex justify-center items-center h-[36px] font-semibold cursor-pointer text-sm">
                {data?.channelId?.[0]?.subscribers} Subscribers
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#a5a5a538] justify-center items-center p-[10px] box-border rounded-[18px] cursor-pointer">
              <div className="flex gap-[10px]">
                <ThumbUpOffAltIcon />
                <div className="font-medium">{data?.likes}</div>
              </div>
              <div className="w-0 h-[20px] border"></div>
              <div className="flex gap-[10px]">
                <ThumbDownOffAltIcon />
                <div className="font-medium">{data?.dislikes}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-[#a5a5a538] w-full rounded-[10px] p-[12px] font-medium text-[14px] gap-[10px] mt-[10px] box-border">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <div className="text-[20px] font-medium">{comments.length} Comments</div>
          <div className="flex mt-2.5 gap-2.5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s"
              alt=""
              className="w-9 h-9 rounded-full"
            />
            <div className="flex flex-col w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Add a Comment"
                className="w-full bg-black text-white h-9 border-0 text-base border-b border-gray-500 focus:outline-none placeholder:text-[16px]"
              />
              <div className="flex justify-end gap-4 mt-2.5">
                <div className="py-[8px] px-[16px] rounded-[18px] border cursor-pointer hover:bg-white hover:text-black">
                  Cancel
                </div>
                <div className="py-[8px] px-[16px] rounded-[18px] border cursor-pointer hover:bg-white hover:text-black">
                  Comment
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {comments?.map((item, index) => {
              return (
                <div key={item._id} className="flex mt-2.5 gap-2.5">
                  <img
                    src={item?.user?.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-2.5">
                      <div className="text-sm font-medium">{item?.user?.username}</div>
                      <div className="text-sm text-[#AAAAAA]">{item?.createdAt.slice(0,10)}</div>
                    </div>
                    <div className="mt-2.5">
                      {item?.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[406px] py-[10px] px-[15px] gap-[15px] flex flex-col text-white">
        <div className="flex gap-[15px] cursor-pointer">
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
            <div className="text-[#ffffff9c] text-[12px]">
              136K views . 1 day ago
            </div>
          </div>
        </div>
        <div className="flex gap-[15px] cursor-pointer">
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
            <div className="text-[#ffffff9c] text-[12px]">
              136K views . 1 day ago
            </div>
          </div>
        </div>
        <div className="flex gap-[15px] cursor-pointer">
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
            <div className="text-[#ffffff9c] text-[12px]">
              136K views . 1 day ago
            </div>
          </div>
        </div>
        <div className="flex gap-[15px] cursor-pointer">
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
            <div className="text-[#ffffff9c] text-[12px]">
              136K views . 1 day ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailPage;
