import React, { useState } from "react";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  EyeIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { RefreshCw, ChevronUp } from "lucide-react";

import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { Button, Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

// Static Data
const soldOutStockData = [
  {
    id: 1,
    customerName: "Rajesh Kumar",
    mobileNo: "9876543210",
    qNo: "Q-001",
    dmsEnquiryNo: "DMS-001",
    dmsEnquiryDate: "20 Jul 2026",
    dmsInvoiceNo: "DMS-INV-001",
    dmsInvoiceDate: "25 Jul 2026",
    itemName: "iPhone 15 Pro",
    model: "iPhone 15 Pro",
    variant: "Pro Max",
    colour: "Pearl Grace White",
    muNumber: "MU-001",
    mfgDate: "10 Jul 2026",
    chassisNumber: "CH-123456",
    engineNumber: "EN-789012",
    keyNumber: "KEY-001",
    batteryMake: "Samsung",
    batteryNumber: "BAT-001",
    fr: "FR-001",
    pr: "PR-001",
    invoiceDate: "25 Jul 2026",
    invoiceNo: "INV-001",
    financeName: "HDFC Bank",
    exShowroom: 85000,
    insurance: 5000,
    roadSideAssistance: 2000,
    rtoRegistrationCharge: 8000,
    hypothecationCharge: 1500,
    rtoOtherCharge: 500,
    exWarranty23: 3000,
    exWarranty28: 5000,
    accessories: [
      { itemName: "Charger", price: 500 },
      { itemName: "Headphones", price: 1000 },
      { itemName: "Screen Guard", price: 300 },
    ],
    paid: 95000,
    financeAmount: 0,
    invoiceAmount: 105300,
    shortExtra: 0,
    createdBy: "Admin",
    createdType: "Manual",
  },
  {
    id: 2,
    customerName: "Priya Sharma",
    mobileNo: "8765432109",
    qNo: "Q-002",
    dmsEnquiryNo: "DMS-002",
    dmsEnquiryDate: "18 Jul 2026",
    dmsInvoiceNo: "DMS-INV-002",
    dmsInvoiceDate: "24 Jul 2026",
    itemName: "Samsung Galaxy S24",
    model: "Samsung Galaxy S24",
    variant: "Ultra",
    colour: "Titanium Gray",
    muNumber: "MU-002",
    mfgDate: "12 Jul 2026",
    chassisNumber: "CH-234567",
    engineNumber: "EN-890123",
    keyNumber: "KEY-002",
    batteryMake: "LG",
    batteryNumber: "BAT-002",
    fr: "FR-002",
    pr: "PR-002",
    invoiceDate: "24 Jul 2026",
    invoiceNo: "INV-002",
    financeName: "ICICI Bank",
    exShowroom: 78000,
    insurance: 4500,
    roadSideAssistance: 1800,
    rtoRegistrationCharge: 7500,
    hypothecationCharge: 1400,
    rtoOtherCharge: 400,
    exWarranty23: 2800,
    exWarranty28: 4800,
    accessories: [{ itemName: "Cover", price: 600 }],
    paid: 80000,
    financeAmount: 0,
    invoiceAmount: 97200,
    shortExtra: -2800,
    createdBy: "Admin",
    createdType: "Bulk Upload",
  },
  {
    id: 3,
    customerName: "Amit Singh",
    mobileNo: "7654321098",
    qNo: "Q-003",
    dmsEnquiryNo: "DMS-003",
    dmsEnquiryDate: "15 Jul 2026",
    dmsInvoiceNo: "DMS-INV-003",
    dmsInvoiceDate: "23 Jul 2026",
    itemName: "Mahindra 265 DI",
    model: "Mahindra 265 DI",
    variant: "DI 4x4",
    colour: "Red",
    muNumber: "MU-003",
    mfgDate: "15 Jun 2026",
    chassisNumber: "CH-345678",
    engineNumber: "EN-901234",
    keyNumber: "KEY-003",
    batteryMake: "Exide",
    batteryNumber: "BAT-003",
    fr: "FR-003",
    pr: "PR-003",
    invoiceDate: "23 Jul 2026",
    invoiceNo: "INV-003",
    financeName: "SBI",
    exShowroom: 450000,
    insurance: 15000,
    roadSideAssistance: 5000,
    rtoRegistrationCharge: 25000,
    hypothecationCharge: 3000,
    rtoOtherCharge: 1000,
    exWarranty23: 8000,
    exWarranty28: 12000,
    accessories: [
      { itemName: "GPS", price: 2000 },
      { itemName: "Seat Cover", price: 1500 },
    ],
    paid: 450000,
    financeAmount: 50000,
    invoiceAmount: 519000,
    shortExtra: 0,
    createdBy: "Manager",
    createdType: "Manual",
  },
];

const modelOptions = [
  { id: 1, name: "iPhone 15 Pro" },
  { id: 2, name: "Samsung Galaxy S24" },
  { id: 3, name: "Mahindra 265 DI" },
  { id: 4, name: "Swaraj 744 FE" },
  { id: 5, name: "Eicher 380" },
];

const variantOptions = [
  { id: 1, name: "Pro Max" },
  { id: 2, name: "Ultra" },
  { id: 3, name: "DI 4x4" },
  { id: 4, name: "FE 2WD" },
  { id: 5, name: "Super" },
];

const colourOptions = [
  { id: 1, name: "Pearl Grace White" },
  { id: 2, name: "Titanium Gray" },
  { id: 3, name: "Red" },
  { id: 4, name: "Green" },
  { id: 5, name: "Yellow" },
];

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

export default function SoldOutStock() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [showAccessoriesModal, setShowAccessoriesModal] = useState(false);
  const [selectedAccessories, setSelectedAccessories] = useState<any[]>([]);

  const soldOutItems = soldOutStockData;

  const filteredData = soldOutItems.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.mobileNo.includes(search) ||
      item.qNo.toLowerCase().includes(search.toLowerCase()) ||
      item.dmsEnquiryNo.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.variant.toLowerCase().includes(search.toLowerCase()) ||
      item.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchesModel = !selectedModel || item.model === selectedModel;
    const matchesVariant = !selectedVariant || item.variant === selectedVariant;
    const matchesColour = !selectedColour || item.colour === selectedColour;
    return matchesSearch && matchesModel && matchesVariant && matchesColour;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleViewAccessories = (accessories: any[]) => {
    setSelectedAccessories(accessories);
    setShowAccessoriesModal(true);
  };

  const isAllPageSelected =
    currentItems.length > 0 &&
    currentItems.every((item) => selectedIds.includes(item.id));
  const isSomePageSelected =
    currentItems.some((item) => selectedIds.includes(item.id)) &&
    !isAllPageSelected;

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleRefresh = () => {
    setSearch("");
    setSelectedModel("");
    setSelectedVariant("");
    setSelectedColour("");
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    alert(`Delete ${selectedIds.length} selected items`);
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Top Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Sold Stock Register
          </h1>
        </div>

       <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  {/* Filter Button */}
  {/* <button
    type="button"
    onClick={() => setShowFilterBar(!showFilterBar)}
    className={`flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50 ${
      showFilterBar
        ? "border-primary-500 bg-primary-50 text-primary-600"
        : ""
    }`}
  >
    <FunnelIcon className="h-6 w-6" />
  </button> */}

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
          placeholder="Search sold out stock..."
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
          <Table
            hoverable
            className="w-full min-w-[1800px] text-left [&_.table-th]:font-semibold"
          >
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 py-3.5 text-center">
                  <Checkbox
                    className="size-4.5"
                    color="error"
                    checked={isAllPageSelected}
                    indeterminate={isSomePageSelected}
                    onChange={(e: any) => {
                      if (isAllPageSelected || !e.target.checked) {
                        const pageIds = currentItems.map((item) => item.id);
                        setSelectedIds((prev) =>
                          prev.filter((id) => !pageIds.includes(id)),
                        );
                      } else {
                        const pageIds = currentItems.map((item) => item.id);
                        setSelectedIds((prev) =>
                          Array.from(new Set([...prev, ...pageIds])),
                        );
                      }
                    }}
                  />
                </Th>
                <Th className="w-16 py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  #
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Customer Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Mobile No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Q. No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  DMS Enquiry No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  DMS Enquiry Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  DMS Invoice No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  DMS Invoice Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Item Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Model
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Variant
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Colour
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  MU Number
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  MFG Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Chassis Number
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Engine Number
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Key Number
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Battery Make
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Battery Number
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  FR
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  PR
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Invoice Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Invoice No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Finance Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Ex-Showroom
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Insurance
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  RSA
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  RTO Reg. Charge
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Hypothecation
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  RTO Other
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Ex-Warranty (2+3)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Ex-Warranty (2+8)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Accessories
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Paid
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Finance Amount
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Invoice Amount
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Short/Extra
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Created By
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Created Type
                </Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => {
                const isRowSelected = selectedIds.includes(item.id);
                return (
                  <Tr
                    key={item.id}
                    className={`${isRowSelected ? "dark:bg-dark-600/30 bg-gray-50/50" : ""} dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30`}
                  >
                    <Td className="py-4 text-center">
                      <Checkbox
                        className="size-4.5"
                        checked={isRowSelected}
                        onChange={() => {
                          setSelectedIds((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id],
                          );
                        }}
                      />
                    </Td>
                    <Td className="py-4 text-center font-medium text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.customerName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.mobileNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.qNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.dmsEnquiryNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.dmsEnquiryDate}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.dmsInvoiceNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.dmsInvoiceDate}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.itemName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.model}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.variant}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.colour}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.muNumber}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.mfgDate}
                    </Td>
                    <Td className="py-4 font-mono text-gray-600 dark:text-gray-400">
                      {item.chassisNumber}
                    </Td>
                    <Td className="py-4 font-mono text-gray-600 dark:text-gray-400">
                      {item.engineNumber}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.keyNumber}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.batteryMake}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.batteryNumber}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.fr}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.pr}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.invoiceDate}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.invoiceNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.financeName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.exShowroom)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.insurance)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.roadSideAssistance)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.rtoRegistrationCharge)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.hypothecationCharge)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.rtoOtherCharge)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.exWarranty23)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.exWarranty28)}
                    </Td>
                    <Td className="py-4 text-center">
                      {item.accessories && item.accessories.length > 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleViewAccessories(item.accessories)
                          }
                          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                          <EyeIcon className="mr-1.5 size-3.5" />
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.paid)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.financeAmount)}
                    </Td>
                    <Td className="py-4 font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(item.invoiceAmount)}
                    </Td>
                    <Td
                      className={`py-4 font-semibold ${(item.shortExtra || 0) < 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {formatCurrency(item.shortExtra || 0)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.createdBy}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          item.createdType === "Manual"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        }`}
                      >
                        {item.createdType}
                      </span>
                    </Td>
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={40}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No sold out stock items found
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
                  {entriesOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
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

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-50 w-full max-w-[95%] -translate-x-1/2 px-2 duration-200 sm:max-w-md md:max-w-lg lg:right-6 lg:left-auto lg:max-w-xl lg:translate-x-0">
          <div className="dark:border-dark-500 dark:bg-dark-700/95 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:p-4">
            <div className="dark:text-dark-200 text-xs font-medium whitespace-nowrap text-gray-600 sm:text-sm">
              Selected{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedIds.length}
              </span>{" "}
              items
            </div>
            <Button
              variant="filled"
              color="error"
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 shadow-sm"
            >
              <TrashIcon className="size-4" />
              <span className="text-xs font-semibold">Delete</span>
            </Button>
          </div>
        </div>
      )}

      {/* Accessories Modal */}
      <Transition appear show={showAccessoriesModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100]"
          onClose={() => setShowAccessoriesModal(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur transition-opacity dark:bg-black/40" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out transform-gpu transition-transform duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in transform-gpu transition-transform duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-2xl transform-gpu flex-col bg-white shadow-2xl transition-transform duration-200">
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Accessories Details
                  </h2>
                  <Button
                    onClick={() => setShowAccessoriesModal(false)}
                    variant="flat"
                    isIcon
                    className="size-8 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                    type="button"
                  >
                    <XMarkIcon className="size-5" />
                  </Button>
                </div>

                {/* Content */}
                <div className="grow overflow-y-auto p-5">
                  {selectedAccessories.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-500/20 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                          <tr className="border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                            <th className="px-4 py-3 font-semibold">
                              Item Name
                            </th>
                            <th className="px-4 py-3 text-right font-semibold">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                          {selectedAccessories.map((acc, idx) => (
                            <tr
                              key={idx}
                              className="whitespace-nowrap transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                            >
                              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                {acc.itemName}
                              </td>
                              <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
                                {formatCurrency(acc.price)}
                              </td>
                            </tr>
                          ))}
                          {/* Total Row */}
                          <tr className="border-t-2 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
                            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                              Total
                            </td>
                            <td className="text-primary-600 dark:text-primary-400 px-4 py-3 text-right font-bold">
                              {formatCurrency(
                                selectedAccessories.reduce(
                                  (sum, acc) => sum + acc.price,
                                  0,
                                ),
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                      No accessories available
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="dark:border-dark-500 flex items-center justify-end border-t border-gray-200 p-5">
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setShowAccessoriesModal(false)}
                    className="h-10 min-w-[100px]"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
}
