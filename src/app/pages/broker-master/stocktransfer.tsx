import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  ArrowPathIcon,
  PlusIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { useNavigate } from "react-router-dom";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_STOCK_TRANSFER = [
  {
    id: 1,
    stockTransferId: "ST/2026/001",
    date: "05-08-2026",
    brokerName: "Rajesh Sharma",
    mobileNo: "9876543210",
    qty: 25,
  },
  {
    id: 2,
    stockTransferId: "ST/2026/002",
    date: "04-08-2026",
    brokerName: "Amit Patel",
    mobileNo: "9876543211",
    qty: 15,
  },
  {
    id: 3,
    stockTransferId: "ST/2026/003",
    date: "03-08-2026",
    brokerName: "Suresh Kumar",
    mobileNo: "9876543212",
    qty: 30,
  },
  {
    id: 4,
    stockTransferId: "ST/2026/004",
    date: "02-08-2026",
    brokerName: "Priya Singh",
    mobileNo: "9876543213",
    qty: 20,
  },
  {
    id: 5,
    stockTransferId: "ST/2026/005",
    date: "01-08-2026",
    brokerName: "Vikram Reddy",
    mobileNo: "9876543214",
    qty: 10,
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function StockTransfer() {
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [dateRange] = useState("01-08-2026 - 05-08-2026");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleAdd = () => {
   
    navigate("/broker-master/addstocktransfer");
  };

  const handleView = (id: number) => {
    console.log(`Viewing stock transfer details for record ${id}`);
    // Navigate to stock transfer details page
    // navigate(`/stock-transfer/${id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_STOCK_TRANSFER.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.stockTransferId.toLowerCase().includes(searchLower) ||
      item.brokerName.toLowerCase().includes(searchLower) ||
      item.mobileNo.includes(search)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Vehicle Stock Transfer to Broker
          </h1>
        </div>

      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  {/* Export Excel */}
  <button
    title="Export Excel"
    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-800"
  >
    <FaFileExcel className="h-6 w-6 text-emerald-600" />
  </button>

  {/* Refresh */}
  <button
    title="Refresh"
    onClick={handleRefresh}
    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
  >
    <ArrowPathIcon className="h-6 w-6 text-gray-600" />
  </button>

  {/* Add Stock Transfer */}
  <button
    title="Add Stock Transfer"
    onClick={handleAdd}
    className="flex h-9 items-center gap-2 rounded-md bg-primary-600 px-4 text-white shadow-sm transition hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700"
  >
    <PlusIcon className="h-5 w-5" />
    <span>Add Stock Transfer</span>
  </button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by ID, broker name or mobile..."
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
          <Table className="w-full min-w-[700px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                
                <Th className="text-[11px]">Stock Transfer ID</Th>
                <Th className="text-[11px]">Date</Th>
                <Th className="text-[11px]">Broker Name</Th>
                <Th className="text-[11px]">Mobile No</Th>
                <Th className="text-center text-[11px]">Qty</Th>
                <Th className="w-12 text-center text-[11px]">Action</Th>
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
                    {item.stockTransferId}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.date}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.brokerName}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.mobileNo}
                  </Td>
                  <Td className="py-3 text-center text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.qty}
                  </Td>
                    <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={7}
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
