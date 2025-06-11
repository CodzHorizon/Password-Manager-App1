import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center w-full  text-white relative top-24">
      <div className="w-[87vw] xl:w-[39vw] lg:w-[54vw] md:w-[72vw]">
        <p className="text-gray-300 font-normal text-sm/7  sm:text-lg/8 sm:font-medium ">
          <b>PassVault</b> is a responsive password manager developed using VS
          Code, built with <b>React.js</b> , <b>Vite</b> , <b>Tailwind CSS</b> ,
          and <b>Local Storage</b> . It allows users to securely store, edit,
          and delete passwords with ease. Designed with a clean, modern UI
          and optimized for all screen sizes, PassVault offers a fast and secure
          way to manage credentials across devices, ensuring both usability and
          data protection. 
        </p>
      </div>
    </div>
  );
};

export default About;
