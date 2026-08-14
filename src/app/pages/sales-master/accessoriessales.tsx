import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  FunnelIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_ACCESSORIES_SALES = [
  {
    id: 1,
    vslNo: "SPVSL0001",
    vslDate: "31-03-2026",
    customerName: "Jitesh Vinayak Salgaonkar",
    mobileNo: "9168904044",
    model: "BURGMAN STREET",
    variant: "BURGMAN R CONNECTED",
    colour: "PRL.MAT SHADOW GREEN-QUS",
    chassisNo: "MB8EN11AGT8D47657",
    totalProfit: "850.00",
    invoiceNo: "I/26-27/001",
    invoiceDate: "01-04-2026",
    createdBy: "Rohit Parab",
    createdType: "Super Admin",
  },
  {
    id: 2,
    vslNo: "SPVSL0002",
    vslDate: "30-03-2026",
    customerName: "Renuka Sudhakar Lad",
    mobileNo: "8888811111",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    chassisNo: "MB8A9Z8Y7X6W5V4U3",
    totalProfit: "450.00",
    invoiceNo: "I/26-27/002",
    invoiceDate: "02-04-2026",
    createdBy: "Rakesh",
    createdType: "Super Admin",
  },
  {
    id: 3,
    vslNo: "SPVSL0003",
    vslDate: "29-03-2026",
    customerName: "Sachin Tendulkar",
    mobileNo: "9999988888",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    chassisNo: "MB8A1A2B3C4D5E6F7",
    totalProfit: "1,200.00",
    invoiceNo: "I/26-27/003",
    invoiceDate: "03-04-2026",
    createdBy: "Admin",
    createdType: "Cashier",
  },
  {
    id: 4,
    vslNo: "SPVSL0004",
    vslDate: "28-03-2026",
    customerName: "Amit Kumar",
    mobileNo: "9876543210",
    model: "GIXXER SF",
    variant: "SPORT",
    colour: "Metallic Red",
    chassisNo: "MB8A1G2H3I4J5K6L7",
    totalProfit: "620.00",
    invoiceNo: "I/26-27/004",
    invoiceDate: "04-04-2026",
    createdBy: "Admin",
    createdType: "Super Admin",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function AccessoriesSales() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleViewInvoice = (id: number) => {
    console.log(`Viewing invoice for ID ${id}`);
    // navigate(`/accessories-sales/invoice/${id}`);
  };

  const handleEdit = (item: any) => {
    console.log("Editing record:", item);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting record ${id}`);
  };

  // ─── FILTER & PAGINATION ─────────────────────────────────────────────────

  const filteredData = STATIC_ACCESSORIES_SALES.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.customerName.toLowerCase().includes(searchLower) ||
      item.mobileNo.includes(search) ||
      item.vslNo.toLowerCase().includes(searchLower) ||
      item.invoiceNo.toLowerCase().includes(searchLower) ||
      item.chassisNo.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // ─── PAGINATION HELPERS ──────────────────────────────────────────────────

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
            Accessories Sales
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage accessories sales records
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
        </div>{" "}
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by customer, VSL, or invoice..."
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
                <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">VSL No</Th>
                <Th className="text-[11px]">VSL Date</Th>
                <Th className="text-[11px]">Customer Name</Th>
                <Th className="text-[11px]">Mobile No</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px]">Chassis No</Th>
                <Th className="text-right text-[11px]">Total Profit</Th>
                <Th className="text-[11px]">Invoice No</Th>
                <Th className="text-[11px]">Invoice Date</Th>
                <Th className="w-20 text-center text-[11px]">Action</Th>
                <Th className="text-center text-[11px]">Invoice</Th>
                <Th className="text-[11px]">Created By</Th>
                <Th className="text-[11px]">Created Type</Th>
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
                    {item.vslNo}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.vslDate}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.customerName}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.mobileNo}
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
                    {item.chassisNo}
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-semibold text-gray-900 dark:text-white">
                    ₹{item.totalProfit}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.invoiceNo}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.invoiceDate}
                  </Td>

                  {/* Action Column - Dropdown Menu */}
                  <Td className="py-3 text-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <MenuButton className="dark:hover:bg-dark-600 dark:text-dark-200 inline-flex size-7 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100">
                        <EllipsisHorizontalIcon className="size-5" />
                      </MenuButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems
                          anchor="bottom end"
                          className="dark:bg-dark-800 dark:ring-dark-500 dark:border-dark-500 z-[100] w-36 rounded-lg border border-gray-100 bg-white p-1 shadow-lg ring-1 ring-black/5 [--anchor-gap:4px] focus:outline-none"
                        >
                          <MenuItem>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                className={`${
                                  active
                                    ? "dark:bg-dark-600 text-primary-600 bg-gray-50 dark:text-white"
                                    : "dark:text-dark-200 text-gray-700"
                                } flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium`}
                              >
                                <PencilSquareIcon className="size-4" />
                                Edit
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className={`${
                                  active
                                    ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                                    : "dark:text-dark-200 text-gray-700"
                                } flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium`}
                              >
                                <TrashIcon className="size-4" />
                                Delete
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </Td>

                  {/* Invoice Column - View Button */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleViewInvoice(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="View Invoice"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>

                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.createdBy}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.createdType}
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
