import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { DatePicker } from "@/components/shared/form/Datepicker";
// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_VEHICLE_SERIAL = [
  {
    id: 1,
    vehicleSrNo: "VSN-001",
    partyName: "Jayant Meghnath Dhakul",
    billNo: "B/26-27/001",
    purchaseBillNo: "PB-001",
    purchaseDate: "31-07-2026",
    location: "Main Branch",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    itemName: "ACCESS 125",
    itemCode: "AC-001",
    purchasePrice: "85,000",
    tax: "15,300",
    netAmount: "1,00,300",
    chassisNo: "MB8A1B2C3D4E5F678",
    engineNo: "EN-2026-001",
    mfgDate: "01-06-2026",
    keyNo: "K-001",
    batteryMake: "Exide",
    batteryNo: "BT-001",
    fr: "FR-001",
    pr: "PR-001",
    grnNumber: "GRN-001",
    grnDate: "30-07-2026",
    grnRecordDate: "30-07-2026",
    inWardDate: "31-07-2026",
  },
  {
    id: 2,
    vehicleSrNo: "VSN-002",
    partyName: "Renuka Sudhakar Lad",
    billNo: "B/26-27/002",
    purchaseBillNo: "PB-002",
    purchaseDate: "30-07-2026",
    location: "North Branch",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    itemName: "ACCESS 125",
    itemCode: "AC-002",
    purchasePrice: "82,000",
    tax: "14,760",
    netAmount: "96,760",
    chassisNo: "MB8A9Z8Y7X6W5V4U3",
    engineNo: "EN-2026-002",
    mfgDate: "15-05-2026",
    keyNo: "K-002",
    batteryMake: "Amaron",
    batteryNo: "BT-002",
    fr: "FR-002",
    pr: "PR-002",
    grnNumber: "GRN-002",
    grnDate: "29-07-2026",
    grnRecordDate: "29-07-2026",
    inWardDate: "30-07-2026",
  },
  {
    id: 3,
    vehicleSrNo: "VSN-003",
    partyName: "Sachin Tendulkar",
    billNo: "B/26-27/003",
    purchaseBillNo: "PB-003",
    purchaseDate: "29-07-2026",
    location: "South Branch",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    itemName: "BURGMAN STREET",
    itemCode: "BS-001",
    purchasePrice: "1,10,000",
    tax: "19,800",
    netAmount: "1,29,800",
    chassisNo: "MB8A1A2B3C4D5E6F7",
    engineNo: "EN-2026-003",
    mfgDate: "10-06-2026",
    keyNo: "K-003",
    batteryMake: "Exide",
    batteryNo: "BT-003",
    fr: "FR-003",
    pr: "PR-003",
    grnNumber: "GRN-003",
    grnDate: "28-07-2026",
    grnRecordDate: "28-07-2026",
    inWardDate: "29-07-2026",
  },
  {
    id: 4,
    vehicleSrNo: "VSN-004",
    partyName: "Amit Kumar",
    billNo: "B/26-27/004",
    purchaseBillNo: "PB-004",
    purchaseDate: "28-07-2026",
    location: "East Branch",
    model: "GIXXER SF",
    variant: "SPORT",
    colour: "Metallic Red",
    itemName: "GIXXER SF",
    itemCode: "GS-001",
    purchasePrice: "95,000",
    tax: "17,100",
    netAmount: "1,12,100",
    chassisNo: "MB8A1G2H3I4J5K6L7",
    engineNo: "EN-2026-004",
    mfgDate: "20-05-2026",
    keyNo: "K-004",
    batteryMake: "Amaron",
    batteryNo: "BT-004",
    fr: "FR-004",
    pr: "PR-004",
    grnNumber: "GRN-004",
    grnDate: "27-07-2026",
    grnRecordDate: "27-07-2026",
    inWardDate: "28-07-2026",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function VehicleSerialRegister() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
   const [dateRange] = useState("01-08-2026 - 05-08-2026");

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_VEHICLE_SERIAL.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.vehicleSrNo.toLowerCase().includes(searchLower) ||
      item.partyName.toLowerCase().includes(searchLower) ||
      item.billNo.toLowerCase().includes(searchLower) ||
      item.purchaseBillNo.toLowerCase().includes(searchLower) ||
      item.chassisNo.toLowerCase().includes(searchLower) ||
      item.engineNo.toLowerCase().includes(searchLower) ||
      item.grnNumber.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Vehicle Serial Register
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Track vehicle serial and GRN details
          </p>
        </div>

       <div className="flex items-center justify-end gap-3">
  {/* Date Filter */}
 <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white py-1.5 text-xs text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
          <DatePicker
            options={{
              mode: "range",
              dateFormat: "d-m-Y",
              defaultDate: ["2026-01-07", "2026-07-28"],
            }}
            placeholder="Select date range..."
            className="w-54 border-none bg-transparent p-0 text-xs text-gray-700 focus:ring-0 focus:outline-none dark:text-gray-200"
          />
        </div>


  {/* Action Buttons */}
 <div className="flex items-center gap-1.5">
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
    onClick={handleRefresh}
    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
  >
    <ArrowPathIcon className="h-6 w-6 text-gray-500" />
  </button>
</div>
</div>

      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by party, bill, chassis, or GRN..."
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
          <Table className="w-full min-w-[2500px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">Vehicle Sr. No.</Th>
                <Th className="text-[11px]">Party Name</Th>
                <Th className="text-[11px]">Bill No</Th>
                <Th className="text-[11px]">Purchase Bill No.</Th>
                <Th className="text-[11px]">Purchase Date</Th>
                <Th className="text-[11px]">Location</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px]">Item Name</Th>
                <Th className="text-[11px]">Item Code</Th>
                <Th className="text-[11px] text-right">Purchase Price</Th>
                <Th className="text-[11px] text-center">Tax</Th>
                <Th className="text-[11px] text-right">Net Amount</Th>
                <Th className="text-[11px]">Chassis No</Th>
                <Th className="text-[11px]">Engine No</Th>
                <Th className="text-[11px]">MFG Date</Th>
                <Th className="text-[11px]">Key No</Th>
                <Th className="text-[11px]">Battery Make</Th>
                <Th className="text-[11px]">Battery No</Th>
                <Th className="text-[11px]">FR</Th>
                <Th className="text-[11px]">PR</Th>
                <Th className="text-[11px]">GRN Number</Th>
                <Th className="text-[11px]">GRN Date</Th>
                <Th className="text-[11px]">GRN Record Date</Th>
                <Th className="text-[11px]">In-Ward Date</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-[12px] text-gray-500 text-center font-medium">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.vehicleSrNo}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.partyName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.billNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.purchaseBillNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.purchaseDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.location}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.model}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.variant}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.colour}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.itemName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.itemCode}</Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    ₹{item.purchasePrice}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300 text-center">
                    {item.tax}
                  </Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    ₹{item.netAmount}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.chassisNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.engineNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.mfgDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.keyNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.batteryMake}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.batteryNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.fr}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.pr}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.grnNumber}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.grnDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.grnRecordDate}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.inWardDate}</Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={27} className="py-12 text-center text-gray-400 dark:text-gray-500">
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