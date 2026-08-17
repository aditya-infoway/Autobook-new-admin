import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  FunnelIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Checkbox } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_OLD_QUOTES = [
  {
    id: 1,
    customerName: "Jayant Meghnath Dhakul",
    mobileNo: "9423025378",
    rCount: 2,
  },
  {
    id: 2,
    customerName: "Renuka Sudhakar Lad",
    mobileNo: "8888811111",
    rCount: 1,
  },
  {
    id: 3,
    customerName: "Sachin Tendulkar",
    mobileNo: "9999988888",
    rCount: 4,
  },
  {
    id: 4,
    customerName: "Amit Kumar",
    mobileNo: "9876543210",
    rCount: 0,
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function OldQuoteRecord() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleView = (id: number) => {
    navigate(`/lead-master/oldquoterecord/oldquotehistory/${id}`);
  };

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_OLD_QUOTES.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.customerName.toLowerCase().includes(searchLower) ||
      item.mobileNo.includes(search)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Checkbox Logic
  const isAllPageSelected =
    currentItems.length > 0 &&
    currentItems.every((item) => selectedIds.includes(item.id));
  const isSomePageSelected =
    currentItems.some((item) => selectedIds.includes(item.id)) &&
    !isAllPageSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = currentItems.map((item) => item.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = currentItems.map((item) => item.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Old Quote Record
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View old quotation records
          </p>
        </div>

       <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  {/* Filter Button */}
  
  {/* Export Excel */}
  <button
    title="Export Excel"
    className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50"
  >
    <FaFileExcel className="h-6 w-6 text-emerald-600" />
  </button>

  {/* Export PDF */}
  <button
    title="Export PDF"
    className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-red-50"
  >
    <FaFilePdf className="h-6 w-6 text-red-600" />
  </button>

  {/* Refresh */}
  <button
    title="Refresh"
    onClick={handleRefresh}
    className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
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
          placeholder="Search by name or mobile..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
        />
      </div>

      {/* Filter Bar (Placeholder for consistency) */}
      {showFilterBar && (
        <div className="dark:bg-dark-700 dark:border-dark-500 animate-in fade-in slide-in-from-top-2 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-150">
          <p className="text-sm text-gray-500 dark:text-gray-400">Filter options here...</p>
        </div>
      )}

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[700px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-10 text-center">
                  <Checkbox
                    className="size-4.5"
                    checked={isAllPageSelected}
                    indeterminate={isSomePageSelected}
                    onChange={(e: any) => handleSelectAll(e.target.checked)}
                  />
                </Th>
                <Th className="w-16 text-[11px] text-center">Sr No</Th>
                <Th className="text-[11px]">Customer Name</Th>
                <Th className="text-[11px]">Mobile No</Th>
                <Th className="text-[11px] text-center">R-Count</Th>
                <Th className="text-[11px] text-center">View</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => {
                const isRowSelected = selectedIds.includes(item.id);
                return (
                  <Tr
                    key={item.id}
                    className={`${
                      isRowSelected ? "dark:bg-dark-600/30 bg-gray-50/50" : ""
                    } dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle`}
                  >
                    <Td className="py-4 text-center">
                      <Checkbox
                        className="size-4.5"
                        checked={isRowSelected}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-500 text-center font-medium">
                      {indexOfFirstItem + index + 1}
                    </Td>
                    <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.customerName}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.mobileNo}
                    </Td>
                    <Td className="py-4 text-[12px] text-center font-medium text-gray-900 dark:text-white">
                      {item.rCount}
                    </Td>
                    <Td className="py-4 text-center">
                      <button
                        onClick={() => handleView(item.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-blue-500 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        View
                      </button>
                    </Td>
                  </Tr>
                );
              })}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={6} className="py-12 text-center text-gray-400 dark:text-gray-500">
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
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="dark:hover:bg-dark-700 inline-flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400"
                >
                  <ChevronLeftIcon className="size-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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