import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditVideo() {
  const { id } = useParams(); // video ID
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoType: "",
    thumbnailUrl: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5100/api/video/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideo(res.data);
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          videoType: res.data.videoType || "",
          thumbnailUrl: res.data.thumbnailUrl || "",
        });
      } catch (err) {
        toast.error("Failed to load video");
      }
    };
    fetchVideo();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5100/api/video/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Video updated ✅");
      navigate(-1); // go back
    } catch (err) {
      toast.error("Failed to update video");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this video?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5100/api/video/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Video deleted ✅");
      navigate("/"); // or redirect to user's channel
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  if (!video) return <div className="text-white p-10">Loading...</div>;

  return (
  <div className="text-white bg-black min-h-screen p-4 sm:p-8">
    <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
      Edit Video
    </h1>

    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
      <input
        className="p-2 bg-gray-800 rounded w-full"
        placeholder="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        className="p-2 bg-gray-800 rounded w-full"
        placeholder="Description"
        name="description"
        rows={5}
        value={form.description}
        onChange={handleChange}
      />

      <input
        className="p-2 bg-gray-800 rounded w-full"
        placeholder="Type (e.g., Music, Tech)"
        name="videoType"
        value={form.videoType}
        onChange={handleChange}
      />

      <input
        className="p-2 bg-gray-800 rounded w-full"
        placeholder="Thumbnail URL"
        name="thumbnailUrl"
        value={form.thumbnailUrl}
        onChange={handleChange}
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center sm:justify-start">
        <button
          onClick={handleUpdate}
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
}

export default EditVideo;
