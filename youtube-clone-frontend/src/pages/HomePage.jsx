
// src/pages/HomePage.jsx

// import { useEffect, useState } from "react";
// import axios from "axios";

export default function HomePage() {
  // const [videos, setVideos] = useState([]);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5100");
  //       setVideos(res.data);
  //     } catch (err) {
  //       console.error("Error fetching videos", err);
  //     }
  //   };

  //   fetchVideos();
  // }, []);

  return (
    <div className="my-2">
      <h1 className="ml-0">Welcome to my Home Page</h1>
    </div>
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    //   {videos.map((video) => (
    //     <div key={video._id} className="border rounded shadow-md p-2">
    //       <iframe
    //         width="100%"
    //         height="200"
    //         src={video.videoUrl}
    //         title={video.title}
    //         frameBorder="0"
    //         allowFullScreen
    //       ></iframe>
    //       <h3 className="font-semibold mt-2">{video.title}</h3>
    //       <p className="text-sm text-gray-600">{video.description}</p>
    //     </div>
    //   ))}
    // </div>
  );
}
