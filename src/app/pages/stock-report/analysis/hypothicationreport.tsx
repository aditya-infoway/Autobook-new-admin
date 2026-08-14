import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  ArrowPathIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_HYPOTHICATION = [
  {
    id: 1,
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    totalEnq: 45,
  },
  {
    id: 2,
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    totalEnq: 80,
  },
  {
    id: 3,
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    totalEnq: 150,
  },
  {
    id: 4,
    model: "GIXXER SF",
    variant: "SPORT",
    colour: "Metallic Red",
    totalEnq: 60,
  },
];

const MODEL_ANALYSIS_DATA = [
  { model: "ACCESS 125", enquiries: 125 },
  { model: "BURGMAN STREET", enquiries: 150 },
  { model: "GIXXER SF", enquiries: 60 },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function HypothicationReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [dateRange] = useState("01-08-2026 - 05-08-2026");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleView = (id: number) => {
    console.log(`Viewing hypothication details for record ${id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_HYPOTHICATION.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.model.toLowerCase().includes(searchLower) ||
      item.variant.toLowerCase().includes(searchLower) ||
      item.colour.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Top Header Controls (Date Range & Export Buttons) */}
      <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:justify-end">
        {/* Date Filter */}
        <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white py-1.5 text-xs text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
          <DatePicker
            options={{
              mode: "range",
              dateFormat: "d-m-Y",
              defaultDate: ["2026-01-07", "2026-07-28"],
            }}
            placeholder="Select date range..."
            className="w-54 border-none bg-transparent p-0 text-xs text-gray-700 focus:ring-0 focus:outline-none dark:text-gray-200"
          />
        </div>

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            title="Export PDF"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-red-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <FaFilePdf className="h-6 w-6 text-red-600" />
          </button>
          <button
            title="Export Excel"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <FaFileExcel className="h-6 w-6 text-emerald-600" />
          </button>
          <button
            title="Refresh"
            onClick={handleRefresh}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
          >
            <ArrowPathIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Analytics Section (Chart & Model Analysis) */}
      <div className="space-y-3">
        {/* Hypothication Analysis Title */}
        <h2 className="text-sm font-bold text-[#033ba1] underline underline-offset-4 dark:text-blue-400">
          Hypothication Analysis
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Line Chart Card */}
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm lg:col-span-7 dark:border-gray-700 dark:bg-gray-800">
            {/* Chart Container */}
            <div className="relative h-64 w-full pt-4">
              {/* Gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                {[6, 5, 4, 3, 2, 1, 0].map((val) => (
                  <div key={val} className="flex items-center gap-2">
                    <span className="w-3 text-right">{val}</span>
                    <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-700" />
                  </div>
                ))}
              </div>

              {/* X-Axis Labels */}
              <div className="absolute right-0 bottom-0 left-6 flex justify-between text-xs text-gray-400">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                  <span key={val}>{val}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Model Analysis Card */}
          <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm lg:col-span-5 dark:border-gray-700 dark:bg-gray-800">
            <div className="bg-[#033ba1] px-4 py-2.5">
              <h2 className="text-sm font-semibold text-white">
                Model Analysis
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full text-left text-xs">
                <THead className="border-b border-gray-200 bg-blue-50/50 dark:border-gray-700 dark:bg-gray-700/50">
                  <Tr>
                    <Th className="px-4 py-2 font-semibold text-gray-700 uppercase dark:text-gray-300">
                      MODEL
                    </Th>
                    <Th className="px-4 py-2 text-right font-semibold text-gray-700 uppercase dark:text-gray-300">
                      ENQUIRIES
                    </Th>
                  </Tr>
                </THead>
                <TBody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {MODEL_ANALYSIS_DATA.map((row, idx) => (
                    <Tr
                      key={idx}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    >
                      <Td className="px-4 py-2.5 text-gray-800 dark:text-gray-200">
                        {row.model}
                      </Td>
                      <Td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">
                        {row.enquiries}
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section: Hypothication Report */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-[#033ba1] underline underline-offset-4 dark:text-blue-400">
          Hypothication Report
        </h2>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by model, variant or colour..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
          />
          <svg
            className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Data Table */}
        <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[600px]">
              <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
                <Tr>
                  <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                  <Th className="text-[11px]">Model</Th>
                  <Th className="text-[11px]">Variant</Th>
                  <Th className="text-[11px]">Colour</Th>
                  <Th className="text-center text-[11px]">Total Enq.</Th>
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
                      {item.model}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.variant}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.colour}
                    </Td>

                    {/* Total Enq. - View Icon */}
                    <Td className="py-3 text-center">
                      <button
                        onClick={() => handleView(item.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title="View Total Enquiries"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </Td>
                  </Tr>
                ))}
                {currentItems.length === 0 && (
                  <Tr>
                    <Td
                      colSpan={5}
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
                  {Math.min(indexOfLastItem, totalItems)} of {totalItems}{" "}
                  entries
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
