import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s");

  const [signUpField, setSignUpField] = useState({
    username: '',
    email: '',
    password: '',
    about: '',
    avatar: uploadedImageUrl
  });

  function handleInpField(event, name) {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value
    });
  }

  async function uploadedImage(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');

    try {
      setLoader(true);
      const response = await axios.post("https://api.cloudinary.com/v1_1/df3tu2rjt/image/upload", data);
      const imageUrl = response.data.secure_url;
      setUploadedImageUrl(imageUrl);
      setSignUpField(prev => ({ ...prev, avatar: imageUrl }));
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setLoader(false);
    }
  }

  async function handleSignUp() {
    // Optional password format validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(signUpField.password)) {
      toast.error("Password must be 8+ characters with upper, lower, number & special char");
      return;
    }

    try {
      setLoader(true);
      const response = await axios.post('http://localhost:5100/api/auth/register', signUpField);
      toast.success(response.data.message || "Registered successfully");
      navigate('/');
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoader(false);
    }
  }

  return (
  <div className="mt-14 text-white w-full flex flex-col items-center min-h-screen bg-black px-4">
    {/* Form container */}
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl border py-6 px-6 mt-8 flex flex-col items-center justify-center shadow-[0.5px_0.5px_8px_white] rounded-md bg-[#111]">
      {/* Title */}
      <div className="flex gap-3 w-full justify-center items-center text-2xl sm:text-3xl font-['Oswald','sans-serif'] font-normal">
        <img
          className="mr-1.5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png"
          alt="yt"
          height="30"
          width="30"
        />
        SignUp
      </div>

      {/* Form Inputs */}
      <div className="gap-4 w-full flex justify-center items-center flex-col mt-8">
        <input
          type="text"
          placeholder="User Name"
          value={signUpField.username}
          onChange={(e) => handleInpField(e, "username")}
          className="w-full h-11 text-white px-3 rounded-md bg-[#222222] outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={signUpField.email}
          onChange={(e) => handleInpField(e, "email")}
          className="w-full h-11 text-white px-3 rounded-md bg-[#222222] outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={signUpField.password}
          onChange={(e) => handleInpField(e, "password")}
          className="w-full h-11 text-white px-3 rounded-md bg-[#222222] outline-none"
        />
        <input
          type="text"
          placeholder="About Yourself"
          value={signUpField.about}
          onChange={(e) => handleInpField(e, "about")}
          className="w-full h-11 text-white px-3 rounded-md bg-[#222222] outline-none"
        />

        {/* File Upload & Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">
          <input
            type="file"
            onChange={uploadedImage}
            className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]"
          />
          <div className="w-[80px] h-[80px] overflow-hidden rounded-full border border-gray-400">
            <img
              src={uploadedImageUrl}
              alt="avatar-preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-4 justify-center mt-6">
          <button
            onClick={handleSignUp}
            disabled={loader}
            className={`px-6 py-2 text-base font-medium rounded-md border ${
              loader
                ? "bg-gray-600 cursor-not-allowed"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            SignUp
          </button>

          <Link
            to="/"
            className="px-6 py-2 text-base font-medium rounded-md border text-white no-underline hover:bg-white hover:text-black"
          >
            HomePage
          </Link>
        </div>

        {/* Loader */}
        {loader && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress />
          </Box>
        )}
      </div>
    </div>

    <ToastContainer />
  </div>
);
}

export default RegisterPage;
