import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';

function MainPage({SideNavbar}) {
    const options = ["All", "Music", "Twenty20 Cricket", "Gaming", "LIve", "Debates", "Mixes", "Democracy", "Food", "Daily Soap", "Comedy", "Javascript", "Indian Music", "Banking", "Trading"];
  return (
    <div className={SideNavbar? 'flex flex-col overflow-x-hidden flex-1 ml-[274px] min-h-screen': 'flex flex-col overflow-x-hidden flex-1 min-h-screen bg-black'}>
        <div className='flex fixed top-[56px] z-[1] w-full box-border gap-[10px] shrink-0 h-auto overflow-x-scroll bg-black'>
            {
                options.map((data, index)=> {
                    return (
                        <div key={index} className='text-white flex-none h-[30px] py-[1px] px-[10px] bg-[rgb(42,42,42)] font-semibold rounded-[5px] flex justify-center items-center cursor-pointer'>
                            {data}
                        </div>
                    );
                })
            }
        </div>

        <div className={SideNavbar? 'grid box-border gap-[10px] grid-cols-[384px_384px_384px] pt-[90px] pb-[20px] px-0 bg-black' : 'grid box-border gap-[10px] grid-cols-[326px_326px_326px_326px] pt-[90px] pb-[20px] px-[10px] bg-black'}>
            <Link to={'/watch/9897'} className='text-white no-underline flex box-border flex-col cursor-pointer h-[316px]'>
                <div className='w-full relative box-border h-[216px]'>
                    <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="thumbnail" className='w-full h-full rounded-[10px]' />
                    <div className='absolute bottom-0 right-0 w-auto py-[1px] px-[2px] bg-[rgb(42,42,42)] rounded-[5px]'>28:05</div>
                </div>
                <div className='flex pt-[10px]'>
                    <div className='w-[50px] h-[50px] flex justify-center items-center'>
                        <img src="https://yt3.ggpht.com/x4CVVvkgGfLL7bMsr5sMyz5yHBCGdNxqoJEVSuHmvCLj9JvKgISz50V0L5q1z2W0kdYCm8RF=s68-c-k-c0x00ffffff-no-rj" alt="profile" className='w-4/5 rounded-full'/>
                    </div>

                    <div className='w-full p-[5px] box-border flex flex-col'>
                        <div className='font-semibold text-base'>User1</div>
                        <div className='mt-[5px] text-lg text-[rgb(170,170,170)]'>@User1</div>
                        <div className='text-sm text-[rgb(170,170,170)]'>3 Likes</div>
                    </div>
                </div>
            </Link>
            <Link to={'/watch/9897'} className='text-white no-underline flex box-border flex-col cursor-pointer h-[316px]'>
                <div className='w-full relative box-border h-[216px]'>
                    <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="thumbnail" className='w-full h-full rounded-[10px]' />
                    <div className='absolute bottom-0 right-0 w-auto py-[1px] px-[2px] bg-[rgb(42,42,42)] rounded-[5px]'>28:05</div>
                </div>
                <div className='flex pt-[10px]'>
                    <div className='w-[50px] h-[50px] flex justify-center items-center'>
                        <img src="https://yt3.ggpht.com/x4CVVvkgGfLL7bMsr5sMyz5yHBCGdNxqoJEVSuHmvCLj9JvKgISz50V0L5q1z2W0kdYCm8RF=s68-c-k-c0x00ffffff-no-rj" alt="profile" className='w-4/5 rounded-full'/>
                    </div>

                    <div className='w-full p-[5px] box-border flex flex-col'>
                        <div className='font-semibold text-base'>User1</div>
                        <div className='mt-[5px] text-lg text-[rgb(170,170,170)]'>@User1</div>
                        <div className='text-sm text-[rgb(170,170,170)]'>3 Likes</div>
                    </div>
                </div>
            </Link>
            <Link to={'/watch/9897'} className='text-white no-underline flex box-border flex-col cursor-pointer h-[316px]'>
                <div className='w-full relative box-border h-[216px]'>
                    <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="thumbnail" className='w-full h-full rounded-[10px]' />
                    <div className='absolute bottom-0 right-0 w-auto py-[1px] px-[2px] bg-[rgb(42,42,42)] rounded-[5px]'>28:05</div>
                </div>
                <div className='flex pt-[10px]'>
                    <div className='w-[50px] h-[50px] flex justify-center items-center'>
                        <img src="https://yt3.ggpht.com/x4CVVvkgGfLL7bMsr5sMyz5yHBCGdNxqoJEVSuHmvCLj9JvKgISz50V0L5q1z2W0kdYCm8RF=s68-c-k-c0x00ffffff-no-rj" alt="profile" className='w-4/5 rounded-full'/>
                    </div>

                    <div className='w-full p-[5px] box-border flex flex-col'>
                        <div className='font-semibold text-base'>User1</div>
                        <div className='mt-[5px] text-lg text-[rgb(170,170,170)]'>@User1</div>
                        <div className='text-sm text-[rgb(170,170,170)]'>3 Likes</div>
                    </div>
                </div>
            </Link>
            <Link to={'/watch/9897'} className='text-white no-underline flex box-border flex-col cursor-pointer h-[316px]'>
                <div className='w-full relative box-border h-[216px]'>
                    <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="thumbnail" className='w-full h-full rounded-[10px]' />
                    <div className='absolute bottom-0 right-0 w-auto py-[1px] px-[2px] bg-[rgb(42,42,42)] rounded-[5px]'>28:05</div>
                </div>
                <div className='flex pt-[10px]'>
                    <div className='w-[50px] h-[50px] flex justify-center items-center'>
                        <img src="https://yt3.ggpht.com/x4CVVvkgGfLL7bMsr5sMyz5yHBCGdNxqoJEVSuHmvCLj9JvKgISz50V0L5q1z2W0kdYCm8RF=s68-c-k-c0x00ffffff-no-rj" alt="profile" className='w-4/5 rounded-full'/>
                    </div>

                    <div className='w-full p-[5px] box-border flex flex-col'>
                        <div className='font-semibold text-base'>User1</div>
                        <div className='mt-[5px] text-lg text-[rgb(170,170,170)]'>@User1</div>
                        <div className='text-sm text-[rgb(170,170,170)]'>3 Likes</div>
                    </div>
                </div>
            </Link>
            <Link to={'/watch/9897'} className='text-white no-underline flex box-border flex-col cursor-pointer h-[316px]'>
                <div className='w-full relative box-border h-[216px]'>
                    <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="thumbnail" className='w-full h-full rounded-[10px]' />
                    <div className='absolute bottom-0 right-0 w-auto py-[1px] px-[2px] bg-[rgb(42,42,42)] rounded-[5px]'>28:05</div>
                </div>
                <div className='flex pt-[10px]'>
                    <div className='w-[50px] h-[50px] flex justify-center items-center'>
                        <img src="https://yt3.ggpht.com/x4CVVvkgGfLL7bMsr5sMyz5yHBCGdNxqoJEVSuHmvCLj9JvKgISz50V0L5q1z2W0kdYCm8RF=s68-c-k-c0x00ffffff-no-rj" alt="profile" className='w-4/5 rounded-full'/>
                    </div>

                    <div className='w-full p-[5px] box-border flex flex-col'>
                        <div className='font-semibold text-base'>User1</div>
                        <div className='mt-[5px] text-lg text-[rgb(170,170,170)]'>@User1</div>
                        <div className='text-sm text-[rgb(170,170,170)]'>3 Likes</div>
                    </div>
                </div>
            </Link>
            <Link to={'/watch/9897'} className='text-white no-underline flex box-border flex-col cursor-pointer h-[316px]'>
                <div className='w-full relative box-border h-[216px]'>
                    <img src="https://img.youtube.com/vi/N1GfjzSJmiQ/maxresdefault.jpg" alt="thumbnail" className='w-full h-full rounded-[10px]' />
                    <div className='absolute bottom-0 right-0 w-auto py-[1px] px-[2px] bg-[rgb(42,42,42)] rounded-[5px]'>28:05</div>
                </div>
                <div className='flex pt-[10px]'>
                    <div className='w-[50px] h-[50px] flex justify-center items-center'>
                        <img src="https://yt3.ggpht.com/x4CVVvkgGfLL7bMsr5sMyz5yHBCGdNxqoJEVSuHmvCLj9JvKgISz50V0L5q1z2W0kdYCm8RF=s68-c-k-c0x00ffffff-no-rj" alt="profile" className='w-4/5 rounded-full'/>
                    </div>

                    <div className='w-full p-[5px] box-border flex flex-col'>
                        <div className='font-semibold text-base'>User1</div>
                        <div className='mt-[5px] text-lg text-[rgb(170,170,170)]'>@User1</div>
                        <div className='text-sm text-[rgb(170,170,170)]'>3 Likes</div>
                    </div>
                </div>
            </Link>
        </div>
        


    </div>
  )
}

export default MainPage;