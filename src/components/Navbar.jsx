import React, { forwardRef, useState, useEffect } from "react";

const Navbar = forwardRef(function Navbar(props, ref) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "howitworks", "services", "contact"];
      let current = "home";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.getBoundingClientRect().top;
          if (top <= 80) current = section; // 80px offset for navbar height
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Working", href: "#howitworks" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-cyan-100"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
        {/* Brand Name */}
        <h1 className="text-2xl font-extrabold text-cyan-600 tracking-wide drop-shadow-sm">
          Iron<span className="text-yellow-400">Xpress</span>
        </h1>

        {/* Nav Links */}
        <ul className="flex space-x-6 font-semibold text-slate-800 relative">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className={`hover:text-cyan-600 transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-cyan-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-cyan-600 after:rounded-full"
                    : ""
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
