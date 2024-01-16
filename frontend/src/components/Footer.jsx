import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-900 text-white pt-6 dark:border-t dark:border-slate-200">
      <div
        className="grid grid-cols-1   md:gri-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8 items-center"
      >
        <span>© 2023 On the road. All rights reserved.</span>
        <span className="text-lg">Developed by: </span>
        <ul className="flex flex-col items-center justify-center">
          <li>
            <a
              href="https://github.com/lukasilverio94"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center pb-2 ms-2"
            >
              <FaGithub size={25} className="mr-2" />
              <span className=" text-lg">Lucas</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/morimnsb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center"
            >
              <FaGithub size={25} className="mr-2" />
              <span className=" text-lg">Mori</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
