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
  EyeIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import { Listbox } from "@/components/shared/form/StyledListbox";

// Static Data
const itemData = [
  {
    id: 1,
    item: "iPhone 15 Pro",
    codeNo: "IP-001",
    shortName: "iPhone15P",
    hsnCode: "85171200",
    listOfGroup: "Electronics",
    unit: "Pcs",
    withBattery: "Yes",
    modelType: "Smartphone",
    vehicleType: "N/A",
    model: "iPhone 15 Pro",
    variant: "Pro Max",
    colour: "Pearl Grace White",
    status: "ACTIVE",
    createdAt: "25 Jul 2026",
    createdTime: "10:30 AM",
  },
  {
    id: 2,
    item: "Samsung Galaxy S24",
    codeNo: "SG-002",
    shortName: "SGS24",
    hsnCode: "85171200",
    listOfGroup: "Electronics",
    unit: "Pcs",
    withBattery: "Yes",
    modelType: "Smartphone",
    vehicleType: "N/A",
    model: "Samsung Galaxy S24",
    variant: "Ultra",
    colour: "Titanium Gray",
    status: "ACTIVE",
    createdAt: "24 Jul 2026",
    createdTime: "02:15 PM",
  },
  {
    id: 3,
    item: "Mahindra 265 DI",
    codeNo: "MH-003",
    shortName: "M265DI",
    hsnCode: "87019000",
    listOfGroup: "Agriculture",
    unit: "Pcs",
    withBattery: "No",
    modelType: "Tractor",
    vehicleType: "4WD",
    model: "Mahindra 265 DI",
    variant: "DI 4x4",
    colour: "Red",
    status: "ACTIVE",
    createdAt: "23 Jul 2026",
    createdTime: "09:45 AM",
  },
  {
    id: 4,
    item: "Swaraj 744 FE",
    codeNo: "SW-004",
    shortName: "S744FE",
    hsnCode: "87019000",
    listOfGroup: "Agriculture",
    unit: "Pcs",
    withBattery: "No",
    modelType: "Tractor",
    vehicleType: "2WD",
    model: "Swaraj 744 FE",
    variant: "FE 2WD",
    colour: "Green",
    status: "INACTIVE",
    createdAt: "22 Jul 2026",
    createdTime: "11:20 AM",
  },
  {
    id: 5,
    item: "Eicher 380",
    codeNo: "EC-005",
    shortName: "E380",
    hsnCode: "87019000",
    listOfGroup: "Agriculture",
    unit: "Pcs",
    withBattery: "No",
    modelType: "Tractor",
    vehicleType: "4WD",
    model: "Eicher 380",
    variant: "Super",
    colour: "Yellow",
    status: "ACTIVE",
    createdAt: "21 Jul 2026",
    createdTime: "04:00 PM",
  },
];

const modelOptions = [
  { id: 1, name: "iPhone 15 Pro" },
  { id: 2, name: "Samsung Galaxy S24" },
  { id: 3, name: "Mahindra 265 DI" },
  { id: 4, name: "Swaraj 744 FE" },
  { id: 5, name: "Eicher 380" },
  { id: 6, name: "John Deere 5050" },
];

const variantOptions = [
  { id: 1, name: "Pro Max" },
  { id: 2, name: "Ultra" },
  { id: 3, name: "DI 4x4" },
  { id: 4, name: "FE 2WD" },
  { id: 5, name: "Super" },
  { id: 6, name: "Premium" },
];

const colourOptions = [
  { id: 1, name: "Pearl Grace White" },
  { id: 2, name: "Metallic Mat Black" },
  { id: 3, name: "Titanium Gray" },
  { id: 4, name: "Cream White" },
  { id: 5, name: "Red" },
  { id: 6, name: "Blue" },
  { id: 7, name: "Green" },
  { id: 8, name: "Yellow" },
];

const statusOptions = [
  { id: "ACTIVE", name: "Active" },
  { id: "INACTIVE", name: "Inactive" },
];

