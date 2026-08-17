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

const STATIC_ALLOTED_ENQUIRIES = [
  {
    id: 1,
    leadId: "Q/26-27/1310/R1",
    dmsEnquiryNo: "ENQ26001410",
    dmsEnquiryDate: "01-08-2026",
    customerName: "Rajesh Kumar",
    number: "9876543210",
    city: "Mumbai",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    salesEx: "Tanisi",
    purDate: "01-08-2026",
    nextFDate: "03-08-2026",
    ageLead: "5 Days",
    source: "Walk In",
    profession: "Salaried",
    status: "Alloted",
    leadStatus: "Active",
  },
  {
    id: 2,
    leadId: "Q/26-27/1311/R3",
    dmsEnquiryNo: "ENQ26001411",
    dmsEnquiryDate: "02-08-2026",
    customerName: "Priya Sharma",
    number: "8765432109",
    city: "Pune",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    salesEx: "Ankit",
    purDate: "02-08-2026",
    nextFDate: "05-08-2026",
    ageLead: "3 Days",
    source: "Showroom",
    profession: "Businessman",
    status: "Alloted",
    leadStatus: "Active",
  },
  {
    id: 3,
    leadId: "Q/26-27/1312/R1",
    dmsEnquiryNo: "ENQ26001412",
    dmsEnquiryDate: "03-08-2026",
    customerName: "Amit Singh",
    number: "7654321098",
    city: "Bangalore",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    salesEx: "Sneha",
    purDate: "03-08-2026",
    nextFDate: "06-08-2026",
    ageLead: "2 Days",
    source: "Referral",
    profession: "Engineer",
    status: "Alloted",
    leadStatus: "Active",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Alloted() {
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
  const filteredData = STATIC_ALLOTED_ENQUIRIES.filter((item) => {
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
       Enquiry Source - Alloted Report
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View all alloted enquiry records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Date Range Picker */}
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400">From:</span>
            <DatePicker
              value={fromDate}
              onChange={(val:any) => setFromDate(val)}
              placeholder="DD-MM-YYYY"
              options={{ dateFormat: "d-m-Y", disableMobile: true }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">To:</span>
            <DatePicker
              value={toDate}
              onChange={(val:any) => setToDate(val)}
              placeholder="DD-MM-YYYY"
              options={{ dateFormat: "d-m-Y", disableMobile: true }}
            />
          </div>

          {/* Export Excel */}
          <button
            title="Export Excel"
            className="flex  h-9 w-9  items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50"
          >
            <FaFileExcel className="h-6 w-6 text-emerald-600" />
          </button>

          {/* Export PDF */}
          <button
            title="Export PDF"
            className="flex  h-9 w-9  items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-red-50"
          >
            <FaFilePdf className="h-6 w-6 text-red-600" />
          </button>

          {/* Refresh */}
          <button
            title="Refresh"
            onClick={handleRefresh}
            className="flex  h-9 w-9  items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
          >
            <ArrowPathIcon className="h-6 w-6 text-gray-600" />
          </button>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by lead, name, or number..."
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
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.leadId}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.dmsEnquiryNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.dmsEnquiryDate}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.customerName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.number}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.city}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.model}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.variant}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.colour}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.salesEx}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.purDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.nextFDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.ageLead}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.source}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.profession}</Td>
                  <Td className="py-3 text-[12px]">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.status === "Alloted"
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
                  <Td colSpan={18} className="py-12 text-center text-gray-400 dark:text-gray-500">
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