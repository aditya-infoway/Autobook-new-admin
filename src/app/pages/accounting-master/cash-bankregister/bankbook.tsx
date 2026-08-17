import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Listbox } from "@/components/shared/form/StyledListbox";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_BANK_BOOK = [
  {
    id: 1,
    sr: 1,
    date: "18-03-2027",
    voucherNo: "BR/26-27/097",
    type: "LBR",
    accountName: "SBI 35135791056",
    partyName: "Shadab Diamond Meer",
    receipt: "2000.00",
    payment: "-",
    mode: "UPI",
    chequeNo: "-",
    chequeDate: "-",
    clearDate: "-",
    narration: "ACCESS 125",
    createdType: "Cashier",
    createdBy: "Ujwala Bowlekar",
  },
  {
    id: 2,
    sr: 2,
    date: "31-07-2026",
    voucherNo: "BR/26-27/278",
    type: "LBR",
    accountName: "SBI 35135791056",
    partyName: "Vedam Sandip Naik",
    receipt: "116328.00",
    payment: "-",
    mode: "NEFT",
    chequeNo: "-",
    chequeDate: "-",
    clearDate: "-",
    narration: "AVENIS CONNECTED",
    createdType: "Cashier",
    createdBy: "Ujwala Bowlekar",
  },
  {
    id: 3,
    sr: 3,
    date: "31-07-2026",
    voucherNo: "BR/26-27/279",
    type: "LBR",
    accountName: "SBI 35135791056",
    partyName: "Gaurav Tukaram Dhuri",
    receipt: "500.00",
    payment: "-",
    mode: "UPI",
    chequeNo: "-",
    chequeDate: "-",
    clearDate: "-",
    narration: "AMT REC FOR BC",
    createdType: "Super Admin",
    createdBy: "Shri Vinayak Suzuki",
  },
  {
    id: 4,
    sr: 4,
    date: "31-07-2026",
    voucherNo: "BR/26-27/280",
    type: "LBR",
    accountName: "SBI 35135791056",
    partyName: "NIKHIL DATTARAM MAYEKAR",
    receipt: "590.00",
    payment: "-",
    mode: "UPI",
    chequeNo: "-",
    chequeDate: "-",
    clearDate: "-",
    narration: "AMT REC FOR BC",
    createdType: "Super Admin",
    createdBy: "Shri Vinayak Suzuki",
  },
  {
    id: 5,
    sr: 5,
    date: "31-07-2026",
    voucherNo: "BR/26-27/281",
    type: "LBR",
    accountName: "SBI 35135791056",
    partyName: "BABU LADBOA PALAV",
    receipt: "595.00",
    payment: "-",
    mode: "UPI",
    chequeNo: "-",
    chequeDate: "-",
    clearDate: "-",
    narration: "AMT REC FOR BC",
    createdType: "Super Admin",
    createdBy: "Shri Vinayak Suzuki",
  },
  {
    id: 6,
    sr: 6,
    date: "31-07-2026",
    voucherNo: "BR/26-27/282",
    type: "LBR",
    accountName: "SBI 35135791056",
    partyName: "RAGHOBRA SUBHASH SHETKAR",
    receipt: "500.00",
    payment: "-",
    mode: "UPI",
    chequeNo: "-",
    chequeDate: "-",
    clearDate: "-",
    narration: "AMT REC FOR BC",
    createdType: "Super Admin",
    createdBy: "Shri Vinayak Suzuki",
  },
];

const bankOptions = [
  { value: "All", label: "All Banks" },
  { value: "SBI", label: "State Bank of India" },
  { value: "HDFC", label: "HDFC Bank" },
  { value: "ICICI", label: "ICICI Bank" },
];

