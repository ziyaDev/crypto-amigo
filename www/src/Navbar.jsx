import React, { useState, useEffect } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import {
  AiOutlineCloseCircle,
  AiFillInstagram,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import MexicanHatIcon from '../src/assets/mexican-hat-2.svg';

// MenuItems JSON
const menuItems = [
  // { text: "Home", url: "#" },
  // { text: "Pricing", url: "#" },
  // { text: "Features", url: "#" },
  // { text: "Testimonials", url: "#" },
];

const iconComponents = [
  { Icon: BsDiscord, color: 'text-indigo-500', url: '#' },
  { Icon: AiFillInstagram, color: 'text-rose-500', url: '#' },
  { Icon: FaTwitter, color: 'text-sky-600', url: '#' },
  { Icon: MdEmail, color: 'text-teal-500', url: '#' },
];

const IconList = () => (
  <div className="header__follow__icon absolute bottom-5 left-0 right-0">
    <div className="flex items-center justify-evenly space-x-2 px-6 py-4">
      {iconComponents.map(({ Icon, color, url }) => (
        <a key={color} href={url}>
          <Icon className={`text-2xl text-zinc-800`} />
        </a>
      ))}
    </div>
  </div>
);

function MobileMenu({ onClose }) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.main-nav-menu-mobile')) {
        onClose();
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="main-nav-menu-mobile z-50 bg-white/95 backdrop-blur-sm shadow-sm lg:shadow-none absolute left-0 top-0 bottom-0 right-0 border-r border-slate-400/30 border-dashed w-[270px] md:w-[300px] lg:flex lg:w-[300px] lg:flex-col">
      <div className="flex flex-row">
        <button>
          <div className="header__logo pl-5 pr-1 py-5">
            <a href="/" className="text-black font-bold text-base">
              CryptoAmigo
            </a>
          </div>
        </button>
        <img
          className="w-7 rotate-12"
          src={MexicanHatIcon}
          alt="CryptoAmigo Icon"
        />
      </div>

      <div className="header__menu lg:hidden">
        <ul className="flex-col space-y-5 px-8 py-5 pb-8 text-sm font-semibold text-zinc-700/60">
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              className="w-fit border-b border-transparent hover:border-secondarydark transition-colors duration-100 ease-linear hover:text-secondarydark
         "
            >
              <a href={menuItem.url}>
                <button>{menuItem.text}</button>
              </a>
            </li>
          ))}
        </ul>
        <div className="header__button space-y-2">
          <div className="px-6 lg:flex lg:items-center">
            <button className="button bg-black w-full shadow-button active:scale-95 active:translate-x-1 active:translate-y-1 active:shadow-lg active:drop-shadow transition-all duration-150 lg:w-1/3 text-white text-sm rounded-lg px-5 py-2.5 group font-clash font-[500] group">
              <a href="/">Join now</a>
              <AiOutlineArrowRight className="inline-block ml-2 group-active:translate-x-2" />
            </button>
          </div>
        </div>
      </div>
      <IconList />
    </div>
  );
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = (event) => {
    event.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="navbar top-0 py-2 px-5 lg:py-5 w-full bg-transparent lg:relative z-50">
      <nav className=" max-w-4xl xl:max-w-5xl mx-auto px-2 lg:px-7 py-3 lg:border-none rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-row">
            <button>
              <div className="header__logo pl-5 pr-1 py-5">
                <a href="/" className="text-black font-bold text-base">
                  CryptoAmigo
                </a>
              </div>
            </button>
            <img
              className="w-7 rotate-12"
              src={MexicanHatIcon}
              alt="CryptoAmigo Icon"
            />
          </div>
          <div className="header__menu hidden lg:flex items-center gap-x-10">
            <ul className="flex space-x-10 text-sm font-semibold text-black/60">
              {menuItems.map((menuItem, index) => (
                <li
                  key={index}
                  className="w-fit border-b border-transparent hover:border-secondarydark transition-colors duration-100 ease-linear hover:text-secondarydark
             "
                >
                  <a href={menuItem.url}>
                    <button>{menuItem.text}</button>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center lg:hidden">
            <button
              className={`advanced-setting-toggle focus:outline-none transition-all duration-150u ${
                isMobileMenuOpen
                  ? 'rounded-full bg-slate-200 text-slate-800'
                  : 'text-slate-200'
              }`}
              onClick={handleMobileMenuToggle}
            >
              {isMobileMenuOpen ? (
                <AiOutlineCloseCircle className="text-2xl focus:outline-none active:scale-110 active:text-slate-200" />
              ) : (
                <HiMenuAlt3 className="text-2xl text-slate-800 focus:outline-none active:scale-110 active:text-red-500" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="main__nav__menu fixed inset-0 z-50 overflow-auto bg-transparent lg:hidden">
          <MobileMenu onClose={handleMobileMenuClose} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
