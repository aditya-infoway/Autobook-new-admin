import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { useNavigate } from "react-router";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_EVENTS = [
  {
    id: 1,
    eventName: "Mumbai Mega Drive",
    startDate: "01-08-2026",
    endDate: "03-08-2026",
    location: "Mumbai Exhibition Center",
    rmName: "Rahul Sharma",
    amName: "Amit Patil",
  },
  {
    id: 2,
    eventName: "Pune Monsoon Fest",
    startDate: "15-08-2026",
    endDate: "18-08-2026",
    location: "Pune Camp Ground",
    rmName: "Rahul Sharma",
    amName: "Sneha Kulkarni",
  },
  {
    id: 3,
    eventName: "Delhi Auto Expo",
    startDate: "10-09-2026",
    endDate: "14-09-2026",
    location: "Delhi Pragati Maidan",
    rmName: "Vikram Singh",
    amName: "Priya Gupta",
  },
  {
    id: 4,
    eventName: "Bangalore Tech Show",
    startDate: "20-10-2026",
    endDate: "22-10-2026",
    location: "Bangalore Convention Hall",
    rmName: "Suresh Reddy",
    amName: "Kavya Nair",
  },
  {
    id: 5,
    eventName: "Chennai Auto Fest",
    startDate: "05-11-2026",
    endDate: "07-11-2026",
    location: "Chennai Trade Centre",
    rmName: "Mani Krishnan",
    amName: "Deepa Sharma",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function EventRegister() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleView = (event: any) => {
    navigate(
      `/lead-master/eventmaster/eventregisterdetails/${event.id}`,
    );
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_EVENTS.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.eventName.toLowerCase().includes(searchLower) ||
      item.location.toLowerCase().includes(searchLower) ||
      item.rmName.toLowerCase().includes(searchLower) ||
      item.amName.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Event Register
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View all registered events
          </p>
        </div>

      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  {/* Export Excel */}
  <button
    title="Export Excel"
    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50"
  >
    <FaFileExcel className="h-6 w-6 text-emerald-600" />
  </button>

  {/* Export PDF */}
  <button
    title="Export PDF"
    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-red-50"
  >
    <FaFilePdf className="h-6 w-6 text-red-600" />
  </button>

  {/* Refresh */}
  <button
    title="Refresh"
    onClick={handleRefresh}
    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
  >
    <ArrowPathIcon className="h-6 w-6 text-gray-600" />
  </button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
        />
      </div>

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[900px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                <Th className="text-[11px]">Event Name</Th>
                <Th className="text-[11px]">Event Start Date</Th>
                <Th className="text-[11px]">Event End Date</Th>
                <Th className="text-[11px]">Event Location</Th>
                <Th className="text-[11px]">RM Name</Th>
                <Th className="text-[11px]">AM Name</Th>
                <Th className="w-24 text-center text-[11px]">Action</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr
                  key={item.id}
                  className="dark:hover:bg-dark-700/40 align-middle transition-colors hover:bg-gray-50/30"
                >
                  <Td className="py-4 text-center text-[12px] font-medium text-gray-500">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.eventName}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.startDate}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.endDate}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.location}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.rmName}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.amName}
                  </Td>

                  {/* ACTION COLUMN - View Button Only */}
                  <Td className="py-4 text-center">
                    <button
                      onClick={() => handleView(item)}
                      className="inline-flex items-center gap-1 rounded-md border border-blue-500 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      <EyeIcon className="h-3.5 w-3.5" />
                      View
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={8}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No events found
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="dark:border-dark-700 dark:bg-dark-800 flex flex-col gap-4 rounded-b-xl border-t border-gray-200 bg-white px-4 py-4 md:flex-row md:items-center">
            <div className="order-1 flex items-center justify-center gap-2 text-sm text-gray-600 md:w-1/3 md:justify-start dark:text-gray-400">
              <span>Show</span>
              <div className="w-20">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="dark:border-dark-600 dark:bg-dark-700 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none dark:text-gray-200"
                >
                  {[10, 20, 30, 40, 50, 100].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <span>entries</span>
            </div>

            <div className="order-2 flex justify-center md:w-1/3">
              <div className="dark:border-dark-700 dark:bg-dark-800 inline-flex items-center space-x-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="dark:hover:bg-dark-700 inline-flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400"
                >
                  <ChevronLeftIcon className="size-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`inline-flex size-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                        page === currentPage
                          ? "bg-primary-500 text-white"
                          : "dark:hover:bg-dark-700 text-gray-600 hover:bg-gray-100 dark:text-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="dark:hover:bg-dark-700 inline-flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400"
                >
                  <ChevronRightIcon className="size-4" />
                </button>
              </div>
            </div>

            <div className="order-3 flex items-center justify-center text-sm text-gray-500 select-none md:w-1/3 md:justify-end dark:text-gray-400">
              <span>
                {totalItems === 0 ? 0 : indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
