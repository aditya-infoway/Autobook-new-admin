import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_ENQUIRY_REPORT = [
  {
    id: 1,
    leadId: "Q/26-27/1270/R1",
    dmsEnquiryNo: "ENQ26001329",
    dmsEnquiryDate: "01-08-2026",
    customerName: "Anas Iqbal Thekiya",
    number: "9130295319",
    city: "Nanded",
    model: "ACCESS 125",
    variant: "ACCESS RIDE CONNECT EDITION",
    colour: "Metallic Mat Black No.2 (YKV)",
    salesEx: "tanisi",
    purDate: "01-08-2026",
    nextFDate: "03-08-2026",
    ageLead: "5 Days",
    source: "Walk In",
    profession: "Salaried",
    status: "Hot",
    leadStatus: "Active",
  },
  {
    id: 2,
    leadId: "Q/26-27/1280/R3",
    dmsEnquiryNo: "ENQ26001338",
    dmsEnquiryDate: "02-08-2026",
    customerName: "Kirtish Balaram Toraskar",
    number: "9421970010",
    city: "Vengurla",
    model: "ACCESS 125",
    variant: "ACCESS RIDE CONNECT EDITION",
    colour: "Metallic Mat Black No.2 (YKV)",
    salesEx: "Ankit",
    purDate: "02-08-2026",
    nextFDate: "05-08-2026",
    ageLead: "3 Days",
    source: "Showroom",
    profession: "Businessman",
    status: "Warm",
    leadStatus: "Active",
  },
  {
    id: 3,
    leadId: "Q/26-27/1281/R3",
    dmsEnquiryNo: "ENQ26001339",
    dmsEnquiryDate: "02-08-2026",
    customerName: "Ganesh Anant Pednekar",
    number: "9022822087",
    city: "Malvan",
    model: "ACCESS 125",
    variant: "ACCESS STED (Access Drum)",
    colour: "Pearl Grace White (Q15)",
    salesEx: "Ankit",
    purDate: "02-08-2026",
    nextFDate: "05-08-2026",
    ageLead: "3 Days",
    source: "Referral",
    profession: "Private",
    status: "Cold",
    leadStatus: "Active",
  },
];

const STATIC_STATUS_ANALYSIS = [
  { status: "Hot", enquiry: 1 },
  { status: "Warm", enquiry: 1 },
  { status: "Cold", enquiry: 3 },
  { status: "Booked", enquiry: 0 },
  { status: "Alloted", enquiry: 0 },
  { status: "Sold", enquiry: 0 },
  { status: "Lost", enquiry: 0 },
  { status: "Regi. Process", enquiry: 0 },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function TotalEnquiry() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("01-08-2026");
  const [toDate, setToDate] = useState("04-08-2026");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_ENQUIRY_REPORT.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.customerName.toLowerCase().includes(searchLower) ||
      item.number.includes(search) ||
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

  // Pagination Helpers
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
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Enquiry Analysis
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View detailed enquiry reports and analysis
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Date Range Picker */}
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              From:
            </span>
            <DatePicker
              value={fromDate}
              onChange={(val: any) => setFromDate(val)}
              placeholder="DD-MM-YYYY"
              options={{ dateFormat: "d-m-Y", disableMobile: true }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              To:
            </span>
            <DatePicker
              value={toDate}
              onChange={(val: any) => setToDate(val)}
              placeholder="DD-MM-YYYY"
              options={{ dateFormat: "d-m-Y", disableMobile: true }}
            />
          </div>

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

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* ─── CHART & STATUS ANALYSIS SECTION ────────────────────────────────── */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Enquiry Analysis
          </h3>

          <div className="flex flex-col items-center justify-center">
            {/* SVG Pie Chart Container */}
            <div className="relative h-64 w-64">
              <svg
                viewBox="0 0 64 64"
                className="h-full w-full -rotate-90 transform"
              >
                {/* Cold - 60% (Green) */}
                <circle
                  cx="32"
                  cy="32"
                  r="16"
                  fill="transparent"
                  stroke="#2ecc71"
                  strokeWidth="32"
                  strokeDasharray="60 100"
                  strokeDashoffset="0"
                />

                {/* Warm - 20% (Light Blue) */}
                <circle
                  cx="32"
                  cy="32"
                  r="16"
                  fill="transparent"
                  stroke="#3498db"
                  strokeWidth="32"
                  strokeDasharray="20 100"
                  strokeDashoffset="-60"
                />

                {/* Hot - 20% (Purple) */}
                <circle
                  cx="32"
                  cy="32"
                  r="16"
                  fill="transparent"
                  stroke="#8e44ad"
                  strokeWidth="32"
                  strokeDasharray="20 100"
                  strokeDashoffset="-80"
                />
              </svg>

              {/* Embedded Percentage Overlay Labels */}
              <div className="pointer-events-none absolute inset-0 text-[11px] font-medium text-gray-800 dark:text-gray-100">
                {/* Green slice label (60%) */}
                <span className="absolute top-[48%] right-[18%] -translate-y-1/2">
                  60.0%
                </span>

                {/* Cyan slice label (20%) */}
                <span className="absolute top-[26%] left-[34%] -translate-x-1/2">
                  20.0%
                </span>

                {/* Purple slice label (20%) */}
                <span className="absolute bottom-[30%] left-[34%] -translate-x-1/2">
                  20.0%
                </span>
              </div>
            </div>

            {/* Legend Section */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#8e44ad]" /> Hot
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#3498db]" /> Warm
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#2ecc71]" /> Cold
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#e74c3c]" /> Booked
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#e67e22]" /> Alloted
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#34495e]" /> Sold
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#95a5a6]" /> Lost
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#2c3e50]" /> Regi. Process
              </span>
            </div>
          </div>
        </div>
        {/* Status Analysis Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="bg-primary-700 rounded-t-xl px-4 py-3 text-white">
            <h3 className="text-sm font-semibold">Status Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400">
                    STATUS
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase dark:text-gray-400">
                    ENQUIRY
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {STATIC_STATUS_ANALYSIS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30"
                  >
                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                      {row.status}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">
                      {row.enquiry}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold dark:bg-gray-700/50">
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-white">
                    {STATIC_STATUS_ANALYSIS.reduce((s, r) => s + r.enquiry, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── MAIN TABLE ────────────────────────────────────────────────────── */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Total Enquiry Report
        </span>
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
          <Table className="w-full min-w-[1600px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                <Th className="text-[11px]">Lead Id</Th>
                <Th className="text-[11px]">DMS Enquiry No</Th>
                <Th className="text-[11px]">DMS Enquiry Date</Th>
                <Th className="text-[11px]">Cus. Name</Th>
                <Th className="text-[11px]">Number</Th>
                <Th className="text-[11px]">City</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px]">Sales Exu.</Th>
                <Th className="text-[11px]">Pur. Date</Th>
                <Th className="text-[11px]">Next F.Date</Th>
                <Th className="text-[11px]">Age Lead</Th>
                <Th className="text-[11px]">Souce</Th>
                <Th className="text-[11px]">Profession</Th>
                <Th className="text-[11px]">Status</Th>
                <Th className="text-[11px]">Lead Status</Th>
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
                    {item.number}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.city}
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
                    {item.salesEx}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.purDate}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.nextFDate}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.ageLead}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.source}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.profession}
                  </Td>
                  <Td className="py-3 text-[12px]">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.status === "Hot"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          : item.status === "Warm"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : item.status === "Cold"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </Td>
                  <Td className="py-3 text-[12px]">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.leadStatus === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {item.leadStatus}
                    </span>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={18}
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
                  {[10, 15, 25, 50, 100].map((opt) => (
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
