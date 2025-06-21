import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='mt-40 text-white/50 text-center border-t border-white/15 border-[1px] p-4'>
        &copy; {currentYear} Shrijan Shreshth. All rights reserved. <br />
    </div>
  )
}

export default Footer