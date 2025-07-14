import React, { useState, useEffect, } from "react";
import axios from "axios";



function Comments({ videoId, currentUserId, currentUserPic }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");




  // Fetch comments
  const getCommentByVideoId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5100/api/videocomment/comment/${videoId}`
      );
      setComments(response.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  // Add comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setCommentMessage("You must be logged in to comment.");
      setTimeout(() => setCommentMessage(""), 2000);
      return;
    }
    try {
      await axios.post(
        `http://localhost:5100/api/videocomment/comment${videoId}`,
        { videoId, message: newComment },
        { headers: { Authorization: `JWT ${token}`, withCredentials: true } }
      );
      setNewComment("");
      setCommentMessage("Comment added!");
      getCommentByVideoId();
      setTimeout(() => setCommentMessage(""), 2000);
    } catch (err) {
      setCommentMessage(
        err.response?.data?.message || "Failed to add comment."
      );
      setTimeout(() => setCommentMessage(""), 2000);
    }
  };

  // Start editing
  const startEdit = (commentId, message) => {
    setEditingId(commentId);
    setEditingText(message);
  };

  // Save edited comment
  const handleEditComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!editingText.trim()) return;
    try {
      await axios.put(
        `http://localhost:5100/api/videocomment/comment/${commentId}`,
        { message: editingText },
        { headers: { Authorization: `JWT ${token}`, withCredentials: true } }
      );
      setEditingId(null);
      setEditingText("");
      getCommentByVideoId();
    } catch (err) {
      setCommentMessage(
        err.response?.data?.message || "Failed to update comment."
      );
      setTimeout(() => setCommentMessage(""), 2000);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(
        `http://localhost:5100/api/videocomment/comment/${commentId}`,
        { headers: { Authorization: `JWT ${token}`, withCredentials: true } }
      );
      getCommentByVideoId();
    } catch (err) {
      setCommentMessage(
        err.response?.data?.message || "Failed to delete comment."
      );
      setTimeout(() => setCommentMessage(""), 2000);
    }
  };

  useEffect(() => {
    getCommentByVideoId();
    // eslint-disable-next-line
  }, [videoId]);

  return (
  <div className="mt-6 text-white w-full px-2 sm:px-0">
    <h3 className="text-lg sm:text-xl font-semibold mb-4">Comments</h3>

    {/* Add Comment */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <img
        src={currentUserPic || "https://via.placeholder.com/32"}
        alt="User"
        className="w-8 h-8 rounded-full"
      />
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="flex-1 p-2 bg-gray-800 rounded-full text-sm text-white outline-none focus:ring-2 focus:ring-gray-600"
      />
      <button
        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full transition disabled:opacity-60"
        onClick={handleAddComment}
        disabled={!newComment.trim()}
      >
        Comment
      </button>
    </div>

    {/* Message */}
    {commentMessage && (
      <div className="text-yellow-400 mb-2 text-sm">{commentMessage}</div>
    )}

    {/* Comments List */}
    <div className="flex flex-col gap-4">
      {comments.length > 0 ? (
        comments.map((item) => (
          <div key={item._id} className="flex gap-3">
            <img
              src={item?.user?.profilePic || "https://via.placeholder.com/32"}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                <h4 className="font-semibold text-sm sm:text-base">
                  {item.user?.userName || item.user?.username || "User"}
                </h4>
                <h5 className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </h5>

                {/* Edit/Delete Buttons (if owner) */}
                {String(item.user?._id) === String(currentUserId) && (
                  <div className="flex gap-2 ml-0 sm:ml-2 mt-1 sm:mt-0">
                    {editingId === item._id ? (
                      <>
                        <button
                          className="text-xs text-green-400 hover:underline"
                          onClick={() => handleEditComment(item._id)}
                        >
                          Save
                        </button>
                        <button
                          className="text-xs text-gray-400 hover:underline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-xs text-blue-400 hover:underline"
                          onClick={() => startEdit(item._id, item.message)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-xs text-red-400 hover:underline"
                          onClick={() => handleDeleteComment(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Message or Editable Field */}
              {editingId === item._id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full mt-2 p-2 bg-gray-900 rounded text-white text-sm"
                />
              ) : (
                <p className="text-sm mt-2">{item.message}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm">No comments yet.</p>
      )}
    </div>
  </div>
);

}

export default Comments;
