import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_PAYMENT_HISTORY = [
  {
    id: 1,
    vouNo: "BR/26-27/073",
    date: "10-04-2026",
    mode: "NEFT",
    amount: "1,05,102.00",
    createdBy: "Ujwala Bowlekar (Cashier)",
  },
  {
    id: 2,
    vouNo: "BR/26-27/005",
    date: "05-04-2026",
    mode: "UPI",
    amount: "2,000.00",
    createdBy: "Omkar Sawant (Accountant)",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function PaymentHistory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate("/accounting-master/booking/bookingbalance");
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Booking Balance Payment History
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View payment history for booking #{id}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <button
            onClick={handleBack}
            className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* ─── CUSTOMER DETAILS CARD ─────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Quotation No</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">Q/26-27/003</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Created By</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">Divya karawade (company)</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Customer Name</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">Ganesh Anant Pednekar</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Mobile No</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">9022822087</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Model</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">ACCESS 125</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Variant</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">ACCESS STED (Access Drum)</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Colour</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">Metallic Mat Black No. 2 (YKV)</p>
          </div>
        </div>
      </div>

      {/* ─── PAYMENT INFO TABLE ────────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700">
        <div className="rounded-t-xl bg-primary-700 px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Payment Info</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[600px]">
            <THead className="bg-gray-100 dark:bg-gray-700/50">
              <Tr>
                <Th className="text-[11px] text-gray-600 uppercase dark:text-gray-400">Vou. No</Th>
                <Th className="text-[11px] text-gray-600 uppercase dark:text-gray-400">Date</Th>
                <Th className="text-[11px] text-gray-600 uppercase dark:text-gray-400">Mode</Th>
                <Th className="text-[11px] text-right text-gray-600 uppercase dark:text-gray-400">Amount</Th>
                <Th className="text-[11px] text-gray-600 uppercase dark:text-gray-400">Created By</Th>
              </Tr>
            </THead>
            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {STATIC_PAYMENT_HISTORY.map((item) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30">
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.vouNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.date}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.mode}</Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    ₹{item.amount}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.createdBy}</Td>
                </Tr>
              ))}
              {STATIC_PAYMENT_HISTORY.length === 0 && (
                <Tr>
                  <Td colSpan={5} className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    No payment history found
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
}