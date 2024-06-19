// src/Navbar.js

const Navbar = () => {
  return (
    <nav className="border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="text-white text-xl">
          <a href="/">Doppel</a>
        </div>
        <ul className="flex gap-16">
          <li><a href="/" className="text-xl">Home</a></li>
          <li><a href="/about" className="text-xl">About</a></li>
          <li><a href="/contact" className="text-xl">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;