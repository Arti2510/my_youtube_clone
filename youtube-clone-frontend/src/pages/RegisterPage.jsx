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
    <div className='mt-14 text-white w-full flex flex-col items-center h-screen bg-black'>
      <div className='w-[90%] sm:w-[60%] md:w-[40%] border py-[15px] px-[25px] mt-[30px] flex flex-col items-center justify-center shadow-[0.5px_0.5px_8px_white]'>
        <div className='flex gap-5 w-full justify-center items-center text-[32px] font-["Oswald", "sans-serif"] font-normal non-italic'>
          <img className='mr-1.5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="yt" height="35" width="35" />
          SignUp
        </div>

        <div className='gap-5 w-full flex justify-center items-center flex-col mt-[30px]'>
          <input type="text" placeholder='User Name' value={signUpField.username} onChange={(e) => handleInpField(e, "username")} className='w-[80%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]' />
          <input type="email" placeholder='Email' value={signUpField.email} onChange={(e) => handleInpField(e, "email")} className='w-[80%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]' />
          <input type="password" placeholder='Password' value={signUpField.password} onChange={(e) => handleInpField(e, "password")} className='w-[80%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]' />
          <input type="text" placeholder='About Yourself' value={signUpField.about} onChange={(e) => handleInpField(e, "about")} className='w-[80%] h-[45px] text-white py-0 px-[10px] border-0 rounded-[5px] bg-[#222222]' />

          <div className='flex flex-col sm:flex-row items-center gap-[20px] mt-4'>
            <input type="file" onChange={uploadedImage} className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded hover:file:bg-[#ede1e1]" />
            <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
              <img src={uploadedImageUrl} alt="avatar-preview" className='w-full h-full object-cover' />
            </div>
          </div>

          <div className='w-full flex items-center gap-[30px] justify-center mt-5'>
            <button
              onClick={handleSignUp}
              disabled={loader}
              className={`p-2.5 text-[18px] font-medium rounded-[5px] border cursor-pointer no-underline ${loader ? 'bg-gray-600' : 'text-white hover:bg-white hover:text-black'}`}
            >
              SignUp
            </button>

            <Link to="/" className='p-2.5 text-[18px] font-medium rounded-[5px] border cursor-pointer text-white no-underline hover:bg-white hover:text-black'>
              HomePage
            </Link>
          </div>

          {loader && (
            <Box sx={{ width: '100%', mt: 2 }}>
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
