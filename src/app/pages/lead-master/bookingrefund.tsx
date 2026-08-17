import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

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
    createdBy: "Jaysingh",
    ageLead: "15 Days",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    rCount: "1",
    receivedAmount: "5,000",
  },
  {
    id: 2,
    leadDate: "29-07-2026",
    qNo: "B/26-27/1002",
    dmsEnquiryNo: "ENQ/2026/0310",
    dmsEnquiryDate: "29-07-2026",
    customerName: "Renuka Sudhakar Lad",
    contact: "8888811111",
    city: "Pune",
    createdBy: "Rakesh",
    ageLead: "5 Days",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    rCount: "2",
    receivedAmount: "10,000",
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
    createdBy: "Admin",
    ageLead: "30 Days",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    rCount: "0",
    receivedAmount: "15,000",
  },
];

const STATIC_ACCOUNTS = [
  { id: 1, name: "Cash Account" },
  { id: 2, name: "HDFC Bank" },
  { id: 3, name: "ICICI Bank" },
];

const STATIC_OPP_ACCOUNTS = [
  { id: 1, name: "Customer A" },
  { id: 2, name: "Customer B" },
  { id: 3, name: "Partner X" },
];

// ─── REFUND DRAWER COMPONENT ────────────────────────────────────────────────

// ─── REFUND DRAWER COMPONENT ────────────────────────────────────────────────

