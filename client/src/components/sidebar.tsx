import { useState } from "react";
import { CiGrid2H } from "react-icons/ci";
import {
  FaInbox,
  FaUsers,
  FaCommentAlt,
  FaColumns,
} from "react-icons/fa";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoGridOutline } from "react-icons/io5";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`w-16 drop-shadow-2xl md:w-20 bg-gray-50 text-white flex-shrink-0 fixed md:static h-full z-20 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col items-center h-full py-4">
          <div className="flex flex-col items-center space-y-6">
            <img
              src={"./vite.svg"}
              width={30}
              height={30}
              alt="logo"
            />

            <NavIcon>
              <IoGridOutline className="size-4" />
            </NavIcon>

            <NavIcon>
              <CiGrid2H className="size-4" />
            </NavIcon>

            <NavIcon>
              <FaInbox className="size-4 text-gray-400 hover:text-teal-800 hover:bg-gray-100" />
            </NavIcon>

            <NavIcon active={true}>
              <FaUsers className="size-4" />
            </NavIcon>

            <NavIcon>
              <FaCommentAlt className="size-4" />
            </NavIcon>

            <NavIcon>
              <FaColumns className="size-4 text-gray-400 hover:text-teal-800 hover:bg-gray-100" />
            </NavIcon>
          </div>

          <div className="border-t border-gray-400 w-8 mx-auto my-4"></div>

          {/* Ellipsis icon */}
          <div className="p-1 transition-colors hover:bg-gray-100">
            <HiEllipsisHorizontal className="cursor-pointer size-6 text-gray-400 hover:text-teal-800" />
          </div>
        </div>
      </div>
    </>
  );
}

function NavIcon({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-lg transition-colors ${
        active
          ? "bg-gray-100 text-teal-800"
          : "text-gray-400 hover:text-teal-800 hover:bg-gray-100"
      }`}
    >
      {children}
    </div>
  );
}
