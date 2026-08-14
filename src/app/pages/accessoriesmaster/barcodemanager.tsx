import React, { useState, Fragment } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_BARCODES = [
  {
    id: 1,
    itemName: "MATTIN",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 2,
    itemName: "FOOTREST",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 3,
    itemName: "MATTIN",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 4,
    itemName: "FOOTREST",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 5,
    itemName: "FLOOR MAT (RED)",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 6,
    itemName: "FLOOR MAT (RED)",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 7,
    itemName: "FLOOR MAT (RED)",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 8,
    itemName: "STEP SET (FOOTREST 60)",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 9,
    itemName: "STEP SET (FOOTREST)",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
  {
    id: 10,
    itemName: "STEP SET (FOOTREST)",
    mrp: "80",
    stock: 100,
    manualBarcode: "",
    generatedBarcode: "Not generated",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function BarcodeManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "generated">("pending");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleGenerate = (id: number) => {
    console.log(`Generating barcode for item ${id}`);
  };

  const handleBulkGenerate = () => {
    console.log(`Generating barcodes for ${selectedIds.length} items`);
  };

  const handleSaveManualBarcode = (id: number, value: string) => {
    console.log(`Saving manual barcode "${value}" for item ${id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_BARCODES.filter((item) => {
    const searchLower = search.toLowerCase();
    return item.itemName.toLowerCase().includes(searchLower);
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Checkbox Logic
  const isAllPageSelected =
    currentItems.length > 0 &&
    currentItems.every((item) => selectedIds.includes(item.id));
  const isSomePageSelected =
    currentItems.some((item) => selectedIds.includes(item.id)) &&
    !isAllPageSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = currentItems.map((item) => item.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = currentItems.map((item) => item.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Barcode Manager
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Generate and manage item barcodes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Refresh Button (Top Right) */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs & Action Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          <button
            onClick={() => setActiveTab("pending")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "pending"
                ? "bg-primary-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Pending ({filteredData.length})
          </button>
          <button
            onClick={() => setActiveTab("generated")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "generated"
                ? "bg-primary-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Generated (0)
          </button>
        </div>

        {/* Bulk Generate Button */}
        {selectedIds.length > 0 && activeTab === "pending" && (
          <button
            onClick={handleBulkGenerate}
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-600"
          >
            Generate ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search item name..."
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
          <Table className="w-full min-w-[1000px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-10 text-center">
                  <Checkbox
                    className="size-4.5"
                    checked={isAllPageSelected}
                    indeterminate={isSomePageSelected}
                    onChange={(e: any) => handleSelectAll(e.target.checked)}
                  />
                </Th>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                <Th className="text-[11px]">Item Name</Th>
                <Th className="text-[11px] text-center">MRP</Th>
                <Th className="text-[11px] text-center">Stock</Th>
                <Th className="text-[11px]">Manual Barcode</Th>
                <Th className="text-[11px]">Generated Barcode</Th>
                <Th className="w-28 text-center text-[11px]">Action</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => {
                const isRowSelected = selectedIds.includes(item.id);
                return (
                  <Tr
                    key={item.id}
                    className={`${
                      isRowSelected ? "dark:bg-dark-600/30 bg-gray-50/50" : ""
                    } dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle`}
                  >
                    <Td className="py-3 text-center">
                      <Checkbox
                        className="size-4.5"
                        checked={isRowSelected}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-500 text-center font-medium">
                      {indexOfFirstItem + index + 1}
                    </Td>
                    <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.itemName}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300 text-center">
                      {item.mrp}
                    </Td>
                    <Td className="py-3 text-[12px] text-center">
                      <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {item.stock}
                      </span>
                    </Td>
                    
                    {/* Manual Barcode Column - Input + Save Button */}
                    <Td className="py-3">
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder="Enter barcode"
                          className="h-8 w-32 text-[12px]"
                          defaultValue={item.manualBarcode}
                          onChange={(e) => {
                            // Handle input change if needed
                            item.manualBarcode = e.target.value;
                          }}
                        />
                        <button
                          onClick={() => handleSaveManualBarcode(item.id, item.manualBarcode)}
                          className="rounded bg-primary-500 px-2.5 py-1 text-[10px] font-medium text-white transition hover:bg-primary-600"
                        >
                          Save
                        </button>
                      </div>
                    </Td>

                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      <span className="inline-flex rounded bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        {item.generatedBarcode}
                      </span>
                    </Td>
                    
                    {/* Action Column */}
                    <Td className="py-3 text-center">
                      <button
                        onClick={() => handleGenerate(item.id)}
                        className="rounded bg-primary-500 px-3 py-1 text-[11px] font-medium text-white transition hover:bg-primary-600"
                      >
                        Action
                      </button>
                    </Td>
                  </Tr>
                );
              })}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={8} className="py-12 text-center text-gray-400 dark:text-gray-500">
                    No items found
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