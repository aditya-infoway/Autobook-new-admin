import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  FunnelIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { useNavigate } from "react-router";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_ENQUIRY_SOURCES = [
  {
    id: 1,
    enquirySource: "Walk In",
    totalEnq: 150,
    pending: 20,
    alloted: 45,
    sold: 60,
    regiProcess: 15,
    lost: 10,
  },
  {
    id: 2,
    enquirySource: "Online",
    totalEnq: 250,
    pending: 30,
    alloted: 80,
    sold: 110,
    regiProcess: 20,
    lost: 10,
  },
  {
    id: 3,
    enquirySource: "Referral",
    totalEnq: 80,
    pending: 10,
    alloted: 25,
    sold: 30,
    regiProcess: 10,
    lost: 5,
  },
  {
    id: 4,
    enquirySource: "Call Center",
    totalEnq: 120,
    pending: 15,
    alloted: 40,
    sold: 45,
    regiProcess: 12,
    lost: 8,
  },
  {
    id: 5,
    enquirySource: "Social Media",
    totalEnq: 90,
    pending: 12,
    alloted: 30,
    sold: 35,
    regiProcess: 8,
    lost: 5,
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function EnquirySource() {
   const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleView = (field: string, id: number) => {
  switch (field) {
    case "Total Enq.":
      navigate(`/stock-report/totalenquiry/${id}`);
      break;

    case "Pending":
      navigate(`/stock-report/pending/${id}`);
      break;

    case "Lost":
      navigate(`/stock-report/lost/${id}`);
      break;

    case "Alloted":
      navigate(`/stock-report/alloted/${id}`);
      break;

    case "Sold":
      navigate(`/stock-report/sold/${id}`);
      break;

    case "Regi. Process":
      navigate(`/stock-report/regiprocess/${id}`);
      break;
  }
};
  // Filter and Pagination Logic
  const filteredData = STATIC_ENQUIRY_SOURCES.filter((item) => {
    const searchLower = search.toLowerCase();
    return item.enquirySource.toLowerCase().includes(searchLower);
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
            Enquiry Source
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View enquiry source wise performance
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
          placeholder="Search by enquiry source..."
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
                <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">Enquiry Source</Th>
                <Th className="text-center text-[11px]">Total Enq.</Th>
                <Th className="text-center text-[11px]">Pending</Th>
                <Th className="text-center text-[11px]">Alloted</Th>
                <Th className="text-center text-[11px]">Sold</Th>
                <Th className="text-center text-[11px]">Regi. Process</Th>
                <Th className="text-center text-[11px]">Lost</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr
                  key={item.id}
                  className="dark:hover:bg-dark-700/40 align-middle transition-colors hover:bg-gray-50/30"
                >
                  <Td className="py-3 text-center text-[12px] font-medium text-gray-500">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.enquirySource}
                  </Td>

                  {/* Total Enq. - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView("Total Enq.", item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="View Total Enquiries"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>

                  {/* Pending - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView("Pending", item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-yellow-500 text-yellow-600 transition hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                      title="View Pending"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>

                  {/* Alloted - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView("Alloted", item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-green-500 text-green-600 transition hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                      title="View Alloted"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>

                  {/* Sold - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView("Sold", item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500 text-emerald-600 transition hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                      title="View Sold"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>

                  {/* Regi. Process - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView("Regi. Process", item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 text-purple-600 transition hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
                      title="View Registration Process"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>

                  {/* Lost - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView("Lost", item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-600 transition hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                      title="View Lost"
                    >
                      <EyeIcon className="h-4 w-4" />
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
                    No records found
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
