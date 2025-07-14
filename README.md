
# YouTube Clone - MERN Stack Project

A full-stack YouTube Clone application built using the MERN (MongoDB, Express.js, React, Node.js) stack with Vite and Tailwind CSS. This project allows users to create channels, upload videos, view content, comment, like/dislike, and manage their own media content—just like YouTube!

## 📁 Project Structure
my_youtube_clone/
├── youtube-clone-frontend/ # Front
end (React + Vite + Tailwind CSS)
├── bakcend/ # Backend (Node.js + Express + MongoDB)
├── README.md
└── ...

## 🔧 Tech Stack

### Frontend
- **React** with **Vite** for fast development
- **Tailwind CSS** for utility-first styling
- **React Router DOM** for routing
- **Axios** for HTTP requests
- **JWT** for frontend auth handling

### Backend
- **Node.js** and **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **Multer** for video uploads
- RESTful APIs

## ✨ Features

### 🔐 **Authentication**
- JWT-based secure authentication
- User Registration and Login
- Protected routes for video/channel operations
- Token persistence in `localStorage`

### 📺 **Video Management**
- **Create/Upload Video**  
  - Upload MP4 files with title, description, and thumbnail  
  - Automatically linked to user’s channel

- **Edit Video**  
  - Update video title, description, or replace file/thumbnail  
  - Restricted to the channel owner

- **Delete Video**  
  - Permanently removes video from database and UI  
  - Only owner can delete

- **Video Detail Page**  
  - In-built video player  
  - Like / Dislike feature  
  - View count tracking  
  - Related info: uploader, date, etc.

### 🧑‍💼 **Channel Management**
- **Create Channel**  
  - One channel per user with name, description, and banner

- **Edit Channel**  
  - Update name, description, and thumbnail/banner

- **Delete Channel**  
  - Removes channel and its videos

- **Subscribe / Unsubscribe**  
  - Users can follow/unfollow channels  
  - Subscriber count updates in real-time

- **Channel Page**  
  - Show banner, avatar, name, subscriber count  
  - Grid of all uploaded videos  
  - Subscribe button for non-owners

### 💬 **Comment System**
- **Add Comment**  
  - Logged-in users can post comments  
  - Real-time UI update

- **Delete Comment**  
  - Users can delete their own comments  
  - Instant removal from UI

- **Comment Count & Display**  
  - Total comments shown  
  - Comments include user avatar and timestamp

### 🔍 **Search & Filter**
- **Search by Title or Channel Name**  
  - Case-insensitive, real-time filtering

- **Filter Videos**  
  - Extendable for popular/latest content

### 🎨 **User Interface**
- **Responsive Design**  
  - Fully mobile, tablet, and desktop compatible

- **Navigation**  
  - Header with search and user profile  
  - Sidebar navigation with toggle on small screens  
  - Hamburger menu for mobile view

- **Video Grid UI**  
  - Responsive grid on Home and Channel pages  
  - Thumbnail, title, uploader, and views shown

- **Dynamic Routing**
  - Individual pages for:
    - Home
    - Video detail
    - Channel
    - Upload/Edit video
    - Edit/Delete channel

### 👁️ **Real-Time UI Visibility**
- All actions (upload, comment, subscribe, etc.) reflect live in UI
- Authorization-based button rendering (only owners see Edit/Delete)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Arti2510/my_youtube_clone.git
cd my_youtube_clone

2. Setup Backend
```bash
cd backend
npm install

Create a .env file inside /backend with:

.env
PORT=5100
MONGO_URI=MONGO_URI=mongodb+srv://artimaurya2510:9WDGNQgFfdqNvpc7@cluster0.c73b4zz.mongodb.net/
JWT_SECRET=mySecretKey

Start server:

bash
npm start

3. Setup Frontend
```bash
cd youtube-clone-frontend
npm install

Start frontend:

```bash
npm run dev

🔗 Access the app at
bash
Frontend: http://localhost:5173
Backend API: http://localhost:5100/

📸 Screenshots
Add UI screenshots here (Homepage, Video Page, Channel Page, etc.)

🛠️ Folder Breakdown
css
Copy
Edit
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx

server/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── uploads/
├── index.js
└── config/

🧪 Testing
Manual testing through UI.

Use tools like Postman to test backend APIs.

🙌 Acknowledgements
React
Vite
Tailwind CSS
MongoDB
Express
Node.js

## 📸 Screenshots

> Below are some UI previews from the frontend of the YouTube Clone app.

### 🏠 Homepage
Displays a grid of videos with thumbnails, titles, and uploader info.

[https://github.com/Arti2510/my_youtube_clone/tree/19884a267a546dfe3923b556c40daa7829f9b262/screenshots](https://github.com/Arti2510/my_youtube_clone/blob/a9e8e4772ba551016170cf679dbecc2fd329cb22/screenshots/youtube-clone-image.png))