const listOfGroupOptions = [
  { id: "Electronics", name: "Electronics" },
  { id: "Agriculture", name: "Agriculture" },
  { id: "Spare Parts", name: "Spare Parts" },
  { id: "Implements", name: "Implements" },
  { id: "Seeds", name: "Seeds" },
  { id: "Fertilizers", name: "Fertilizers" },
];

const unitOptions = [
  { id: "Pcs", name: "Pcs" },
  { id: "Kg", name: "Kg" },
  { id: "Ltr", name: "Ltr" },
  { id: "Mtr", name: "Mtr" },
  { id: "Set", name: "Set" },
];

const withBatteryOptions = [
  { id: "Yes", name: "Yes" },
  { id: "No", name: "No" },
];

const modelTypeOptions = [
  { id: "Smartphone", name: "Smartphone" },
  { id: "Tractor", name: "Tractor" },
  { id: "Harvester", name: "Harvester" },
  { id: "Spare Part", name: "Spare Part" },
];

const vehicleTypeOptions = [
  { id: "N/A", name: "N/A" },
  { id: "2WD", name: "2WD" },
  { id: "4WD", name: "4WD" },
  { id: "AWD", name: "AWD" },
];

const typeOfFuelOptions = [
  { id: "Petrol", name: "Petrol" },
  { id: "Diesel", name: "Diesel" },
  { id: "Electric", name: "Electric" },
  { id: "Hybrid", name: "Hybrid" },
];

const fuelCapacityOptions = [
  { id: "10L", name: "10L" },
  { id: "15L", name: "15L" },
  { id: "20L", name: "20L" },
  { id: "25L", name: "25L" },
  { id: "30L", name: "30L" },
];

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

// Static Purchase Price Update History Data
const purchasePriceHistoryData = [
  {
    id: 1,
    oldPrice: "₹85,000",
    newPrice: "₹82,000",
    difference: "-₹3,000",
    billNo: "INV-001",
    createdBy: "Admin",
    createdType: "Manual",
    updatedDateTime: "25 Jul 2026 10:30 AM",
  },
  {
    id: 2,
    oldPrice: "₹82,000",
    newPrice: "₹80,000",
    difference: "-₹2,000",
    billNo: "INV-002",
    createdBy: "Manager",
    createdType: "Bulk Update",
    updatedDateTime: "24 Jul 2026 02:15 PM",
  },
  {
    id: 3,
    oldPrice: "₹80,000",
    newPrice: "₹78,500",
    difference: "-₹1,500",
    billNo: "INV-003",
    createdBy: "Admin",
    createdType: "Manual",
    updatedDateTime: "23 Jul 2026 09:45 AM",
  },
];

