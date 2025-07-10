
import React from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Link } from 'react-router-dom';

function VideoDetailPage() {
  return (
    <div className='mt-[56px] flex py-[30px] px-0 justify-center bg-black text-white'>
      <div className='w-full max-w-[875px] flex flex-col'>
        <div className='w-full'>
          <video width={"400"} controls autoPlay className='w-full rounded-[10px]'>
            <source src={'https://www.youtube.com/embed/s9Qh9fWeOAk'} type='video/mp4' />
            <source src={'https://www.youtube.com/embed/s9Qh9fWeOAk'} type='video/webm' />

            Your Browser does not support the video tag.
          </video>
        </div>

        <div className='flex flex-col'>
          <div className='text-[20px] font-bold'>{"Javascript for beginners"}</div>
          <div className='flex justify-between mt-[10px]'>
            <div className='flex gap-[15px]'>
              <Link to={'/user/9897'} className='w-[35px] h-[35px] cursor-pointer'>
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s"} alt="" className='w-full rounded-full h-full' />
              </Link>
              <div className='flex flex-col'>
                <div className='font-medium text-base'>{"User1"}</div>
                <div className='text-sm text-[#AAAAAA]'>{"2025-07-07"}</div>
              </div>
              <div className='bg-white text-black py-0 px-[16px] rounded-[18px] flex justify-center items-center h-[36px] font-semibold cursor-pointer text-sm'>Subscribe</div>
            </div>
            <div className='flex gap-[10px] bg-[#a5a5a538] justify-center items-center p-[10px] box-border rounded-[18px] cursor-pointer'>
              <div className='flex gap-[10px]'>
                <ThumbUpOffAltIcon />
                <div className='font-medium'>{32}</div>
              </div>
              <div className='w-0 h-[20px] border'></div>
              <div className='flex gap-[10px]'>
                <ThumbDownOffAltIcon />
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-[#a5a5a538] w-full rounded-[10px] p-[12px] font-medium text-[14px] gap-[10px] mt-[10px] box-border'>
            <div>2025-06-27</div>
            <div>This is the cool video</div>
          </div>
        </div>
        <div className='flex flex-col mt-5'>
          <div className='text-[20px] font-medium'>2 Comments</div>
          <div className='flex mt-2.5 gap-2.5'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2shxjBolAQ3pYz1AJIAv0vd3-7AdOLSQHA&s" alt="" className='w-9 h-9 rounded-full' />
            <div className='flex flex-col w-full'>
              <input type="text" placeholder='Add a Comment' className='w-full bg-black text-white h-9 border-0 text-base border-b border-gray-500 focus:outline-none placeholder:text-[16px]' />
              <div className='flex justify-end gap-4 mt-2.5'>
                <div className='py-[8px] px-[16px] rounded-[18px] border cursor-pointer hover:bg-white hover:text-black'>Cancel</div>
                <div className='py-[8px] px-[16px] rounded-[18px] border cursor-pointer hover:bg-white hover:text-black'>Comment</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2.5'>
            <div className='flex mt-2.5 gap-2.5'>
              <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-9 h-9 rounded-full' />
              <div className='flex flex-col'>
                <div className='flex gap-2.5'>
                  <div className='text-sm font-medium'>UserName</div>
                  <div className='text-sm text-[#AAAAAA]'>2025-06-29</div>
                </div>
                <div className='mt-2.5'>This is the cool web App Project</div>
              </div>
            </div>
            <div className='flex mt-2.5 gap-2.5'>
              <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-9 h-9 rounded-full' />
              <div className='flex flex-col'>
                <div className='flex gap-2.5'>
                  <div className='text-sm font-medium'>UserName</div>
                  <div className='text-sm text-[#AAAAAA]'>2025-06-29</div>
                </div>
                <div className='mt-2.5'>This is the cool web App Project</div>
              </div>
            </div>
            <div className='flex mt-2.5 gap-2.5'>
              <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-9 h-9 rounded-full' />
              <div className='flex flex-col'>
                <div className='flex gap-2.5'>
                  <div className='text-sm font-medium'>UserName</div>
                  <div className='text-sm text-[#AAAAAA]'>2025-06-29</div>
                </div>
                <div className='mt-2.5'>This is the cool web App Project</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full max-w-[406px] py-[10px] px-[15px] gap-[15px] flex flex-col text-white'>
        <div className='flex gap-[15px] cursor-pointer'>
          <div className='w-[168px] h-[94px]'>
            <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-inherit' />
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className='text-[15px] font-medium mb-[5px]'>T20 world cup final #India.</div>
            <div className='text-[#ffffff9c] text-[12px]'>Cricket 320</div>
            <div className='text-[#ffffff9c] text-[12px]'>136K views . 1 day ago</div>
          </div>
        </div>
        <div className='flex gap-[15px] cursor-pointer'>
          <div className='w-[168px] h-[94px]'>
            <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-inherit' />
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className='text-[15px] font-medium mb-[5px]'>T20 world cup final #India.</div>
            <div className='text-[#ffffff9c] text-[12px]'>Cricket 320</div>
            <div className='text-[#ffffff9c] text-[12px]'>136K views . 1 day ago</div>
          </div>
        </div>
        <div className='flex gap-[15px] cursor-pointer'>
          <div className='w-[168px] h-[94px]'>
            <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-inherit' />
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className='text-[15px] font-medium mb-[5px]'>T20 world cup final #India.</div>
            <div className='text-[#ffffff9c] text-[12px]'>Cricket 320</div>
            <div className='text-[#ffffff9c] text-[12px]'>136K views . 1 day ago</div>
          </div>
        </div>
        <div className='flex gap-[15px] cursor-pointer'>
          <div className='w-[168px] h-[94px]'>
            <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="" className='w-inherit' />
          </div>
          <div className='flex flex-col gap-[3px]'>
            <div className='text-[15px] font-medium mb-[5px]'>T20 world cup final #India.</div>
            <div className='text-[#ffffff9c] text-[12px]'>Cricket 320</div>
            <div className='text-[#ffffff9c] text-[12px]'>136K views . 1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetailPage