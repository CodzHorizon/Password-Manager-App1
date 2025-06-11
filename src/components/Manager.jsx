import React from "react";
import { useRef, useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [show, setShow] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied To Clipboard", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };
  const showPassword = () => {
    setShow(!show);
    ref.current.src = show ? "/icons/eye.svg" : "/icons/eyecross.svg";
  };

  // const showPassword = () => {
  //   if (ref.current.src.includes("/icons/eyecross.svg")) {
  //     ref.current.src = "/icons/eye.svg";
  //   } else {
  //     ref.current.src = "/icons/eyecross.svg";
  //   }
  // };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      setform({ site: "", username: "", password: "" });
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      toast("Saved", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }
    else{
      toast("ERROR: Password Not Saved", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }
  };

  const deletePassword = (id) => {
    toast("Deleted", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    let c = confirm("Do you want to delete this password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex flex-col items-center w-full  relative top-24">
      <div className="flex flex-col gap-4">
        <div className="">
          <input
            name="site"
            onChange={handleChange}
            value={form.site}
            id="site"
            placeholder="Website Name or URL"
            type="text"
            className="forinput  w-[87vw] xl:w-[33.5vw] lg:w-[50vw] md:w-[70vw]"
          />
        </div>
        <div className="flex gap-2  sm:gap-5">
          <div className="inputs">
            <input
              onChange={handleChange}
              name="username"
              value={form.username}
              placeholder="Email"
              type="text"
              id="username"
              className="forinput  w-[45vw] xl:w-[17.1vw] lg:w-[25vw] md:w-[34.8vw] pr-9"
            />
            <span className="input-svg">
              <svg
                className="w-4 h-4"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                color="#9CA3AF"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <div className="inputs">
            <input
              value={form.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              type={show ? "text" : "password"} // Toggle type here
              id="password"
              className="forinput  w-[40vw] xl:w-[15.1vw] lg:w-[23vw] md:w-[32.5vw] pr-9"
            />
            <span className="input-svg " onClick={showPassword}>
              <img
                ref={ref}
                src="/icons/eye.svg"
                alt="no"
                className="w-[17px] h-[17px]"
              />
            </span>
          </div>
        </div>
        <div className="flex justify-center relative top-4 ">
          <button onClick={savePassword} className="savebtn" type="button">
            <div className="flex w-full gap-2 items-center  justify-center">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
                className="w-6 h-6  "
              ></lord-icon>
              Save
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-10 md:mt-7 h-auto w-full xl:w-[40vw] lg:w-[60vw] md:w-[80vw] overflow-hidden">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        {passwordArray.length === 0 && (
          <div className="flex justify-center text-gray-400 w-full m-2 text-xl overflow-hidden">
            No passwords to Show
          </div>
        )}
        {passwordArray.length != 0 && (
          <div className="text-white ">
            <table className=" table-fixed w-[100%] border-separate border-spacing-y-7 sm:border-spacing-y-3 sm:border-spacing-x-2 border-spacing-x-2  ">
              <thead className="">
                <tr>
                  <th className="text-sm font-medium font-gray-200 bg-gray-700/60 rounded-md ">
                    Websites
                  </th>
                  <th className="text-sm font-medium font-gray-200 bg-gray-700/60 rounded-md py-1">
                    Email
                  </th>
                  <th className="text-sm font-medium font-gray-200 bg-gray-700/60 rounded-md py-1">
                    Passwords
                  </th>
                  <th className="text-sm font-medium font-gray-200 bg-gray-700/60 rounded-md py-1">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <div className="flex justify-between w-full  gap-1.5 align-middle ps-1.5">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sm:line-clamp-1 break-words w-[80%]"
                          >
                            {item.site}
                          </a>
                          <div
                            className="flex justify-end  align-middle items-center  cursor-pointer hover:bg-gray-100/9 rounded-md p-0.5 hover:scale-108"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              class="pointer-events-none"
                            >
                              <rect width="24" height="24"></rect>
                              <rect
                                x="4"
                                y="8"
                                width="12"
                                height="12"
                                rx="1"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></rect>
                              <path
                                d="M8 6V5C8 4.44772 8.44772 4 9 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H18"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-dasharray="2 2"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between w-full  gap-1.5 align-middle ps-1.5 overflow-ellipsis">
                          <p className="sm:line-clamp-1   w-[80%] break-words">
                            {item.username}
                          </p>
                          <div
                            className="flex justify-end  align-middle items-center  cursor-pointer hover:bg-gray-100/9 rounded-md p-0.5 hover:scale-108"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              class="pointer-events-none"
                            >
                              <rect width="24" height="24"></rect>
                              <rect
                                x="4"
                                y="8"
                                width="12"
                                height="12"
                                rx="1"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></rect>
                              <path
                                d="M8 6V5C8 4.44772 8.44772 4 9 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H18"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-dasharray="2 2"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-between w-full gap-1.5 align-middle ps-1.5">
                          <div className="sm:line-clamp-1 w-[80%] break-words">
                            {item.password}
                          </div>
                          <div
                            className="flex justify-end  align-middle items-center  cursor-pointer hover:bg-gray-100/9 rounded-md p-0.5 hover:scale-108"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              class="pointer-events-none"
                            >
                              <rect width="24" height="24"></rect>
                              <rect
                                x="4"
                                y="8"
                                width="12"
                                height="12"
                                rx="1"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></rect>
                              <path
                                d="M8 6V5C8 4.44772 8.44772 4 9 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H18"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-dasharray="2 2"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td className=" text-center flex gap-1 justify-center items-center">
                        <div
                          onClick={() => {
                            editPassword(item.id);
                          }}
                          className="align-middle cursor-pointer hover:bg-gray-100/9 rounded-md p-1 hover:scale-108"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            color="#ffffff"
                            fill="none"
                            className=""
                          >
                            <path
                              d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
                              stroke="#ffffff"
                              stroke-width="1.5"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
                              stroke="#ffffff"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                        <div
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                          className="flex relative align-middle cursor-pointer hover:bg-gray-100/9 rounded-md p-1 hover:scale-108"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            color="#ffffff"
                            fill="none"
                          >
                            <path
                              d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M9.5 16.5L9.5 10.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M14.5 16.5L14.5 10.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
