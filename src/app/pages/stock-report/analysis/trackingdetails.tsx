import React, { useState } from "react";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PrinterIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function TrackingDetails() {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock customer data
  const customerData = {
    name: "Ganesh Bhaskar Rane",
    phone: "9422623604",
    email: "kankavli@email.com",
    vehicle: {
      model: "ACCESS 125",
      variant: "DISC RC ABS",
      colour: "Pearl Grace White (Q15)",
      chassisNo: "—",
      engineNo: "—",
      mfgDate: "05-08-2026",
      quotationNo: "Q/26-27/001",
      revisedCount: 0,
      totalDiscount: 0,
      invoiceNo: "—",
      invoiceDate: "—",
      invoiceAmount: "—",
    },
    tracking: {
      lead: { status: "Completed", person: "Divya karawade (Sales Executive)" },
      quotation: {
        status: "Completed",
        person: "Divya karawade (Sales Executive)",
      },
      orderForm: { status: "In Progress", person: "" },
      deliveryChallan: { status: "Pending", person: "" },
      delivery: { status: "Pending", person: "" },
    },
    invoice: {
      invoice: "Pending",
      rtoRegistration: "Pending",
      hsrp: "Pending",
      delivery: "Pending",
    },
    payment: {
      voucherNo: "BR/26-27/006",
      date: "05-04-2026",
      mode: "UPI",
      amount: "2,000.00",
      createdBy: "Omkar Sawant",
      service: "No service data available",
    },
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; icon: any }> = {
      Completed: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        icon: CheckCircleIcon,
      },
      "In Progress": {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: ClockIcon,
      },
      Pending: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: ExclamationCircleIcon,
      },
    };

    const defaultStatus = {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      icon: ClockIcon,
    };
    const { color, icon: Icon } = statusMap[status] || defaultStatus;

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {status}
      </span>
    );
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Tracking Details
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Track customer enquiry and order details
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Date Range */}
          <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <CalendarIcon className="h-4 w-4 text-red-500" />
            <span>01-08-2026 - 05-08-2026</span>
          </div>

          {/* Action Buttons */}
          <button
            title="Print"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <PrinterIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            title="Export PDF"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-red-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <FaFilePdf className="h-6 w-6 text-red-600" />
          </button>
          <button
            title="Export Excel"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <FaFileExcel className="h-6 w-6 text-emerald-600" />
          </button>
          <button
            title="Refresh"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
          >
            <ArrowPathIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Customer Profile Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <UserIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {customerData.name}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <PhoneIcon className="h-4 w-4" />
                  {customerData.phone}
                </span>
                <span className="flex items-center gap-1">
                  <EnvelopeIcon className="h-4 w-4" />
                  {customerData.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-lg bg-[#033ba1] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              View Full Details
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Edit Customer
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Vehicle Info - Left Column */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-[#033ba1] px-4 py-3 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-white">Vehicle Info</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Model</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.model}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Variant
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.variant}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Colour</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.colour}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Chassis No
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.chassisNo}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Engine No
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.engineNo}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  MFG Date
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.mfgDate}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Quotation No
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.quotationNo}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Revised Count
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.revisedCount}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Discount
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.totalDiscount}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Invoice No
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.invoiceNo}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Invoice Date
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.invoiceDate}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Invoice Amount
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.vehicle.invoiceAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Tracking & Invoice */}
        <div className="space-y-6 lg:col-span-1">
          {/* Tracking Info */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-[#033ba1] px-4 py-3 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-white">
                Tracking Info
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Lead
                  </span>
                  {getStatusBadge(customerData.tracking.lead.status)}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {customerData.tracking.lead.person}
                </p>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Quotation
                  </span>
                  {getStatusBadge(customerData.tracking.quotation.status)}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {customerData.tracking.quotation.person}
                </p>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Order Form
                  </span>
                  {getStatusBadge(customerData.tracking.orderForm.status)}
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Delivery Challan
                  </span>
                  {getStatusBadge(customerData.tracking.deliveryChallan.status)}
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Delivery
                  </span>
                  {getStatusBadge(customerData.tracking.delivery.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-[#033ba1] px-4 py-3 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-white">Invoice Info</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Invoice
                </span>
                {getStatusBadge(customerData.invoice.invoice)}
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  RTO Registration
                </span>
                {getStatusBadge(customerData.invoice.rtoRegistration)}
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  HSRP
                </span>
                {getStatusBadge(customerData.invoice.hsrp)}
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Delivery
                </span>
                {getStatusBadge(customerData.invoice.delivery)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Info */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-[#033ba1] px-4 py-3 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-white">Payment Info</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Vou. No
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.payment.voucherNo}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Date</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.payment.date}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Mode</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.payment.mode}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  ₹{customerData.payment.amount}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Created By
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {customerData.payment.createdBy}
                </span>
              </div>
              <div className="px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Service
                </span>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {customerData.payment.service}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons at Bottom */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
        <button className="flex items-center gap-2 rounded-lg bg-[#033ba1] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
          <DocumentTextIcon className="h-5 w-5" />
          Generate Report
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
          <PrinterIcon className="h-5 w-5" />
          Print
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </button>
      </div>
    </div>
  );
}
