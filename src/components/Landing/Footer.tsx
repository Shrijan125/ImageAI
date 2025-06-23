import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-white/50 text-center border-white/15 border-t-[1px] mt-40 p-4">
      &copy; {currentYear} Shrijan Shreshth. All rights reserved. <br />
    </footer>
  );
};

export default Footer;
