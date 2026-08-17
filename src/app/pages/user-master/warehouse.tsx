import React, { useState, Fragment, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
  FunnelIcon,
  ArrowPathIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Country, State, City } from "country-state-city";
import Select from "react-select";


// ─── TYPE DEFINITIONS ──────────────────────────────────────────────────────

interface SelectOption {
  value: string;
  label: string;
}

interface WarehouseFormData {
  warehouseCode: string;
  warehouseName: string;
  ownerName: string;
  mobileNo: string;
  gmailId: string;
  password: string;
  confirmPassword: string;
  address1: string;
  address2: string;
  gstNo: string;
  country: SelectOption | null;
  state: SelectOption | null;
  district: SelectOption | null;
  city: SelectOption | null;
  area: string;
}

interface Warehouse {
  id: number;
  warehouseCode: string;
  warehouseName: string;
  ownerName: string;
  mobileNo: string;
  gmailId: string;
  address1: string;
  address2: string;
  gstNo: string;
  country: string;
  state: string;
  district: string;
  city: string;
  area: string;
}

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_WAREHOUSES = [
  {
    id: 1,
    warehouseCode: "WH-001",
    warehouseName: "Main Warehouse",
    ownerName: "Shri Vinayak Suzuki",
    mobileNo: "9876543210",
    gmailId: "vinayak@autobook.com",
    address1: "123, Main Road, Akola",
    address2: "Near City Center",
    gstNo: "27ABCDE1234F1Z5",
    country: "India",
    state: "Maharashtra",
    district: "Akola",
    city: "Akola",
    area: "Midtown",
  },
  {
    id: 2,
    warehouseCode: "WH-002",
    warehouseName: "North Warehouse",
    ownerName: "Rakesh Narkhede",
    mobileNo: "8765432109",
    gmailId: "rakesh@autobook.com",
    address1: "456, North Road, Pune",
    address2: "Opposite Bus Stand",
    gstNo: "27PQRS5678F1Z5",
    country: "India",
    state: "Maharashtra",
    district: "Pune",
    city: "Pune",
    area: "North Zone",
  },
  {
    id: 3,
    warehouseCode: "WH-003",
    warehouseName: "South Warehouse",
    ownerName: "Sneha Kulkarni",
    mobileNo: "7654321098",
    gmailId: "sneha@autobook.com",
    address1: "789, South Road, Mumbai",
    address2: "Near Railway Station",
    gstNo: "27WXYZ9012F1Z5",
    country: "India",
    state: "Maharashtra",
    district: "Mumbai City",
    city: "Mumbai",
    area: "South Zone",
  },
];

