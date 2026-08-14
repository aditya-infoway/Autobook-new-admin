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

const STATIC_BIRTHDAYS = [
  {
    id: 1,
    accountName: "Jayant Meghnath Dhakul",
    group: "Sundry Debtors",
    city: "Akola",
    taluka: "Akola",
    district: "Akola",
    state: "Maharashtra",
    pinCode: "444001",
    mobileNo: "9423025378",
    birthDate: "15-08-1985",
    panCardNo: "ABCDE1234F",
    adharCardNo: "1234 5678 9012",
  },
  {
    id: 2,
    accountName: "Renuka Sudhakar Lad",
    group: "Sundry Debtors",
    city: "Pune",
    taluka: "Haveli",
    district: "Pune",
    state: "Maharashtra",
    pinCode: "411001",
    mobileNo: "8888811111",
    birthDate: "22-05-1990",
    panCardNo: "FGHIJ5678K",
    adharCardNo: "2345 6789 0123",
  },
  {
    id: 3,
    accountName: "Sachin Tendulkar",
    group: "Sundry Debtors",
    city: "Mumbai",
    taluka: "Mumbai City",
    district: "Mumbai City",
    state: "Maharashtra",
    pinCode: "400001",
    mobileNo: "9999988888",
    birthDate: "24-04-1973",
    panCardNo: "KLMNO9012P",
    adharCardNo: "3456 7890 1234",
  },
  {
    id: 4,
    accountName: "Amit Kumar",
    group: "Sundry Debtors",
    city: "Nagpur",
    taluka: "Nagpur",
    district: "Nagpur",
    state: "Maharashtra",
    pinCode: "440001",
    mobileNo: "9876543210",
    birthDate: "10-01-1995",
    panCardNo: "QRSTU3456V",
    adharCardNo: "4567 8901 2345",
  },
  {
    id: 5,
    accountName: "Priya Sharma",
    group: "Sundry Debtors",
    city: "Nashik",
    taluka: "Nashik",
    district: "Nashik",
    state: "Maharashtra",
    pinCode: "422001",
    mobileNo: "8765432109",
    birthDate: "05-03-1988",
    panCardNo: "WXYZA7890B",
    adharCardNo: "5678 9012 3456",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function BirthdayReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_BIRTHDAYS.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.accountName.toLowerCase().includes(searchLower) ||
      item.mobileNo.includes(search) ||
      item.city.toLowerCase().includes(searchLower) ||
      item.district.toLowerCase().includes(searchLower) ||
      item.state.toLowerCase().includes(searchLower)
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
            Birthday Report
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View customer birthday and personal details
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
          placeholder="Search by name, mobile, or city..."
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
          <Table className="w-full min-w-[1400px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                <Th className="text-[11px]">ACCOUNT NAME</Th>
                <Th className="text-[11px]">GROUP</Th>
                <Th className="text-[11px]">CITY</Th>
                <Th className="text-[11px]">TALUKA</Th>
                <Th className="text-[11px]">DISTRICT</Th>
                <Th className="text-[11px]">STATE</Th>
                <Th className="text-[11px]">PIN CODE</Th>
                <Th className="text-[11px]">MOBILE NO.</Th>
                <Th className="text-[11px]">BIRTH DATE</Th>
                <Th className="text-[11px]">PAN CARD NO.</Th>
                <Th className="text-[11px]">ADHAR CARD NO.</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-[12px] text-gray-500 text-center font-medium">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.accountName}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.group}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.city}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.taluka}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.district}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.state}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.pinCode}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.mobileNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.birthDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.panCardNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.adharCardNo}</Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={12} className="py-12 text-center text-gray-400 dark:text-gray-500">
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