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
import { DatePicker } from "@/components/shared/form/Datepicker";
import { useNavigate } from "react-router";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_DYNAMIC_REPORT = [
  {
    id: 1,
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    totalEnq: 45,
    pending: 10,
    lost: 2,
    alloted: 12,
    sold: 8,
    regiProcess: 5,
    stock: 20,
    transit: 3,
  },
  {
    id: 2,
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    totalEnq: 80,
    pending: 15,
    lost: 3,
    alloted: 25,
    sold: 20,
    regiProcess: 10,
    stock: 30,
    transit: 5,
  },
  {
    id: 3,
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    totalEnq: 150,
    pending: 30,
    lost: 5,
    alloted: 45,
    sold: 35,
    regiProcess: 20,
    stock: 50,
    transit: 10,
  },
  {
    id: 4,
    model: "GIXXER SF",
    variant: "SPORT",
    colour: "Metallic Red",
    totalEnq: 60,
    pending: 8,
    lost: 1,
    alloted: 20,
    sold: 15,
    regiProcess: 8,
    stock: 25,
    transit: 4,
  },
];

const STATIC_MODEL_ANALYSIS = [
  { model: "ACCESS 125", enquiries: 22 },
  { model: "AVENIS", enquiries: 1 },
  { model: "BURGMAN STREET", enquiries: 3 },
  { model: "GIXXER 150", enquiries: 1 },
];

// ─── TOGGLE OPTIONS ─────────────────────────────────────────────────────────

