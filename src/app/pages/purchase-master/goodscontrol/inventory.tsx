import React, { useState } from "react";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";

// Static Data
const inventoryData = [
  {
    id: 1,
    stockStatus: "In Stock",
    status: "Available",
    location: "Warehouse A",
    currentLocation: "Warehouse A",
    billNo: "INV-001",
    purchaseBillNo: "PB-001",
    purchaseDate: "25 Jul 2026",
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
    inWardDate: "25 Jul 2026",
    inWardTime: "10:30 AM",
  },
  {
    id: 2,
    stockStatus: "In Transit",
    status: "Pending",
    location: "Warehouse B",
    currentLocation: "En Route",
    billNo: "INV-002",
    purchaseBillNo: "PB-002",
    purchaseDate: "24 Jul 2026",
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
    inWardDate: "24 Jul 2026",
    inWardTime: "02:15 PM",
  },
  {
    id: 3,
    stockStatus: "Out of Stock",
    status: "Sold",
    location: "Warehouse C",
    currentLocation: "Customer",
    billNo: "INV-003",
    purchaseBillNo: "PB-003",
    purchaseDate: "23 Jul 2026",
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
    inWardDate: "23 Jul 2026",
    inWardTime: "09:45 AM",
  },
  {
    id: 4,
    stockStatus: "In Stock",
    status: "Available",
    location: "Warehouse A",
    currentLocation: "Warehouse A",
    billNo: "INV-004",
    purchaseBillNo: "PB-004",
    purchaseDate: "22 Jul 2026",
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
    inWardDate: "22 Jul 2026",
    inWardTime: "11:20 AM",
  },
  {
    id: 5,
    stockStatus: "In Transit",
    status: "Pending",
    location: "Warehouse B",
    currentLocation: "En Route",
    billNo: "INV-005",
    purchaseBillNo: "PB-005",
    purchaseDate: "21 Jul 2026",
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
    inWardDate: "21 Jul 2026",
    inWardTime: "04:00 PM",
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

const statusFilterOptions = [
  { id: "All", name: "All" },
  { id: "Available", name: "Available" },
  { id: "Pending", name: "Pending" },
  { id: "Sold", name: "Sold" },
];

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

export default function Inventory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const inventory = inventoryData;

  const filteredData = inventory.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.variant.toLowerCase().includes(search.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      item.billNo.toLowerCase().includes(search.toLowerCase());
    const matchesModel = !selectedModel || item.model === selectedModel;
    const matchesVariant = !selectedVariant || item.variant === selectedVariant;
    const matchesColour = !selectedColour || item.colour === selectedColour;
    const matchesStatus =
      selectedStatusFilter === "All" || item.status === selectedStatusFilter;
    return (
      matchesSearch &&
      matchesModel &&
      matchesVariant &&
      matchesColour &&
      matchesStatus
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
    setSelectedStatusFilter("All");
    setCurrentPage(1);
    setSelectedIds([]);
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Top Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Stock Register
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <button
            type="button"
            onClick={() => setShowFilterBar(!showFilterBar)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilterBar
                ? "bg-primary-50 border-primary-200 text-primary-600 dark:bg-dark-600 dark:border-dark-500 dark:text-white"
                : "dark:bg-dark-800 dark:border-dark-500 dark:text-dark-200 border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FunnelIcon className="size-4.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>

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

     {/* Filters */}
<div className="flex flex-wrap items-center justify-between gap-3">
  {/* Left Side - Filter Bar (Model, Variant, Colour) */}
  <div className="flex flex-wrap items-center gap-3">
    {showFilterBar && (
      <>
        <div className="w-full max-w-[180px]">
          <Combobox
            data={modelOptions}
            displayField="name"
            value={
              modelOptions.find((opt) => opt.name === selectedModel) || null
            }
            onChange={(selected: any) => {
              setSelectedModel(selected?.name || "");
              setCurrentPage(1);
            }}
            placeholder="Model"
            searchFields={["name"]}
          />
        </div>
        <div className="w-full max-w-[180px]">
          <Combobox
            data={variantOptions}
            displayField="name"
            value={
              variantOptions.find((opt) => opt.name === selectedVariant) || null
            }
            onChange={(selected: any) => {
              setSelectedVariant(selected?.name || "");
              setCurrentPage(1);
            }}
            placeholder="Variant"
            searchFields={["name"]}
          />
        </div>
        <div className="w-full max-w-[180px]">
          <Combobox
            data={colourOptions}
            displayField="name"
            value={
              colourOptions.find((opt) => opt.name === selectedColour) || null
            }
            onChange={(selected: any) => {
              setSelectedColour(selected?.name || "");
              setCurrentPage(1);
            }}
            placeholder="Colour"
            searchFields={["name"]}
          />
        </div>
      </>
    )}
  </div>

  {/* Right Side - Status Filter Buttons (Always Visible) */}
  <div className="relative inline-flex rounded-xl border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800/80">
    {/* Sliding Indicator */}
    <div
      className={`bg-primary-500 dark:shadow-primary-900/30 absolute top-1 h-[calc(100%-8px)] w-[80px] rounded-xl shadow-md transition-all duration-500 ease-in-out ${
        selectedStatusFilter === "All"
          ? "left-1"
          : selectedStatusFilter === "Pending"
            ? "left-[85px]"
            : "left-[169px]"
      }`}
    />

    <button
      onClick={() => {
        setSelectedStatusFilter("All");
        setCurrentPage(1);
      }}
      className={`relative z-10 w-[80px] rounded-xl py-2 text-center text-xs font-medium transition-colors duration-200 ${
        selectedStatusFilter === "All"
          ? "text-white"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      }`}
    >
      All
    </button>
    <button
      onClick={() => {
        setSelectedStatusFilter("Pending");
        setCurrentPage(1);
      }}
      className={`relative z-10 w-[80px] rounded-xl py-2 text-center text-xs font-medium transition-colors duration-200 ${
        selectedStatusFilter === "Pending"
          ? "text-white"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      }`}
    >
      Transit
    </button>
    <button
      onClick={() => {
        setSelectedStatusFilter("Sold");
        setCurrentPage(1);
      }}
      className={`relative z-10 w-[80px] rounded-xl py-2 text-center text-xs font-medium transition-colors duration-200 ${
        selectedStatusFilter === "Sold"
          ? "text-white"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      }`}
    >
      Present
    </button>
  </div>
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
                  S.No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Stock
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Status
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Location
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Current Location
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Bill No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Purchase Bill No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Purchase Date
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
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  In Ward Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  In Ward Time
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
                    <Td className="py-4 font-medium text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </Td>
                    <Td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.stockStatus === "In Stock"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : item.stockStatus === "In Transit"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.stockStatus === "In Stock"
                              ? "bg-green-600"
                              : item.stockStatus === "In Transit"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                          }`}
                        />
                        {item.stockStatus}
                      </span>
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.status}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.location}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.currentLocation}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.billNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.purchaseBillNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.purchaseDate}
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
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.inWardDate}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.inWardTime}
                    </Td>
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={29}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No inventory items found
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
    </div>
  );
}
