import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input, Select } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";

// Static Data
const variantPriceData = [
  {
    id: 1,
    variantName: "Pro Max",
    model: "iPhone 15 Pro",
    purchasePrice: 85000,
    exShowroomPrice: 95000,
    insurance: 5000,
    roadSideAssistance: 2000,
    rtoCharge: 8000,
    exWarranty23: 3000,
    hypothecationCharge: 1500,
    exWarranty28: 5000,
    createdAt: "25 Jul 2026",
    createdTime: "10:30 AM",
  },
  {
    id: 2,
    variantName: "Ultra",
    model: "Samsung Galaxy S24",
    purchasePrice: 78000,
    exShowroomPrice: 88000,
    insurance: 4500,
    roadSideAssistance: 1800,
    rtoCharge: 7500,
    exWarranty23: 2800,
    hypothecationCharge: 1400,
    exWarranty28: 4800,
    createdAt: "24 Jul 2026",
    createdTime: "02:15 PM",
  },
  {
    id: 3,
    variantName: "DI 4x4",
    model: "Mahindra 265 DI",
    purchasePrice: 450000,
    exShowroomPrice: 480000,
    insurance: 15000,
    roadSideAssistance: 5000,
    rtoCharge: 25000,
    exWarranty23: 8000,
    hypothecationCharge: 3000,
    exWarranty28: 12000,
    createdAt: "23 Jul 2026",
    createdTime: "09:45 AM",
  },
  {
    id: 4,
    variantName: "FE 2WD",
    model: "Swaraj 744 FE",
    purchasePrice: 380000,
    exShowroomPrice: 410000,
    insurance: 12000,
    roadSideAssistance: 4500,
    rtoCharge: 22000,
    exWarranty23: 7000,
    hypothecationCharge: 2500,
    exWarranty28: 10000,
    createdAt: "22 Jul 2026",
    createdTime: "11:20 AM",
  },
  {
    id: 5,
    variantName: "Super",
    model: "Eicher 380",
    purchasePrice: 520000,
    exShowroomPrice: 560000,
    insurance: 18000,
    roadSideAssistance: 6000,
    rtoCharge: 28000,
    exWarranty23: 9000,
    hypothecationCharge: 3500,
    exWarranty28: 14000,
    createdAt: "21 Jul 2026",
    createdTime: "04:00 PM",
  },
  {
    id: 6,
    variantName: "Premium",
    model: "John Deere 5050",
    purchasePrice: 620000,
    exShowroomPrice: 680000,
    insurance: 22000,
    roadSideAssistance: 7000,
    rtoCharge: 32000,
    exWarranty23: 10000,
    hypothecationCharge: 4000,
    exWarranty28: 16000,
    createdAt: "20 Jul 2026",
    createdTime: "08:30 AM",
  },
];

const modelOptions = [
  { id: 1, name: "iPhone 15 Pro" },
  { id: 2, name: "Samsung Galaxy S24" },
  { id: 3, name: "Mahindra 265 DI" },
  { id: 4, name: "Swaraj 744 FE" },
  { id: 5, name: "Eicher 380" },
  { id: 6, name: "John Deere 5050" },
  { id: 7, name: "New Holland 3630" },
  { id: 8, name: "Tata Ace" },
];

const variantOptions = [
  { id: 1, name: "Pro Max" },
  { id: 2, name: "Ultra" },
  { id: 3, name: "DI 4x4" },
  { id: 4, name: "FE 2WD" },
  { id: 5, name: "Super" },
  { id: 6, name: "Premium" },
];

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