export default function CreateItem() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>("All");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);

  const items = itemData;

  const [formData, setFormData] = useState({
    model: "",
    models: "",
    variant: "",
    colour: "",
    itemName: "",
    codeNo: "",
    shortName: "",
    hsnCode: "",
    taxSlab: "",
    listOfGroup: "",
    unit: "",
    withBattery: "",
    modelType: "",
    vehicleType: "",
    typeOfFuel: "",
    fuelCapacity: "",
    purchasePriceWithoutGST: "",
    purchasePriceTaxable: "",
    status: "ACTIVE",
  });

  const filteredData = items.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(search.toLowerCase()) ||
      item.codeNo.toLowerCase().includes(search.toLowerCase()) ||
      item.shortName.toLowerCase().includes(search.toLowerCase());
    const matchesModel =
      selectedModelFilter === "All" || item.model === selectedModelFilter;
    const matchesStatus =
      selectedStatusFilter === "All" || item.status === selectedStatusFilter;
    return matchesSearch && matchesModel && matchesStatus;
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
      models: "",
      variant: "",
      colour: "",
      itemName: "",
      codeNo: "",
      shortName: "",
      hsnCode: "",
      taxSlab: "",
      listOfGroup: "",
      unit: "",
      withBattery: "",
      modelType: "",
      vehicleType: "",
      typeOfFuel: "",
      fuelCapacity: "",
      purchasePriceWithoutGST: "",
      purchasePriceTaxable: "",
      status: "ACTIVE",
    });
    setShowDrawer(true);
  };

  const handleOpenEditDrawer = (item: any) => {
    setEditId(item.id);
    setFormData({
      model: item.model,
      models: item.model,
      variant: item.variant,
      colour: item.colour,
      itemName: item.item,
      codeNo: item.codeNo,
      shortName: item.shortName,
      hsnCode: item.hsnCode,
      taxSlab: "",
      listOfGroup: item.listOfGroup,
      unit: item.unit,
      withBattery: item.withBattery,
      modelType: item.modelType,
      vehicleType: item.vehicleType,
      typeOfFuel: "",
      fuelCapacity: "",
      purchasePriceWithoutGST: "",
      purchasePriceTaxable: "",
      status: item.status,
    });
    setShowDrawer(true);
  };

  const handleSave = () => {
    setShowDrawer(false);
  };

  const handleDelete = (id: number) => {
    alert(`Delete item with ID: ${id}`);
  };

  const handleToggleStatus = (id: number) => {
    alert(`Toggle status for item ID: ${id}`);
  };

  const handleBulkDelete = () => {
    alert(`Delete ${selectedIds.length} selected items`);
  };

  // Add this function to handle view
  const handleView = (item: any) => {
    setViewItem(item);
    setShowViewDrawer(true);
  };

  const modelFilterOptions = [
    { id: "All", name: "All" },
    ...Array.from(new Set(items.map((c) => c.model))).map((n) => ({
      id: n,
      name: n,
    })),
  ];

  const statusFilterOptions = [
    { id: "All", name: "All" },
    { id: "ACTIVE", name: "Active" },
    { id: "INACTIVE", name: "Inactive" },
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
            Item List
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all items from here
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
    Add Item
  </Button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search item..."
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
            <div className="flex flex-col gap-1">
              <span className="dark:text-dark-200 text-sm font-medium text-gray-700">
                Status
              </span>
              <div className="w-full">
                <Combobox
                  data={statusFilterOptions}
                  displayField="name"
                  value={
                    statusFilterOptions.find(
                      (opt) => opt.id === selectedStatusFilter,
                    ) || statusFilterOptions[0]
                  }
                  onChange={(value: any) => {
                    setSelectedStatusFilter(value.id);
                    setCurrentPage(1);
                  }}
                  placeholder="Select Status"
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
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Item
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Code No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Short Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  HSN Code
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Group
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Unit
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Battery
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Model Type
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Vehicle Type
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
                  Status
                </Th>
                <Th className="w-20 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Actions
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
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.item}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.codeNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.shortName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.hsnCode}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.listOfGroup}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.unit}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.withBattery}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.modelType}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.vehicleType}
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
                    <Td className="py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id)}
                        className={`relative h-6 w-12 rounded-full transition-all ${
                          item.status === "ACTIVE"
                            ? "bg-primary-500"
                            : "dark:bg-dark-600 bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                            item.status === "ACTIVE" ? "left-6.5" : "left-0.5"
                          }`}
                        />
                      </button>
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
                                  onClick={() => handleView(item)}
                                  className={`${
                                    active
                                      ? "dark:bg-dark-600 text-primary-600 bg-gray-50 dark:text-white"
                                      : "dark:text-dark-200 text-gray-700"
                                  } flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium`}
                                >
                                  <EyeIcon className="size-4" />
                                  View
                                </button>
                              )}
                            </MenuItem>
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
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={16}
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

      {/* Drawer */}
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
            <DialogPanel className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-3xl transform-gpu flex-col bg-white shadow-2xl transition-transform duration-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="flex h-full flex-col"
              >
                <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    {editId !== null ? "Edit Item" : "Add Item"}
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

                <div className="grow overflow-y-auto p-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Row 1: Model, Models, Variant */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select Model <span className="text-red-500">*</span>
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
                        Select Models <span className="text-red-500">*</span>
                      </label>
                      <Combobox
                        data={modelOptions}
                        displayField="name"
                        value={modelOptions.find(
                          (opt) => opt.name === formData.models,
                        )}
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            models: selected?.name || "",
                          });
                        }}
                        placeholder="Select Models"
                        searchFields={["name"]}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select Variant <span className="text-red-500">*</span>
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

                    {/* Row 2: Colour, Item Name, Code No */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select Colour <span className="text-red-500">*</span>
                      </label>
                      <Combobox
                        data={colourOptions}
                        displayField="name"
                        value={colourOptions.find(
                          (opt) => opt.name === formData.colour,
                        )}
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            colour: selected?.name || "",
                          });
                        }}
                        placeholder="Select Colour"
                        searchFields={["name"]}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter item name"
                        value={formData.itemName}
                        onChange={(e) =>
                          setFormData({ ...formData, itemName: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Code No <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter code no"
                        value={formData.codeNo}
                        onChange={(e) =>
                          setFormData({ ...formData, codeNo: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    {/* Row 3: Short Name, HSN Code, Tax Slab */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Short Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter short name"
                        value={formData.shortName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            shortName: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        HSN Code
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter HSN code"
                        value={formData.hsnCode}
                        onChange={(e) =>
                          setFormData({ ...formData, hsnCode: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tax Slab
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter tax slab"
                        value={formData.taxSlab}
                        onChange={(e) =>
                          setFormData({ ...formData, taxSlab: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    {/* Row 4: List of Group, Unit, With Battery */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        List of Group <span className="text-red-500">*</span>
                      </label>
                      <Listbox
                        data={listOfGroupOptions}
                        value={
                          listOfGroupOptions.find(
                            (opt) => opt.id === formData.listOfGroup,
                          ) || null
                        }
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            listOfGroup: selected?.id || "",
                          });
                        }}
                        placeholder="Select Group"
                        displayField="name"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Unit <span className="text-red-500">*</span>
                      </label>
                      <Listbox
                        data={unitOptions}
                        value={
                          unitOptions.find((opt) => opt.id === formData.unit) ||
                          null
                        }
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            unit: selected?.id || "",
                          });
                        }}
                        placeholder="Select Unit"
                        displayField="name"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        With Battery <span className="text-red-500">*</span>
                      </label>
                      <Listbox
                        data={withBatteryOptions}
                        value={
                          withBatteryOptions.find(
                            (opt) => opt.id === formData.withBattery,
                          ) || null
                        }
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            withBattery: selected?.id || "",
                          });
                        }}
                        placeholder="Select"
                        displayField="name"
                      />
                    </div>

                    {/* Row 5: Model Type, Vehicle Type, Type of Fuel */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Model Type <span className="text-red-500">*</span>
                      </label>
                      <Listbox
                        data={modelTypeOptions}
                        value={
                          modelTypeOptions.find(
                            (opt) => opt.id === formData.modelType,
                          ) || null
                        }
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            modelType: selected?.id || "",
                          });
                        }}
                        placeholder="Select Model Type"
                        displayField="name"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Vehicle Type <span className="text-red-500">*</span>
                      </label>
                      <Listbox
                        data={vehicleTypeOptions}
                        value={
                          vehicleTypeOptions.find(
                            (opt) => opt.id === formData.vehicleType,
                          ) || null
                        }
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            vehicleType: selected?.id || "",
                          });
                        }}
                        placeholder="Select Vehicle Type"
                        displayField="name"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Type of Fuel <span className="text-red-500">*</span>
                      </label>
                      <Listbox
                        data={typeOfFuelOptions}
                        value={
                          typeOfFuelOptions.find(
                            (opt) => opt.id === formData.typeOfFuel,
                          ) || null
                        }
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            typeOfFuel: selected?.id || "",
                          });
                        }}
                        placeholder="Select Fuel Type"
                        displayField="name"
                      />
                    </div>

                    {/* Row 6: Fuel Capacity, Purchase Price Without GST, Purchase Price Taxable */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fuel Capacity <span className="text-red-500">*</span>
                      </label>
                      <Listbox
                        data={fuelCapacityOptions}
                        value={
                          fuelCapacityOptions.find(
                            (opt) => opt.id === formData.fuelCapacity,
                          ) || null
                        }
                        onChange={(selected: any) => {
                          setFormData({
                            ...formData,
                            fuelCapacity: selected?.id || "",
                          });
                        }}
                        placeholder="Select Capacity"
                        displayField="name"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Purchase Price (Without GST){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter price without GST"
                        value={formData.purchasePriceWithoutGST}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            purchasePriceWithoutGST: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Purchase Price (Taxable){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter taxable price"
                        value={formData.purchasePriceTaxable}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            purchasePriceTaxable: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Status - Full Width */}
                  <div className="mt-4">
                    <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </span>
                    <Listbox
                      data={statusOptions}
                      value={
                        statusOptions.find(
                          (opt) => opt.id === formData.status,
                        ) || statusOptions[0]
                      }
                      onChange={(selected: any) => {
                        setFormData({ ...formData, status: selected.id });
                      }}
                      placeholder="Select Status"
                      displayField="name"
                    />
                  </div>
                </div>

                <div className="dark:border-dark-500 flex items-center justify-end gap-3 border-t border-gray-200 p-5">
                  <Button
                    variant="outlined"
                    color="neutral"
                    type="button"
                    onClick={() => setShowDrawer(false)}
                    className="h-10 w-1/2"
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" className="h-10 w-1/2">
                    {editId !== null ? "Update" : "Save"}
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>

      {/* View Drawer - Purchase Price Update History */}
      <Transition appear show={showViewDrawer} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100]"
          onClose={() => setShowViewDrawer(false)}
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
            <DialogPanel className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-4xl transform-gpu flex-col bg-white shadow-2xl transition-transform duration-200">
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Purchase Price Update History
                  </h2>
                  <Button
                    onClick={() => setShowViewDrawer(false)}
                    variant="flat"
                    isIcon
                    className="size-8 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                    type="button"
                  >
                    <XMarkIcon className="size-5" />
                  </Button>
                </div>

                {/* Content */}
                <div className="grow overflow-y-auto p-5">
                  {/* Item Info Summary */}
                  {viewItem && (
                    <div className="dark:bg-dark-800 mb-4 rounded-lg bg-gray-50 p-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Item
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {viewItem.item}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Code No
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {viewItem.codeNo}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Model
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {viewItem.model}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Variant
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {viewItem.variant}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-500/20 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                        <tr className="border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                          <th className="px-4 py-3 font-semibold">Old Price</th>
                          <th className="px-4 py-3 font-semibold">New Price</th>
                          <th className="px-4 py-3 font-semibold">
                            Difference
                          </th>
                          <th className="px-4 py-3 font-semibold">Bill No</th>
                          <th className="px-4 py-3 font-semibold">
                            Created By
                          </th>
                          <th className="px-4 py-3 font-semibold">
                            Created Type
                          </th>
                          <th className="px-4 py-3 font-semibold">
                            Updated Date & Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                        {purchasePriceHistoryData.map((item) => (
                          <tr
                            key={item.id}
                            className="whitespace-nowrap transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                          >
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {item.oldPrice}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {item.newPrice}
                            </td>
                            <td
                              className={`px-4 py-3 font-medium ${
                                item.difference.startsWith("-")
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {item.difference}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {item.billNo}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {item.createdBy}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                  item.createdType === "Manual"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                }`}
                              >
                                {item.createdType}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {item.updatedDateTime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {purchasePriceHistoryData.length === 0 && (
                    <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                      No price history found
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="dark:border-dark-500 flex items-center justify-end border-t border-gray-200 p-5">
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setShowViewDrawer(false)}
                    className="h-10 min-w-[100px]"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
}
