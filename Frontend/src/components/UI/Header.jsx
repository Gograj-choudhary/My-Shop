import { NavLink, useNavigate } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useState } from "react";

export const Header = () => {
  const bg = import.meta.env.VITE_BG;
  const bg2 = import.meta.env.VITE_BG2; 
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const heading = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;
  
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/customer-login");
  };

  return (
    <header
      className="shadow-md transition-all duration-300"
      style={{ backgroundColor: `#${bg2}`, color: `#${text}` }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          style={{ color: `#${heading}` }}
          onClick={() => navigate("/")}
        >
          My Shop
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setShow(!show)}
            className="text-3xl"
            style={{ color: `#${heading}` }}
          >
            <IoReorderThreeSharp />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          {["Home", "About", "Be-Seller", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline underline-offset-4"
                  : "hover:opacity-75 transition-opacity"
              }
              style={{ color: `#${text}` }}
            >
              {item}
            </NavLink>
          ))}

          {/* Login / Logout */}
          <button
            onClick={isLoggedIn ? handleLogout : handleLogin}
            className="ml-4 px-5 py-2 rounded-lg font-semibold transition-all duration-300"
            style={{
              backgroundColor: `#${bbg}`,
              color: `#${heading}`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = `#${bbgHover}`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = `#${bbg}`)
            }
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <ul className="md:hidden px-6 pb-4 space-y-3 font-medium">
          {["Home", "About", "Be-Seller", "Contact"].map((item) => (
            <li key={item}>
              <NavLink
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "font-semibold underline" : "hover:opacity-80"
                }
                style={{ color: `#${text}` }}
              >
                {item}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setShow(false);
                isLoggedIn ? handleLogout() : handleLogin();
              }}
              className="w-full text-left font-semibold"
              style={{
                color: `#${bbgHover}`,
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};
