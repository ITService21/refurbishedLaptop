import { Link } from "react-router-dom";

export const SubLinksBox = ({ subLinks }) => {
  return (
    <div className="absolute md:top-6 lg:top-6 left-0 text-nowrap bg-[#f0e4c3] shadow-lg z-50 rounded-lg w-[300px] overflow-hidden border border-gray-300 transition-all duration-300 ease-in-out transform opacity-0 group-hover:opacity-100 group-hover:translate-y-2">
      <ul className="divide-y divide-gray-300">
        {subLinks?.map((subLink) => {
          const Icon = subLink?.icon;
          return (
            <li key={subLink.name}>
              <Link
                to={subLink.link}
                className="flex items-center px-6 py-4 text-nowrap text-[#f0e4c3] transition-all duration-300 rounded-lg group hover:bg-gradient-to-r hover:from-[#ffc546] hover:to-[#ffb444] hover:text-white hover:scale-105"
              >
                {Icon && (
                  <span className="mr-4 text-xl text-[#9d7914] group-hover:text-[#9d7914] transition-colors duration-300">
                    <Icon />
                  </span>
                )}
                <span className="text-sm font-semibold text-[#9d7914] text-nowrap group-hover:text-[#9d7914] transition-colors duration-300">
                  {subLink.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
