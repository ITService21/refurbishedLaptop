import { SubLinksBox } from "./LinkSubItems";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const MenuLinks = ({ menuLinks }) => {
  return (
    <ul className="flex px-1 lg:px-4">
      {menuLinks?.map((menuLink) => (
        <div className="relative group" key={menuLink?.name}>
          <li>
            <Link
              to={menuLink?.link}
              className={`flex px-2 py-1 rounded-md font-semibold cursor-pointer lg:px-3 text-white hover:bg-white/10 text-sm lg:text-base transition ${menuLink?.class || ""}`}
            >
              {menuLink?.name}
              {Array.isArray(menuLink?.subLinks) &&
                menuLink?.subLinks?.length > 0 && (
                  <div className="w-4 my-auto mx-1">
                    <ChevronDownIcon />
                  </div>
                )}
            </Link>
          </li>
          {Array.isArray(menuLink?.subLinks) &&
            menuLink?.subLinks?.length > 0 && (
              <div className="hidden group-hover:block">
                <SubLinksBox subLinks={menuLink?.subLinks} />
              </div>
            )}
        </div>
      ))}
    </ul>
  );
};
