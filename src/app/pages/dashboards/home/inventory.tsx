import React, { useState } from "react";
import {
  Flame,
  TrendingUp,
  Snowflake,
  CheckCircle2,
  FileType,
  RefreshCw,
  MinusSquare,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileSpreadsheet,
  ChevronUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ============================================================
// DUMMY DATA (Matching Screenshot Models)
// ============================================================

const kpiData = [
  { title: "Hot Lead", value: 76, icon: Flame, color: "cyan" },
  { title: "Warm Lead", value: 114, icon: TrendingUp, color: "emerald" },
  { title: "Cold Lead", value: 224, icon: Snowflake, color: "orange" },
  { title: "Booked Lead", value: 42, icon: CheckCircle2, color: "purple" },
];

const modelPieData = [
  { name: "ACCESS 125", value: 16.7, color: "#0070BA" },
  { name: "AVENIS", value: 8.3, color: "#F58220" },
  { name: "BURGMAN STREET", value: 25.0, color: "#39A935" },
  { name: "EV-ACCESS", value: 16.7, color: "#D9381E" },
  { name: "GIXXER 150", value: 25.0, color: "#8E44AD" },
  { name: "V-STROM SX", value: 8.3, color: "#8B5A2B" },
];

const modelAnalysisData = [
  { model: "ACCESS 125", inventory: 2, transit: 0, purchase: 2, sale: 72 },
  { model: "AVENIS", inventory: 1, transit: 0, purchase: 1, sale: 0 },
  { model: "BURGMAN STREET", inventory: 3, transit: 0, purchase: 3, sale: 12 },
  { model: "EV-ACCESS", inventory: 2, transit: 0, purchase: 1, sale: 0 },
  { model: "GIXXER 150", inventory: 3, transit: 0, purchase: 0, sale: 4 },
  { model: "V-STROM SX", inventory: 1, transit: 0, purchase: 0, sale: 0 },
];

const inventoryData = [
  {
    srNo: 1,
    model: "ACCESS 125",
    variant: "Disc",
    colour: "Metallic Black",
    purchaseOrder: "PO-101",
    stock: 2,
    transit: 0,
    booked: 5,
    hot: 12,
    lost: 1,
  },
  {
    srNo: 2,
    model: "AVENIS",
    variant: "Standard",
    colour: "Pearl White",
    purchaseOrder: "PO-102",
    stock: 1,
    transit: 0,
    booked: 2,
    hot: 8,
    lost: 0,
  },
  {
    srNo: 3,
    model: "BURGMAN STREET",
    variant: "EX",
    colour: "Matte Blue",
    purchaseOrder: "PO-103",
    stock: 3,
    transit: 0,
    booked: 8,
    hot: 15,
    lost: 2,
  },
  {
    srNo: 4,
    model: "EV-ACCESS",
    variant: "Electric",
    colour: "White/Blue",
    purchaseOrder: "PO-104",
    stock: 2,
    transit: 0,
    booked: 1,
    hot: 4,
    lost: 0,
  },
  {
    srNo: 5,
    model: "GIXXER 150",
    variant: "SF",
    colour: "Glass Sparkle Black",
    purchaseOrder: "PO-105",
    stock: 3,
    transit: 0,
    booked: 3,
    hot: 10,
    lost: 1,
  },
  {
    srNo: 6,
    model: "V-STROM SX",
    variant: "Standard",
    colour: "Champion Yellow",
    purchaseOrder: "PO-106",
    stock: 1,
    transit: 0,
    booked: 0,
    hot: 5,
    lost: 0,
  },
];

// Custom Legend for Pie Chart
const renderCustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// MAIN INVENTORY OVERVIEW COMPONENT
// ============================================================

const Inventory: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination Logic
  const totalItems = inventoryData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = inventoryData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="dark:bg-dark-800 min-h-screen bg-[#F4F6F9] p-4 font-sans text-gray-800 md:p-6 dark:text-gray-100">
      {/* ===== PAGE HEADER ===== */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="dark:text-primary-400 text-xl font-bold text-[#003399]">
            Inventory Overview
          </h1>
          <div className="dark:bg-primary-400 mt-1 h-[2px] w-12 bg-[#003399]"></div>
        </div>

        {/* Action Bar (Date Range + Toolbar Buttons) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range */}
          <div className="max-w-xl">
            <DatePicker
              options={{
                mode: "range",
                dateFormat: "d-m-Y",
                defaultDate: ["2026-01-07", "2026-07-28"],
              }}
              placeholder="Select date range..."
              className="w-full"
            />
          </div>
          {/* PDF */}
          <button
            title="Export PDF"
            className="dark:border-dark-500 dark:bg-dark-700 flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <FaFilePdf className="h-6 w-6 text-red-600 dark:text-red-400" />
          </button>

          <button
            title="Export Excel"
            className="dark:border-dark-500 dark:bg-dark-700 flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
          >
            <FaFileExcel className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </button>

          {/* Refresh */}
          <button
            title="Refresh"
            className="dark:border-dark-500 dark:bg-dark-700 dark:hover:bg-dark-600 flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
          >
            <RefreshCw className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Collapse */}
          <button
            title="Collapse"
            className="dark:border-dark-500 dark:bg-dark-700 dark:hover:bg-dark-600 flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
          >
            <ChevronUp className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const bgColors: Record<string, string> = {
            cyan: "bg-[#E6F8F9] dark:bg-cyan-900/30 text-[#00B4D8] dark:text-cyan-400",
            emerald:
              "bg-[#EBF9F1] dark:bg-emerald-900/30 text-[#2EC4B6] dark:text-emerald-400",
            orange:
              "bg-[#FFF4EC] dark:bg-orange-900/30 text-[#FF9F1C] dark:text-orange-400",
            purple:
              "bg-[#F3E8FF] dark:bg-purple-900/30 text-[#7B2CBF] dark:text-purple-400",
          };

          return (
            <div
              key={index}
              className="dark:border-dark-500 dark:bg-dark-700 flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-2xs"
            >
              <div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  {kpi.value}
                </span>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                  {kpi.title}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${bgColors[kpi.color]}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== MIDDLE SECTION (Pie Chart & Model Analysis Table) ===== */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* LEFT - Pie Chart Card */}
        <div className="dark:border-dark-500 dark:bg-dark-700 rounded-xl border border-gray-200/80 bg-white p-4 shadow-xs lg:col-span-6">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelPieData}
                  cx="50%"
                  cy="45%"
                  outerRadius={105}
                  dataKey="value"
                  label={({ percent }: any) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {modelPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => `${val}%`} />
                <Legend content={renderCustomLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT - Model Analysis Card */}
        <div className="dark:border-dark-500 dark:bg-dark-700 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xs lg:col-span-6">
          {/* Card Header Header */}
          <div className="bg-primary-600 dark:bg-primary-700 px-5 py-3">
            <h3 className="text-sm font-bold text-white">Model Analysis</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="dark:bg-dark-600 bg-[#EAEFF5] text-gray-800 dark:text-gray-200">
                <tr className="dark:border-dark-500 border-b border-gray-200 font-bold uppercase">
                  <th className="px-4 py-2.5">Model</th>
                  <th className="px-4 py-2.5 text-center">Inventory</th>
                  <th className="px-4 py-2.5 text-center">Transit</th>
                  <th className="px-4 py-2.5 text-center">Purchase</th>
                  <th className="px-4 py-2.5 text-center">Sale</th>
                </tr>
              </thead>
              <tbody className="dark:divide-dark-600 divide-y divide-gray-100 text-gray-600 dark:text-gray-400">
                {modelAnalysisData.map((item, index) => (
                  <tr
                    key={index}
                    className="dark:hover:bg-dark-600/50 whitespace-nowrap hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                      {item.model}
                    </td>
                    <td className="px-4 py-2 text-center">{item.inventory}</td>
                    <td className="px-4 py-2 text-center">{item.transit}</td>
                    <td className="px-4 py-2 text-center">{item.purchase}</td>
                    <td className="px-4 py-2 text-center">{item.sale}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="dark:border-dark-500 dark:bg-dark-600 border-t border-gray-200 bg-gray-50 font-bold text-gray-800 dark:text-gray-200">
                <tr>
                  <td className="px-4 py-2.5">Total</td>
                  <td className="px-4 py-2.5 text-center">
                    {modelAnalysisData.reduce((a, b) => a + b.inventory, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {modelAnalysisData.reduce((a, b) => a + b.transit, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {modelAnalysisData.reduce((a, b) => a + b.purchase, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {modelAnalysisData.reduce((a, b) => a + b.sale, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
          />
        </div>
      </div>

      {/* ===== BOTTOM INVENTORY TABLE CONTROLS & DATA ===== */}
      <div className="dark:border-dark-500 dark:bg-dark-700 rounded-xl border border-gray-200/80 bg-white font-sans text-xs text-gray-700 shadow-xs dark:text-gray-300">
        {/* Top Bar Controls */}

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="dark:bg-dark-600 bg-[#EAEFF5] text-gray-800 dark:text-gray-200">
              <tr className="dark:border-dark-500 border-b border-gray-200/80 font-bold whitespace-nowrap">
                <th className="px-4 py-3">Sr No.</th>
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Variant</th>
                <th className="px-4 py-3">Colour</th>
                <th className="px-4 py-3 text-center">Purchase Order</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Transit</th>
                <th className="px-4 py-3 text-center">Booked</th>
                <th className="px-4 py-3 text-center">Hot</th>
                <th className="px-4 py-3 text-center">Lost</th>
              </tr>
            </thead>
            <tbody className="dark:divide-dark-600 divide-y divide-gray-100">
              {currentData.map((item) => (
                <tr
                  key={item.srNo}
                  className="dark:hover:bg-dark-600/50 transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">
                    {item.srNo}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-gray-800 uppercase dark:text-gray-200">
                    {item.model}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    {item.variant}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    {item.colour}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.purchaseOrder}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.stock}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.transit}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.booked}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.hot}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.lost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="dark:border-dark-500 dark:bg-dark-700 flex flex-col gap-4 rounded-b-xl border-t border-gray-200 bg-white px-4 py-4 md:flex-row md:items-center">
            <div className="order-1 flex items-center justify-center gap-2 text-sm text-gray-600 md:w-1/3 md:justify-start dark:text-gray-400">
              <span>Show</span>
              <div className="w-20">
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="dark:border-dark-600 dark:bg-dark-600 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none dark:text-gray-200"
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <span>entries</span>
            </div>

            <div className="order-2 flex justify-center md:w-1/3">
              <div className="dark:border-dark-600 dark:bg-dark-600 inline-flex items-center space-x-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="dark:hover:bg-dark-500 inline-flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <ChevronLeft className="size-4" />
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
                          : "dark:hover:bg-dark-500 text-gray-600 hover:bg-gray-100 dark:text-gray-300"
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
                  className="dark:hover:bg-dark-500 inline-flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="order-3 flex items-center justify-center text-sm text-gray-500 select-none md:w-1/3 md:justify-end dark:text-gray-400">
              <span>
                {totalItems === 0 ? 0 : startIndex + 1} -{" "}
                {Math.min(startIndex + rowsPerPage, totalItems)} of {totalItems}{" "}
                entries
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
