import React, { useState, Fragment } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PrinterIcon,
  FunnelIcon,
  ArrowPathIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Combobox } from "@/components/shared/form/Combobox";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_CASH_PAYMENTS = [
  {
    id: 1,
    date: "31-07-2026",
    voucherNo: "CP/26-27/081",
    type: "RFCP",
    cashAccount: "CASH ACCOUNT",
    oppAccount: "Neha Devidas Redkar",
    amount: "2000",
    narration: "Payment for accessories",
    createdType: "Super Admin",
    createdBy: "Shri Vinayak Suzuki",
  },
  {
    id: 2,
    date: "31-07-2026",
    voucherNo: "CP/26-27/079",
    type: "RFCP",
    cashAccount: "CASH ACCOUNT",
    oppAccount: "Ankita Shaba Kamble",
    amount: "2000",
    narration: "Advance payment",
    createdType: "Super Admin",
    createdBy: "Shri Vinayak Suzuki",
  },
  {
    id: 3,
    date: "31-07-2026",
    voucherNo: "CP/26-27/078",
    type: "RFCP",
    cashAccount: "CASH ACCOUNT",
    oppAccount: "Nazia Shafi Shaikh",
    amount: "2000",
    narration: "Partial payment",
    createdType: "Super Admin",
    createdBy: "Shri Vinayak Suzuki",
  },
];

const STATIC_CASH_ACCOUNTS = [
  { id: 1, name: "CASH ACCOUNT" },
  { id: 2, name: "PETTY CASH" },
];

const STATIC_OPP_ACCOUNTS = [
  { id: 1, name: "Neha Devidas Redkar" },
  { id: 2, name: "Ankita Shaba Kamble" },
  { id: 3, name: "Nazia Shafi Shaikh" },
];

// ─── ADD CASH PAYMENT DRAWER ──────────────────────────────────────────────

function AddCashPaymentDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Default to "Manual"
  const [mode, setMode] = useState<"Manual" | "Lead Cancel">("Manual");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                <DialogPanel className="pointer-events-auto w-screen max-w-full transform transition-all duration-300 md:max-w-2xl">
                  <div className="flex h-full max-h-screen flex-col bg-white shadow-xl dark:bg-gray-800">
                    
                    {/* Header - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex items-center justify-between bg-primary-600 px-4 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Add Cash Payment
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="rounded-full p-1 text-white/80 transition hover:text-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Body Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                      <div className="space-y-5">
                        {/* Row 1: Radio & Lead No */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-center gap-6">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="radio"
                                name="mode"
                                value="Manual"
                                checked={mode === "Manual"}
                                onChange={() => setMode("Manual")}
                                className="accent-primary-500"
                              />
                              Manual
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <input
                                type="radio"
                                name="mode"
                                value="Lead Cancel"
                                checked={mode === "Lead Cancel"}
                                onChange={() => setMode("Lead Cancel")}
                                className="accent-primary-500"
                              />
                              Lead Cancel
                            </label>
                          </div>

                          {/* Lead No (Right side) */}
                          {mode === "Lead Cancel" && (
                            <div className="w-full sm:w-56">
                              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Lead No.
                              </label>
                              <select className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                <option>Select</option>
                                <option>Lead 1</option>
                                <option>Lead 2</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Row 2: Cash Account | Voucher No | Date */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Cash Account <span className="text-red-500">*</span>
                            </label>
                            <Combobox
                              data={STATIC_CASH_ACCOUNTS}
                              displayField="name"
                              placeholder="Select Cash Account"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Voucher No.
                            </label>
                            <Input
                              type="text"
                              defaultValue="CP/26-27/081"
                              readOnly
                              className="w-full bg-gray-50 dark:bg-gray-700/50"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Date
                            </label>
                            <DatePicker
                              value="31-07-2026"
                              onChange={() => {}}
                              placeholder="DD-MM-YYYY"
                              options={{
                                dateFormat: "d-m-Y",
                                disableMobile: true,
                              }}
                            />
                          </div>
                        </div>

                        {/* Dotted Box: Opp Account + Amount */}
                        <div className="mt-2 border-t-2 border-dotted border-primary-400 pt-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <div className="flex items-center justify-between">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Opp. Account{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                                  Balance : 0
                                </span>
                              </div>
                              <Combobox
                                data={STATIC_OPP_ACCOUNTS}
                                displayField="name"
                                placeholder="Select Opp. Account"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Amount <span className="text-red-500">*</span>
                              </label>
                              <Input
                                type="text"
                                placeholder="Amount"
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Narration */}
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Narration <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter Narration"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex gap-2 border-t border-gray-300 px-4 py-4 dark:border-gray-700 sm:justify-end sm:gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-primary-400 bg-white px-4 py-2.5 text-sm font-medium text-primary-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:flex-none sm:min-w-[120px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert("Cash Payment Added!");
                          onClose();
                        }}
                        className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700 sm:flex-none sm:min-w-[120px]"
                      >
                        Add Cash Payment
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

export default function CashPayment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handlePrint = (id: number) => {
    console.log(`Printing voucher ${id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_CASH_PAYMENTS.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.voucherNo.toLowerCase().includes(searchLower) ||
      item.cashAccount.toLowerCase().includes(searchLower) ||
      item.oppAccount.toLowerCase().includes(searchLower) ||
      item.narration.toLowerCase().includes(searchLower)
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
           Cash Payment Register
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all cash payment entries
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

  {/* Add Cash Payment */}
  <button
    onClick={() => setIsDrawerOpen(true)}
    className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition"
  >
    <PlusIcon className="h-4 w-4" />
    Add Cash Payment
  </button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by voucher, account or narration..."
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
          <Table className="w-full min-w-[1000px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                <Th className="text-[11px]">Date</Th>
                <Th className="text-[11px]">Voucher No.</Th>
                <Th className="text-[11px]">Type</Th>
                <Th className="text-[11px]">Cash Account</Th>
                <Th className="text-[11px]">Opp. Account</Th>
                <Th className="text-right text-[11px]">Amount</Th>
                <Th className="text-[11px]">Narration</Th>
                <Th className="text-[11px]">Created Type</Th>
                <Th className="text-[11px]">Created By</Th>
                <Th className="w-16 text-center text-[11px]">Action</Th>
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
                    {item.date}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.voucherNo}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.type}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.cashAccount}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.oppAccount}
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-semibold text-gray-900 dark:text-white">
                    ₹{item.amount}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.narration}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.createdType}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.createdBy}
                  </Td>

                  {/* Action Column - Print Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handlePrint(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                      title="Print"
                    >
                      <PrinterIcon className="h-4 w-4" />
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={11}
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

      {/* Add Cash Payment Drawer */}
      <AddCashPaymentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
