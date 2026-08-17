import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_DUE_INSURANCE = [
  {
    id: 1,
    quotationNo: "Q/26-27/1001",
    dmsEnquiryNo: "ENQ/2026/0311",
    dmsEnquiryDate: "30-07-2026",
    customerName: "Jayant Meghnath Dhakul",
    contactNo: "9423025378",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    createdBy: "Jaysingh",
    chassisNo: "MB8A1B2C3D4E5F678",
    insuranceAmt: "5,200",
    policyNo: "POL-2026-001",
    nomineeName: "Smt. Meghnath Dhakul",
    nomineeDOB: "15-08-1960",
    relationWithNominee: "Mother",
    insuranceType: "Comprehensive",
    insuranceCompany: "ICICI Lombard",
    validity: "30-07-2027",
  },
  {
    id: 2,
    quotationNo: "Q/26-27/1002",
    dmsEnquiryNo: "ENQ/2026/0310",
    dmsEnquiryDate: "29-07-2026",
    customerName: "Renuka Sudhakar Lad",
    contactNo: "8888811111",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    createdBy: "Rakesh",
    chassisNo: "MB8A9Z8Y7X6W5V4U3",
    insuranceAmt: "5,000",
    policyNo: "POL-2026-002",
    nomineeName: "Sudhakar Lad",
    nomineeDOB: "10-05-1965",
    relationWithNominee: "Father",
    insuranceType: "Third Party",
    insuranceCompany: "HDFC ERGO",
    validity: "29-07-2027",
  },
  {
    id: 3,
    quotationNo: "Q/26-27/1003",
    dmsEnquiryNo: "ENQ/2026/0305",
    dmsEnquiryDate: "28-07-2026",
    customerName: "Sachin Tendulkar",
    contactNo: "9999988888",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    createdBy: "Admin",
    chassisNo: "MB8A1A2B3C4D5E6F7",
    insuranceAmt: "6,500",
    policyNo: "POL-2026-003",
    nomineeName: "Anjali Tendulkar",
    nomineeDOB: "20-12-1970",
    relationWithNominee: "Wife",
    insuranceType: "Comprehensive",
    insuranceCompany: "Bajaj Allianz",
    validity: "28-07-2027",
  },
  {
    id: 4,
    quotationNo: "Q/26-27/1004",
    dmsEnquiryNo: "ENQ/2026/0298",
    dmsEnquiryDate: "25-07-2026",
    customerName: "Amit Kumar",
    contactNo: "9876543210",
    model: "GIXXER SF",
    variant: "SPORT",
    colour: "Metallic Red",
    createdBy: "Admin",
    chassisNo: "MB8A1G2H3I4J5K6L7",
    insuranceAmt: "4,800",
    policyNo: "POL-2026-004",
    nomineeName: "Priya Kumar",
    nomineeDOB: "05-03-1985",
    relationWithNominee: "Spouse",
    insuranceType: "Comprehensive",
    insuranceCompany: "SBI General",
    validity: "25-07-2027",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function DueInsurance() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_DUE_INSURANCE.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.customerName.toLowerCase().includes(searchLower) ||
      item.contactNo.includes(search) ||
      item.quotationNo.toLowerCase().includes(searchLower) ||
      item.dmsEnquiryNo.toLowerCase().includes(searchLower) ||
      item.chassisNo.toLowerCase().includes(searchLower) ||
      item.policyNo.toLowerCase().includes(searchLower)
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
            Due Insurance
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Track insurance policies due for renewal
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
          placeholder="Search by customer, quotation, or policy..."
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
          <Table className="w-full min-w-[1800px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">Quotation No</Th>
                <Th className="text-[11px]">DMS Enquiry No</Th>
                <Th className="text-[11px]">DMS Enquiry Date</Th>
                <Th className="text-[11px]">Customer Name</Th>
                <Th className="text-[11px]">Contact No</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px]">Created By</Th>
                <Th className="text-[11px]">Chassis No</Th>
                <Th className="text-[11px] text-right">Insurance Amt</Th>
                <Th className="text-[11px]">Policy No</Th>
                <Th className="text-[11px]">Nominee Name</Th>
                <Th className="text-[11px]">Nominee DOB</Th>
                <Th className="text-[11px]">Relation with Nominee</Th>
                <Th className="text-[11px]">Insurance Type</Th>
                <Th className="text-[11px]">Insurance Company</Th>
                <Th className="text-[11px]">Validity</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-[12px] text-gray-500 text-center font-medium">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.quotationNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.dmsEnquiryNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.dmsEnquiryDate}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.customerName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.contactNo}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.model}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.variant}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.colour}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.createdBy}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.chassisNo}</Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    ₹{item.insuranceAmt}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.policyNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.nomineeName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.nomineeDOB}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.relationWithNominee}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.insuranceType}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.insuranceCompany}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.validity}</Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={19} className="py-12 text-center text-gray-400 dark:text-gray-500">
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
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="dark:hover:bg-dark-700 inline-flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400"
                >
                  <ChevronLeftIcon className="size-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
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