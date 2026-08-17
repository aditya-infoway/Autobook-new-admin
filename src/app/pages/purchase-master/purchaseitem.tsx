import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  FunnelIcon,
  ArrowPathIcon,
  PlusIcon,
  XMarkIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Button, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_PURCHASE_ITEMS = [
  {
    id: 1,
    item: "Drum",
    hsnCode: "8714.99",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    color: "Pearl Precious White",
    chassisNo: "MB8EN11AGT8D47657",
    engineNo: "AF291221916",
    vehicleSrNo: "VSR/00747",
    quantity: 1,
    ratePer: "3375.00",
    gstPercent: "18",
    amount: "76834.33",
    status: "Active",
    inward: "Complete",
  },
  {
    id: 2,
    item: "Drum",
    hsnCode: "8714.99",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    color: "Pearl Precious White",
    chassisNo: "MB8EN11AGT8D47658",
    engineNo: "AF291221917",
    vehicleSrNo: "VSR/00748",
    quantity: 1,
    ratePer: "3375.00",
    gstPercent: "18",
    amount: "76834.33",
    status: "Active",
    inward: "Complete",
  },
  {
    id: 3,
    item: "Drum",
    hsnCode: "8714.99",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    color: "Metallic Blue",
    chassisNo: "MB8EN11AGT8D47659",
    engineNo: "AF291221918",
    vehicleSrNo: "VSR/00749",
    quantity: 1,
    ratePer: "7061.00",
    gstPercent: "18",
    amount: "85594.90",
    status: "Active",
    inward: "Complete",
  },
  {
    id: 4,
    item: "Drum",
    hsnCode: "8714.99",
    model: "GIXXER SF",
    variant: "SPORT",
    color: "Metallic Red",
    chassisNo: "MB8EN11AGT8D47660",
    engineNo: "AF291221919",
    vehicleSrNo: "VSR/00750",
    quantity: 1,
    ratePer: "7061.00",
    gstPercent: "18",
    amount: "85594.90",
    status: "Active",
    inward: "Pending",
  },
];

// ─── ADD TRANSPORT DETAILS DRAWER ──────────────────────────────────────────

function AddTransportDetailsDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    transportName: "",
    mobileNo: "",
    vehicleNo: "",
    mfgDate: "",
    grnNumber: "",
    grnDate: "",
    grnRecordDate: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Transport Details Saved:", formData);
    onClose();
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-2xl transform transition-all duration-300">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-gray-800">
                    {/* Header (Primary Theme) */}
                    <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Add Transport Details
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="rounded-full p-1 text-white/80 transition hover:text-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Body Content */}
                    <div className="flex-1 space-y-5 p-6">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Transport Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Transport Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter Transport Name"
                            value={formData.transportName}
                            onChange={(e) =>
                              handleChange("transportName", e.target.value)
                            }
                            className="mt-1 w-full"
                          />
                        </div>

                        {/* Mobile No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mobile No <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter Mobile No"
                            value={formData.mobileNo}
                            onChange={(e) =>
                              handleChange("mobileNo", e.target.value)
                            }
                            className="mt-1 w-full"
                          />
                        </div>

                        {/* Vehicle No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Vehicle No <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter Vehicle No"
                            value={formData.vehicleNo}
                            onChange={(e) =>
                              handleChange("vehicleNo", e.target.value)
                            }
                            className="mt-1 w-full"
                          />
                        </div>

                        {/* MFG Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            MFG Date <span className="text-red-500">*</span>
                          </label>
                          <DatePicker
                            value={formData.mfgDate}
                            onChange={(val) => handleChange("mfgDate", val)}
                            placeholder="DD-MM-YYYY"
                            options={{
                              dateFormat: "d-m-Y",
                              disableMobile: true,
                            }}
                          />
                        </div>

                        {/* GRN Number */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GRN Number <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter GRN Number"
                            value={formData.grnNumber}
                            onChange={(e) =>
                              handleChange("grnNumber", e.target.value)
                            }
                            className="mt-1 w-full"
                          />
                        </div>

                        {/* GRN Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GRN Date <span className="text-red-500">*</span>
                          </label>
                          <DatePicker
                            value={formData.grnDate}
                            onChange={(val) => handleChange("grnDate", val)}
                            placeholder="DD-MM-YYYY"
                            options={{
                              dateFormat: "d-m-Y",
                              disableMobile: true,
                            }}
                          />
                        </div>

                        {/* GRN Record Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GRN Record Date{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <DatePicker
                            value={formData.grnRecordDate}
                            onChange={(val) =>
                              handleChange("grnRecordDate", val)
                            }
                            placeholder="DD-MM-YYYY"
                            options={{
                              dateFormat: "d-m-Y",
                              disableMobile: true,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={onClose}
                        className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg border bg-white px-6 py-2 text-sm font-medium shadow-sm transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="bg-primary-500 hover:bg-primary-600 rounded-lg px-6 py-2 text-sm font-medium text-white shadow-sm transition"
                      >
                        Add
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

// ─── PURCHASE ITEM DETAILS VIEW DRAWER (READ-ONLY) ────────────────────────

function PurchaseItemDetailsDrawer({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}) {
  if (!item) return null;

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-3xl transform transition-all duration-300">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-gray-800">
                    {/* Header (Primary Theme) */}
                    <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Purchase Items Details View
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="rounded-full p-1 text-white/80 transition hover:text-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Body Content - Read Only */}
                    <div className="flex-1 p-6">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {/* Vehicle Sr No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Vehicle Sr No
                          </label>

                          <Input
                            type="text"
                            value={item.vehicleSrNo}
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* Chassis No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Chassis No
                          </label>

                          <Input
                            type="text"
                            value={item.chassisNo}
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* Engine No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Engine No
                          </label>

                          <Input
                            type="text"
                            value={item.engineNo}
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* MFG Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            MFG Date
                          </label>

                          <Input
                            type="text"
                            value="28-07-2026"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* Key No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Key No
                          </label>

                          <Input
                            type="text"
                            value="Q444"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* Battery Make */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Battery Make
                          </label>

                          <Input
                            type="text"
                            value="AMARON"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* Battery No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Battery No
                          </label>

                          <Input
                            type="text"
                            value="WAF4806G601506"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* FR */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            FR
                          </label>

                          <Input
                            type="text"
                            value="2326"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* PR */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            PR
                          </label>

                          <Input
                            type="text"
                            value="2226"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* Location */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Location
                          </label>

                          <Input
                            type="text"
                            value="KUDAL"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* GRN Number */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GRN Number
                          </label>

                          <Input
                            type="text"
                            value="GRN26000031"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* GRN Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GRN Date
                          </label>

                          <Input
                            type="text"
                            value="04-08-2026"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>

                        {/* GRN Record Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GRN Record Date
                          </label>

                          <Input
                            type="text"
                            value="04-08-2026"
                            readOnly
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={onClose}
                        className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg border bg-white px-6 py-2 text-sm font-medium shadow-sm transition"
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

export default function PurchaseItem() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsViewDrawerOpen(true);
  };

  const handleBack = () => {
    navigate("/purchase-master/purchaseregister");
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_PURCHASE_ITEMS.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.item.toLowerCase().includes(searchLower) ||
      item.hsnCode.toLowerCase().includes(searchLower) ||
      item.model.toLowerCase().includes(searchLower) ||
      item.chassisNo.toLowerCase().includes(searchLower) ||
      item.engineNo.toLowerCase().includes(searchLower) ||
      item.vehicleSrNo.toLowerCase().includes(searchLower)
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
            Purchase Item
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage purchase items and inward details
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">

 

  {/* Export Excel */}
  <button
    title="Export Excel"
    className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:bg-emerald-50"
  >
    <FaFileExcel className="h-8 w-8 text-emerald-600" />
  </button>

  {/* Add Transport Details */}
  <button
    onClick={() => setIsAddDrawerOpen(true)}
    className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition"
  >
    <PlusIcon className="h-4 w-4" />
    Add Transport Detail
  </button>
   <button
    onClick={handleBack}
    className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
  >
    <ArrowLeftIcon className="h-4 w-4" />
    <span>Back</span>
  </button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by item, model, chassis..."
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
          <Table className="w-full min-w-[1400px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">#</Th>
                <Th className="text-[11px]">Item</Th>
                <Th className="text-[11px]">HSN Code</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Color</Th>
                <Th className="text-[11px]">Chassis No</Th>
                <Th className="text-[11px]">Engine No</Th>
                <Th className="text-[11px]">Vehicle Sr. No</Th>
                <Th className="text-center text-[11px]">Quantity</Th>
                <Th className="text-right text-[11px]">Rate Per</Th>
                <Th className="text-center text-[11px]">GST %</Th>
                <Th className="text-right text-[11px]">Amount</Th>
                <Th className="text-[11px]">Status</Th>
                <Th className="text-center text-[11px]">Inward</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr
                  key={item.id}
                  className="dark:hover:bg-dark-700/40 align-middle transition-colors hover:bg-gray-50/30"
                >
                  <Td className="py-3 text-center text-[12px] font-medium text-gray-500">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.item}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.hsnCode}
                  </Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.model}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.variant}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.color}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.chassisNo}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.engineNo}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.vehicleSrNo}
                  </Td>
                  <Td className="py-3 text-center text-[12px] font-semibold text-gray-900 dark:text-white">
                    {item.quantity}
                  </Td>
                  <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                    ₹{item.ratePer}
                  </Td>
                  <Td className="py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">
                    {item.gstPercent}%
                  </Td>
                  <Td className="py-3 text-right text-[12px] font-semibold text-gray-900 dark:text-white">
                    ₹{item.amount}
                  </Td>
                  <Td className="py-3 text-[12px]">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </Td>

                  {/* Inward Column - View Icon */}
                  <Td className="py-3 text-center">
                    <button
                      onClick={() => handleView(item)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={15}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
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

      {/* Add Transport Details Drawer */}
      <AddTransportDetailsDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
      />

      {/* Purchase Item Details View Drawer (Read-Only) */}
      <PurchaseItemDetailsDrawer
        isOpen={isViewDrawerOpen}
        onClose={() => setIsViewDrawerOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