export default function VariantPrice() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);

  // Static data
  const variantPrices = variantPriceData;

  // Form state
  const [formData, setFormData] = useState({
    model: "",
    variant: "",
    purchasePrice: "",
    exShowroomPrice: "",
    insurance: "",
    roadSideAssistance: "",
    rtoCharge: "",
    exWarranty23: "",
    hypothecationCharge: "",
    exWarranty28: "",
  });

  // Add this state for accessories
  const [accessories, setAccessories] = useState([
    {
      id: 1,
      selectedItem: null,
      price: "",
      selectedTax: null,
      total: "",
    },
  ]);

  // Accessory items for dropdown
  const accessoryItems = [
    { id: 1, name: "Charger" },
    { id: 2, name: "Headphones" },
    { id: 3, name: "Cover" },
    { id: 4, name: "Screen Guard" },
    { id: 5, name: "USB Cable" },
    { id: 6, name: "Adapter" },
  ];

  // Add accessory row
  const addAccessoryRow = () => {
    const newId = accessories.length + 1;
    setAccessories([
      ...accessories,
      {
        id: newId,
        selectedItem: null,
        price: "",
        selectedTax: null,
        total: "",
      },
    ]);
  };

  // Remove accessory row
  const removeAccessoryRow = (index: number) => {
    const newAccessories = accessories.filter((_, i) => i !== index);
    setAccessories(newAccessories);
  };

  // Filter data
  const filteredData = variantPrices.filter((item) => {
    const matchesSearch =
      item.variantName.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase());
    const matchesModel =
      selectedModelFilter === "All" || item.model === selectedModelFilter;
    return matchesSearch && matchesModel;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenAddDrawer = () => {
    setEditId(null);
    setFormData({
      model: "",
      variant: "",
      purchasePrice: "",
      exShowroomPrice: "",
      insurance: "",
      roadSideAssistance: "",
      rtoCharge: "",
      exWarranty23: "",
      hypothecationCharge: "",
      exWarranty28: "",
    });
    setShowDrawer(true);
  };

  const handleOpenEditDrawer = (item: any) => {
    setEditId(item.id);
    setFormData({
      model: item.model,
      variant: item.variantName,
      purchasePrice: String(item.purchasePrice),
      exShowroomPrice: String(item.exShowroomPrice),
      insurance: String(item.insurance),
      roadSideAssistance: String(item.roadSideAssistance),
      rtoCharge: String(item.rtoCharge),
      exWarranty23: String(item.exWarranty23),
      hypothecationCharge: String(item.hypothecationCharge),
      exWarranty28: String(item.exWarranty28),
    });
    setShowDrawer(true);
  };

  const handleSave = () => {
    setShowDrawer(false);
  };

  const handleDelete = (id: number) => {
    alert(`Delete variant price with ID: ${id}`);
  };

  const handleBulkDelete = () => {
    alert(`Delete ${selectedIds.length} selected variant prices`);
  };

  const modelFilterOptions = [
    { id: "All", name: "All" },
    ...Array.from(new Set(variantPrices.map((c) => c.model))).map((n) => ({
      id: n,
      name: n,
    })),
  ];

  const isAllPageSelected =
    currentItems.length > 0 &&
    currentItems.every((item) => selectedIds.includes(item.id));
  const isSomePageSelected =
    currentItems.some((item) => selectedIds.includes(item.id)) &&
    !isAllPageSelected;

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Top Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Variant Price List
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all variant prices from here
          </p>
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
    className="dark:bg-dark-800 dark:border-dark-500 dark:text-dark-200 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50"
  >
    <FaFileExcel className="h-6 w-6 text-green-500" />
  </button>

  <button
    type="button"
    className="dark:bg-dark-800 dark:border-dark-500 dark:text-dark-200 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50"
  >
    <FaFilePdf className="h-6 w-6 text-red-500" />
  </button>

  <Button
    color="primary"
    onClick={handleOpenAddDrawer}
    className="ml-auto whitespace-nowrap"
  >
    Add Variant Price
  </Button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search variant price..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
        />
      </div>

      {/* Filter Bar */}
      {showFilterBar && (
        <div className="dark:bg-dark-700 dark:border-dark-500 animate-in fade-in slide-in-from-top-2 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-150">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="dark:text-dark-200 text-sm font-medium text-gray-700">
                Model
              </span>
              <div className="w-full">
                <Combobox
                  data={modelFilterOptions}
                  displayField="name"
                  value={
                    modelFilterOptions.find(
                      (opt) => opt.id === selectedModelFilter,
                    ) || modelFilterOptions[0]
                  }
                  onChange={(value: any) => {
                    setSelectedModelFilter(value.id);
                    setCurrentPage(1);
                  }}
                  placeholder="Select Model"
                  searchFields={["name"]}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table
            hoverable
            className="w-full min-w-[800px] text-left [&_.table-th]:font-semibold"
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
                <Th className="w-20 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Actions
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Variant Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Model
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Pru. Price (%)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Ex-Showroom (%)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Insurance (%)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  RSA (%)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  RTO (%)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Ex-Warranty (2+3) (%)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Hypothecation (%)
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Ex-Warranty (2+8) (%)
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
                    <Td className="py-4 text-center">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <MenuButton className="dark:hover:bg-dark-600 dark:text-dark-200 inline-flex size-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100">
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
                                  onClick={() => handleOpenEditDrawer(item)}
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
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.variantName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.model}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.purchasePrice.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.exShowroomPrice.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.insurance.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.roadSideAssistance.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.rtoCharge.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.exWarranty23.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.hypothecationCharge.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.exWarranty28.toLocaleString()}
                    </Td>
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={13}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No variant prices found
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
            <div className="flex items-center gap-2">
              <Menu as="div" className="relative">
                <MenuButton className="flex h-8 cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 sm:h-9 sm:px-3.5">
                  <span className="text-base leading-none font-bold sm:text-sm">
                    ••• More
                  </span>
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="dark:bg-dark-800 dark:border-dark-700 absolute right-0 bottom-full mb-1 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => {
                            alert(`Print ${selectedIds.length} selected items`);
                          }}
                          className={`${
                            active ? "dark:bg-dark-600 bg-gray-100" : ""
                          } flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200`}
                        >
                          <FaFilePdf className="size-4 text-red-500" />
                          Print
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => {
                            alert(
                              `Export ${selectedIds.length} selected items`,
                            );
                          }}
                          className={`${
                            active ? "dark:bg-dark-600 bg-gray-100" : ""
                          } flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200`}
                        >
                          <FaFileExcel className="size-4 text-green-500" />
                          Export
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>

              <Button
                variant="outlined"
                color="neutral"
                onClick={() => setSelectedIds([])}
                className="flex h-8 items-center gap-1.5 px-3 text-xs font-semibold shadow-sm sm:h-9 sm:px-3.5"
              >
                <XMarkIcon className="size-3.5 sm:size-4" />
                <span>Cancel</span>
              </Button>

              <Button
                variant="filled"
                color="error"
                onClick={handleBulkDelete}
                className="flex h-8 items-center gap-1.5 px-3 text-xs font-semibold shadow-sm sm:h-9 sm:px-3.5"
              >
                <TrashIcon className="size-3.5 sm:size-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modern ERP-Style Drawer */}

      {/* Modern ERP-Style Drawer */}
      <Transition appear show={showDrawer} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100]"
          onClose={() => setShowDrawer(false)}
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
            <DialogPanel className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-5xl transform-gpu flex-col bg-white shadow-2xl transition-transform duration-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="flex h-full flex-col"
              >
                {/* Fixed Header */}
                <div className="bg-primary-500 flex items-center justify-between px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    {editId !== null
                      ? "Edit Variant Price"
                      : "Add Variant Price"}
                  </h2>
                  <Button
                    onClick={() => setShowDrawer(false)}
                    variant="flat"
                    isIcon
                    className="size-8 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                    type="button"
                  >
                    <XMarkIcon className="size-5" />
                  </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Model & Variant Selection - 2 columns */}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Model <span className="text-red-500">*</span>
                      </label>
                      <Combobox
                        data={modelOptions}
                        displayField="name"
                        value={modelOptions.find(
                          (opt) => opt.name === formData.model,
                        )}
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            model: selected?.name || "",
                          });
                        }}
                        placeholder="Select Model"
                        searchFields={["name"]}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Variant <span className="text-red-500">*</span>
                      </label>
                      <Combobox
                        data={variantOptions}
                        displayField="name"
                        value={variantOptions.find(
                          (opt) => opt.name === formData.variant,
                        )}
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            variant: selected?.name || "",
                          });
                        }}
                        placeholder="Select Variant"
                        searchFields={["name"]}
                      />
                    </div>
                  </div>

                  {/* Pricing Section - 4 fields per row (2 prices + 2 taxes) */}
                  <div className="mt-6">
                    <h3 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">
                      Pricing Details
                    </h3>

                    {/* Row 1: Purchase Price + Tax | Ex-Showroom Price + Tax */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Purchase Price
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter purchase price"
                          value={formData.purchasePrice}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              purchasePrice: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="lg:border-r lg:border-gray-200 lg:pr-4 dark:lg:border-gray-700">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "18%" },
                            { id: 4, name: "28%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                      <div className="lg:pl-4">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ex-Showroom Price
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter ex-showroom"
                          value={formData.exShowroomPrice}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              exShowroomPrice: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "18%" },
                            { id: 4, name: "28%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                    </div>

                    {/* Row 2: Insurance + Tax | RSA + Tax */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Insurance
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter insurance"
                          value={formData.insurance}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              insurance: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="lg:border-r lg:border-gray-200 lg:pr-4 dark:lg:border-gray-700">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "12%" },
                            { id: 4, name: "18%" },
                            { id: 5, name: "28%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                      <div className="lg:pl-4">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Road Side Assistance
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter RSA"
                          value={formData.roadSideAssistance}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              roadSideAssistance: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "12%" },
                            { id: 4, name: "18%" },
                            { id: 5, name: "28%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                    </div>

                    {/* Row 3: Ex-Warranty (2+3) + Tax | Hypothecation Charge + Tax */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ex-Warranty (2+3)
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter ex-warranty"
                          value={formData.exWarranty23}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              exWarranty23: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="lg:border-r lg:border-gray-200 lg:pr-4 dark:lg:border-gray-700">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "12%" },
                            { id: 4, name: "18%" },
                            { id: 5, name: "28%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                      <div className="lg:pl-4">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Hypothecation Charge
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter hypothecation"
                          value={formData.hypothecationCharge}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hypothecationCharge: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "12%" },
                            { id: 4, name: "18%" },
                            { id: 5, name: "28%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                    </div>

                    {/* Row 4: Ex-Warranty (2+8) + Tax | RTO & Registration + Tax */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ex-Warranty (2+8)
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter ex-warranty"
                          value={formData.exWarranty28}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              exWarranty28: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="lg:border-r lg:border-gray-200 lg:pr-4 dark:lg:border-gray-700">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "12%" },
                            { id: 4, name: "18%" },
                            { id: 5, name: "28%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                      <div className="lg:pl-4">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          RTO & Registration
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter RTO charge"
                          value={formData.rtoCharge}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              rtoCharge: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tax
                        </label>
                        <Combobox
                          data={[
                            { id: 1, name: "0%" },
                            { id: 2, name: "5%" },
                            { id: 3, name: "11%" },
                            { id: 4, name: "11.5%" },
                            { id: 5, name: "12%" },
                            { id: 6, name: "18%" },
                          ]}
                          displayField="name"
                          value={null}
                          onChange={() => {}}
                          placeholder="Select Tax"
                          searchFields={["name"]}
                        />
                      </div>
                    </div>

                    {/* Row 5: RTO Charge + RTO Other Charge (full width) */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          RTO Charge
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter RTO charge"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          RTO Other Charge
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter RTO other charge"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accessories Section */}
                  <div className="mt-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                      <h3 className="text-sm font-semibold whitespace-nowrap text-gray-800 dark:text-white">
                        Accessories
                      </h3>
                      <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                    </div>

                    {/* Accessory Rows - Dynamic */}
                    {accessories.map((item, index) => (
                      <div
                        key={item.id}
                        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
                      >
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Item Name
                          </label>
                          <Combobox
                            data={accessoryItems}
                            displayField="name"
                            value={item.selectedItem}
                            onChange={(selected: any) => {
                              const newAccessories = [...accessories];
                              newAccessories[index].selectedItem = selected;
                              setAccessories(newAccessories);
                            }}
                            placeholder="Search item..."
                            searchFields={["name"]}
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Price
                          </label>
                          <Input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => {
                              const newAccessories = [...accessories];
                              newAccessories[index].price = e.target.value;
                              setAccessories(newAccessories);
                            }}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tax
                          </label>
                          <Combobox
                            data={[
                              { id: 1, name: "0%" },
                              { id: 2, name: "5%" },
                              { id: 3, name: "12%" },
                              { id: 4, name: "18%" },
                              { id: 5, name: "28%" },
                            ]}
                            displayField="name"
                            value={item.selectedTax}
                            onChange={(selected: any) => {
                              const newAccessories = [...accessories];
                              newAccessories[index].selectedTax = selected;
                              setAccessories(newAccessories);
                            }}
                            placeholder="Select Tax"
                            searchFields={["name"]}
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Total
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Total"
                              value={item.total}
                              className="w-full"
                              readOnly
                            />
                            {index === 0 ? (
                              // Plus button only on the first row
                              <Button
                                type="button"
                                color="primary"
                                isIcon
                                onClick={addAccessoryRow}
                                className="h-10 w-10 flex-shrink-0"
                              >
                                <PlusIcon className="size-5" />
                              </Button>
                            ) : (
                              // Minus button on all rows below the first
                              <Button
                                type="button"
                                color="error"
                                isIcon
                                onClick={() => removeAccessoryRow(index)}
                                className="h-10 w-10 flex-shrink-0"
                              >
                                <MinusIcon className="size-5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Sales Price Full Width */}
                    <div className="mt-4">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sales Price
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter sales price"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="dark:border-dark-500 dark:bg-dark-800 flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <Button
                    variant="outlined"
                    color="neutral"
                    type="button"
                    onClick={() => setShowDrawer(false)}
                    className="h-10 min-w-[100px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    className="h-10 min-w-[100px]"
                  >
                    {editId !== null ? "Update" : "Save"}
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
}
