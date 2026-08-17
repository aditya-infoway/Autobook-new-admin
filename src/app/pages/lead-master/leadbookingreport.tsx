import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentArrowDownIcon,
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  PrinterIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

// ─── STATIC DATA ────────────────────────────────────────────────────────────

const STATIC_BOOKINGS = [
  {
    id: 1,
    leadDate: "30-07-2026",
    qNo: "B/26-27/1001",
    dmsEnquiryNo: "ENQ/2026/0311",
    dmsEnquiryDate: "30-07-2026",
    customerName: "Jayant Meghnath Dhakul",
    contact: "9423025378",
    city: "Akola",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    bookingAmount: "5,000",
    createdBy: "Jaysingh",
  },
  {
    id: 2,
    leadDate: "30-07-2026",
    qNo: "B/26-27/1002",
    dmsEnquiryNo: "ENQ/2026/0310",
    dmsEnquiryDate: "30-07-2026",
    customerName: "Renuka Sudhakar Lad",
    contact: "8888811111",
    city: "Pune",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    bookingAmount: "10,000",
    createdBy: "Rakesh",
  },
  {
    id: 3,
    leadDate: "28-07-2026",
    qNo: "B/26-27/1003",
    dmsEnquiryNo: "ENQ/2026/0305",
    dmsEnquiryDate: "28-07-2026",
    customerName: "Sachin Tendulkar",
    contact: "9999988888",
    city: "Mumbai",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    bookingAmount: "15,000",
    createdBy: "Admin",
  },
];

const STATIC_MODELS = [
  { id: 1, name: "ACCESS 125" },
  { id: 2, name: "BURGMAN STREET" },
  { id: 3, name: "GIXXER SF" },
];

const STATIC_VARIANTS = [
  { id: 1, name: "DISC RC ABS", modelId: 1 },
  { id: 2, name: "DISC", modelId: 1 },
  { id: 3, name: "STANDARD", modelId: 2 },
  { id: 4, name: "SPORT", modelId: 3 },
];

