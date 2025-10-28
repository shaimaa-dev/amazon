import React, { useState } from 'react';
import { Logo } from '../asstes/index.js';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useAuth } from '../context/GlobalContext';
import { auth } from '../firebase/config.js';

const Header = () => {
  const { user, basket } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const clickSignOut = () => {
    auth.signOut();
  };

  return (
    <header className="bg-[#131921] text-white relative">
      <div className="flex items-center justify-evenly p-3">
        {/* Logo */}
        <Link to={"/"} className="">
          <img src={Logo} alt="Amazon Logo" className="w-[100px] sm:w-[120px]" />
        </Link>

        {/* Search (Desktop Only) */}
        <form className="hidden sm:flex items-center relative flex-1 max-w-[600px] mx-6">
          <input
            type="text"
            className="p-2 w-full outline-none rounded-tl-sm rounded-bl-sm text-sm"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-[#cd9042] w-10 flex items-center border-none outline-none justify-center absolute right-0 h-[100%]"
          >
            <IoSearchSharp />
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-6 ml-auto ">
          <Link to={!user && '/login'}>
            <div onClick={clickSignOut} className="cursor-pointer">
              <div className="text-xs">Hello {user ? `${user.email}` : 'Guest'}</div>
              <div className="font-bold text-base">{user ? 'Sign Out' : 'Sign In'}</div>
            </div>
          </Link>

          <Link to={"/orders"}> 
            <div className="text-xs">Returns</div>
            <div className="font-bold text-base">& Orders</div>
          </Link>

          <Link to={"/checkOut"}>
            <div className="flex items-center relative">
              <PiShoppingCartSimple className="text-[35px]" />
              <span className="absolute top-[-10px] left-5 text-sm font-bold">
                {basket.length}
              </span>
            </div>
          </Link>
        </div>

        {/* Menu Button (Mobile Only) */}
        <button
          className="sm:hidden text-3xl focus:outline-none ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-[75%] bg-[#232f3e] text-white z-50 p-5 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <img src={Logo} alt="Logo" className="w-[100px]" />
          <button onClick={() => setMenuOpen(false)} className="text-3xl">
            <HiX />
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-lg">
          <Link
            to={!user && '/login'}
            onClick={() => {
              clickSignOut();
              setMenuOpen(false);
            }}
          >
            {user ? 'Sign Out' : 'Sign In'}
          </Link>

          <Link to="/orders" onClick={() => setMenuOpen(false)}>
            Orders
          </Link>

          <Link to="/checkOut" onClick={() => setMenuOpen(false)}>
            Cart ({basket.length})
          </Link>
        </nav>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}>
        </div>
      )}
    </header>
  );
};

export default Header;
