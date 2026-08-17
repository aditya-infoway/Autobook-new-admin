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

const STATIC_BOOKING_BALANCE = [
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
    suggestChassisNo: "MB8A1B2C3D4E5F678",
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
    suggestChassisNo: "MB8A9Z8Y7X6W5V4U3",
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
    suggestChassisNo: "MB8A1A2B3C4D5E6F7",
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
    suggestChassisNo: "MB8A1G2H3I4J5K6L7",
  },
];

const STATIC_MODEL_ANALYSIS = [
  { model: "ACCESS 125", totalLead: 1040, bookedLead: 28 },
  { model: "AVENIS", totalLead: 37, bookedLead: 3 },
  { model: "BURGMAN STREET", totalLead: 165, bookedLead: 9 },
  { model: "EV-ACCESS", totalLead: 13, bookedLead: 0 },
  { model: "GIXXER 150", totalLead: 22, bookedLead: 0 },
  { model: "GIXXER 250", totalLead: 3, bookedLead: 0 },
  { model: "V-STROM SX", totalLead: 13, bookedLead: 0 },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function BookingBalance() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleViewPaymentHistory = (id: number) => {
    navigate(`/accounting-master/booking/paymenthistory/${id}`);
  };

  // Calculate Totals
  const totalInvoice = STATIC_BOOKING_BALANCE.reduce(
    (sum, item) => sum + Number(item.invoiceAmount.replace(/,/g, "")),
    0,
  );
  const totalReceived = STATIC_BOOKING_BALANCE.reduce(
    (sum, item) => sum + Number(item.receivedAmount.replace(/,/g, "")),
    0,
  );
  const totalPending = STATIC_BOOKING_BALANCE.reduce(
    (sum, item) => sum + Number(item.pendingAmount.replace(/,/g, "")),
    0,
  );

  // Filter and Pagination Logic
  const filteredData = STATIC_BOOKING_BALANCE.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.customerName.toLowerCase().includes(searchLower) ||
      item.contact.includes(search) ||
      item.leadId.toLowerCase().includes(searchLower) ||
      item.dmsEnquiryNo.toLowerCase().includes(searchLower) ||
      item.suggestChassisNo.toLowerCase().includes(searchLower)
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
            Booking Balance
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View booking-wise payment balances
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

      {/* ─── DASHBOARD CARDS ────────────────────────────────────────────────── */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Invoice Amount */}
        <div className="bg-primary-700 flex items-center gap-4 rounded-xl p-5 text-white shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-200">Invoice Amount</p>
            <p className="text-xl font-bold">
              ₹{totalInvoice.toLocaleString()}.00
            </p>
          </div>
        </div>

        {/* Pending Amount */}
        <div className="flex items-center gap-4 rounded-xl bg-red-600 p-5 text-white shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-red-200">Pending Amount</p>
            <p className="text-xl font-bold">
              ₹{totalPending.toLocaleString()}.00
            </p>
          </div>
        </div>

        {/* Received Amount */}
        <div className="flex items-center gap-4 rounded-xl bg-emerald-600 p-5 text-white shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-200">
              Received Amount
            </p>
            <p className="text-xl font-bold">
              ₹{totalReceived.toLocaleString()}.00
            </p>
          </div>
        </div>
      </div>

      {/* ─── CHART & MODEL ANALYSIS ────────────────────────────────────────── */}

          {/* ─── CHART & MODEL ANALYSIS ────────────────────────────────────────── */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pie Chart with Animations */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col items-center">
            {/* Animated CSS Pie Chart */}
            <div
              className="relative h-64 w-64 rounded-full shadow-inner transition-all duration-700 hover:scale-105 hover:rotate-3"
              style={{
                background: `conic-gradient(
          #1d70b8 0% 80.4%,
          #f58220 80.4% 81.7%,
          #22ac38 81.7% 94.5%,
          #d9383a 94.5% 95.5%,
          #9283be 95.5% 96.5%,
          #a57c52 96.5% 97.5%,
          #e4007d 97.5% 100%
        )`,
                animation: "pieChartAppear 1s ease-out forwards",
              }}
            >
              {/* On-Chart Percentage Labels with hover effect */}
              <span className="absolute right-16 bottom-10 text-xs font-bold text-white drop-shadow transition-all duration-300 hover:scale-110 hover:brightness-125">
                80.4%
              </span>
              <span className="absolute top-12 left-8 text-xs font-bold text-white drop-shadow transition-all duration-300 hover:scale-110 hover:brightness-125">
                12.8%
              </span>
            </div>

            {/* Animated Legend Items */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-gray-600 dark:text-gray-300">
              {[
                { color: "#1d70b8", label: "ACCESS 125" },
                { color: "#f58220", label: "AVENIS" },
                { color: "#22ac38", label: "BURGMAN STREET" },
                { color: "#d9383a", label: "EV-ACCESS" },
                { color: "#9283be", label: "GIXXER 150" },
                { color: "#a57c52", label: "GIXXER 250" },
                { color: "#e4007d", label: "V-STROM SX" },
              ].map((item, index) => (
                <span
                  key={index}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 transition-all duration-300 hover:bg-gray-100 hover:scale-110 hover:shadow-md dark:hover:bg-gray-700"
                  style={{
                    animation: `legendItemAppear 0.5s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  <span
                    className="h-3 w-3 rounded-sm transition-all duration-300 hover:scale-150 hover:shadow-lg"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Model Analysis Table with animation */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="bg-primary-700 rounded-t-xl px-4 py-3 text-white">
            <h3 className="text-sm font-semibold">Model Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400">
                    MODEL
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase dark:text-gray-400">
                    TOTAL LEAD
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase dark:text-gray-400">
                    BOOKED LEAD
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {STATIC_MODEL_ANALYSIS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="transition-all duration-300 hover:bg-gray-50/30 hover:scale-[1.01] dark:hover:bg-gray-700/40"
                    style={{
                      animation: `tableRowAppear 0.4s ease-out ${idx * 0.08}s forwards`,
                    }}
                  >
                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                      {row.model}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">
                      {row.totalLead}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">
                      {row.bookedLead}
                    </td>
                  </tr>
                ))}
                <tr
                  className="bg-gray-100 font-semibold transition-all duration-300 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                  style={{
                    animation: `tableRowAppear 0.4s ease-out ${STATIC_MODEL_ANALYSIS.length * 0.08}s forwards`,
                  }}
                >
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-white">
                    {STATIC_MODEL_ANALYSIS.reduce((s, r) => s + r.totalLead, 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-white">
                    {STATIC_MODEL_ANALYSIS.reduce(
                      (s, r) => s + r.bookedLead,
                      0,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── SEARCH & MAIN TABLE ───────────────────────────────────────────── */}

      <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="dark:border-dark-600 dark:bg-dark-700 w-full rounded-lg border border-gray-200 bg-white py-1.5 pr-4 pl-9 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1400px]">
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
                <Th className="text-[11px]">Suggest Chassis No</Th>
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
                  <Td className="py-3 text-right text-[12px] font-semibold text-gray-900 dark:text-white">
                    ₹{item.invoiceAmount}
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-semibold text-green-600 dark:text-green-400">
                    ₹{item.receivedAmount}
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-semibold text-red-600 dark:text-red-400">
                    ₹{item.pendingAmount}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.suggestChassisNo}
                  </Td>

                  {/* Payment History Column - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleViewPaymentHistory(item.id)}
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
                    colSpan={16}
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
