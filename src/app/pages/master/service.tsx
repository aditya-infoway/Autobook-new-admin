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
  TrashIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PlusIcon,
  CheckIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import { Listbox } from "@/components/shared/form/StyledListbox";

// Static Data
const serviceData = [
  {
    id: 1,
    model: "iPhone 15 Pro",
    services: [
      {
        serviceNo: "SVC-001",
        distance: "10,000 km",
        timePeriod: "6 Months",
        serviceType: "Regular Service",
      },
      {
        serviceNo: "SVC-002",
        distance: "20,000 km",
        timePeriod: "12 Months",
        serviceType: "Major Service",
      },
    ],
    createdAt: "25 Jul 2026",
    createdTime: "10:30 AM",
  },
  {
    id: 2,
    model: "Samsung Galaxy S24",
    services: [
      {
        serviceNo: "SVC-003",
        distance: "5,000 km",
        timePeriod: "3 Months",
        serviceType: "Basic Service",
      },
    ],
    createdAt: "24 Jul 2026",
    createdTime: "02:15 PM",
  },
  {
    id: 3,
    model: "Mahindra 265 DI",
    services: [
      {
        serviceNo: "SVC-004",
        distance: "15,000 km",
        timePeriod: "9 Months",
        serviceType: "Regular Service",
      },
      {
        serviceNo: "SVC-005",
        distance: "30,000 km",
        timePeriod: "18 Months",
        serviceType: "Major Service",
      },
      {
        serviceNo: "SVC-006",
        distance: "45,000 km",
        timePeriod: "24 Months",
        serviceType: "Overhaul Service",
      },
    ],
    createdAt: "23 Jul 2026",
    createdTime: "09:45 AM",
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

const serviceTypeOptions = [
  { id: 1, name: "Basic Service" },
  { id: 2, name: "Regular Service" },
  { id: 3, name: "Major Service" },
  { id: 4, name: "Overhaul Service" },
  { id: 5, name: "Emergency Service" },
];

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

export default function Service() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>("All");
  const services = serviceData;

  const [formData, setFormData] = useState({
    model: "",
  });

  // Service entry form
  const [serviceEntry, setServiceEntry] = useState({
    serviceNo: "",
    distance: "",
    timePeriod: "",
    serviceType: "",
  });

  // Added services list
  const [addedServices, setAddedServices] = useState<any[]>([]);

  const filteredData = services.filter((item) => {
    const matchesSearch = item.model
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesModel =
      selectedModelFilter === "All" || item.model === selectedModelFilter;
    return matchesSearch && matchesModel;
  });

  const modelFilterOptions = [
    { id: "All", name: "All" },
    ...Array.from(new Set(services.map((c) => c.model))).map((n) => ({
      id: n,
      name: n,
    })),
  ];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenAddDrawer = () => {
    setEditId(null);
    setFormData({ model: "" });
    setAddedServices([]);
    setServiceEntry({
      serviceNo: "",
      distance: "",
      timePeriod: "",
      serviceType: "",
    });
    setShowDrawer(true);
  };

  const handleOpenEditDrawer = (item: any) => {
    setEditId(item.id);
    setFormData({ model: item.model });
    setAddedServices(item.services || []);
    setServiceEntry({
      serviceNo: "",
      distance: "",
      timePeriod: "",
      serviceType: "",
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

  const handleDelete = (id: number) => {
    alert(`Delete service with ID: ${id}`);
  };

  const handleBulkDelete = () => {
    alert(`Delete ${selectedIds.length} selected services`);
  };

  const handleAddService = () => {
    if (
      serviceEntry.serviceNo &&
      serviceEntry.distance &&
      serviceEntry.timePeriod &&
      serviceEntry.serviceType
    ) {
      setAddedServices([...addedServices, { ...serviceEntry }]);
      setServiceEntry({
        serviceNo: "",
        distance: "",
        timePeriod: "",
        serviceType: "",
      });
    } else {
      alert("Please fill all service fields");
    }
  };

  const handleRemoveService = (index: number) => {
    const newServices = addedServices.filter((_, i) => i !== index);
    setAddedServices(newServices);
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
            Service List
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all services from here
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
    Add Service
  </Button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search service..."
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
              <Combobox
                data={[
                  { id: "All", name: "All" },
                  ...modelOptions.map((opt) => ({
                    id: opt.name,
                    name: opt.name,
                  })),
                ]}
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
      )}

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table
            hoverable
            className="w-full min-w-[600px] text-left [&_.table-th]:font-semibold"
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
                  Model
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
                      {item.model}
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
                    colSpan={5}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No services found
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
            <DialogPanel className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-4xl transform-gpu flex-col bg-white shadow-2xl transition-transform duration-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="flex h-full flex-col"
              >
                <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    {editId !== null ? "Edit Service" : "Add Service"}
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
                  {/* Select Model */}
                  <div className="max-w-md">
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

                  {/* Service Entry Form */}
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white">
                      Add Service Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Service No <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter service no"
                          value={serviceEntry.serviceNo}
                          onChange={(e) =>
                            setServiceEntry({
                              ...serviceEntry,
                              serviceNo: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Distance <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter distance"
                          value={serviceEntry.distance}
                          onChange={(e) =>
                            setServiceEntry({
                              ...serviceEntry,
                              distance: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Time Period <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter time period"
                          value={serviceEntry.timePeriod}
                          onChange={(e) =>
                            setServiceEntry({
                              ...serviceEntry,
                              timePeriod: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Service Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <Listbox
                            data={serviceTypeOptions}
                            value={
                              serviceTypeOptions.find(
                                (opt) => opt.name === serviceEntry.serviceType,
                              ) || null
                            }
                            onChange={(selected: any) => {
                              setServiceEntry({
                                ...serviceEntry,
                                serviceType: selected?.name || "",
                              });
                            }}
                            placeholder="Select Type"
                            displayField="name"
                          />
                          <Button
                            type="button"
                            color="primary"
                            isIcon
                            onClick={handleAddService}
                            className="h-10 w-10 flex-shrink-0"
                          >
                            <CheckIcon className="size-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Added Services Table */}
                  {addedServices.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white">
                        Added Services
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-gray-500/20 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                            <tr className="border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                              <th className="px-4 py-2 font-semibold">
                                Service No
                              </th>
                              <th className="px-4 py-2 font-semibold">
                                Distance
                              </th>
                              <th className="px-4 py-2 font-semibold">
                                Time Period
                              </th>
                              <th className="px-4 py-2 font-semibold">
                                Service Type
                              </th>
                              <th className="px-4 py-2 text-center font-semibold">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {addedServices.map((service, idx) => (
                              <tr
                                key={idx}
                                className="whitespace-nowrap transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                              >
                                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                  {service.serviceNo}
                                </td>
                                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                  {service.distance}
                                </td>
                                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                  {service.timePeriod}
                                </td>
                                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                  {service.serviceType}
                                </td>
                                <td className="px-4 py-2 text-center">
                                  <Button
                                    type="button"
                                    color="error"
                                    isIcon
                                    onClick={() => handleRemoveService(idx)}
                                    className="h-7 w-7 flex-shrink-0"
                                  >
                                    <MinusIcon className="size-3.5" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
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
                    Service Details - {viewItem?.model}
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
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-500/20 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                          <tr className="border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                            <th className="px-4 py-3 font-semibold">
                              Service No
                            </th>
                            <th className="px-4 py-3 font-semibold">
                              Distance
                            </th>
                            <th className="px-4 py-3 font-semibold">
                              Time Period
                            </th>
                            <th className="px-4 py-3 font-semibold">
                              Service Type
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                          {viewItem.services?.map(
                            (service: any, idx: number) => (
                              <tr
                                key={idx}
                                className="whitespace-nowrap transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                              >
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                  {service.serviceNo}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                  {service.distance}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                  {service.timePeriod}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                  {service.serviceType}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {(!viewItem?.services || viewItem.services.length === 0) && (
                    <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                      No services found for this model
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
