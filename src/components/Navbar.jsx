import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-cente  text-gray-300 mx-4 my-2.5">
      <div className="">
        <h1 className=" hover:text-gray-50 cursor-pointer inline-block  text-2xl font-bold">
          PassVault
        </h1>
      </div>

      <ul className=" flex  ">
        <li className="hover:text-gray-50 px-2 text-lg font-light hover:underline decoration-1">
          <NavLink className={(e)=>{return e.isActive?"white":""}} to="/">
            Home
          </NavLink>
        </li>
        <li className="hover:text-gray-50 px-2 text-lg font-light hover:underline decoration-1">
          <NavLink className={(e)=>{return e.isActive?"white":""}} to="/about">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
