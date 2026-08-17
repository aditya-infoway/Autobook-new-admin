import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  XMarkIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Listbox } from "@/components/shared/form/StyledListbox";
import { DatePicker } from "@/components/shared/form/Datepicker";
import Select from "react-select";
import { useNavigate } from "react-router";

// Static Data
const accountData = [
  {
    id: 1,
    accountName: "Rohit Parab",
    group: "Customer",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    number: "9876543210",
    openingBalance: 50000,
    currentBalance: 75000,
    createdAt: "25 Jul 2026",
    createdTime: "10:30 AM",
  },
  {
    id: 2,
    accountName: "Ankita Ghavanalkar",
    group: "Supplier",
    address: "456 Park Avenue",
    city: "Pune",
    state: "Maharashtra",
    number: "8765432109",
    openingBalance: 30000,
    currentBalance: 45000,
    createdAt: "24 Jul 2026",
    createdTime: "02:15 PM",
  },
  {
    id: 3,
    accountName: "Rakesh Naik",
    group: "Customer",
    address: "789 Lake View",
    city: "Bangalore",
    state: "Karnataka",
    number: "7654321098",
    openingBalance: 25000,
    currentBalance: 25000,
    createdAt: "23 Jul 2026",
    createdTime: "09:45 AM",
  },
];

const groupOptions = [
  { id: "Customer", name: "Customer" },
  { id: "Supplier", name: "Supplier" },
  { id: "Employee", name: "Employee" },
  { id: "Vendor", name: "Vendor" },
  { id: "Dealer", name: "Dealer" },
];

const drCrOptions = [
  { id: "Dr", name: "Dr" },
  { id: "Cr", name: "Cr" },
];

const countryOptions = [
  { value: "india", label: "India" },
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];

const stateOptions = [
  { value: "maharashtra", label: "Maharashtra" },
  { value: "gujarat", label: "Gujarat" },
  { value: "karnataka", label: "Karnataka" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "delhi", label: "Delhi" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "west-bengal", label: "West Bengal" },
];

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

