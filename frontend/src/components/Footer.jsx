import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='my-10 pt-[4rem]'>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
                <div className="logo">
                    <img src={assets.logo} alt="" />
                </div>
                    <span className='text-gray-600'>|</span>
                    <p className='text-gray-600 text-[.8rem]'>All right reserved. Copyright @imagify</p>
            </div>
            <div className="flex items-center gap-2">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.instagram_icon} alt="" />
            </div>
        </div>
    </footer>
  )
}

export default Footer
