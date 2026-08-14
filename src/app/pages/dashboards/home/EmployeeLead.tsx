import React, { useState } from "react";
import {
  Calendar,
  ArrowLeft,
  FileSpreadsheet,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ============================================================
// INTERFACE FOR EMPLOYEE LEAD DATA
// ============================================================

export interface EmployeeLeadItem {
  id: number;
  qNo: string;
  customerName: string;
  number: string;
  city: string;
  executiveName: string;
  model: string;
  variant: string;
  colour: string;
  purchaseDate: string;
  expectedDeliveryDate: string;
  expectedDeliveryTime: string;
  paymentType: string;
  profession: string;
  enquiryType: string;
  enquirySource: string;
  bookingDate: string;
  customerRating: string;
  followUpDate: string;
  enquiryStatus: string;
  totalAmount: number;
  advancePayment: number;
  mode: string;
  pendingAmount: number;
  chassisNo: string;
  leadStatus: string;
  qRCount: number;
  createdDate: string;
  createdTime: string;
}

// ============================================================
// DUMMY DATA MATCHING SCREENSHOT & FIELDS
// ============================================================

const dummyEmployeeLeads: EmployeeLeadItem[] = [
  {
    id: 1,
    qNo: "Q/26-27/1136",
    customerName: "Arpita Suraj Salunkhe",
    number: "8180939295",
    city: "Kankavli",
    executiveName: "Rohit Parab",
    model: "ACCESS 125",
    variant: "ACCESS RIDE CONNECT EDITION",
    colour: "Pearl Grace White (Q1S)",
    purchaseDate: "12-07-2026",
    expectedDeliveryDate: "14-07-2026",
    expectedDeliveryTime: "12:06 PM",
    paymentType: "FINANCE",
    profession: "Salaried P...",
    enquiryType: "HOT",
    enquirySource: "Showroom Walk-in",
    bookingDate: "10-07-2026",
    customerRating: "5 Star",
    followUpDate: "15-07-2026",
    enquiryStatus: "Booked",
    totalAmount: 95000,
    advancePayment: 5000,
    mode: "UPI",
    pendingAmount: 90000,
    chassisNo: "ME1KC12A81N001001",
    leadStatus: "In Progress",
    qRCount: 1,
    createdDate: "08-07-2026",
    createdTime: "10:15 AM",
  },
  {
    id: 2,
    qNo: "Q/26-27/1084/R4",
    customerName: "Suresh Ramchandra Patil",
    number: "9875856215",
    city: "Radhanagari",
    executiveName: "Rohit Parab",
    model: "ACCESS 125",
    variant: "ACCESS STD (Access Drum)",
    colour: "Metallic Mat Black No. 2 (YKV)",
    purchaseDate: "17-07-2026",
    expectedDeliveryDate: "18-07-2026",
    expectedDeliveryTime: "05:15 PM",
    paymentType: "CASH",
    profession: "Salaried P...",
    enquiryType: "WARM",
    enquirySource: "Digital Campaign",
    bookingDate: "15-07-2026",
    customerRating: "4 Star",
    followUpDate: "19-07-2026",
    enquiryStatus: "Open",
    totalAmount: 88000,
    advancePayment: 10000,
    mode: "Cash",
    pendingAmount: 78000,
    chassisNo: "ME1KC12A81N001002",
    leadStatus: "Followup",
    qRCount: 4,
    createdDate: "12-07-2026",
    createdTime: "02:30 PM",
  },
  {
    id: 3,
    qNo: "Q/26-27/1167",
    customerName: "Sagar Satyawan Kirloskar",
    number: "9768935031",
    city: "Malvan",
    executiveName: "Rohit Parab",
    model: "BURGMAN STREET",
    variant: "Ride Connect Edition (UB125 NMV) NEW",
    colour: "YKV: Metallic Mat Black No. 2",
    purchaseDate: "23-07-2026",
    expectedDeliveryDate: "24-07-2026",
    expectedDeliveryTime: "10:50 AM",
    paymentType: "FINANCE",
    profession: "Salaried P...",
    enquiryType: "HOT",
    enquirySource: "Referral",
    bookingDate: "21-07-2026",
    customerRating: "5 Star",
    followUpDate: "25-07-2026",
    enquiryStatus: "Booked",
    totalAmount: 112000,
    advancePayment: 15000,
    mode: "Net Banking",
    pendingAmount: 97000,
    chassisNo: "ME1KC12B92N002005",
    leadStatus: "Closed-Won",
    qRCount: 0,
    createdDate: "20-07-2026",
    createdTime: "11:00 AM",
  },
];

interface EmployeeLeadProps {
  onBack?: () => void;
}

const EmployeeLead: React.FC<EmployeeLeadProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering
  const filteredData = dummyEmployeeLeads.filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.qNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.number.includes(searchTerm) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="dark:bg-dark-800 min-h-screen bg-white p-4 font-sans text-xs text-gray-800 md:p-6 dark:text-gray-100">
      {/* Top Header Section */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="dark:text-primary-400 text-lg font-bold text-[#003399]">
            Employee Lead
          </h1>
          <div className="dark:bg-primary-400 mt-1 h-[2px] w-12 bg-[#003399]"></div>
        </div>

      {/* Header Right Action Group */}
<div className="flex flex-wrap items-center gap-2">
  {/* Date Picker Range */}
  
   
    <DatePicker
      options={{
        mode: "range",
        dateFormat: "d-m-Y",
        defaultDate: ["2026-01-07", "2026-07-28"],
      }}
      placeholder="Select date range..."
      className="w-54"
    />


  {/* Export PDF */}
  <button
    title="Export PDF"
    className="dark:border-dark-500 dark:bg-dark-700 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-red-50 dark:hover:bg-red-900/20"
  >
    <FaFilePdf className="h-6 w-6 text-red-600 dark:text-red-400" />
  </button>

  {/* Export Excel */}
  <button
    title="Export Excel"
    className="dark:border-dark-500 dark:bg-dark-700 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
  >
    <FaFileExcel className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
  </button>

  {/* Refresh */}
  <button
    title="Refresh"
    className="dark:border-dark-500 dark:bg-dark-700 dark:hover:bg-dark-600 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
  >
    <RefreshCw className="h-6 w-6 text-gray-600 dark:text-gray-400" />
  </button>

  {/* Collapse */}
  <button
    title="Collapse"
    className="dark:border-dark-500 dark:bg-dark-700 dark:hover:bg-dark-600 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
  >
    <ChevronUp className="h-6 w-6 text-gray-600 dark:text-gray-400" />
  </button>

  {/* Back Button */}
  <button
    type="button"
    onClick={() => navigate("/dashboards/employee")}
    className="flex h-9 cursor-pointer items-center gap-1.5 rounded-md bg-primary-600 px-3 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
  >
    <ArrowLeft className="h-5 w-5" />
    <span>Back</span>
  </button>
</div>
       
      </div>

      {/* Search */}
      <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Employee Lead ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
          />
        </div>
      </div>

      {/* Main Table Card Container */}
      <div className="dark:border-dark-500 dark:bg-dark-700 rounded-md border border-gray-200/80 bg-white shadow-2xs">
        {/* Scrollable Table Area for 29 Columns */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="dark:bg-dark-600 bg-gray-500/20 text-gray-800 dark:text-gray-200">
              <tr className="dark:border-dark-500 border-b border-gray-200/80 font-bold whitespace-nowrap">
                <th className="px-3 py-2.5 text-center">SR NO.</th>
                <th className="px-3 py-2.5">Q. No</th>
                <th className="px-3 py-2.5">Customer Name</th>
                <th className="px-3 py-2.5">Number</th>
                <th className="px-3 py-2.5">City</th>
                <th className="px-3 py-2.5">Executive Name</th>
                <th className="px-3 py-2.5">Model</th>
                <th className="px-3 py-2.5">Variant</th>
                <th className="px-3 py-2.5">Colour</th>
                <th className="px-3 py-2.5">Purchase Date</th>
                <th className="px-3 py-2.5">Expected Delivery Date</th>
                <th className="px-3 py-2.5">Expected Delivery Time</th>
                <th className="px-3 py-2.5">Payment Type</th>
                <th className="px-3 py-2.5">Profession</th>
                <th className="px-3 py-2.5">Enquiry Type</th>
                <th className="px-3 py-2.5">Enquiry Source</th>
                <th className="px-3 py-2.5">Booking Date</th>
                <th className="px-3 py-2.5">Customer Rating</th>
                <th className="px-3 py-2.5">Follow-up Date</th>
                <th className="px-3 py-2.5">Enquiry Status</th>
                <th className="px-3 py-2.5 text-right">Total Amount</th>
                <th className="px-3 py-2.5 text-right">Advance Payment</th>
                <th className="px-3 py-2.5">Mode</th>
                <th className="px-3 py-2.5 text-right">Pending Amount</th>
                <th className="px-3 py-2.5">Chassis No</th>
                <th className="px-3 py-2.5">Lead Status</th>
                <th className="px-3 py-2.5 text-center">Q. R-Count</th>
                <th className="px-3 py-2.5">Created Date</th>
                <th className="px-3 py-2.5">Created Time</th>
              </tr>
            </thead>
            <tbody className="dark:divide-dark-600 divide-y divide-gray-100 text-gray-700 dark:text-gray-300">
              {currentData.map((item, idx) => (
                <tr
                  key={item.id}
                  className="dark:hover:bg-dark-600/50 whitespace-nowrap transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-3 py-2 text-center font-medium text-gray-500 dark:text-gray-400">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800 dark:text-gray-200">
                    {item.qNo}
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800 dark:text-gray-200">
                    {item.customerName}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.number}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.city}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.executiveName}
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800 uppercase dark:text-gray-200">
                    {item.model}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.variant}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.colour}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.purchaseDate}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.expectedDeliveryDate}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.expectedDeliveryTime}
                  </td>
                  <td className="px-3 py-2 font-semibold text-gray-800 dark:text-gray-200">
                    {item.paymentType}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.profession}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.enquiryType}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.enquirySource}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.bookingDate}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.customerRating}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.followUpDate}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.enquiryStatus}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">
                    ₹{item.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">
                    ₹{item.advancePayment.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.mode}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">
                    ₹{item.pendingAmount.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">
                    {item.chassisNo}
                  </td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                    {item.leadStatus}
                  </td>
                  <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">
                    {item.qRCount}
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">
                    {item.createdDate}
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">
                    {item.createdTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
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

export default EmployeeLead;
