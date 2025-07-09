
// src/pages/HomePage.jsx

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const { user, token } = useContext(AuthContext); // assuming token is available

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // if (!token) return; // don't fetch if not logged in

        const res = await axios.get("http://localhost:5100/api/video", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    };

    fetchVideos();
  }, []);

  // Show message if not logged in
  // if (!user) {
  //   return (
  //     <div className="text-center mt-10 text-lg text-gray-600">
  //       <p>Sign in to watch videos, like, and comment.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <div key={video._id} className="border rounded shadow-md p-2">
          <Link to={`/videos/${video._id}`}></Link>
          <iframe
            width="100%"
            height="200"
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <h3 className="font-semibold mt-2">{video.title}</h3>
          <p className="text-sm text-gray-600">{video.description}</p>
        </div>
      ))}
    </div>
  );
}