const STATIC_COLOURS = [
  { id: 1, name: "Pearl Precious White", variantId: 1 },
  { id: 2, name: "Metallic Matte Black", variantId: 1 },
  { id: 3, name: "Pearl Grace White", variantId: 2 },
  { id: 4, name: "Metallic Blue", variantId: 3 },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function LeadBookingReport() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter Dropdowns
  const [filterModel, setFilterModel] = useState<any>(null);
  const [filterVariant, setFilterVariant] = useState<any>(null);
  const [filterColour, setFilterColour] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter logic based on search + 3 dropdowns
  const filteredData = STATIC_BOOKINGS.filter((booking) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchLower) ||
      booking.contact.includes(search) ||
      booking.qNo.toLowerCase().includes(searchLower) ||
      booking.dmsEnquiryNo.toLowerCase().includes(searchLower);

    const matchesModel = filterModel
      ? booking.model === filterModel.name
      : true;
    const matchesVariant = filterVariant
      ? booking.variant === filterVariant.name
      : true;
    const matchesColour = filterColour
      ? booking.colour === filterColour.name
      : true;

    return matchesSearch && matchesModel && matchesVariant && matchesColour;
  });

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Lead Booking Report
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage and track all booking records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Filter Button */}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-10 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              showFilters
                ? "border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
            {filterModel || filterVariant || filterColour ? (
              <span className="bg-primary-500 ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                {
                  [filterModel, filterVariant, filterColour].filter(Boolean)
                    .length
                }
              </span>
            ) : null}
          </button>

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
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
          >
            <ArrowPathIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-wrap items-end gap-4">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search by Name, Contact, Q.No..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
          />
        </div>
      </div>
     {/* Filter Dropdowns - Collapsible */}
{showFilters && (
  <div className="flex flex-wrap items-end gap-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
    <div className="flex-1 min-w-[200px]">
      <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
        Model
      </label>
      <Combobox
        data={STATIC_MODELS}
        displayField="name"
        value={filterModel}
        onChange={(val: any) => {
          setFilterModel(val);
          setCurrentPage(1);
        }}
        placeholder="All Models"
        searchFields={["name"]}
      />
    </div>
    <div className="flex-1 min-w-[200px]">
      <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
        Variant
      </label>
      <Combobox
        data={STATIC_VARIANTS}
        displayField="name"
        value={filterVariant}
        onChange={(val: any) => {
          setFilterVariant(val);
          setCurrentPage(1);
        }}
        placeholder="All Variants"
        searchFields={["name"]}
      />
    </div>
    <div className="flex-1 min-w-[200px]">
      <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
        Colour
      </label>
      <Combobox
        data={STATIC_COLOURS}
        displayField="name"
        value={filterColour}
        onChange={(val: any) => {
          setFilterColour(val);
          setCurrentPage(1);
        }}
        placeholder="All Colours"
        searchFields={["name"]}
      />
    </div>
  
  </div>
)}
      {/* Table Card */}
      <div className="dark:border-dark-700 dark:bg-dark-800 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1400px]">
            <THead className="dark:border-dark-600 dark:bg-dark-700/60 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-8 text-center text-[11px]">#</Th>
                <Th className="min-w-[100px] text-[11px]">Lead Date</Th>
                <Th className="min-w-[120px] text-[11px]">Q. No</Th>
                <Th className="min-w-[140px] text-[11px]">DMS Enquiry No</Th>
                <Th className="min-w-[120px] text-[11px]">DMS Enquiry Date</Th>
                <Th className="min-w-[180px] text-[11px]">Customer Name</Th>
                <Th className="min-w-[120px] text-[11px]">Contact</Th>
                <Th className="min-w-[120px] text-[11px]">City</Th>
                <Th className="min-w-[140px] text-[11px]">Model</Th>
                <Th className="min-w-[140px] text-[11px]">Variant</Th>
                <Th className="min-w-[140px] text-[11px]">Colour</Th>
                <Th className="min-w-[120px] text-right text-[11px]">
                  Booking Amount
                </Th>
                <Th className="min-w-[120px] text-[11px]">Created By</Th>
                <Th className="min-w-[100px] text-center text-[11px]">
                  Booking Print
                </Th>
              </Tr>
            </THead>
            <TBody>
              {currentItems.map((booking, idx) => (
                <Tr
                  key={booking.id}
                  className="dark:border-dark-700 border-b align-middle"
                >
                  <Td className="px-2 py-3 text-center text-[11px] font-medium">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {booking.leadDate}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {booking.qNo}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {booking.dmsEnquiryNo}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {booking.dmsEnquiryDate}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {booking.customerName}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {booking.contact}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {booking.city}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {booking.model}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {booking.variant}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {booking.colour}
                  </Td>
                  <Td className="px-2 py-3 text-right text-[12px] font-medium text-gray-900 dark:text-white">
                    ₹{booking.bookingAmount}
                  </Td>
                  <Td className="px-2 py-3 text-[12px] text-gray-600 dark:text-gray-400">
                    {booking.createdBy}
                  </Td>
                  <Td className="px-2 py-3 text-center">
                    <button
                      className="inline-flex items-center gap-1 rounded-md border border-blue-500 px-2 py-1 text-[11px] font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      onClick={() =>
                        console.log(`Printing booking ${booking.qNo}`)
                      }
                    >
                      <PrinterIcon className="size-3.5" />
                      Print
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={14} className="py-12 text-center text-gray-400">
                    No booking records found
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        {totalItems > 0 && (
          <div className="dark:border-dark-700 dark:bg-dark-800 flex flex-col gap-4 rounded-b-xl border-t border-gray-200 bg-white px-4 py-4 md:flex-row md:items-center">
            <div className="order-1 flex items-center justify-center gap-2 text-sm text-gray-600 md:w-1/3 md:justify-start dark:text-gray-400">
              <span>Show</span>
              <div className="w-20">
                <Menu
                  as="div"
                  className="relative inline-block w-full text-left"
                >
                  <MenuButton className="dark:border-dark-600 dark:bg-dark-700 flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none dark:text-gray-200">
                    <span>{itemsPerPage}</span>
                    <svg
                      className="ml-2 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                      anchor="top start"
                      className="dark:bg-dark-700 dark:border-dark-600 z-200 w-20 space-y-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-xl ring-1 ring-black/5 [--anchor-gap:6px] focus:outline-none"
                    >
                      {[10, 20, 30, 40, 50, 100].map((opt) => (
                        <MenuItem key={opt}>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => {
                                setItemsPerPage(opt);
                                setCurrentPage(1);
                              }}
                              className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium ${
                                opt === itemsPerPage
                                  ? "bg-primary-500 text-white"
                                  : active
                                    ? "dark:bg-dark-600 bg-gray-100 text-gray-900 dark:text-white"
                                    : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {opt}
                              {opt === itemsPerPage && (
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
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
                {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                {totalItems} entries
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
