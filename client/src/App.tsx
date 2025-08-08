import { DataTable } from "./components/data-table";
import Sidebar from "./components/sidebar";
import {
  type Employee,
  employeePositionTitles,
  employeesData,
  employeeStatuses,
} from "./data";
import { type ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { BiCalendar, BiPlus, BiSearch, BiSolidDownArrow } from "react-icons/bi";
import { FaThList } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { RiExpandUpDownFill } from "react-icons/ri";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="flex flex-col gap-1 p-4">
        <p className="flex gap-1 items-center">
          <span>Name/ID</span>

          <span className="flex flex-col">
            <RiExpandUpDownFill className="size-3 text-teal-800 cursor-pointer" />
          </span>
        </p>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
            <BiSearch />
          </div>
          <input
            id="search-name"
            name="search-name"
            type="text"
            placeholder="Search by name"
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 placeholder:text-xs focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <p className="m-0 flex flex-col">
        <span className="text-teal-600 text-lg font-bold">
          {row.original.identifier.firstName} {row.original.identifier.lastName}
        </span>
        <span className="text-gray-500">{row.original.identifier.id}</span>
      </p>
    ),
  },
  {
    accessorKey: "position",
    header: () => (
      <div className="flex flex-col gap-1 p-4">
        <p className="flex gap-1 items-center">
          <span>Position</span>

          <span className="flex flex-col">
            <RiExpandUpDownFill className="size-3 text-teal-800 cursor-pointer" />
          </span>
        </p>

        <div className="grid grid-cols-1">
          <select
            id="category"
            name="position"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6"
          >
            <option value=""></option>
            <option>Software Engineer</option>
            <option>Designer</option>
            <option>HR</option>
          </select>

          <BiSolidDownArrow
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
          />
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <p className="m-0 flex flex-col">
        <span className="text-gray-700">{row.original.position.title}</span>
        <span className="text-gray-500">
          {row.original.position.duration} year
          {row.original.position.duration > 1 && "s"}
        </span>
      </p>
    ),
  },
  {
    accessorKey: "team",
    header: () => (
      <div className="flex flex-col gap-1 p-4">
        <p className="flex gap-1 items-center">
          <span>Team</span>

          <span className="flex flex-col">
            <RiExpandUpDownFill className="size-3 text-teal-800 cursor-pointer" />
          </span>
        </p>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
            <BiSearch />
          </div>
          <input
            id="search-team"
            name="search-team"
            type="text"
            className="block w-10 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 placeholder:text-xs focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <p className="text-center">
        <span>{row.original.team}</span>
      </p>
    ),
  },
  {
    accessorKey: "birthday",
    header: () => (
      <div className="flex flex-col gap-1">
        <p className="flex gap-1 items-center">
          <span>BDay</span>

          <span className="flex flex-col">
            <RiExpandUpDownFill className="size-3 text-teal-800 cursor-pointer" />
          </span>
        </p>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2">
          <input
            id="search-bday"
            name="search-bday"
            type="text"
            className="block w-10 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 placeholder:text-xs focus:outline-none sm:text-sm/6"
          />

          <div className="shrink-0 px-1 text-base text-gray-500 select-none sm:text-sm/6">
            <BiCalendar />
          </div>
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <p className="m-0 flex flex-col">
        <span>
          {new Date(row.original.birthday).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {/* {row.original.birthday.toString()} */}
        </span>
      </p>
    ),
  },
  {
    accessorKey: "contact",
    header: () => (
      <div className="flex flex-col gap-1 p-4">
        <p className="flex gap-1 items-center">
          <span>Email/Phone</span>

          <span className="flex flex-col">
            <RiExpandUpDownFill className="size-3 text-teal-800 cursor-pointer" />
          </span>
        </p>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
            <BiSearch />
          </div>
          <input
            id="search-name"
            name="search-name"
            type="text"
            placeholder="Search by email/phone"
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 placeholder:text-xs focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <p className="m-0 flex flex-col">
        <span className="font-bold text-sm text-teal-600">
          {row.original.contact.email}
        </span>
        <span className="text-sm text-gray-600">
          {row.original.contact.phone}
        </span>
      </p>
    ),
  },
  {
    accessorKey: "address",
    header: () => (
      <div className="flex flex-col gap-1 p-4">
        <p className="flex gap-1 items-center">
          <span>Address</span>

          <span className="flex flex-col">
            <RiExpandUpDownFill className="size-3 text-teal-800 cursor-pointer" />
          </span>
        </p>

        <div className="grid grid-cols-1">
          <select
            id="position"
            name="position"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6"
          >
            <option></option>
            {employeePositionTitles.map((title) => (
              <option key={crypto.randomUUID()} value={title}>{title}</option>
            ))}
          </select>

          <BiSolidDownArrow
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
          />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex flex-col gap-1 p-4">
        <p className="flex gap-1 items-center">
          <span>Status</span>

          <span className="flex flex-col gap-0">
            <RiExpandUpDownFill className="size-3 text-teal-800 cursor-pointer" />
          </span>
        </p>

        <div className="grid grid-cols-1">
          <select
            id="category"
            name="position"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6"
          >
            <option></option>
            {employeeStatuses.map((status) => (
              <option key={crypto.randomUUID()} value={status}>{status}</option>
            ))}
          </select>

          <BiSolidDownArrow
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
          />
        </div>
      </div>
    ),
  },
];

export default function App() {
  const [employees, setEmployees] = useState(employeesData);

  useEffect(() => {
    socket.on("new-employee", (row) => {
      console.log({row});
      setEmployees((prev) => [row, ...prev]);
      // show new table rows in data table with an animation
    });

    return () => {
      socket.off("new-employee");
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("/api/add-employee").then((res) => {
        if (res.status === 404) {
          socket.off("new-employee");
          clearInterval(intervalId);
        }
      });
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-600">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="py-4 md:py-8 space-y-6">
          <h2 className="text-teal-700 font-bold text-2xl md:px-8">
            Employees
          </h2>

          <div className="md:px-8 flex justify-between">
            <div>
              <div className="mt-2 flex items-center">
                <div className="grid grid-cols-1">
                  <select
                    id="category"
                    name="category"
                    defaultValue="All categories"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-l-md bg-white py-1.5 pr-8 pl-3 text-sm text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6"
                  >
                    <option>All categories</option>
                    <option>HR</option>
                    <option>Engineering</option>
                    <option>Sales</option>
                  </select>
                  <BiSolidDownArrow
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
                  />
                </div>
                <div className="-mr-px focus-within:relative w-[18rem]">
                  <input
                    id="query"
                    name="query"
                    type="text"
                    placeholder="Search..."
                    className="block w-full bg-white py-1.5 pr-3 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                </div>
                <button
                  type="button"
                  className="cursor-pointer transition-all duration-150 flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-teal-800 p-2 text-sm font-semibold text-white outline-1 -outline-offset-1 outline-gray-300 hover:bg-teal-700 focus:relative focus:outline-2 focus:-outline-offset-2"
                >
                  <BiSearch
                    aria-hidden="true"
                    className="-ml-0.5 size-5 text-white"
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <button className="cursor-pointer transition-all duration-150 flex justify-between items-center rounded-md gap-2 px-4 py-2 bg-teal-800 text-white">
                <BiPlus className="size-4" />
                <span className="text-sm">Add employee</span>
              </button>

              <div className="flex items-center gap-2">
                <HiViewList className="size-7 text-teal-700" />
                <FaThList className="size-6 text-gray-400" />
              </div>
            </div>
          </div>

          <section className="ml-4">
            <DataTable
              columns={columns}
              data={employees}
              rowCount={employees.length}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