// ─── REACT SELECT CUSTOM STYLES ────────────────────────────────────────────

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "transparent",
    borderColor: state.isFocused
      ? "var(--color-primary-600)"
      : "var(--color-gray-300)",
    boxShadow: state.isFocused ? "0 0 0 1px var(--color-primary-600)" : "none",
    minHeight: "42px",
    "&:hover": {
      borderColor: "var(--color-primary-500)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-dark-700)",
    border: "1px solid var(--color-primary-600)",
    borderRadius: "12px",
    overflow: "hidden",
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--color-primary-600)"
      : state.isFocused
        ? "var(--color-primary-500)"
        : "var(--color-dark-700)",
    color: "#fff",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--color-dark-100)",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "var(--color-dark-100)",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "var(--color-gray-400)",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused
      ? "var(--color-primary-600)"
      : "var(--color-gray-400)",
  }),
};

 function AddWarehouseDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // ─── STATE ────────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState<WarehouseFormData>({
    warehouseCode: "",
    warehouseName: "",
    ownerName: "",
    mobileNo: "",
    gmailId: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    gstNo: "",
    country: null,
    state: null,
    district: null,
    city: null,
    area: "",
  });

  // ─── COUNTRY-STATE-CITY LOGIC ─────────────────────────────────────────────

  const countryOptions = useMemo(() => {
    return Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
  }, []);

  const stateOptions = useMemo(() => {
    if (!formData.country) return [];
    return State.getStatesOfCountry(formData.country.value).map((s) => ({
      value: s.isoCode,
      label: s.name,
    }));
  }, [formData.country]);

  const cityOptions = useMemo(() => {
    if (!formData.country || !formData.state) return [];
    return City.getCitiesOfState(
      formData.country.value,
      formData.state.value
    ).map((c) => ({
      value: c.name,
      label: c.name,
    }));
  }, [formData.country, formData.state]);

  // ─── HELPERS ──────────────────────────────────────────────────────────────

  const handleChange = (field: keyof WarehouseFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Warehouse Added:", formData);
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
                <DialogPanel className="pointer-events-auto w-screen max-w-full transform transition-all duration-300 md:max-w-3xl">
                  <div className="flex h-full max-h-screen flex-col bg-white shadow-xl dark:bg-gray-800">
                    
                    {/* Header - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex items-center justify-between bg-primary-600 px-4 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Add Warehouse
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
                      <div className="space-y-6">
                        {/* SECTION 1: Warehouse Code & Name */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Warehouse Code <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Warehouse Code"
                              value={formData.warehouseCode}
                              onChange={(e) => handleChange("warehouseCode", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Warehouse Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Warehouse Name"
                              value={formData.warehouseName}
                              onChange={(e) => handleChange("warehouseName", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                        </div>

                        {/* Dotted Separator */}
                        <div className="border-t-2 border-dotted border-primary-400 pt-4" />

                        {/* SECTION 2: Owner, Mobile, Gmail, Passwords */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Owner Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Owner Name"
                              value={formData.ownerName}
                              onChange={(e) => handleChange("ownerName", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Mobile No <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Mobile No"
                              value={formData.mobileNo}
                              onChange={(e) => handleChange("mobileNo", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Gmail Id <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Gmail Id"
                              value={formData.gmailId}
                              onChange={(e) => handleChange("gmailId", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="password"
                              placeholder="Enter Password"
                              value={formData.password}
                              onChange={(e) => handleChange("password", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="password"
                              placeholder="Enter Confirm Password"
                              value={formData.confirmPassword}
                              onChange={(e) => handleChange("confirmPassword", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                        </div>

                        {/* Dotted Separator */}
                        <div className="border-t-2 border-dotted border-primary-400 pt-4" />

                        {/* SECTION 3: Address, GST */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Address 1 <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Address 1"
                              value={formData.address1}
                              onChange={(e) => handleChange("address1", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Address 2
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Address 2"
                              value={formData.address2}
                              onChange={(e) => handleChange("address2", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              GST No
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter GST No"
                              value={formData.gstNo}
                              onChange={(e) => handleChange("gstNo", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                        </div>

                        {/* LOCATION DROPDOWNS */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {/* Country */}
                          <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Country
                            </label>
                            <Select
                              options={countryOptions}
                              styles={customSelectStyles}
                              classNamePrefix="react-select"
                              placeholder="Select Country"
                              value={formData.country}
                              onChange={(selected: SelectOption | null) => {
                                setFormData({
                                  ...formData,
                                  country: selected,
                                  state: null,
                                  district: null,
                                  city: null,
                                });
                              }}
                            />
                          </div>

                          {/* State */}
                          <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                              State
                            </label>
                            <Select
                              options={stateOptions}
                              styles={customSelectStyles}
                              classNamePrefix="react-select"
                              placeholder="Select State"
                              isDisabled={!formData.country}
                              value={formData.state}
                              onChange={(selected: SelectOption | null) => {
                                setFormData({
                                  ...formData,
                                  state: selected,
                                  district: null,
                                  city: null,
                                });
                              }}
                            />
                          </div>

                          {/* District */}
                          <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                              District
                            </label>
                            <Select
                              options={cityOptions}
                              styles={customSelectStyles}
                              classNamePrefix="react-select"
                              placeholder="Select District"
                              isDisabled={!formData.state}
                              value={formData.district}
                              onChange={(selected: SelectOption | null) => {
                                setFormData({
                                  ...formData,
                                  district: selected,
                                  city: null,
                                });
                              }}
                            />
                          </div>
                        </div>

                        {/* Row 2: City, Area */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {/* City */}
                          <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                              City
                            </label>
                            <Select
                              options={cityOptions}
                              styles={customSelectStyles}
                              classNamePrefix="react-select"
                              placeholder="Select City"
                              isDisabled={!formData.state}
                              value={formData.city}
                              onChange={(selected: SelectOption | null) => {
                                setFormData({
                                  ...formData,
                                  city: selected,
                                });
                              }}
                            />
                          </div>

                          {/* Area */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Area <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter Area"
                              value={formData.area}
                              onChange={(e) => handleChange("area", e.target.value)}
                              className="mt-1 w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions - Fixed with Primary Color */}
                    <div className="flex-shrink-0 flex gap-2 border-t border-gray-200 px-4 py-4 dark:border-gray-700 sm:justify-end sm:gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-primary-400 bg-white px-4 py-2.5 text-sm font-medium text-primary-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:flex-none sm:min-w-[120px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700 sm:flex-none sm:min-w-[120px]"
                      >
                        Add Warehouse
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

export default function Warehouse() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleEdit = (item: any) => {
    console.log("Editing warehouse:", item);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting warehouse ${id}`);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_WAREHOUSES.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.warehouseCode.toLowerCase().includes(searchLower) ||
      item.warehouseName.toLowerCase().includes(searchLower) ||
      item.ownerName.toLowerCase().includes(searchLower) ||
      item.mobileNo.includes(search) ||
      item.gstNo.toLowerCase().includes(searchLower)
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
            Warehouse
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all warehouse locations
          </p>
        </div>

       <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  {/* Filter Button */}
  {/* <button
    type="button"
    onClick={() => setShowFilterBar(!showFilterBar)}
    className={`flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50 ${
      showFilterBar
        ? "border-primary-500 bg-primary-50 text-primary-600"
        : ""
    }`}
  >
    <FunnelIcon className="h-5 w-5" />
  </button> */}

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

  {/* Add Warehouse */}
  <button
    onClick={() => setIsDrawerOpen(true)}
    className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-600"
  >
    <PlusIcon className="h-4 w-4" />
    Add Warehouse
  </button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by code, name, owner or GST..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
        />
      </div>

      {/* Filter Bar */}
      {/* {showFilterBar && (
        <div className="dark:bg-dark-700 dark:border-dark-500 animate-in fade-in slide-in-from-top-2 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-150">
          <p className="text-sm text-gray-500 dark:text-gray-400">Filter options here...</p>
        </div>
      )} */}

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1600px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                
                <Th className="text-[11px]">Warehouse Code</Th>
                <Th className="text-[11px]">Warehouse Name</Th>
                <Th className="text-[11px]">Owner Name</Th>
                <Th className="text-[11px]">Mobile No</Th>
                <Th className="text-[11px]">Gmail Id</Th>
                <Th className="text-[11px]">Address 1</Th>
                <Th className="text-[11px]">Address 2</Th>
                <Th className="text-[11px]">GST No</Th>
                <Th className="text-[11px]">Country</Th>
                <Th className="text-[11px]">State</Th>
                <Th className="text-[11px]">District</Th>
                <Th className="text-[11px]">City</Th>
                <Th className="text-[11px]">Area</Th>
                <Th className="w-20 text-center text-[11px]">Action</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-3 text-[12px] text-gray-500 text-center font-medium">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  
                
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.warehouseCode}</Td>
                  <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">{item.warehouseName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.ownerName}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.mobileNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.gmailId}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.address1}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.address2}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.gstNo}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.country}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.state}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.district}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.city}</Td>
                  <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">{item.area}</Td>
                    {/* Action Column - Dropdown Menu */}
                  <Td className="py-3 text-center">
                    <Menu as="div" className="relative inline-block text-left">
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

                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={15} className="py-12 text-center text-gray-400 dark:text-gray-500">
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

      {/* Add Warehouse Drawer */}
      <AddWarehouseDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}