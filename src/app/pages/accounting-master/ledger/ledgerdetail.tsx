import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";


// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_LEDGER_DETAILS = [
  {
    id: 1,
    date: "01-04-2026",
    voucher: "-",
    type: "",
    particulars: "OPENING BALANCE",
    debit: "-",
    credit: "-",
    balance: "0.00 DR",
  },
  {
    id: 2,
    date: "02-04-2026",
    voucher: "CR/26-27/001",
    type: "JCR",
    particulars: "Payment received",
    debit: "-",
    credit: "5,000.00",
    balance: "5,000.00 CR",
  },
  {
    id: 3,
    date: "05-04-2026",
    voucher: "CR/26-27/002",
    type: "JCR",
    particulars: "Advance payment",
    debit: "-",
    credit: "2,500.00",
    balance: "7,500.00 CR",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function LedgerDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountName = searchParams.get("account") || "875 ANGANEWADI BAMBARDE TARF KALSULI VETAL BAMBARDE 416520";
  
  const [fromDate, setFromDate] = useState("01-04-2026");
  const [toDate, setToDate] = useState("31-07-2026");

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleApply = () => {
    console.log(`Applying filter: ${fromDate} to ${toDate}`);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
  };

  // Totals
  const totalDebit = STATIC_LEDGER_DETAILS.reduce(
    (sum, item) => sum + (parseFloat(item.debit.replace(/,/g, "")) || 0),
    0
  );
  const totalCredit = STATIC_LEDGER_DETAILS.reduce(
    (sum, item) => sum + (parseFloat(item.credit.replace(/,/g, "")) || 0),
    0
  );

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header with Back Button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
         
          <div>
            <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
              {accountName}
            </h1>
            <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
              Sundry Debtors • Opening: 0.00 Dr
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <button
            onClick={handleRefresh}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-600" />
          </button>
          {/* Back Button (Right side) */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700"
          > <ArrowLeftIcon className="h-5 w-5 text-white dark:text-white" />
            Back
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Date Range:
            </label>
            <div className="flex items-center gap-2">
              <DatePicker
                value={fromDate}
                onChange={(dates: Date[]) => {
                  const val = dates[0];
                  setFromDate(val?.toISOString().split("T")[0] || "");
                }}
                placeholder="DD-MM-YYYY"
                options={{ dateFormat: "d-m-Y", disableMobile: true }}
              />
              <span className="text-gray-400">to</span>
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
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApply}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
            >
              Apply
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-600"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="ledger-stat-card bg-blue-50/50">
          <p className="text-[11px] font-medium text-blue-600">Opening Balance</p>
          <p className="mt-1 text-lg font-bold text-blue-700">0.00 Dr</p>
        </div>
        <div className="ledger-stat-card bg-green-50/50">
          <p className="text-[11px] font-medium text-green-600">Total Debit</p>
          <p className="mt-1 text-lg font-bold text-green-700">0.00</p>
        </div>
        <div className="ledger-stat-card bg-orange-50/50">
          <p className="text-[11px] font-medium text-orange-600">Total Credit</p>
          <p className="mt-1 text-lg font-bold text-orange-700">0.00</p>
        </div>
        <div className="ledger-stat-card bg-purple-50/50">
          <p className="text-[11px] font-medium text-purple-600">Closing Balance</p>
          <p className="mt-1 text-lg font-bold text-purple-700">0.00 Dr</p>
        </div>
      </div>

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px] ledger-detail-table">
            <THead className="bg-primary-500 text-white">
              <Tr>
                <Th className="w-12 text-center text-[11px] font-semibold text-white">#</Th>
                <Th className="text-[11px] font-semibold text-white">Date</Th>
                <Th className="text-[11px] font-semibold text-white">Voucher</Th>
                <Th className="text-[11px] font-semibold text-white">Type</Th>
                <Th className="text-[11px] font-semibold text-white">Particulars</Th>
                <Th className="text-[11px] font-semibold text-white text-right">Debit</Th>
                <Th className="text-[11px] font-semibold text-white text-right">Credit</Th>
                <Th className="text-[11px] font-semibold text-white text-right">Balance</Th>
              </Tr>
            </THead>

            <TBody className="divide-y divide-gray-200 dark:divide-gray-700">
              {STATIC_LEDGER_DETAILS.map((item, index) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-[12px] text-gray-500 text-center font-medium">
                    {index + 1}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.date}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.voucher}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.type}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.particulars}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300 text-right">{item.debit}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300 text-right">{item.credit}</Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    {item.balance}
                  </Td>
                </Tr>
              ))}
              
              {/* TOTAL Row */}
              <Tr className="bg-gray-50 dark:bg-gray-800/50 font-semibold border-t-2 border-red-500">
                <Td className="py-3 px-3 text-right font-bold text-gray-700 dark:text-gray-300" colSpan={5}>
                  TOTAL
                </Td>
                <Td className="py-3 px-3 text-right font-bold text-gray-900 dark:text-white">
                  {totalDebit.toFixed(2)}
                </Td>
                <Td className="py-3 px-3 text-right font-bold text-gray-900 dark:text-white">
                  {totalCredit.toFixed(2)}
                </Td>
                <Td className="py-3 px-3 text-right font-bold text-gray-900 dark:text-white">
                  0.00 Dr
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
}