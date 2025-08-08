"use client";

import { employeePositionTitles, employeeStatuses } from "../data";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type RowSelectionState,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { BiCalendar, BiCheck, BiSolidDownArrow } from "react-icons/bi";
import { FaEllipsisVertical } from "react-icons/fa6";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Pagination = {
  pageIndex: number;
  pageSize: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: Pagination;
  setPagination?: (pagination: Pagination) => void;
  rowCount: number;
  className?: string;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  pagination,
  setPagination,
  className,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columnsWithCheckbox: ColumnDef<TData, TValue>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div>
          <input
            type="checkbox"
            className="relative appearance-none size-5 border-2 border-gray-300 rounded bg-white checked:border-teal-700 accent-teal-800 focus:outline-none"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Select all rows"
          />

          {table.getIsAllPageRowsSelected() && (
            <BiCheck
              className="ml-0.5 size-6 absolute top-7.5 left-3 text-teal-600"
              onClick={() => table.toggleAllRowsSelected()}
            />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <div>
          <input
            type="checkbox"
            className="absolute appearance-none size-5 border-2 border-gray-300 rounded bg-white checked:border-teal-700 accent-teal-800 focus:outline-none"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Select row ${row.id}`}
          />
          {row.getIsSelected() && (
            <BiCheck className="relative ml-0.5 size-6 bottom-1 right-1 text-teal-600" />
          )}
        </div>
      ),
      enableSorting: false,
      size: 20,
    },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: columnsWithCheckbox,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount,
    initialState: {
      pagination,
      rowSelection,
    },
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: (updater) => {
      if (pagination && setPagination) {
        const newState =
          typeof updater === "function"
            ? updater(table.getState().pagination)
            : updater;
        setPagination({
          pageIndex: newState.pageIndex,
          pageSize: newState.pageSize,
        });
      }
      return updater;
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  const renderEditableCell = (row: any, column: any) => {
    const columnId = column.id;

    // Skip the select column
    if (columnId === "select") {
      return null;
    }

    const columnToEditFieldMap = {
      id: (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs text-gray-500">Surname</label>
            <input
              type="text"
              defaultValue={`${row.original.identifier.firstName}`}
              className="rounded-md block w-fit bg-white py-1.5 pr-3 pl-3 text-xs text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-xs/6"
              placeholder={`Edit name`}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Name</label>
            <input
              type="text"
              defaultValue={`${row.original.identifier.lastName}`}
              className="rounded-md block w-fit bg-white py-1.5 pr-3 pl-3 text-xs text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-xs/6"
              placeholder={`Edit name`}
            />
          </div>
        </div>
      ),
      position: (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs text-gray-500">Position</label>
            <div className="grid grid-cols-1">
              <select
                id="category"
                name="position"
                defaultValue={row.original.position.title}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-xs text-gray-600 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-xs/6"
              >
                {employeePositionTitles.map((title) => (
                  <option key={crypto.randomUUID()} value={title}>
                    {title}
                  </option>
                ))}
              </select>
              <BiSolidDownArrow
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500">Experience</label>
            <div className="grid grid-cols-1">
              <select
                id="experience"
                name="experience"
                defaultValue={row.original.position.duration}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-xs text-gray-600 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-xs/6"
              >
                {[...Array(100).keys()].map((n) => (
                  <option key={crypto.randomUUID()} value={n}>
                    {n} year{n > 1 && "s"}
                  </option>
                ))}
              </select>
              <BiSolidDownArrow
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
              />
            </div>
          </div>
        </div>
      ),
      team: (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs text-gray-500">Team</label>
            <div className="grid grid-cols-1">
              <select
                id="category"
                name="position"
                defaultValue={row.original.team}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-xs/6"
              >
                {[...Array(100).keys()].map((n) => (
                  <option key={crypto.randomUUID()} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <BiSolidDownArrow
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
              />
            </div>
          </div>
          <div className="h-14"></div>
        </div>
      ),
      birthday: (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs text-gray-500">BDay</label>
            <div className="relative">
              <input
                type="date"
                defaultValue={new Date(
                  row.original.birthday
                ).toLocaleDateString()}
                className="rounded-md block w-full bg-white py-1.5 pr-3 pl-3 text-xs text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-xs/6"
                placeholder={`Edit date`}
              />
              <span className="translate text-text-dim pointer-events-none absolute bottom-0 right-2 top-0 my-auto flex h-5 w-5 items-center opacity-50">
                <BiCalendar />
              </span>
            </div>
          </div>
          <div className="h-14"></div>
        </div>
      ),
      contact: (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="text"
              defaultValue={`${row.original.contact.email}`}
              className="rounded-md block w-full bg-white py-1.5 pr-3 pl-3 text-xs text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-xs/6"
              placeholder={`Edit name`}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Phone</label>
            <input
              type="text"
              defaultValue={`${row.original.contact.phone}`}
              className="rounded-md block w-full bg-white py-1.5 pr-3 pl-3 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-xs/6"
              placeholder={`Edit name`}
            />
          </div>
        </div>
      ),
      address: (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs text-gray-500">Address</label>
            <input
              type="text"
              defaultValue={`${row.original.address}`}
              className="rounded-md block w-full bg-white py-1.5 pr-3 pl-3 text-xs text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-xs/6"
              placeholder={`Edit address`}
            />
          </div>
          <div className="h-14"></div>
        </div>
      ),
      status: (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs text-gray-500">Status</label>
            <div className="grid grid-cols-1">
              <select
                id="status"
                name="status"
                defaultValue={row.original.status}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-xs text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-xs/6"
              >
                {employeeStatuses.map((status) => (
                  <option key={crypto.randomUUID()} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <BiSolidDownArrow
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-2 self-center justify-self-end text-gray-500"
              />
            </div>
          </div>
          <div className="h-14"></div>
        </div>
      ),
    };

    if (Object.keys(columnToEditFieldMap).includes(columnId)) {
      return (
        <td key={columnId} className="p-2 align-middle">
          {columnToEditFieldMap[columnId as keyof typeof columnToEditFieldMap]}
        </td>
      );
    }
  };

  return (
    <div className={`rounded-md text-gray-600 ${className}`}>
      <div className="relative overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="pl-8 bg-gray-50 shadow-md relative z-10 min-w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-muted-foreground h-12 text-left align-middle text-md text-gray-500 font-bold [&:has([role=checkbox])]:pr-0"
                    key={header.id}
                  >
                    <div className={header.id === "select" ? "m-4" : ""}>
                      <span>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                    </div>
                  </th>
                ))}
                <th></th>
                <th></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getCoreRowModel().rows.length ? (
              table.getCoreRowModel().rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    {/* Main row */}
                    <tr
                      className="hover:bg-gray-200/50 data-[state=selected]:bg-gray-200 border-b border-gray-300 transition-colors data-[state=selected]:border-l-2 data-[state=selected]:border-l-teal-700"
                      data-state={row.getIsSelected() ? "selected" : undefined}
                      onClick={() => row.toggleSelected()}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}

                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        <FaEllipsisVertical className="cursor-pointer w-4 h-4" />
                      </td>

                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {row.getIsSelected() ? (
                          <IoIosArrowUp className="cursor-pointer size-4" />
                        ) : (
                          <IoIosArrowDown className="cursor-pointer size-4" />
                        )}
                      </td>
                    </tr>

                    {/* Editable row - shown when row is selected */}
                    {row.getIsSelected() && (
                      <tr className="bg-blue-50 border-b border-gray-300 border-l-2 border-l-teal-800">
                        <td></td>
                        {/* Render editable inputs for each column */}
                        {table
                          .getAllColumns()
                          .map((column) => renderEditableCell(row, column))}

                        {/* Save button in place of ellipsis */}
                        <td className="p-2 align-bottom">
                          <button
                            onClick={() => null}
                            className="duration-150 px-6 py-2 text-sm bg-teal-800 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                          >
                            Save
                          </button>
                        </td>
                        <td></td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columnsWithCheckbox.length}
                  className="h-24 text-center"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="my-4 flex items-center justify-between px-2">
        <div></div>
        <Pagination />
        <p className="mb-0 align-end text-sm">
          {rowCount} employee{rowCount > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

const Pagination = () => {
  const renderPageButton = (page: number, currentPage: number) => {
    return (
      <button
        key={crypto.randomUUID()}
        className={`
              px-2 text-sm font-medium transition-colors rounded-md
              ${
                page === currentPage
                  ? "bg-gray-500 text-white border-gray-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-300"
              }
            `}
      >
        {page}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      {/* Previous button */}
      <button
        className={
          "p-1 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-50"
        }
      >
        <MdKeyboardArrowLeft className="size-5" />
      </button>

      {[1, 2, 3].map((page) => renderPageButton(page, 1))}

      {/* Ellipsis */}
      <span className="p-1 text-gray-600 text-sm font-medium hover:bg-gray-300 rounded-md">
        <HiEllipsisHorizontal />
      </span>

      {[9, 10].map((page) => renderPageButton(page, 1))}

      {/* Next button */}
      <button
        className={
          "p-1 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50"
        }
      >
        <MdKeyboardArrowRight className="size-5" />
      </button>
    </div>
  );
};
