import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  FunnelIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Listbox } from "@/components/shared/form/StyledListbox";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_LEDGER = [
  {
    id: 1,
    accountName: "875 ANGANEWADI BAMBARDE TARF KALSULI VETAL BAMBARDE 416520",
    group: "Sundry Debtors",
    address: "Bambarde, Kalsuli",
    city: "Kolhapur",
    state: "Maharashtra",
    closingBalance: "0.00 Dr",
  },
  {
    id: 2,
    accountName: "Shri Vinayak Suzuki",
    group: "Sundry Creditors",
    address: "Main Road, Akola",
    city: "Akola",
    state: "Maharashtra",
    closingBalance: "1,25,000.00 Cr",
  },
  {
    id: 3,
    accountName: "Neha Devidas Redkar",
    group: "Sundry Debtors",
    address: "Gandhi Nagar, Pune",
    city: "Pune",
    state: "Maharashtra",
    closingBalance: "5,000.00 Dr",
  },
  {
    id: 4,
    accountName: "Ankita Shaba Kamble",
    group: "Sundry Debtors",
    address: "Shivaji Peth, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    closingBalance: "2,500.00 Dr",
  },
];

const displayTypes = [
  { value: "All", label: "All Transactions" },
  { value: "Summary", label: "Summary Only" },
  { value: "Detailed", label: "Detailed View" },
];

// ─── LEDGER REPORT MODEL (DRAWER) ─────────────────────────────────────────

function LedgerReportDrawer({
  isOpen,
  onClose,
  accountName,
}: {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
}) {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [displayType, setDisplayType] = useState("All");

  const handleOk = () => {
    // Navigate to the detail page with query params
    navigate(`/accounting-master/ledger/ledgerdetail`);
    onClose();
  };

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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition-all duration-300">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-gray-800">
                    
                    {/* Header (Primary Theme) */}
                    <div className="flex items-center justify-between bg-primary-500 px-5 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Ledger Report
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="rounded-full p-1 text-white/80 transition hover:text-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Body Content */}
                    <div className="flex-1 p-6 space-y-5">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Account: <span className="font-semibold text-gray-900 dark:text-white">{accountName}</span>
                      </p>

                      {/* From Date */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          From Date <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                          value={fromDate}
                          onChange={(dates: Date[]) => {
                            const val = dates[0];
                            setFromDate(val?.toISOString().split("T")[0] || "");
                          }}
                          placeholder="DD-MM-YYYY"
                          options={{ dateFormat: "d-m-Y", disableMobile: true }}
                        />
                      </div>

                      {/* To Date */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          To Date <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                          value={toDate}
                          onChange={(dates: Date[]) => {
                            const val = dates[0];
                            setToDate(val?.toISOString().split("T")[0] || "");
                          }}
                          placeholder="DD-MM-YYYY"
                          options={{ dateFormat: "d-m-Y", disableMobile: true }}
                        />
                      </div>

                      {/* Display Type */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Display Type <span className="text-red-500">*</span>
                        </label>
                        <Listbox
                          data={displayTypes}
                          value={displayTypes.find((t) => t.value === displayType) || displayTypes[0]}
                          onChange={(val: any) => setDisplayType(val.value)}
                          displayField="label"
                        />
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleOk}
                        className="rounded-lg bg-primary-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-600"
                      >
                        OK
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

export default function LedgerReport() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleView = (account: any) => {
    setSelectedAccount(account.accountName);
    setIsDrawerOpen(true);
  };
  

  // Filter and Pagination Logic
  const filteredData = STATIC_LEDGER.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.accountName.toLowerCase().includes(searchLower) ||
      item.group.toLowerCase().includes(searchLower) ||
      item.city.toLowerCase().includes(searchLower) ||
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
            Ledger Report
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View account-wise ledger details
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
          placeholder="Search by account, group, or city..."
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
          <Table className="w-full min-w-[800px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">Account Name</Th>
                <Th className="text-[11px]">Group</Th>
                <Th className="text-[11px]">Address</Th>
                <Th className="text-[11px]">City</Th>
                <Th className="text-[11px]">State</Th>
                <Th className="text-[11px] text-right">Closing Balance</Th>
                <Th className="w-24 text-center text-[11px]">Action</Th>
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
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.address}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.city}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.state}</Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    {item.closingBalance}
                  </Td>
                  
                  {/* Action Column - View Button */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView(item)}
                      className="inline-flex items-center gap-1 rounded-md border border-blue-500 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      <EyeIcon className="h-3.5 w-3.5" />
                      View
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={8} className="py-12 text-center text-gray-400 dark:text-gray-500">
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

      {/* Ledger Report Drawer */}
      <LedgerReportDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        accountName={selectedAccount}
      />
    </div>
  );
}