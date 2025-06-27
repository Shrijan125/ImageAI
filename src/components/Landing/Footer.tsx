import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-white/50 w-full max-w-7xl mx-auto border-white/15 border-t-[1px] mt-40 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Business Info Section */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-semibold mb-2">Shrijan Shreshth</h3>
          <div className="space-y-1 text-sm">
            <p>Novel Elementary School, CDA colony</p>
            <p>Patna-800023, House No: 19, Bihar</p>
            <p>+91-8102803348</p>
            <p>Email: shrijanshreshth3@gmail.com</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center md:text-right">
          <p className="text-sm">&copy; {currentYear} Shrijan Shreshth.</p>
          <p className="text-sm">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
