import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_EVENT = {
  id: "eyJpZCI6Im...",
  eventName: "P1 Fest Available",
  eventDate: "2026-04-21",
  totalLeads: 0,
  booking: 0,
  sales: 0,
  metrics: [
    {
      type: "Enquiry",
      target: 1,
      achievement: 0,
    },
    {
      type: "Test Drive",
      target: 1,
      achievement: 0,
    },
    {
      type: "Booking",
      target: 1,
      achievement: 0,
    },
    {
      type: "Sales",
      target: 1,
      achievement: 0,
    },
  ],
};

const STATIC_EXPENSES = [
  {
    id: 1,
    expenseDate: "2026-04-21",
    expenseName: "Venue Booking",
    expenseAmount: "15,000",
    expenseBill: "EXP-001",
    narration: "Paid for the event hall",
    createdBy: "Admin",
    createdType: "Super Admin",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function EventRegisterDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ─── EXTERNAL HANDLERS ──────────────────────────────────────────────────

  const handleBack = () => {
    navigate("/lead-master/eventmaster/eventregister");
  };

  const handleEdit = () => {
    console.log("Edit event:", id);
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Event Register Details
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View full event details and performance
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Edit Event
          </button>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* ─── TOP SUMMARY CARDS ────────────────────────────────────────────── */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Total Leads */}
        <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Total Leads
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {STATIC_EVENT.totalLeads}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
              <UserGroupIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Booking */}
        <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Booking
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {STATIC_EVENT.booking}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20">
              <ShoppingCartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Sales */}
        <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Sales
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {STATIC_EVENT.sales}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
              <CurrencyDollarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── METRICS TABLE ────────────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700">
        <div className="overflow-x-auto p-4">
          <Table className="w-full min-w-[800px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="text-[11px] text-center">Event Name</Th>
                <Th className="text-[11px] text-center">Event Date</Th>
                {STATIC_EVENT.metrics.map((metric) => (
                  <React.Fragment key={metric.type}>
                    <Th className="text-[11px] text-center" colSpan={2}>
                      {metric.type}
                    </Th>
                  </React.Fragment>
                ))}
              </Tr>
              <Tr className="dark:bg-dark-700/40 bg-gray-50">
                <Th className="text-[10px] text-center font-normal text-gray-500 dark:text-gray-400"></Th>
                <Th className="text-[10px] text-center font-normal text-gray-500 dark:text-gray-400"></Th>
                {STATIC_EVENT.metrics.map((metric) => (
                  <React.Fragment key={`sub-${metric.type}`}>
                    <Th className="text-[10px] text-center font-normal text-gray-500 dark:text-gray-400">
                      Target
                    </Th>
                    <Th className="text-[10px] text-center font-normal text-gray-500 dark:text-gray-400">
                      Achievement
                    </Th>
                  </React.Fragment>
                ))}
              </Tr>
            </THead>
            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              <Tr className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30">
                <Td className="py-4 text-center text-[13px] font-medium text-gray-900 dark:text-white">
                  {STATIC_EVENT.eventName}
                </Td>
                <Td className="py-4 text-center text-[13px] text-gray-700 dark:text-gray-300">
                  {STATIC_EVENT.eventDate}
                </Td>
                {STATIC_EVENT.metrics.map((metric) => (
                  <React.Fragment key={`val-${metric.type}`}>
                    <Td className="py-4 text-center text-[13px] text-gray-700 dark:text-gray-300">
                      {metric.target}
                    </Td>
                    <Td className="py-4 text-center text-[13px] text-gray-700 dark:text-gray-300">
                      {metric.achievement}
                    </Td>
                  </React.Fragment>
                ))}
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>

      {/* ─── CUSTOMER / LEAD DETAILS TABLE ────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Customer / Lead Details
          </span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <Table className="w-full min-w-[600px]">
            <THead className="dark:bg-dark-700/60 bg-gray-100">
              <Tr>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  #
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Customer Name
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Quotation No
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Model
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Variant
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Colour
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Created By
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Status
                </Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td colSpan={8} className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                  No data available in table
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>

      {/* ─── EVENT EXPENSE HISTORY ────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Event Expense History
          </span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <Table className="w-full min-w-[700px]">
            <THead className="dark:bg-dark-700/60 bg-gray-100">
              <Tr>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  #
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Expense Date
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Expense Name
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Expense Amount
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Expense Bill
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Narration
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Created By
                </Th>
                <Th className="text-[10px] font-medium text-gray-600 uppercase dark:text-gray-400">
                  Created Type
                </Th>
              </Tr>
            </THead>
            <TBody>
              {STATIC_EXPENSES.length === 0 ? (
                <Tr>
                  <Td colSpan={8} className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    No data available in table
                  </Td>
                </Tr>
              ) : (
                STATIC_EXPENSES.map((expense) => (
                  <Tr key={expense.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30">
                    <Td className="py-3 text-center text-[12px] text-gray-500">1</Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {expense.expenseDate}
                    </Td>
                    <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                      {expense.expenseName}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300 text-right">
                      ₹{expense.expenseAmount}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {expense.expenseBill}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {expense.narration}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {expense.createdBy}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {expense.createdType}
                    </Td>
                  </Tr>
                ))
              )}
            </TBody>
          </Table>
        </div>
      </div>

      {/* ─── EVENT PHOTOS ──────────────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
        <div className="mb-4 flex items-center gap-2">
          <PhotoIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Photos</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* Image Thumbnails */}
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-600">
            <img
              src="https://via.placeholder.com/150x150/efefef/333333?text=Photo+1"
              alt="Event Photo 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-600">
            <img
              src="https://via.placeholder.com/150x150/d4d4d4/333333?text=Photo+2"
              alt="Event Photo 2"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-600">
            <img
              src="https://via.placeholder.com/150x150/bcbcbc/333333?text=Photo+3"
              alt="Event Photo 3"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ─── EVENT VIDEOS ──────────────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
        <div className="mb-4 flex items-center gap-2">
          <VideoCameraIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Videos</span>
        </div>
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
          <div className="text-center">
            <VideoCameraIcon className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-500" />
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
              No video uploaded for this event yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}