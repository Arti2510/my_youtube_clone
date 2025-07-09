
// src/pages/VideoDetailPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5100/api/videos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching video:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!video) return <p className="text-center mt-10">Video not found</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <video
        src={video.videoUrl}
        controls
        className="w-full rounded mb-4"
      />
      <h1 className="text-xl font-bold">{video.title}</h1>
      <p className="text-gray-600">{video.description}</p>
    </div>
  );
}
