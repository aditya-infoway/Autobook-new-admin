import React, { useState, Fragment } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
  FunnelIcon,
  ArrowPathIcon,
  PlusIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Checkbox } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import { Input } from "@/components/ui";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_ACCESSORIES = [
  {
    id: 1,
    type: "Accessories",
    item: "MATTIN",
    codeNo: "99-167-52",
    shortName: "MATTIN",
    hsnCode: "87141090",
    taxSlab: "18%",
    listOfGroup: "Seats",
    unit: "PCS",
    modelType: "2 Wheeler",
    vehicleType: "2 Wheeler",
    purchasePrice: "268.85",
    salesPrice: "327.96",
    mrp: "387",
    barcode: "TM0000001",
    openingStock: "2",
  },
  {
    id: 2,
    type: "Parts",
    item: "FOOTREST",
    codeNo: "43000-12",
    shortName: "FOOTREST",
    hsnCode: "87149990",
    taxSlab: "12%",
    listOfGroup: "Footrests",
    unit: "PCS",
    modelType: "2 Wheeler",
    vehicleType: "2 Wheeler",
    purchasePrice: "180.50",
    salesPrice: "220.00",
    mrp: "250",
    barcode: "TM0000002",
    openingStock: "10",
  },
  {
    id: 3,
    type: "Accessories",
    item: "SEAT COVER",
    codeNo: "99-168-10",
    shortName: "SEAT",
    hsnCode: "94019000",
    taxSlab: "18%",
    listOfGroup: "Covers",
    unit: "PCS",
    modelType: "2 Wheeler",
    vehicleType: "2 Wheeler",
    purchasePrice: "450.00",
    salesPrice: "550.00",
    mrp: "650",
    barcode: "TM0000003",
    openingStock: "5",
  },
];

// ─── STATIC OPTIONS FOR DROPDOWNS ──────────────────────────────────────────

const STATIC_TAX_SLABS = [
  { id: 1, name: "5%" },
  { id: 2, name: "12%" },
  { id: 3, name: "18%" },
  { id: 4, name: "28%" },
];

const STATIC_GROUPS = [
  { id: 1, name: "Seats" },
  { id: 2, name: "Footrests" },
  { id: 3, name: "Covers" },
  { id: 4, name: "Lights" },
];

const STATIC_UNITS = [
  { id: 1, name: "PCS" },
  { id: 2, name: "KG" },
  { id: 3, name: "LTR" },
  { id: 4, name: "BOX" },
];

const STATIC_MODEL_TYPES = [
  { id: 1, name: "2 Wheeler" },
  { id: 2, name: "3 Wheeler" },
  { id: 3, name: "4 Wheeler" },
];

const STATIC_VEHICLE_TYPES = [
  { id: 1, name: "2 Wheeler" },
  { id: 2, name: "3 Wheeler" },
  { id: 3, name: "4 Wheeler" },
];

const STATIC_VARIANTS = [
  { id: 1, name: "DISC RC ABS" },
  { id: 2, name: "DISC" },
  { id: 3, name: "STANDARD" },
  { id: 4, name: "SPORT" },
];

// ─── ACCESSORIES ITEM DRAWER (MODAL) ──────────────────────────────────────

// ─── ACCESSORIES ITEM DRAWER (MODAL) ──────────────────────────────────────

function AccessoriesItemDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [type, setType] = useState<"Accessories" | "Parts">("Accessories");
  const [barcodeSetup, setBarcodeSetup] = useState<"Manual" | "Automatic">(
    "Manual",
  );

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
                <DialogPanel className="pointer-events-auto w-screen max-w-full transform transition-all duration-300 md:max-w-4xl">
                  <div className="flex h-full max-h-screen flex-col bg-white shadow-xl dark:bg-gray-800">
                    {/* Header - Fixed */}
                    <div className="bg-primary-700 flex flex-shrink-0 items-center justify-between px-4 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Add Accessories Item
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
                      <div className="space-y-4">
                        {/* Type Radio Buttons */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Type :
                          </label>
                          <div className="flex gap-4">
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name="type"
                                value="Accessories"
                                checked={type === "Accessories"}
                                onChange={() => setType("Accessories")}
                                className="accent-blue-600"
                              />
                              Accessories
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name="type"
                                value="Parts"
                                checked={type === "Parts"}
                                onChange={() => setType("Parts")}
                                className="accent-blue-600"
                              />
                              Parts
                            </label>
                          </div>
                        </div>

                        {/* Form Grid - Responsive */}
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                          {/* Item Name */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Item Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter item name"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* Code No */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Code No <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter code no"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* Short Name */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Short Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter short name"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* HSN Code */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              HSN Code <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter HSN Code"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* Tax Slab */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Tax Slab <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_TAX_SLABS}
                                displayField="name"
                                placeholder="Choose tax slab"
                              />
                            </div>
                          </div>

                          {/* List of Group */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              List of Group{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_GROUPS}
                                displayField="name"
                                placeholder="Select group"
                              />
                            </div>
                          </div>

                          {/* Unit */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Unit <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_UNITS}
                                displayField="name"
                                placeholder="Select unit"
                              />
                            </div>
                          </div>

                          {/* Model Type */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Model Type <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_MODEL_TYPES}
                                displayField="name"
                                placeholder="Select model type"
                              />
                            </div>
                          </div>

                          {/* Vehicle Type */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Vehicle Type{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_VEHICLE_TYPES}
                                displayField="name"
                                placeholder="Select vehicle type"
                              />
                            </div>
                          </div>

                          {/* Purchase Price */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Purchase Price (Without GST){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="number"
                              placeholder="Enter purchase price"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* Sales Price */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Sales Price (Without GST){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="number"
                              placeholder="Enter sales price"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* MRP */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              MRP <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="number"
                              placeholder="Enter MRP"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* Op. Stock */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Op. Stock <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="number"
                              placeholder="Enter opening stock"
                              className="mt-1 w-full"
                            />
                          </div>

                          {/* Variant */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Variant <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <Combobox
                                data={STATIC_VARIANTS}
                                displayField="name"
                                placeholder="Select variant"
                              />
                            </div>
                          </div>

                          {/* Barcode Setup - Radio Buttons */}
                          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Barcode Setup
                            </label>
                            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                              <label className="flex cursor-pointer items-center gap-2 text-sm">
                                <input
                                  type="radio"
                                  name="barcodeSetup"
                                  value="Manual"
                                  checked={barcodeSetup === "Manual"}
                                  onChange={() => setBarcodeSetup("Manual")}
                                  className="accent-blue-600"
                                />
                                Manually
                              </label>
                              <label className="flex cursor-pointer items-center gap-2 text-sm">
                                <input
                                  type="radio"
                                  name="barcodeSetup"
                                  value="Automatic"
                                  checked={barcodeSetup === "Automatic"}
                                  onChange={() => setBarcodeSetup("Automatic")}
                                  className="accent-blue-600"
                                />
                                Generates Automatically
                              </label>
                            </div>
                            {barcodeSetup === "Manual" && (
                              <Input
                                type="text"
                                placeholder="Enter barcode manually"
                                className="mt-2 w-full"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions - Fixed */}
                    <div className="flex flex-shrink-0 gap-2 border-t border-gray-200 px-4 py-4 sm:justify-end sm:gap-3 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:min-w-[120px] sm:flex-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="bg-primary-600 hover:bg-primary-700 flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white sm:min-w-[120px] sm:flex-none"
                      >
                        Save
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

export default function AccessoriesItem() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleEdit = (item: any) => {
    console.log("Editing item:", item);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting item ${id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_ACCESSORIES.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.item.toLowerCase().includes(searchLower) ||
      item.codeNo.toLowerCase().includes(searchLower) ||
      item.shortName.toLowerCase().includes(searchLower) ||
      item.hsnCode.toLowerCase().includes(searchLower)
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
            Accessories Item
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage accessories and parts inventory
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
    className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
  >
    <ArrowPathIcon className="h-6 w-6 text-gray-600" />
  </button>

  {/* Add Accessories Item */}
  <button
    onClick={() => setIsDrawerOpen(true)}
    className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition"
  >
    <PlusIcon className="h-4 w-4" />
    Add Accessories Item
  </button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, code, or HSN..."
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
                <Th className="text-[11px]">Type</Th>
                <Th className="text-[11px]">Item</Th>
                <Th className="text-[11px]">Code No</Th>
                <Th className="text-[11px]">Short Name</Th>
                <Th className="text-[11px]">HSN Code</Th>
                <Th className="text-[11px]">Tax Slab</Th>
                <Th className="text-[11px]">List of Group</Th>
                <Th className="text-[11px]">Unit</Th>
                <Th className="text-[11px]">Model Type</Th>
                <Th className="text-[11px]">Vehicle Type</Th>
                <Th className="text-right text-[11px]">Purchase Price</Th>
                <Th className="text-right text-[11px]">Sales Price</Th>
                <Th className="text-right text-[11px]">MRP</Th>
                <Th className="text-[11px]">Barcode</Th>
                <Th className="text-center text-[11px]">Opening Stock</Th>
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

                    {/* Action Column - Dropdown Menu */}
                    <Td className="py-3 text-center">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <MenuButton className="dark:hover:bg-dark-600 dark:text-dark-200 inline-flex size-7 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100">
                          <EllipsisHorizontalIcon className="size-5" />
                        </MenuButton>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems
                            anchor="bottom end"
                            className="dark:bg-dark-800 dark:ring-dark-500 dark:border-dark-500 z-[100] w-36 rounded-lg border border-gray-100 bg-white p-1 shadow-lg ring-1 ring-black/5 [--anchor-gap:4px] focus:outline-none"
                          >
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => handleEdit(item)}
                                  className={`${
                                    active
                                      ? "dark:bg-dark-600 text-primary-600 bg-gray-50 dark:text-white"
                                      : "dark:text-dark-200 text-gray-700"
                                  } flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium`}
                                >
                                  <PencilSquareIcon className="size-4" />
                                  Edit
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  className={`${
                                    active
                                      ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                                      : "dark:text-dark-200 text-gray-700"
                                  } flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium`}
                                >
                                  <TrashIcon className="size-4" />
                                  Delete
                                </button>
                              )}
                            </MenuItem>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </Td>

                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.type}
                    </Td>
                    <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.item}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.codeNo}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.shortName}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.hsnCode}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.taxSlab}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.listOfGroup}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.unit}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.modelType}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.vehicleType}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.purchasePrice}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.salesPrice}
                    </Td>
                    <Td className="py-3 text-right text-[12px] text-gray-700 dark:text-gray-300">
                      ₹{item.mrp}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.barcode}
                    </Td>
                    <Td className="py-3 text-center text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.openingStock}
                    </Td>
                  </Tr>
                );
              })}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={18}
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

      {/* Add Accessories Item Drawer */}
      <AccessoriesItemDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
