import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  XMarkIcon,
  ArrowLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Input, Button } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_ITEMS = [
  {
    id: 1,
    modelName: "ACCESS 125",
    item: "Seat Cover",
    itemCode: "SC-001",
    hsnCode: "8714.99",
    unit: "PCS",
    group: "Seats",
    quantity: 5,
    purchasePrice: "450",
    gstPercent: "18",
    netAmount: "2,655",
    status: "Active",
    inward: "Completed",
  },
  {
    id: 2,
    modelName: "BURGMAN STREET",
    item: "Floor Mat",
    itemCode: "FM-002",
    hsnCode: "8708.99",
    unit: "PCS",
    group: "Floorings",
    quantity: 10,
    purchasePrice: "250",
    gstPercent: "12",
    netAmount: "2,800",
    status: "Active",
    inward: "Pending",
  },
  {
    id: 3,
    modelName: "GIXXER SF",
    item: "Side Mirror",
    itemCode: "SM-003",
    hsnCode: "7009.10",
    unit: "SET",
    group: "Mirrors",
    quantity: 2,
    purchasePrice: "600",
    gstPercent: "18",
    netAmount: "1,416",
    status: "Inactive",
    inward: "In Progress",
  },
];

// ─── ADD TRANSPORT DETAILS DRAWER ──────────────────────────────────────────

function TransportDetailsDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [transportName, setTransportName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");

  const handleSave = () => {
    console.log("Saving Transport Details:", { transportName, mobileNo, vehicleNo });
    onClose();
  };

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
                <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition-all duration-300">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-gray-800">
                    
                    {/* Header (Primary Blue) */}
                    <div className="flex items-center justify-between bg-primary-500 px-5 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Add Transport Details
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Body Content */}
                    <div className="flex-1 p-6 space-y-4">
                      {/* Transport Name */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Transport Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter transport name"
                          value={transportName}
                          onChange={(e) => setTransportName(e.target.value)}
                          className="w-full"
                        />
                      </div>

                      {/* Mobile No */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Mobile No
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter mobile number"
                          value={mobileNo}
                          onChange={(e) => setMobileNo(e.target.value)}
                          className="w-full"
                        />
                      </div>

                      {/* Vehicle No */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Vehicle No
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter vehicle number"
                          value={vehicleNo}
                          onChange={(e) => setVehicleNo(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
                      <Button
                        variant="outlined"
                        color="neutral"
                        onClick={onClose}
                        className="h-10 min-w-[100px]"
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onClick={handleSave}
                        className="h-10 min-w-[100px]"
                      >
                        Add
                      </Button>
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

export default function AccessoriesPurchaseItem() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6">
      {/* Header with Back & Add Buttons */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">
            Accessories Purchase Item
          </h1>
          <div className="mt-1 h-[2px] w-12 bg-primary-500" />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 rounded bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add</span>
          </button>
          <button
            onClick={handleBack}
            className="flex cursor-pointer items-center gap-1.5 rounded bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1000px]">
            <THead className="bg-gray-100 dark:bg-gray-700/60">
              <Tr>
                <Th className="text-[11px]">Model Name</Th>
                <Th className="text-[11px]">Item</Th>
                <Th className="text-[11px]">Item Code</Th>
                <Th className="text-[11px]">HSN Code</Th>
                <Th className="text-[11px]">Unit</Th>
                <Th className="text-[11px]">Group</Th>
                <Th className="text-[11px] text-center">Quantity</Th>
                <Th className="text-[11px] text-right">Purchase Price</Th>
                <Th className="text-[11px] text-center">GST %</Th>
                <Th className="text-[11px] text-right">Net Amount</Th>
                <Th className="text-[11px]">Status</Th>
                <Th className="text-[11px]">Inward</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {STATIC_ITEMS.map((item) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.modelName}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.item}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.itemCode}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.hsnCode}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.unit}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.group}</Td>
                  <Td className="py-3 text-[12px] text-center font-semibold text-gray-900 dark:text-white">
                    {item.quantity}
                  </Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300 text-right">
                    ₹{item.purchasePrice}
                  </Td>
                  <Td className="py-3 text-[12px] text-center text-gray-700 dark:text-gray-300">
                    {item.gstPercent}%
                  </Td>
                  <Td className="py-3 text-[12px] font-semibold text-gray-900 dark:text-white text-right">
                    ₹{item.netAmount}
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
                  <Td className="py-3 text-[12px]">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.inward === "Completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : item.inward === "In Progress"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {item.inward}
                    </span>
                  </Td>
                </Tr>
              ))}
              {STATIC_ITEMS.length === 0 && (
                <Tr>
                  <Td colSpan={12} className="py-12 text-center text-gray-400 dark:text-gray-500">
                    No items found
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </div>
      </div>

      {/* Add Transport Details Drawer */}
      <TransportDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}