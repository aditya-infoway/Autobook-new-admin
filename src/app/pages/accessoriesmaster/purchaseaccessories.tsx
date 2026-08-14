import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  FunnelIcon,
  ArrowPathIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Checkbox } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_PURCHASES = [
  {
    id: 1,
    purchaseDate: "31-07-2026",
    terms: "Credit",
    supplierName: "ABC Suppliers",
    billNo: "B/26-27/001",
    purchaseBillNo: "PB-001",
    location: "Main Branch",
    totalQuantity: 10,
    totalAmount: "1,25,000",
    freightInsuranceOther: "1,200",
    cgstAmount: "11,250",
    sgstAmount: "11,250",
    igstAmount: "0",
    grandTotal: "1,48,700",
    transportName: "Fast Logistics",
    mobileNo: "9876543210",
    vehicleNo: "MH-12-AB-1234",
    status: "Completed",
  },
  {
    id: 2,
    purchaseDate: "30-07-2026",
    terms: "Cash",
    supplierName: "XYZ Traders",
    billNo: "B/26-27/002",
    purchaseBillNo: "PB-002",
    location: "North Branch",
    totalQuantity: 5,
    totalAmount: "85,000",
    freightInsuranceOther: "800",
    cgstAmount: "7,650",
    sgstAmount: "7,650",
    igstAmount: "0",
    grandTotal: "1,01,100",
    transportName: "Express Movers",
    mobileNo: "8765432109",
    vehicleNo: "MH-14-CD-5678",
    status: "Pending",
  },
  {
    id: 3,
    purchaseDate: "29-07-2026",
    terms: "Bank",
    supplierName: "MNO Enterprises",
    billNo: "B/26-27/003",
    purchaseBillNo: "PB-003",
    location: "South Branch",
    totalQuantity: 20,
    totalAmount: "2,50,000",
    freightInsuranceOther: "2,500",
    cgstAmount: "22,500",
    sgstAmount: "22,500",
    igstAmount: "0",
    grandTotal: "2,97,500",
    transportName: "Speed Cargo",
    mobileNo: "7654321098",
    vehicleNo: "MH-10-EF-9012",
    status: "In Progress",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function PurchaseAccessories() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleAdd = () => {
    navigate("/accessoriesmaster/addpurchasebill");
  };

  const handleAction = (item: any) => {
    navigate("/accessoriesmaster/accessoriespurchaseitem");
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_PURCHASES.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.supplierName.toLowerCase().includes(searchLower) ||
      item.billNo.toLowerCase().includes(searchLower) ||
      item.purchaseBillNo.toLowerCase().includes(searchLower) ||
      item.transportName.toLowerCase().includes(searchLower) ||
      item.vehicleNo.toLowerCase().includes(searchLower)
    );
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
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Purchase Accessories Register
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all accessories purchase bills
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Export Excel */}
          <button
            title="Export Excel"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50"
          >
            <FaFileExcel className="h-6 w-6 text-emerald-600" />
          </button>

          {/* Export PDF */}
          <button
            title="Export PDF"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:bg-red-50"
          >
            <FaFilePdf className="h-6 w-6 text-red-600" />
          </button>

          {/* Refresh */}
          <button
            title="Refresh"
            onClick={handleRefresh}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
          >
            <ArrowPathIcon className="h-6 w-6 text-gray-600" />
          </button>

          {/* Add Purchase Accessories */}
          <button
            onClick={handleAdd}
            className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition"
          >
            <PlusIcon className="h-4 w-4" />
            Add Purchase Accessories
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by supplier, bill no, or vehicle..."
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
          <Table className="w-full min-w-[1600px]">
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
                <Th className="w-16 text-center text-[11px]">Action</Th>
                <Th className="text-[11px]">Purchase Date</Th>
                <Th className="text-[11px]">Terms</Th>
                <Th className="text-[11px]">Supplier Name</Th>
                <Th className="text-[11px]">Bill No.</Th>
                <Th className="text-[11px]">Purchase Bill No.</Th>
                <Th className="text-[11px]">Location</Th>
                <Th className="text-center text-[11px]">Total Quantity</Th>
                <Th className="text-right text-[11px]">Total Amount</Th>
                <Th className="text-right text-[11px]">
                  Freight + Ins. + Other
                </Th>
                <Th className="text-right text-[11px]">CGST Amount</Th>
                <Th className="text-right text-[11px]">SGST Amount</Th>
                <Th className="text-right text-[11px]">IGST Amount</Th>
                <Th className="text-right text-[11px]">Grand Total</Th>
                <Th className="text-[11px]">Transport Name</Th>
                <Th className="text-[11px]">Mobile No</Th>
                <Th className="text-[11px]">Vehicle No</Th>
                <Th className="text-[11px]">Status</Th>
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
                    } dark:hover:bg-dark-700/40 align-middle transition-colors hover:bg-gray-50/30`}
                  >
                    <Td className="py-3 text-center">
                      <Checkbox
                        className="size-4.5"
                        checked={isRowSelected}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </Td>
                    <Td className="py-3 text-center text-[12px] font-medium text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </Td>

                    {/* Action Column - Down Arrow Icon */}
                    <Td className="py-3 text-center">
                      <button
                        onClick={() => handleAction(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                        title="View Details"
                      >
                        <ChevronDownIcon className="h-4 w-4" />
                      </button>
                    </Td>

                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.purchaseDate}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.terms}
                    </Td>
                    <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.supplierName}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.billNo}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.purchaseBillNo}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.location}
                    </Td>
                    <Td className="py-3 text-center text-[12px] font-semibold text-gray-900 dark:text-white">
                      {item.totalQuantity}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.totalAmount}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.freightInsuranceOther}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.cgstAmount}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.sgstAmount}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.igstAmount}
                    </Td>
                    <Td className="py-3 text-right text-[12px] font-bold text-gray-900 dark:text-white">
                      ₹{item.grandTotal}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.transportName}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.mobileNo}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.vehicleNo}
                    </Td>
                    <Td className="py-3 text-[12px]">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : item.status === "In Progress"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </Td>
                  </Tr>
                );
              })}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={20}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
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
