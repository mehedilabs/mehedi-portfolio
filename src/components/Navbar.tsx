import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold" onClick={closeMenu}>
          Mehedi<span className="text-blue-600">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm hover:text-blue-600">
            Home
          </Link>

          <Link to="/about" className="text-sm hover:text-blue-600">
            About
          </Link>

          <Link to="/projects" className="text-sm hover:text-blue-600">
            Projects
          </Link>

          <Link to="/skills" className="text-sm hover:text-blue-600">
            Skills
          </Link>

          <Link to="/thinking" className="text-sm hover:text-blue-600">
            Thinking
          </Link>
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white md:block"
        >
          Let's Talk
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl md:hidden"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/about" onClick={closeMenu}>
              About
            </Link>

            <Link to="/projects" onClick={closeMenu}>
              Projects
            </Link>

            <Link to="/skills" onClick={closeMenu}>
              Skills
            </Link>

            <Link to="/thinking" onClick={closeMenu}>
              Thinking
            </Link>

            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;