const transactionTypes = [
  { value: "All", label: "All Types" },
  { value: "Receipt", label: "Receipt" },
  { value: "Payment", label: "Payment" },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function BankBook() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [bankAccount, setBankAccount] = useState("All");
  const [transactionType, setTransactionType] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  // Static summary values (matching the image)
  const openingBalance = "0.00";
  const totalReceipts = "4,38,15,979.00";
  const totalPayments = "1,11,62,957.00";
  const closingBalance = "3,26,53,022.00";
  const transactionCount = 2711;

  // Filter and Pagination Logic
  const filteredData = STATIC_BANK_BOOK.filter((item) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      item.voucherNo.toLowerCase().includes(searchLower) ||
      item.partyName.toLowerCase().includes(searchLower) ||
      item.narration.toLowerCase().includes(searchLower);

    const matchesBank =
      bankAccount === "All" ||
      item.accountName.toLowerCase().includes(bankAccount.toLowerCase());

    const matchesType =
      transactionType === "All" ||
      (transactionType === "Receipt" && item.receipt !== "-") ||
      (transactionType === "Payment" && item.payment !== "-");

    // Date filtering logic
    const itemDate = new Date(item.date.split("-").reverse().join("-"));
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesDate =
      (!from || itemDate >= from) && (!to || itemDate <= to);

    return matchesSearch && matchesBank && matchesType && matchesDate;
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
            Bank Book
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View all bank receipts and payments
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

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Opening Balance */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                OPENING BALANCE
              </p>
              <p className="mt-1 text-2xl font-bold text-orange-500 dark:text-orange-400">
                ₹{openingBalance}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                Multiple banks selected
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20">
              <BuildingLibraryIcon className="h-6 w-6 text-orange-500 dark:text-orange-400" />
            </div>
          </div>
        </div>

        {/* Total Receipts */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                TOTAL RECEIPTS
              </p>
              <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{totalReceipts}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                {transactionCount} transactions
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
              <ArrowDownTrayIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Total Payments */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                TOTAL PAYMENTS
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                ₹{totalPayments}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                {transactionCount} transactions
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
              <ArrowUpTrayIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Closing Balance */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                CLOSING BALANCE
              </p>
              <p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">
                ₹{closingBalance}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                {transactionCount} transactions
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20">
              <BanknotesIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <label className="mb-1.5 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Search
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Voucher No, Party, Account..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Bank Account */}
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Bank Account
            </label>
            <Listbox
              data={bankOptions}
              value={bankOptions.find((t) => t.value === bankAccount) || bankOptions[0]}
              onChange={(val: any) => {
                setBankAccount(val.value);
                setCurrentPage(1);
              }}
              displayField="label"
            />
          </div>

          {/* Transaction Type */}
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Transaction Type
            </label>
            <Listbox
              data={transactionTypes}
              value={transactionTypes.find((t) => t.value === transactionType) || transactionTypes[0]}
              onChange={(val: any) => {
                setTransactionType(val.value);
                setCurrentPage(1);
              }}
              displayField="label"
            />
          </div>

          {/* From Date */}
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              From Date
            </label>
            <DatePicker
              value={fromDate}
              onChange={(dates: Date[]) => {
                const val = dates[0];
                setFromDate(val?.toISOString().split("T")[0] || "");
                setCurrentPage(1);
              }}
              placeholder="dd--yyyy"
              options={{ dateFormat: "d-m-Y", disableMobile: true }}
            />
          </div>

          {/* To Date */}
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              To Date
            </label>
            <DatePicker
              value={toDate}
              onChange={(dates: Date[]) => {
                const val = dates[0];
                setToDate(val?.toISOString().split("T")[0] || "");
                setCurrentPage(1);
              }}
              placeholder="dd--yyyy"
              options={{ dateFormat: "d-m-Y", disableMobile: true }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1400px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">SR</Th>
                <Th className="text-[11px]">Date</Th>
                <Th className="text-[11px]">Voucher No.</Th>
                <Th className="text-[11px]">Type</Th>
                <Th className="text-[11px]">Account Name</Th>
                <Th className="text-[11px]">Party Name</Th>
                <Th className="text-[11px] text-right">Receipt (₹)</Th>
                <Th className="text-[11px] text-right">Payment (₹)</Th>
                <Th className="text-[11px]">Mode</Th>
                <Th className="text-[11px]">Cheque No.</Th>
                <Th className="text-[11px]">Cheque Date</Th>
                <Th className="text-[11px]">Clear Date</Th>
                <Th className="text-[11px]">Narration</Th>
                <Th className="text-[11px]">Created Type</Th>
                <Th className="text-[11px]">Created By</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-[12px] text-gray-500 text-center font-medium">
                    {item.sr}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.date}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.voucherNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.type}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.accountName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.partyName}</Td>
                  <Td className="py-3 text-[12px] font-semibold text-green-600 dark:text-green-400 text-right">
                    {item.receipt !== "-" ? item.receipt : "-"}
                  </Td>
                  <Td className="py-3 text-[12px] font-semibold text-red-600 dark:text-red-400 text-right">
                    {item.payment !== "-" ? item.payment : "-"}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.mode}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.chequeNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.chequeDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.clearDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.narration}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.createdType}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.createdBy}</Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={15} className="py-12 text-center text-gray-400 dark:text-gray-500">
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