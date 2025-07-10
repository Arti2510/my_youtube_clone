import React from 'react'
import Sidebar from '../components/Sidebar'
import MainPage from '../components/MainPage'

function HomePage({SideNavbar}) {
  return (
    <div className='flex w-full pt-[10px] pr-0 pb-0 pl-0 box-border'>
      <Sidebar SideNavbar={SideNavbar}/>
      <MainPage SideNavbar={SideNavbar}/>
    </div>
  )
}

export default HomePage;