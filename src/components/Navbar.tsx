// src/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="text-white text-xl font-bold">
          <a href="/">MyApp</a>
        </div>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
          <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
          <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
