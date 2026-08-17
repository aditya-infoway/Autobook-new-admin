import React, { useState, Fragment } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  PlusIcon,
  EyeIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Checkbox } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_VEHICLE_VERIFY = [
  {
    id: 1,
    accountName: "Jayant Meghnath Dhakul",
    mobileNo: "9423025378",
    qNo: "Q/26-27/1001",
    dmsEnquiryNo: "ENQ/2026/0311",
    dmsEnquiryDate: "30-07-2026",
    salesEx: "Tanuja Jadhav",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl Precious White",
    chassisNo: "MB8A1B2C3D4E5F678",
    accessoriesVSLNo: "VSL-001",
    accessoriesVSLDate: "30-07-2026",
    noOfAccessories: 3,
    allotted: 2,
    pending: 1,
  },
  {
    id: 2,
    accountName: "Renuka Sudhakar Lad",
    mobileNo: "8888811111",
    qNo: "Q/26-27/1002",
    dmsEnquiryNo: "ENQ/2026/0310",
    dmsEnquiryDate: "29-07-2026",
    salesEx: "Rakesh Narkhede",
    model: "ACCESS 125",
    variant: "DISC",
    colour: "Pearl Grace White",
    chassisNo: "MB8A9Z8Y7X6W5V4U3",
    accessoriesVSLNo: "VSL-002",
    accessoriesVSLDate: "29-07-2026",
    noOfAccessories: 5,
    allotted: 5,
    pending: 0,
  },
  {
    id: 3,
    accountName: "Sachin Tendulkar",
    mobileNo: "9999988888",
    qNo: "Q/26-27/1003",
    dmsEnquiryNo: "ENQ/2026/0305",
    dmsEnquiryDate: "28-07-2026",
    salesEx: "Admin",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    chassisNo: "MB8A1A2B3C4D5E6F7",
    accessoriesVSLNo: "VSL-003",
    accessoriesVSLDate: "28-07-2026",
    noOfAccessories: 2,
    allotted: 0,
    pending: 2,
  },
];

const STATIC_ACCESSORIES = [
  {
    id: 1,
    item: "Seat Cover",
    itemCode: "SC-001",
    hsnCode: "8714.99",
    status: "Active",
  },
  {
    id: 2,
    item: "Floor Mat",
    itemCode: "FM-002",
    hsnCode: "8708.99",
    status: "Active",
  },
  {
    id: 3,
    item: "Mudguard Set",
    itemCode: "MS-003",
    hsnCode: "8712.00",
    status: "Inactive",
  },
  {
    id: 4,
    item: "Side Mirror",
    itemCode: "SM-004",
    hsnCode: "7009.10",
    status: "Active",
  },
];

const STATIC_PENDING_ACCESSORIES = [
  {
    id: 1,
    item: "Seat Cover",
    itemCode: "SC-001",
    hsnCode: "8714.99",
    status: "Pending",
  },
  {
    id: 2,
    item: "Floor Mat",
    itemCode: "FM-002",
    hsnCode: "8708.99",
    status: "Pending",
  },
];

// ─── ACCESSORIES VERIFY MODAL ──────────────────────────────────────────────

// ─── ACCESSORIES VERIFY DRAWER ─────────────────────────────────────────────

function AccessoriesVerifyDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 dark:bg-black/60" />
        </Transition.Child>

        {/* Right Slide Panel Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-full transform transition-all duration-300 md:max-w-2xl">
                  <div className="flex h-full max-h-screen flex-col bg-white shadow-xl dark:bg-gray-800">
                    
                    {/* Header - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex items-center justify-between bg-primary-600 px-4 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Accessories Verify
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="rounded-full p-1 text-white/80 transition hover:text-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Body Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                      <div className="overflow-x-auto">
                        <Table className="w-full min-w-[500px]">
                          <THead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                            <Tr>
                              <Th className="w-12 text-center text-[11px]">
                                Sr No.
                              </Th>
                              <Th className="text-[11px]">Item</Th>
                              <Th className="text-[11px]">Item Code</Th>
                              <Th className="text-[11px]">HSN Code</Th>
                              <Th className="text-[11px]">Status</Th>
                              <Th className="text-center text-[11px]">
                                Action
                              </Th>
                            </Tr>
                          </THead>
                          <TBody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {STATIC_ACCESSORIES.map((item, index) => (
                              <Tr key={item.id} className="align-middle">
                                <Td className="py-3 text-center text-[12px] font-medium text-gray-500">
                                  {index + 1}
                                </Td>
                                <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                                  {item.item}
                                </Td>
                                <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                                  {item.itemCode}
                                </Td>
                                <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                                  {item.hsnCode}
                                </Td>
                                <Td className="py-3 text-[12px]">
                                  <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    {item.status}
                                  </span>
                                </Td>
                                <Td className="py-3 text-center">
                                  <button className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-green-500 text-green-600 transition hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20">
                                    <CheckIcon className="h-4 w-4" />
                                  </button>
                                </Td>
                              </Tr>
                            ))}
                          </TBody>
                        </Table>
                      </div>
                    </div>

                    {/* Footer Actions - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex gap-2 border-t border-gray-200 px-4 py-4 dark:border-gray-700 sm:justify-end sm:gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:flex-none sm:min-w-[120px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700 sm:flex-none sm:min-w-[120px]"
                      >
                        Verify All
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
// ─── PENDING VIEW MODAL ─────────────────────────────────────────────────────

// ─── PENDING VIEW DRAWER ───────────────────────────────────────────────────

function PendingViewDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 dark:bg-black/60" />
        </Transition.Child>

        {/* Right Slide Panel Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-full transform transition-all duration-300 md:max-w-2xl">
                  <div className="flex h-full max-h-screen flex-col bg-white shadow-xl dark:bg-gray-800">
                    
                    {/* Header - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex items-center justify-between bg-primary-600 px-4 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Pending Accessories
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="rounded-full p-1 text-white/80 transition hover:text-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Body Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                      <div className="overflow-x-auto">
                        <Table className="w-full min-w-[500px]">
                          <THead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                            <Tr>
                              <Th className="w-12 text-center text-[11px]">
                                Sr No.
                              </Th>
                              <Th className="text-[11px]">Item</Th>
                              <Th className="text-[11px]">Item Code</Th>
                              <Th className="text-[11px]">HSN Code</Th>
                              <Th className="text-[11px]">Status</Th>
                            </Tr>
                          </THead>
                          <TBody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {STATIC_PENDING_ACCESSORIES.map((item, index) => (
                              <Tr key={item.id} className="align-middle">
                                <Td className="py-3 text-center text-[12px] font-medium text-gray-500">
                                  {index + 1}
                                </Td>
                                <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                                  {item.item}
                                </Td>
                                <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                                  {item.itemCode}
                                </Td>
                                <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                                  {item.hsnCode}
                                </Td>
                                <Td className="py-3 text-[12px]">
                                  <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-[10px] font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                    {item.status}
                                  </span>
                                </Td>
                              </Tr>
                            ))}
                          </TBody>
                        </Table>
                      </div>
                    </div>

                    {/* Footer Actions - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex gap-2 border-t border-gray-200 px-4 py-4 dark:border-gray-700 sm:justify-end sm:gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:flex-none sm:min-w-[120px]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function VehicleVerify() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_VEHICLE_VERIFY.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.accountName.toLowerCase().includes(searchLower) ||
      item.mobileNo.includes(search) ||
      item.qNo.toLowerCase().includes(searchLower) ||
      item.dmsEnquiryNo.toLowerCase().includes(searchLower) ||
      item.chassisNo.toLowerCase().includes(searchLower)
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
            Vehicle Verify
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Verify accessories for vehicles
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
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
          placeholder="Search by account, mobile, or Q.No..."
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
          <Table className="w-full min-w-[1500px]">
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
                <Th className="w-16 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">Account Name</Th>
                <Th className="text-[11px]">Mobile No</Th>
                <Th className="text-[11px]">Q.No</Th>
                <Th className="text-[11px]">DMS Enquiry No</Th>
                <Th className="text-[11px]">DMS Enquiry Date</Th>
                <Th className="text-[11px]">Sales Ex.</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px]">Chassis No.</Th>
                <Th className="text-[11px]">Accessories VSL No</Th>
                <Th className="text-[11px]">Accessories VSL Date</Th>
                <Th className="text-center text-[11px]">No of Accessories</Th>
                <Th className="text-center text-[11px]">Alloted</Th>
                <Th className="text-center text-[11px]">Pending</Th>
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
                    <Td className="py-4 text-center">
                      <Checkbox
                        className="size-4.5"
                        checked={isRowSelected}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </Td>
                    <Td className="py-4 text-center text-[12px] font-medium text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </Td>
                    <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.accountName}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.mobileNo}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.qNo}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.dmsEnquiryNo}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.dmsEnquiryDate}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.salesEx}
                    </Td>
                    <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.model}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.variant}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.colour}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.chassisNo}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.accessoriesVSLNo}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.accessoriesVSLDate}
                    </Td>
                    <Td className="py-4 text-center text-[12px] font-bold text-gray-900 dark:text-white">
                      {item.noOfAccessories}
                    </Td>

                    {/* ALLOTED COLUMN */}
                    <Td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Plus Icon */}
                        <button
                          onClick={() => setIsVerifyModalOpen(true)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          title="Verify Accessories"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                        {/* Check Icon */}
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-green-500 text-green-600 transition hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                          title="Allot All"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </Td>

                    {/* PENDING COLUMN */}
                    <Td className="py-4 text-center">
                      <button
                        onClick={() => setIsPendingModalOpen(true)}
                        className="inline-flex items-center gap-1 rounded-md border border-blue-500 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        View
                      </button>
                    </Td>
                  </Tr>
                );
              })}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={17}
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

      {/* Accessories Verify Modal */}
      <AccessoriesVerifyDrawer
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      {/* Pending View Modal */}
      <PendingViewDrawer
        isOpen={isPendingModalOpen}
        onClose={() => setIsPendingModalOpen(false)}
      />
    </div>
  );
}
