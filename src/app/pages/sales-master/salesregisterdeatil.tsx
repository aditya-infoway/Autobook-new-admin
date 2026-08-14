import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  UserIcon,
  TruckIcon,
  ArchiveBoxIcon,
  DocumentCurrencyDollarIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

// ─── STATIC DATA PER STEP ──────────────────────────────────────────────────

const STEP_DATA = [
  {
    id: 1,
    title: "Quotation",
    icon: DocumentTextIcon,
    fields: [
      { label: "Q. No", value: "Q/26-27/242/R1", fullWidth: false },
      { label: "Q. Date", value: "2026-04-07", fullWidth: false },
      { label: "R-Q. No", value: "1", fullWidth: false },
      { label: "Created By", value: "Rohit Parab", fullWidth: false },
      { label: "Created Position", value: "Sales Executive", fullWidth: false },
      { label: "Follow up count", value: "0", fullWidth: false },
      { label: "Q. Amount", value: "121162", fullWidth: true },
    ],
  },
  {
    id: 2,
    title: "Customer",
    icon: UserIcon,
    fields: [
      {
        label: "Customer Name",
        value: "Jitesh Vinayak Salgaonkar",
        fullWidth: false,
      },
      { label: "Mobile No", value: "9168904044", fullWidth: false },
      { label: "Customer Group", value: "Sundry Debtors", fullWidth: false },
      { label: "Country", value: "India", fullWidth: false },
      { label: "State", value: "Maharashtra", fullWidth: false },
      { label: "District", value: "Sindhudurg", fullWidth: false },
      { label: "Taluka", value: "Malvan", fullWidth: false },
      { label: "City", value: "Malvan", fullWidth: false },
      { label: "Area", value: "Malvan", fullWidth: false },
      {
        label: "Address 1",
        value: "545, KHOBAREKAR WADI, DEVBAG, MALWAN 416606",
        fullWidth: true,
      },
      { label: "Address 2", value: "", fullWidth: false },
      { label: "Pincode", value: "416606", fullWidth: false },
      { label: "Email", value: "", fullWidth: false },
      { label: "Pan Card", value: "QIBPS4685G", fullWidth: false },
      { label: "Aadhar Card No", value: "479783786698", fullWidth: false },
    ],
  },
  {
    id: 3,
    title: "Vehicle",
    icon: TruckIcon,
    fields: [
      { label: "Model", value: "BURGMAN STREET", fullWidth: false },
      { label: "Variant", value: "BURGMAN R CONNECTED", fullWidth: false },
      { label: "Colour", value: "PRL.MAT SHADOW GREEN-QUS", fullWidth: false },
      { label: "Ex-Showroom Price", value: "97056.2", fullWidth: false },
      { label: "Insurance", value: "7722", fullWidth: false },
      { label: "Road Side Assistance", value: "348.997", fullWidth: false },
      { label: "RTO Registration Charge", value: "13010", fullWidth: false },
      { label: "Ex-Warranty (2+3)", value: "748.993", fullWidth: false },
      { label: "Hypothecation Charge", value: "500", fullWidth: false },
      { label: "Ex-Warranty (2+8)", value: "0", fullWidth: false },
      { label: "RTO Other Charge", value: "0", fullWidth: false },
    ],
  },
  {
    id: 4,
    title: "Accessories",
    icon: ArchiveBoxIcon,
    fields: [
      { label: "Full Helmet", value: "₹ 949.99", fullWidth: false },
      { label: "Half Helmet", value: "₹ 826.00", fullWidth: false },
    ],
  },
  {
    id: 5,
    title: "Invoice",
    icon: DocumentCurrencyDollarIcon,
    fields: [
      { label: "DMS Enquiry No", value: "ENQ25006390", fullWidth: false },
      { label: "DMS Enquiry Date", value: "2026-03-20", fullWidth: false },
      { label: "Accessories VSL No", value: "SPVSL0001", fullWidth: false },
      { label: "Accessories VSL Date", value: "2026-03-31", fullWidth: false },
      { label: "Invoice No.", value: "I/26-27/001", fullWidth: false },
      { label: "Invoice Date", value: "2026-04-01", fullWidth: false },
      { label: "VSL No", value: "1/VSL/26000001", fullWidth: false },
      { label: "VSL Date", value: "2026-04-01", fullWidth: false },
      { label: "Tally/BUSY No", value: "I/26-27/001", fullWidth: false },
      { label: "Tally/BUSY Date", value: "2026-04-01", fullWidth: false },
      { label: "Invoice Amount", value: "122162", fullWidth: false },
    ],
  },
  {
    id: 6,
    title: "Hypothecation",
    icon: BanknotesIcon,
    fields: [
      { label: "Finance Done By", value: "SHRIRAM FINANCE", fullWidth: false },
      { label: "Finance Amount", value: "86758", fullWidth: false },
      { label: "EMI", value: "0", fullWidth: false },
      { label: "Tenure (Months)", value: "0", fullWidth: false },
      {
        label: "Apron Charge (Processing Charge)",
        value: "1000",
        fullWidth: false,
      },
      { label: "Loan ROI", value: "0", fullWidth: false },
      {
        label: "Margin Money (Down Payment)",
        value: "13404",
        fullWidth: false,
      },
      { label: "Assign By", value: "PRATIK CHAVAN", fullWidth: false },
    ],
  },
  {
    id: 7,
    title: "Exchange",
    icon: ArrowsRightLeftIcon,
    fields: [
      { label: "Existing Customer Model", value: "", fullWidth: false },
      { label: "Existing Customer Variant", value: "", fullWidth: false },
      { label: "Existing Vehicle Year", value: "", fullWidth: false },
      {
        label: "Customer Expected Price for Existing Vehicle",
        value: "0",
        fullWidth: false,
      },
      {
        label: "Market Price for Existing Vehicle",
        value: "0",
        fullWidth: false,
      },
      { label: "Exchange Bonus", value: "0", fullWidth: false },
      { label: "SMIPL Shares", value: "0", fullWidth: false },
      { label: "Dealer Shares", value: "0", fullWidth: false },
      { label: "Value Add Accessories", value: "0", fullWidth: false },
      { label: "Insurance", value: "0", fullWidth: false },
    ],
  },
  {
    id: 8,
    title: "Payment",
    icon: CreditCardIcon,
    fields: [
      { label: "Quotation Amount", value: "121162", fullWidth: false },
      { label: "Discount", value: "0", fullWidth: false },
      { label: "Scheme Discount", value: "0", fullWidth: false },
      { label: "Exchange Discount", value: "0", fullWidth: false },
      { label: "Invoice Amount", value: "122162", fullWidth: false },
      { label: "Received Amount", value: "108758", fullWidth: false },
      { label: "Pending Amount", value: "13404", fullWidth: true },
    ],
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function SalesRegisterDetail() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // ─── EXTERNAL HANDLERS ──────────────────────────────────────────────────

  const handleBack = () => {
    navigate("/sales-master/salesregister");
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentStep < 8) setCurrentStep((prev) => prev + 1);
  };

  // ─── HELPER: Get current step data ──────────────────────────────────────

  const activeStep = STEP_DATA.find((s) => s.id === currentStep);

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Sales Register Details
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            View full sales transaction details
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
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

      {/* ─── STEPPER HEADER ────────────────────────────────────────────────── */}

      <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
        <div className="flex flex-wrap justify-between gap-4 overflow-x-auto px-2 py-2 md:flex-nowrap md:justify-center">
          {STEP_DATA.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="flex min-w-[60px] cursor-pointer flex-col items-center gap-1.5"
                onClick={() => setCurrentStep(step.id)}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    isActive
                      ? "border-primary-500 bg-primary-500 text-white"
                      : isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="h-5 w-5"
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
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium whitespace-nowrap ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400"
                      : isCompleted
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── CONTENT CARD ──────────────────────────────────────────────────── */}

      {activeStep && (
        <div className="dark:bg-dark-800 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 dark:border-gray-700">
          {/* Step Title */}
          <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-4 dark:border-gray-700">
            <activeStep.icon className="text-primary-600 dark:text-primary-400 h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeStep.title} Details
            </h2>
          </div>

          {/* Fields Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {activeStep.fields.map((field, index) => (
              <div
                key={index}
                className={`${field.fullWidth ? "md:col-span-3" : ""} ${
                  field.value ? "" : "opacity-50"
                }`}
              >
                <label className="block text-[10px] font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  {field.label}
                </label>
                <div className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
                  {field.value || "-"}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Footer */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row dark:border-gray-700">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                currentStep === 1
                  ? "cursor-not-allowed border-gray-200 text-gray-400 opacity-50 dark:border-gray-700 dark:text-gray-500"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Previous
            </button>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              Step {currentStep} of 8
            </span>

            {currentStep < 8 ? (
              <button
                onClick={handleNext}
                className="bg-primary-500 hover:bg-primary-600 flex cursor-pointer items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors"
              >
                Next
                <ArrowLeftIcon className="h-4 w-4 rotate-180" />
              </button>
            ) : (
              <button
                onClick={handleBack}
                className="bg-primary-500 hover:bg-primary-600 flex cursor-pointer items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors"
              >
                Finish
                <ArrowLeftIcon className="h-4 w-4 rotate-180" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
