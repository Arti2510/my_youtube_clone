import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Profile({SideNavbar}) {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    async function fetchProfileData() {
        axios.get(`http://localhost:5100/api/${id}/channel`)
        .then((res)=>{
            console.log(res.data);
            // res.data[0]?.uploader?.channels[0]?.channelName
            setData(res.data); 
            setUser(res.data[0]?.uploader);  
            console.log(res.data[0]?.uploader);
                //res.data[0]?.uploader?.username
        })   
        .catch((err)=>{
            console.log(err);
            
        })     
    }
    useEffect(()=>{
        fetchProfileData();
    },[])
  return (
    <div className='flex w-full pt-[10px] pr-[13px] pb-0 pl-[13px] box-border bg-black text-white'>
        <Sidebar SideNavbar={SideNavbar}/>
        <div className={SideNavbar?'flex flex-col overflow-x-hidden flex: 1 1 0% ml-[270px] text-white mt-14 justify-center items-center': 'flex flex-col overflow-x-hidden flex: 1 1 0% text-white mt-14 justify-center items-center'}>

            <div className='w-full flex pt-0 pr-0 pb-[20px] pl-0'>
                <div className='w-[15%]'>
                    <img src="https://www.rankmybizz.com/wp-content/uploads/2021/08/pngwing.png" alt="" className='w-full h-full rounded-full'/>
                </div>
                <div className='flex flex-col gap-[7px] py-0 px-[10px] w-[85%]'>
                    <div className='text-4xl font-semibold'>{data[0]?.uploader?.channels[0]?.channelName}</div>
                    <div className='text-[16px] text-[rgb(153,153,153)]'>
                        {user?.username} . {data.length} videos
                    </div>
                    <div className='text-[16px] text-[rgb(153,153,153)]'>
                        About section of channel
                    </div>
                </div>
            </div>

            <div className='w-full'>
                <div className='text-[22px] pb-2.5 text-[rgb(207,206,206)] font-medium flex items-center border-b border-[#999999]'>Videos &nbsp; <ArrowRightIcon /></div>
                <div className='flex gap-2.5 h-screen flex-wrap mt-5'>
                    <Link to={'/watch/9897'} className='w-[210px] cursor-pointer'>
                        <div className='w-full h-[140px]'>
                            <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-full h-full'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className='w-full text-[16px] font-semibold'>Video Title</div>
                            <div className='text-[#ababab] text-[13px]'>Create at 2025-07-01</div>
                        </div>
                    </Link>
                    <Link to={'/watch/9897'} className='w-[210px] cursor-pointer'>
                        <div className='w-full h-[140px]'>
                            <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-full h-full'/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className='w-full text-[16px] font-semibold'>Video Title</div>
                            <div className='text-[#ababab] text-[13px]'>Create at 2025-07-01</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile;