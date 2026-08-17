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

const STATIC_PAYMENT_REGISTER = [
  {
    id: 1,
    leadDate: "30-07-2026",
    leadId: "L-001",
    dmsEnquiryNo: "ENQ/2026/0311",
    dmsEnquiryDate: "30-07-2026",
    customerName: "Jayant Meghnath Dhakul",
    contact: "9423025378",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    ageLead: "15 Days",
    invoiceAmount: "85,000",
    receivedAmount: "50,000",
    pendingAmount: "35,000",
  },
  {
    id: 2,
    leadDate: "29-07-2026",
    leadId: "L-002",
    dmsEnquiryNo: "ENQ/2026/0310",
    dmsEnquiryDate: "29-07-2026",
    customerName: "Renuka Sudhakar Lad",
    contact: "8888811111",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    ageLead: "5 Days",
    invoiceAmount: "82,000",
    receivedAmount: "82,000",
    pendingAmount: "0",
  },
  {
    id: 3,
    leadDate: "28-07-2026",
    leadId: "L-003",
    dmsEnquiryNo: "ENQ/2026/0305",
    dmsEnquiryDate: "28-07-2026",
    customerName: "Sachin Tendulkar",
    contact: "9999988888",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    ageLead: "30 Days",
    invoiceAmount: "1,10,000",
    receivedAmount: "60,000",
    pendingAmount: "50,000",
  },
  {
    id: 4,
    leadDate: "25-07-2026",
    leadId: "L-004",
    dmsEnquiryNo: "ENQ/2026/0298",
    dmsEnquiryDate: "25-07-2026",
    customerName: "Amit Kumar",
    contact: "9876543210",
    model: "GIXXER SF",
    variant: "SPORT",
    colour: "Metallic Red",
    ageLead: "45 Days",
    invoiceAmount: "95,000",
    receivedAmount: "40,000",
    pendingAmount: "55,000",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function PaymentRegister() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleViewHistory = (id: number) => {
    navigate(`/accounting-master/booking/paymenthistory/${id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_PAYMENT_REGISTER.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.customerName.toLowerCase().includes(searchLower) ||
      item.contact.includes(search) ||
      item.leadId.toLowerCase().includes(searchLower) ||
      item.dmsEnquiryNo.toLowerCase().includes(searchLower) ||
      item.model.toLowerCase().includes(searchLower)
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
            Payment Register
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View all payment records and histories
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
          placeholder="Search by name, contact, or lead ID..."
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
          <Table className="w-full min-w-[1200px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                <Th className="text-[11px]">Lead Date</Th>
                <Th className="text-[11px]">Lead Id</Th>
                <Th className="text-[11px]">DMS Enquiry No</Th>
                <Th className="text-[11px]">DMS Enquiry Date</Th>
                <Th className="text-[11px]">Customer Name</Th>
                <Th className="text-[11px]">Contact</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px]">Age Lead</Th>
                <Th className="text-right text-[11px]">Invoice Amount</Th>
                <Th className="text-right text-[11px]">Received Amount</Th>
                <Th className="text-right text-[11px]">Pending Amount</Th>
                <Th className="text-center text-[11px]">Payment History</Th>
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
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.leadDate}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.leadId}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.dmsEnquiryNo}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.dmsEnquiryDate}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.customerName}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.contact}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.model}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.variant}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.colour}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.ageLead}
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-bold text-gray-900 dark:text-white">
                    ₹{item.invoiceAmount}
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-bold text-green-600 dark:text-green-400">
                    ₹{item.receivedAmount}
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-bold text-red-600 dark:text-red-400">
                    ₹{item.pendingAmount}
                  </Td>

                  {/* Payment History - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleViewHistory(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="View Payment History"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={15}
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
