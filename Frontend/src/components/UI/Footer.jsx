import { TbMailPlus } from "react-icons/tb";
import footerdata from "../../api/footerData.json"; 
import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export const Footer = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const footerIcon = {
    FaInstagram : <FaInstagram className="text-xl" style={{ color: `#${bbg}` }} />,
    FaLinkedin: <FaLinkedin className="text-xl" style={{ color: `#${bbg}` }} />,
    TbMailPlus: <TbMailPlus className="text-xl" style={{ color: `#${bbg}` }} />
  };

  return (
    <footer 
      className="border-t py-8 mt-10"
      style={{ 
         backgroundColor: `#${bg2}`,
        borderColor: `#${bbg}20`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-around gap-6">
          {footerdata.map((currData, index) => {
            const { icon, title, details, link} = currData;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div>
                  <NavLink to={link}>
                    {footerIcon[icon]}
                  </NavLink>
                </div>
                <div>
                  <h2 
                    className="text-base font-semibold"
                    style={{ color: `#${headingText}` }}
                  >
                    {title}
                  </h2>
                  <p 
                    className="text-sm"
                    style={{ color: `#${text}` }}
                  >
                    {details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div 
        className="max-w-7xl mx-auto px-4 border-t pt-4 flex flex-col md:flex-row justify-between items-center"
        style={{ borderColor: `#${bbg}20` }}
      >
        <p 
          className="text-sm mb-2 md:mb-0"
          style={{ color: `#${text}` }}
        >
          © {new Date().getFullYear()} My Shop. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              `text-sm hover:underline ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={({isActive}) => ({ 
              color: isActive ? `#${bbg}` : `#${text}`
            })}
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              `text-sm hover:underline ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={({isActive}) => ({ 
              color: isActive ? `#${bbg}` : `#${text}`
            })}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/privacy" 
            className={({isActive}) => 
              `text-sm hover:underline ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={({isActive}) => ({ 
              color: isActive ? `#${bbg}` : `#${text}`
            })}
          >
            Privacy
          </NavLink>
        </div>
      </div>
    </footer>
  );
};