function RefundDrawer({
  isOpen,
  onClose,
  booking,
}: {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}) {
  const [paymentMode, setPaymentMode] = useState<"CASH" | "BANK">("CASH");
  const [bankMode, setBankMode] = useState<string>("NEFT");
  const [showChequeFields, setShowChequeFields] = useState(false);

  const handleBankModeChange = (mode: string) => {
    setBankMode(mode);
    setShowChequeFields(mode === "CHEQUE");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 dark:bg-black/60" />
        </Transition.Child>

        {/* Right Slide Panel Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-full transform transition-all duration-300 md:max-w-lg">
                  <div className="flex h-full max-h-screen flex-col bg-white shadow-xl dark:bg-gray-800">
                    {/* Header - Fixed */}
                    <div className="bg-primary-600 flex flex-shrink-0 items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700">
                      <DialogTitle className="text-base leading-6 font-semibold text-white dark:text-white">
                        Refund Booking #{booking?.qNo}
                      </DialogTitle>
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-primary-400 relative rounded-md bg-white hover:text-gray-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Body Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                      <div className="space-y-4">
                        {/* Payment Mode */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Payment Mode
                          </label>
                          <div className="mt-1 flex items-center gap-6">
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name="paymentMode"
                                value="CASH"
                                checked={paymentMode === "CASH"}
                                onChange={() => setPaymentMode("CASH")}
                                className="accent-blue-600"
                              />
                              CASH
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name="paymentMode"
                                value="BANK"
                                checked={paymentMode === "BANK"}
                                onChange={() => setPaymentMode("BANK")}
                                className="accent-blue-600"
                              />
                              BANK
                            </label>
                          </div>
                        </div>

                        {/* Select Account & Date */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Select Account
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_ACCOUNTS}
                                displayField="name"
                                placeholder="Select Account"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Date
                            </label>
                            <DatePicker
                              value=""
                              onChange={() => {}}
                              placeholder="DD-MM-YYYY"
                              options={{
                                dateFormat: "d-m-Y",
                                disableMobile: true,
                              }}
                            />
                          </div>
                        </div>

                        {/* Dotted Border for Opp. Account & Amount */}
                        <div className="space-y-4 rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-600">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Opp. Account
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_OPP_ACCOUNTS}
                                displayField="name"
                                placeholder="Search Opp. Account"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Amount
                            </label>
                            <input
                              type="number"
                              placeholder="Enter Amount"
                              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                            />
                          </div>
                        </div>

                        {/* Conditional Bank Mode Fields */}
                        {paymentMode === "BANK" && (
                          <div className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mode
                              </label>
                              <div className="mt-1 flex flex-wrap gap-4">
                                {["NEFT", "RTGS", "IMPS", "CHEQUE", "UPI"].map(
                                  (mode) => (
                                    <label
                                      key={mode}
                                      className="flex cursor-pointer items-center gap-2 text-sm"
                                    >
                                      <input
                                        type="radio"
                                        name="bankMode"
                                        value={mode}
                                        checked={bankMode === mode}
                                        onChange={() =>
                                          handleBankModeChange(mode)
                                        }
                                        className="accent-blue-600"
                                      />
                                      {mode}
                                    </label>
                                  ),
                                )}
                              </div>
                            </div>

                            {/* Conditional Cheque Fields */}
                            {showChequeFields && (
                              <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Cheque No.
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Enter Cheque No"
                                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Cheque Date
                                    </label>
                                    <DatePicker
                                      value=""
                                      onChange={() => {}}
                                      placeholder="DD-MM-YYYY"
                                      options={{
                                        dateFormat: "d-m-Y",
                                        disableMobile: true,
                                      }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cheque Clear Date
                                  </label>
                                  <DatePicker
                                    value=""
                                    onChange={() => {}}
                                    placeholder="DD-MM-YYYY"
                                    options={{
                                      dateFormat: "d-m-Y",
                                      disableMobile: true,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Narration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Narration
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Enter narration..."
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions - Fixed */}
                    <div className="flex flex-shrink-0 gap-2 border-t border-gray-200 px-4 py-4 sm:justify-end sm:gap-3 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:min-w-[120px] sm:flex-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Refund submitted");
                          onClose();
                        }}
                        className="bg-primary-600 hover:bg-primary-700 flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white sm:min-w-[120px] sm:flex-none"
                      >
                        Submit Refund
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function BookingRefund() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleActionClick = (booking: any) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleViewHistory = (item: any) => {
    navigate(`/accounting-master/booking/paymenthistory/${item.id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_BOOKINGS.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.qNo.toLowerCase().includes(searchLower) ||
      item.customerName.toLowerCase().includes(searchLower) ||
      item.contact.includes(search) ||
      item.dmsEnquiryNo.toLowerCase().includes(searchLower)
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
            Booking Refund
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage refunds for booking payments
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
          placeholder="Search refunds..."
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

                <Th className="text-[11px]">SR NO</Th>
                <Th className="text-[11px]">Lead Date</Th>
                <Th className="text-[11px]">Q. No</Th>
                <Th className="text-[11px]">DMS Enquiry No</Th>
                <Th className="text-[11px]">DMS Enquiry Date</Th>
                <Th className="text-[11px]">Customer Name</Th>
                <Th className="text-[11px]">Contact</Th>
                <Th className="text-[11px]">City</Th>
                <Th className="text-[11px]">Created by</Th>
                <Th className="text-[11px]">Age Lead</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px]">R-Count</Th>
                <Th className="text-right text-[11px]">Received Amount</Th>
                <Th className="text-[11px]">Payment History</Th>
                <Th className="w-14 text-center text-[11px]">Action</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr
                  key={item.id}
                  className="dark:hover:bg-dark-700/40 align-middle transition-colors hover:bg-gray-50/30"
                >
                  <Td className="px-1 py-2 text-center align-middle text-[11px] font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.leadDate}
                  </Td>
                  <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.qNo}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.dmsEnquiryNo}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.dmsEnquiryDate}
                  </Td>
                  <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.customerName}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.contact}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.city}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.createdBy}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.ageLead}
                  </Td>
                  <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.model}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.variant}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.colour}
                  </Td>
                  <Td className="py-4 text-center text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.rCount}
                  </Td>
                  <Td className="py-4 text-right text-[12px] font-medium text-gray-900 dark:text-white">
                    ₹{item.receivedAmount}
                  </Td>
                  <Td className="py-4 text-center">
                    <button
                      onClick={() => handleViewHistory(item)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="View Payment History"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>
                  <Td className="py-4 text-center">
                    <button
                      onClick={() => handleActionClick(item)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Refund"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={16}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No refund records found
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

      {/* Refund Drawer */}
      <RefundDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
}
