const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <h1 className="text-2xl font-bold">IronXpress</h1>
        <ul className="flex space-x-6 font-bold">
          <li><a href="#home" className="hover:text-white">Home</a></li>
          <li><a href="#services" className="hover:text-white">Services</a></li>
          <li><a href="#bookings" className="hover:text-white">Bookings</a></li>
          <li><a href="#about" className="hover:text-white">About</a></li>
          <li><a href="#contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
