import { BiDoorOpen } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { navSections } from "../constants/index";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";

const Nav = ({ user }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col px-4 py-2">
      {/* links */}
      <div className="flex flex-col items-start">
        <img src="/x-logo.webp" className="w-14 h-14 mb-2 cursor-pointer" />

        {navSections.map((i) => (
          <div
            key={i.title}
            className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded hover:bg-[#505050b7] mb-4"
          >
            <span className="text-2xl">{i.icon}</span>

            <span className="max-md:hidden whitespace-nowrap">{i.title}</span>
          </div>
        ))}
      </div>

      {/* user informations */}
      {!user ? (
        <div className="w-12 h-12 bg-gray-300 rounded-full animate-bounce"></div>
      ) : (
        <div
          className="flex flex-col gap-4 cursor-pointer items-center hover:bg-[#242D34] opacity-85 rounded-full p-3"
          onClick={() => setClicked(!clicked)}
        >
          <div className="flex gap-3 items-center">
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={user?.photoURL}
            />
            <p className="max-md:hidden">{user.displayName}</p>
            <p>
              <BsThreeDots />
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          onClick={() => signOut(auth)}
          className={`${
            clicked ? "flex" : "hidden"
          } justify-center gap-2 p-1 items-center rounded text-2xl md:text-[15px] transition hover:bg-gray-800`}
        >
          <BiDoorOpen />
          <span className="max-md:hidden">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
