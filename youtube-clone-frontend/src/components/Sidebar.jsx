import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Link, useParams } from 'react-router-dom';
import "../App.css";

function Sidebar({SideNavbar}) {
  const channelId = localStorage.getItem("channelId");
  return (
    <div className={SideNavbar?'text-white flex flex-col flex-grow-[0.16] flex-shrink box-border h-[92vh] overflow-y-auto fixed top-[55px] left-0 w-[275px] p-[14px] bg-black':'hidden'}>
      <div className='flex flex-col border-b border-b-[rgb(86,85,85)] pb-[10px]'>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <HomeIcon sx={{color:"white"}}/>
          <Link to="/" className='text-[14px] font-normal'>Home</Link>
        </div>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <VideocamIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Shorts</div>
        </div>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <SubscriptionsIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Subscriptions</div>
        </div>
      </div>
      <div className='flex flex-col border-b border-b-[rgb(86,85,85)] py-[10px] px-0'>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <div className='text-[14px] font-normal'>You</div>
          <ChevronRightIcon sx={{color:"white"}}/>
        </div>
        <Link to={`/channel/${channelId}`} className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <RecentActorsIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Your Channel</div>
        </Link>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <HistoryIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>History</div>
        </div>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <PlaylistAddIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Playlist</div>
        </div>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <SmartDisplayIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Your Videos</div>
        </div>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <WatchLaterIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Watch Later</div>
        </div>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <ThumbUpIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Liked Videos</div>
        </div>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <ContentCutIcon sx={{color:"white"}}/>
          <div className='text-[14px] font-normal'>Your Clips</div>
        </div>
      </div>
      <div className='flex flex-col border-b border-b-[rgb(86,85,85)] py-[10px] px-0'>
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <div className='text-[14px] font-semibold'>Subscriptions</div>
        </div> 
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <img src="https://yt3.googleusercontent.com/ytc/AIdro_m1WLxquYeEO9VgyA7-cYFrn_hd2dSaNtmL8-NIHMCQIuPQ=s160-c-k-c0x00ffffff-no-rj" alt="side_image_logo" className='w-[25px] h-[25px], rounded-full'/>
          <div className='text-[14px] font-normal'>Aaj Tak</div>
        </div>  
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <img src="https://yt3.googleusercontent.com/ytc/AIdro_m1WLxquYeEO9VgyA7-cYFrn_hd2dSaNtmL8-NIHMCQIuPQ=s160-c-k-c0x00ffffff-no-rj" alt="side_image_logo" className='w-[25px] h-[25px], rounded-full'/>
          <div className='text-[14px] font-normal'>Aaj Tak</div>
        </div>  
        <div className='flex gap-[20px] items-center py-[9px] px-[10px] rounded-[15px] cursor-pointer hover:bg-[rgb(35,35,35)]'>
          <img src="https://yt3.googleusercontent.com/ytc/AIdro_m1WLxquYeEO9VgyA7-cYFrn_hd2dSaNtmL8-NIHMCQIuPQ=s160-c-k-c0x00ffffff-no-rj" alt="side_image_logo" className='w-[25px] h-[25px], rounded-full'/>
          <div className='text-[14px] font-normal'>Aaj Tak</div>
        </div>               
      </div>
    </div>
  )
}

export default Sidebar;