export default function CreateAccount() {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const accounts = accountData;

  const [formData, setFormData] = useState({
    accountName: "",
    printName: "",
    group: "",
    openingBalance: "",
    drCr: "",
    country: "",
    state: "",
    stateCode: "",
    district: "",
    taluka: "",
    city: "",
    area: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    phone: "",
    mobile: "",
    email: "",
    contactPerson: "",
    birthdayOn: "",
    anniversary: "",
    bankAccountNo: "",
    bankName: "",
    ifscCode: "",
    branch: "",
    gstNo: "",
    panCard: "",
    aadharCardNo: "",
  });

  const filteredData = accounts.filter((item) => {
    const matchesSearch =
      item.accountName.toLowerCase().includes(search.toLowerCase()) ||
      item.group.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenAddDrawer = () => {
    setFormData({
      accountName: "",
      printName: "",
      group: "",
      openingBalance: "",
      drCr: "",
      country: "",
      state: "",
      stateCode: "",
      district: "",
      taluka: "",
      city: "",
      area: "",
      addressLine1: "",
      addressLine2: "",
      pincode: "",
      phone: "",
      mobile: "",
      email: "",
      contactPerson: "",
      birthdayOn: "",
      anniversary: "",
      bankAccountNo: "",
      bankName: "",
      ifscCode: "",
      branch: "",
      gstNo: "",
      panCard: "",
      aadharCardNo: "",
    });
    setShowDrawer(true);
  };

  const handleView = (item: any) => {
    setViewItem(item);
    setShowViewDrawer(true);
  };

  const handleSave = () => {
    setShowDrawer(false);
  };

  const handleBulkDelete = () => {
    alert(`Delete ${selectedIds.length} selected accounts`);
  };

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
            Account List
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all accounts from here
          </p>
        </div>

      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
  {/* <button
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
  </button> */}

  <button
    type="button"
    className="dark:bg-dark-800 dark:border-dark-500 dark:text-dark-200 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50"
  >
    <FaFileExcel className="h-6 w-6 text-green-500" />
  </button>

  <button
    type="button"
    className="dark:bg-dark-800 dark:border-dark-500 dark:text-dark-200 flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50"
  >
    <FaFilePdf className="h-6 w-6 text-red-500" />
  </button>

  <Button
    color="primary"
    onClick={() => navigate("/user-master/createaccount")}
    className="ml-auto whitespace-nowrap"
  >
    Add Account
  </Button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search account..."
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="dark:text-dark-200 text-sm font-medium text-gray-700">
                Group
              </span>
              <select className="dark:border-dark-500 dark:bg-dark-800 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none">
                <option>All</option>
                {groupOptions.map((opt) => (
                  <option key={opt.id} value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="dark:text-dark-200 text-sm font-medium text-gray-700">
                City
              </span>
              <input
                type="text"
                placeholder="Filter by city..."
                className="dark:border-dark-500 dark:bg-dark-800 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
        </div>
      )} */}

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
                          prev.filter((id) => !pageIds.includes(id))
                        );
                      } else {
                        const pageIds = currentItems.map((item) => item.id);
                        setSelectedIds((prev) =>
                          Array.from(new Set([...prev, ...pageIds]))
                        );
                      }
                    }}
                  />
                </Th>
                <Th className="w-16 py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  S.No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Account Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Group
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Address
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  City
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  State
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Number
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Opening Balance
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Current Balance
                </Th>
                <Th className="w-20 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Action
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
                              : [...prev, item.id]
                          );
                        }}
                      />
                    </Td>
                    <Td className="py-4 font-medium text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.accountName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.group}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.address}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.city}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.state}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.number}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.openingBalance.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.currentBalance.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleView(item)}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        <EyeIcon className="mr-1.5 size-3.5" />
                        View
                      </button>
                    </Td>
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={11}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No accounts found
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
            <Button
              variant="filled"
              color="error"
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 shadow-sm"
            >
              <FaFilePdf className="size-4 text-red-500" />
              <span className="text-xs font-semibold">Delete</span>
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Drawer */}
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
                <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Add Account
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
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Account Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter account name"
                          value={formData.accountName}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              accountName: e.target.value,
                              printName: e.target.value, // Auto-fill print name
                            });
                          }}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Print Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter print name"
                          value={formData.printName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              printName: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Group <span className="text-red-500">*</span>
                        </label>
                        <Listbox
                          data={groupOptions}
                          value={groupOptions.find(
                            (opt) => opt.id === formData.group
                          ) || null}
                          onChange={(selected: any) => {
                            setFormData({
                              ...formData,
                              group: selected?.id || "",
                            });
                          }}
                          placeholder="Select Group"
                          displayField="name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Opening Balance <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={formData.openingBalance}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                openingBalance: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Dr./Cr. <span className="text-red-500">*</span>
                          </label>
                          <Listbox
                            data={drCrOptions}
                            value={drCrOptions.find(
                              (opt) => opt.id === formData.drCr
                            ) || null}
                            onChange={(selected: any) => {
                              setFormData({
                                ...formData,
                                drCr: selected?.id || "",
                              });
                            }}
                            placeholder="Select"
                            displayField="name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <Select
                            options={countryOptions}
                            value={countryOptions.find(
                              (opt) => opt.label === formData.country
                            ) || null}
                            onChange={(selected: any) => {
                              setFormData({
                                ...formData,
                                country: selected?.label || "",
                              });
                            }}
                            placeholder="Select Country"
                            isSearchable
                            className="react-select-container"
                            classNamePrefix="react-select"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            State <span className="text-red-500">*</span>
                          </label>
                          <Select
                            options={stateOptions}
                            value={stateOptions.find(
                              (opt) => opt.label === formData.state
                            ) || null}
                            onChange={(selected: any) => {
                              setFormData({
                                ...formData,
                                state: selected?.label || "",
                              });
                            }}
                            placeholder="Select State"
                            isSearchable
                            className="react-select-container"
                            classNamePrefix="react-select"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          State Code
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter state code"
                          value={formData.stateCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stateCode: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            District
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter district"
                            value={formData.district}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                district: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Taluka
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter taluka"
                            value={formData.taluka}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                taluka: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            City
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                city: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Area
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter area"
                            value={formData.area}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                area: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Address Line 1
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter address line 1"
                          value={formData.addressLine1}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              addressLine1: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Address Line 2
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter address line 2"
                          value={formData.addressLine2}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              addressLine2: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Pincode
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter pincode"
                            value={formData.pincode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pincode: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mobile <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter mobile number"
                            value={formData.mobile}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mobile: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                          </label>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Contact Person
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter contact person"
                          value={formData.contactPerson}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contactPerson: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden lg:block">
                      <div className="h-full w-px bg-gray-200 dark:bg-gray-700" />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Birthday On
                          </label>
                          <DatePicker
                            placeholder="Select birthday"
                            value={formData.birthdayOn}
                            onChange={(date: any) => {
                              setFormData({
                                ...formData,
                                birthdayOn: date,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Anniversary
                          </label>
                          <DatePicker
                            placeholder="Select anniversary"
                            value={formData.anniversary}
                            onChange={(date: any) => {
                              setFormData({
                                ...formData,
                                anniversary: date,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bank Account No.
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter bank account number"
                          value={formData.bankAccountNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bankAccountNo: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bank Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter bank name"
                          value={formData.bankName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bankName: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            IFSC Code
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter IFSC code"
                            value={formData.ifscCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                ifscCode: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Branch
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter branch"
                            value={formData.branch}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                branch: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          GST No.
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter GST number"
                          value={formData.gstNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gstNo: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          PAN Card
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter PAN card number"
                          value={formData.panCard}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              panCard: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Aadhar Card No.
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter Aadhar card number"
                          value={formData.aadharCardNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              aadharCardNo: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dark:border-dark-500 flex items-center justify-end gap-3 border-t border-gray-200 p-5">
                  <Button
                    variant="outlined"
                    color="neutral"
                    type="button"
                    onClick={() => setShowDrawer(false)}
                    className="h-10 min-w-[100px]"
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" className="h-10 min-w-[100px]">
                    Save
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>

      {/* View Drawer */}
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
                <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Account Details - {viewItem?.accountName}
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

                <div className="grow overflow-y-auto p-5">
                  {viewItem && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Account Name
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.accountName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Group
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.group}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Address
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.address}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          City
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.city}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          State
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.state}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Number
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.number}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Opening Balance
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.openingBalance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Current Balance
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.currentBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

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