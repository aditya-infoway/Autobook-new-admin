import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_STOCK_ENTRIES = [
  {
    id: 1,
    date: "07-04-2026",
    type: "Sale",
    partyName: "JITESH VINAYAK SALGAONKAR",
    billNo: "B/26-27/001",
    qty: -1.00,
    billAmount: "805.08",
    currentStock: -1.00,
  },
  {
    id: 2,
    date: "11-04-2026",
    type: "Purchase",
    partyName: "SUZUKI MOTORCYCLE INDIA PVT LTD",
    billNo: "PUR/A/26-27/001",
    qty: 218.00,
    billAmount: "175,095.55",
    currentStock: 217.00,
  },
  {
    id: 3,
    date: "11-04-2026",
    type: "Sale",
    partyName: "Ganesh Anant Pednekar",
    billNo: "Q/26-27/003",
    qty: -1.00,
    billAmount: "805.08",
    currentStock: 216.00,
  },
  {
    id: 4,
    date: "12-04-2026",
    type: "Sale",
    partyName: "Javedkhan Mansoor Shaikh",
    billNo: "B/26-27/002",
    qty: -1.00,
    billAmount: "805.08",
    currentStock: 215.00,
  },
  {
    id: 5,
    date: "12-04-2026",
    type: "Sale",
    partyName: "Issa Kamal Borkar",
    billNo: "Q/26-27/277/R1",
    qty: -1.00,
    billAmount: "805.08",
    currentStock: 214.00,
  },
  {
    id: 6,
    date: "12-04-2026",
    type: "Sale",
    partyName: "Sajjad Mahamad Kalekar",
    billNo: "Q/26-27/278/R1",
    qty: -1.00,
    billAmount: "805.08",
    currentStock: 213.00,
  },
  {
    id: 7,
    date: "12-04-2026",
    type: "Sale",
    partyName: "Pushkar Yashwant Fulgare",
    billNo: "Q/26-27/136/R3",
    qty: -1.00,
    billAmount: "805.08",
    currentStock: 212.00,
  },
  {
    id: 8,
    date: "12-04-2026",
    type: "Sale",
    partyName: "Trupti Babaji Sawant",
    billNo: "B/26-27/003",
    qty: -1.00,
    billAmount: "805.08",
    currentStock: 211.00,
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function FullStock() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // ─── PAGINATION LOGIC ────────────────────────────────────────────────────

  const totalItems = STATIC_STOCK_ENTRIES.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = STATIC_STOCK_ENTRIES.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      
      {/* ─── DARK BLUE HEADER SECTION ─────────────────────────────────────── */}

      <div className="rounded-xl bg-blue-900 p-6 text-white shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">FULL HELMET</h1>
            <p className="mt-1 text-sm text-blue-200">
              Item Code: 99000F10650C0XL • Unit: Piece
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-800 text-white shadow-sm transition hover:bg-blue-700"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>

            {/* Export Excel */}
            <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-white">
              <FaFileExcel className="text-lg text-green-600" />
              Export Excel
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-white"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ─── 4 SUMMARY CARDS ───────────────────────────────────────────────── */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Opening Stock */}
        <div className="rounded-xl border border-gray-200 bg-blue-50 p-4 shadow-sm dark:border-gray-700 dark:bg-blue-900/20">
          <p className="text-center text-xs font-medium text-blue-600 dark:text-blue-400">
            Opening Stock
          </p>
          <p className="mt-1 text-center text-xl font-bold text-blue-600 dark:text-blue-400">
            0.00
          </p>
        </div>

        {/* Total Purchased */}
        <div className="rounded-xl border border-gray-200 bg-green-50 p-4 shadow-sm dark:border-gray-700 dark:bg-green-900/20">
          <p className="text-center text-xs font-medium text-green-600 dark:text-green-400">
            Total Purchased
          </p>
          <p className="mt-1 text-center text-xl font-bold text-green-600 dark:text-green-400">
            1,218.00
          </p>
        </div>

        {/* Total Sold */}
        <div className="rounded-xl border border-gray-200 bg-orange-50 p-4 shadow-sm dark:border-gray-700 dark:bg-orange-900/20">
          <p className="text-center text-xs font-medium text-orange-600 dark:text-orange-400">
            Total Sold
          </p>
          <p className="mt-1 text-center text-xl font-bold text-orange-600 dark:text-orange-400">
            709.00
          </p>
        </div>

        {/* Current Stock */}
        <div className="rounded-xl border border-gray-200 bg-purple-50 p-4 shadow-sm dark:border-gray-700 dark:bg-purple-900/20">
          <p className="text-center text-xs font-medium text-purple-600 dark:text-purple-400">
            Current Stock
          </p>
          <p className="mt-1 text-center text-xl font-bold text-purple-600 dark:text-purple-400">
            509.00
          </p>
        </div>
      </div>

      {/* ─── TABLE SECTION ─────────────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {totalItems} total entries
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="dark:bg-dark-800 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 focus:outline-none dark:border-gray-600 dark:text-gray-300"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <THead className="bg-blue-900 text-white">
              <Tr>
                <Th className="w-12 text-center text-[11px] font-semibold text-white">#</Th>
                <Th className="text-[11px] font-semibold text-white">Date</Th>
                <Th className="text-[11px] font-semibold text-white">Type</Th>
                <Th className="text-[11px] font-semibold text-white">Party Name</Th>
                <Th className="text-[11px] font-semibold text-white">Bill No</Th>
                <Th className="text-[11px] font-semibold text-white text-right">Qty</Th>
                <Th className="text-[11px] font-semibold text-white text-right">Bill Amount</Th>
                <Th className="text-[11px] font-semibold text-white text-right">Current Stock</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-center text-[12px] text-gray-500">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.date}
                  </Td>
                  <Td className="py-3 text-[12px]">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.type === "Sale"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {item.type}
                    </span>
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.partyName}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.billNo}
                  </Td>
                  <Td className="py-3 text-[12px] font-semibold text-right">
                    <span
                      className={
                        item.qty < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }
                    >
                      {item.qty > 0 ? "+" : ""}
                      {item.qty.toFixed(2)}
                    </span>
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300 text-right">
                    {item.billAmount}
                  </Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    {item.currentStock.toFixed(2)}
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={8} className="py-12 text-center text-gray-400 dark:text-gray-500">
                    No stock entries found
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </div>

        {/* ─── PAGINATION ──────────────────────────────────────────────────── */}

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
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
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

                {getPageNumbers().map((page, index) =>
                  typeof page === "number" ? (
                    <button
                      key={index}
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
                  ) : (
                    <span
                      key={index}
                      className="inline-flex size-8 items-center justify-center text-sm text-gray-400 dark:text-gray-500"
                    >
                      {page}
                    </span>
                  ),
                )}

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