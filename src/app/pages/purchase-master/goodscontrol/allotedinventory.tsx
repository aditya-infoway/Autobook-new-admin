import React, { useState } from "react";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon ,
  TrashIcon 
} from "@heroicons/react/24/outline";
import { FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";

// Static Data
const allotedInventoryData = [
  {
    id: 1,
    quotationNo: "QT-001",
    dmsEnquiryNo: "DMS-001",
    dmsEnquiryDate: "20 Jul 2026",
    customerName: "Rajesh Kumar",
    customerMobileNo: "9876543210",
    invoiceAmount: 85000,
    billNo: "INV-001",
    supplierName: "ABC Suppliers",
    itemName: "iPhone 15 Pro",
    model: "iPhone 15 Pro",
    variant: "Pro Max",
    colour: "Pearl Grace White",
    fuelType: "N/A",
    muNumber: "MU-001",
    mfgDate: "10 Jul 2026",
    chassisNumber: "CH-123456",
    engineNumber: "EN-789012",
    keyNumber: "KEY-001",
    batteryMake: "Samsung",
    batteryNumber: "BAT-001",
    fr: "FR-001",
    pr: "PR-001",
    grnDate: "26 Jul 2026",
    grnNo: "GRN-001",
    grnRecordDate: "26 Jul 2026",
  },
  {
    id: 2,
    quotationNo: "QT-002",
    dmsEnquiryNo: "DMS-002",
    dmsEnquiryDate: "18 Jul 2026",
    customerName: "Priya Sharma",
    customerMobileNo: "8765432109",
    invoiceAmount: 78000,
    billNo: "INV-002",
    supplierName: "XYZ Traders",
    itemName: "Samsung Galaxy S24",
    model: "Samsung Galaxy S24",
    variant: "Ultra",
    colour: "Titanium Gray",
    fuelType: "N/A",
    muNumber: "MU-002",
    mfgDate: "12 Jul 2026",
    chassisNumber: "CH-234567",
    engineNumber: "EN-890123",
    keyNumber: "KEY-002",
    batteryMake: "LG",
    batteryNumber: "BAT-002",
    fr: "FR-002",
    pr: "PR-002",
    grnDate: "25 Jul 2026",
    grnNo: "GRN-002",
    grnRecordDate: "25 Jul 2026",
  },
  {
    id: 3,
    quotationNo: "QT-003",
    dmsEnquiryNo: "DMS-003",
    dmsEnquiryDate: "15 Jul 2026",
    customerName: "Amit Singh",
    customerMobileNo: "7654321098",
    invoiceAmount: 450000,
    billNo: "INV-003",
    supplierName: "MNO Enterprises",
    itemName: "Mahindra 265 DI",
    model: "Mahindra 265 DI",
    variant: "DI 4x4",
    colour: "Red",
    fuelType: "Diesel",
    muNumber: "MU-003",
    mfgDate: "15 Jun 2026",
    chassisNumber: "CH-345678",
    engineNumber: "EN-901234",
    keyNumber: "KEY-003",
    batteryMake: "Exide",
    batteryNumber: "BAT-003",
    fr: "FR-003",
    pr: "PR-003",
    grnDate: "24 Jul 2026",
    grnNo: "GRN-003",
    grnRecordDate: "24 Jul 2026",
  },
  {
    id: 4,
    quotationNo: "QT-004",
    dmsEnquiryNo: "DMS-004",
    dmsEnquiryDate: "12 Jul 2026",
    customerName: "Sneha Reddy",
    customerMobileNo: "6543210987",
    invoiceAmount: 380000,
    billNo: "INV-004",
    supplierName: "PQR Supplies",
    itemName: "Swaraj 744 FE",
    model: "Swaraj 744 FE",
    variant: "FE 2WD",
    colour: "Green",
    fuelType: "Diesel",
    muNumber: "MU-004",
    mfgDate: "20 Jun 2026",
    chassisNumber: "CH-456789",
    engineNumber: "EN-012345",
    keyNumber: "KEY-004",
    batteryMake: "Amaron",
    batteryNumber: "BAT-004",
    fr: "FR-004",
    pr: "PR-004",
    grnDate: "23 Jul 2026",
    grnNo: "GRN-004",
    grnRecordDate: "23 Jul 2026",
  },
  {
    id: 5,
    quotationNo: "QT-005",
    dmsEnquiryNo: "DMS-005",
    dmsEnquiryDate: "10 Jul 2026",
    customerName: "Vikram Patil",
    customerMobileNo: "5432109876",
    invoiceAmount: 520000,
    billNo: "INV-005",
    supplierName: "STU Traders",
    itemName: "Eicher 380",
    model: "Eicher 380",
    variant: "Super",
    colour: "Yellow",
    fuelType: "Diesel",
    muNumber: "MU-005",
    mfgDate: "25 Jun 2026",
    chassisNumber: "CH-567890",
    engineNumber: "EN-123456",
    keyNumber: "KEY-005",
    batteryMake: "Exide",
    batteryNumber: "BAT-005",
    fr: "FR-005",
    pr: "PR-005",
    grnDate: "22 Jul 2026",
    grnNo: "GRN-005",
    grnRecordDate: "22 Jul 2026",
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

export default function AllotedInventory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const inventory = allotedInventoryData;

  const filteredData = inventory.filter((item) => {
    const matchesSearch =
      item.quotationNo.toLowerCase().includes(search.toLowerCase()) ||
      item.dmsEnquiryNo.toLowerCase().includes(search.toLowerCase()) ||
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.variant.toLowerCase().includes(search.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      item.billNo.toLowerCase().includes(search.toLowerCase());
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
            Alloted Inventory
          </h1>
        </div>

       <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  <button
    type="button"
    className="dark:bg-dark-800 dark:border-dark-500 dark:text-dark-200 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50"
  >
    <FaFileExcel className="h-6 w-6 text-green-500" />
  </button>

  <button
    type="button"
    onClick={handleRefresh}
    className="dark:bg-dark-800 dark:border-dark-500 dark:text-dark-200 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50"
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
          placeholder="Search alloted inventory..."
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
            className="w-full min-w-[1600px] text-left [&_.table-th]:font-semibold"
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
                          prev.filter((id) => !pageIds.includes(id))
                        );
                      } else {
                        const pageIds = currentItems.map((item) => item.id);
                        setSelectedIds((prev) =>
                          Array.from(new Set([...prev, ...pageIds]))
                        );
                      }
                    }}
                  />
                </Th>
                <Th className="w-16 py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  S.No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Quotation No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  DMS Enquiry No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  DMS Enquiry Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Customer Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Customer Mobile No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Invoice Amount
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Bill No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Supplier Name
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
                  Fuel Type
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
                  GRN Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  GRN No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  GRN Record Date
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
                              : [...prev, item.id]
                          );
                        }}
                      />
                    </Td>
                    <Td className="py-4 font-medium text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.quotationNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.dmsEnquiryNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.dmsEnquiryDate}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.customerName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.customerMobileNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(item.invoiceAmount)}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.billNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.supplierName}
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
                      {item.fuelType}
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
                      {item.grnDate}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.grnNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.grnRecordDate}
                    </Td>
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={27}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No alloted inventory items found
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
    </div>
  );
}