const TOGGLE_OPTIONS = [
  { id: "hot", label: "Hot", color: "bg-red-500" },
  { id: "warm", label: "Warm", color: "bg-orange-400" },
  { id: "cold", label: "Cold", color: "bg-blue-400" },
  { id: "booked", label: "Booked", color: "bg-purple-500" },
  { id: "alloted", label: "Alloted", color: "bg-indigo-500" },
  { id: "sold", label: "Sold", color: "bg-green-600" },
  { id: "regin", label: "Regi. Process", color: "bg-cyan-500" },
  { id: "lost", label: "Lost", color: "bg-gray-500" },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function DynamicReport() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [activeToggle, setActiveToggle] = useState("hot");

  // ─── HANDLERS ────────────────────────────────────────────────────────────

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

   const handleView = (field: string, id: number) => {
    console.log(`Viewing ${field} for record ${id}`);
    
    // Map the field name to the correct route path
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
      default:
        // Fallback if no match is found
        console.warn(`No route defined for field: ${field}`);
        break;
    }
  };

  const handleToggle = (id: string) => {
    setActiveToggle(id);
  };

  // ─── DYNAMIC DATA HELPERS ────────────────────────────────────────────────

  const getToggleLabel = (id: string) => {
    const found = TOGGLE_OPTIONS.find((t) => t.id === id);
    return found ? found.label : "Hot";
  };

  const getValue = (enquiries: number, toggle: string) => {
    switch (toggle) {
      case "hot":
        return Math.round(enquiries * 0.6);
      case "warm":
        return Math.round(enquiries * 0.4);
      case "cold":
        return Math.round(enquiries * 0.2);
      case "booked":
        return Math.round(enquiries * 0.15);
      case "alloted":
        return Math.round(enquiries * 0.3);
      case "sold":
        return Math.round(enquiries * 0.1);
      case "regin":
        return Math.round(enquiries * 0.08);
      case "lost":
        return Math.round(enquiries * 0.05);
      default:
        return 0;
    }
  };

  const getPercentage = (enquiries: number, toggle: string) => {
    const value = getValue(enquiries, toggle);
    return Math.round((value / enquiries) * 100);
  };

  // ─── TOTALS ──────────────────────────────────────────────────────────────

  const totalEnquiries = STATIC_MODEL_ANALYSIS.reduce(
    (sum, row) => sum + row.enquiries,
    0,
  );
  const totalActiveValue = STATIC_MODEL_ANALYSIS.reduce(
    (sum, row) => sum + getValue(row.enquiries, activeToggle),
    0,
  );
  const totalActivePercentage = Math.round(
    (totalActiveValue / totalEnquiries) * 100,
  );

  // ─── FILTER & PAGINATION ──────────────────────────────────────────────────

  const filteredData = STATIC_DYNAMIC_REPORT.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.model.toLowerCase().includes(searchLower) ||
      item.variant.toLowerCase().includes(searchLower) ||
      item.colour.toLowerCase().includes(searchLower)
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
            Dynamic Report
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View dynamic sales and inventory reports
          </p>
        </div>

       <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  {/* Date Range Picker */}
  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <span className="text-xs text-gray-500 dark:text-gray-400">
      From:
    </span>
    <DatePicker
      value="01-08-2026"
      onChange={() => {}}
      placeholder="DD-MM-YYYY"
      options={{ dateFormat: "d-m-Y", disableMobile: true }}
    />
    <span className="text-xs text-gray-500 dark:text-gray-400">
      To:
    </span>
    <DatePicker
      value="04-08-2026"
      onChange={() => {}}
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
</div>
      </div>

      {/* ─── CHART & MODEL ANALYSIS SECTION ────────────────────────────────── */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Dynamic Analysis
          </h3>

          {/* Outer Chart Wrapper */}
          <div className="relative flex h-64 w-full">
            {/* Y-Axis Numbers (0 at bottom, 25 at top) */}
            <div className="flex flex-col justify-between pr-3 pb-6 text-right text-[11px] font-medium text-gray-400 select-none">
              <span>25</span>
              <span>20</span>
              <span>15</span>
              <span>10</span>
              <span>5</span>
              <span>0</span>
            </div>

            {/* Chart Area */}
            <div className="relative flex flex-1 flex-col justify-between">
              {/* Background Grid Lines Area */}
              <div className="pointer-events-none absolute inset-x-0 top-1 bottom-6 flex flex-col justify-between">
                <div className="w-full border-b border-gray-100 dark:border-gray-700" />
                <div className="w-full border-b border-gray-100 dark:border-gray-700" />
                <div className="w-full border-b border-gray-100 dark:border-gray-700" />
                <div className="w-full border-b border-gray-100 dark:border-gray-700" />
                <div className="w-full border-b border-gray-100 dark:border-gray-700" />
                <div className="w-full border-b border-gray-200 dark:border-gray-600" />
              </div>

              {/* Bars Container */}
              <div className="relative z-10 flex h-full items-end justify-around px-2 pb-6">
                {/* ACCESS 125 (23 out of 25 = ~92%) */}
                <div className="flex h-full flex-1 flex-col items-center justify-end px-2">
                  <div
                    className="flex w-full max-w-[55px] items-center justify-center bg-[#1e90ff] transition-all"
                    style={{ height: "92%" }}
                  >
                    <span className="text-xs font-bold text-white">23</span>
                  </div>
                  <span className="absolute -bottom-6 text-[10px] font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                    ACCESS 125
                  </span>
                </div>

                {/* AVENIS (1 out of 25 = ~4%) */}
                <div className="flex h-full flex-1 flex-col items-center justify-end px-2">
                  <div
                    className="flex min-h-[14px] w-full max-w-[55px] items-center justify-center bg-[#1e90ff] transition-all"
                    style={{ height: "4%" }}
                  >
                    <span className="text-[9px] font-bold text-white">1</span>
                  </div>
                  <span className="absolute -bottom-6 text-[10px] font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                    AVENIS
                  </span>
                </div>

                {/* BURGMAN STREET (3 out of 25 = ~12%) */}
                <div className="flex h-full flex-1 flex-col items-center justify-end px-2">
                  <div
                    className="flex min-h-[16px] w-full max-w-[55px] items-center justify-center bg-[#1e90ff] transition-all"
                    style={{ height: "12%" }}
                  >
                    <span className="text-[10px] font-bold text-white">3</span>
                  </div>
                  <span className="absolute -bottom-6 text-[10px] font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                    BURGMAN STREET
                  </span>
                </div>

                {/* GIXXER 150 (1 out of 25 = ~4%) */}
                <div className="flex h-full flex-1 flex-col items-center justify-end px-2">
                  <div
                    className="flex min-h-[14px] w-full max-w-[55px] items-center justify-center bg-[#1e90ff] transition-all"
                    style={{ height: "4%" }}
                  >
                    <span className="text-[9px] font-bold text-white">1</span>
                  </div>
                  <span className="absolute -bottom-6 text-[10px] font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                    GIXXER 150
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Model Analysis Table + Dynamic Toggles */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
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
                    ENQUIRIES
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase dark:text-gray-400">
                    {getToggleLabel(activeToggle)} (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {STATIC_MODEL_ANALYSIS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30"
                  >
                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                      {row.model}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">
                      {row.enquiries}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-blue-600 dark:text-blue-400">
                      {getValue(row.enquiries, activeToggle)} (
                      {getPercentage(row.enquiries, activeToggle)}%)
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold dark:bg-gray-700/50">
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-white">
                    {totalEnquiries}
                  </td>
                  <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400">
                    {totalActiveValue} ({totalActivePercentage}%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Toggle Switches (Fully Functional) */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-3">
              {TOGGLE_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => handleToggle(option.id)}
                >
                  <div
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      activeToggle === option.id
                        ? option.color
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        activeToggle === option.id
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
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
      </div>

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1300px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-center text-[11px]">Total Enq.</Th>
                <Th className="text-center text-[11px]">Pending</Th>
                <Th className="text-center text-[11px]">Lost</Th>
                <Th className="text-center text-[11px]">Alloted</Th>
                <Th className="text-center text-[11px]">Sold</Th>
                <Th className="text-center text-[11px]">Regi. Process</Th>
                <Th className="text-center text-[11px]">Stock</Th>
                <Th className="text-center text-[11px]">Transit</Th>
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

                  <Td className="py-3 text-center text-[12px] font-semibold text-gray-900 dark:text-white">
                    {item.stock}
                  </Td>
                  <Td className="py-3 text-center text-[12px] font-semibold text-gray-900 dark:text-white">
                    {item.transit}
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={12}
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
