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
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input, Select } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";

// Static Data
const variantData = [
  {
    id: 1,
    variantName: "Pro Max",
    model: "iPhone 15 Pro",
    createdAt: "25 Jul 2026",
    createdTime: "10:30 AM",
  },
  {
    id: 2,
    variantName: "Ultra",
    model: "Samsung Galaxy S24",
    createdAt: "24 Jul 2026",
    createdTime: "02:15 PM",
  },
  {
    id: 3,
    variantName: "DI 4x4",
    model: "Mahindra 265 DI",
    createdAt: "23 Jul 2026",
    createdTime: "09:45 AM",
  },
  {
    id: 4,
    variantName: "FE 2WD",
    model: "Swaraj 744 FE",
    createdAt: "22 Jul 2026",
    createdTime: "11:20 AM",
  },
  {
    id: 5,
    variantName: "Super",
    model: "Eicher 380",
    createdAt: "21 Jul 2026",
    createdTime: "04:00 PM",
  },
  {
    id: 6,
    variantName: "Premium",
    model: "John Deere 5050",
    createdAt: "20 Jul 2026",
    createdTime: "08:30 AM",
  },
  {
    id: 7,
    variantName: "Classic",
    model: "New Holland 3630",
    createdAt: "19 Jul 2026",
    createdTime: "01:10 PM",
  },
  {
    id: 8,
    variantName: "Cargo",
    model: "Tata Ace",
    createdAt: "18 Jul 2026",
    createdTime: "03:45 PM",
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

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

export default function Variant() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);

  // Static variants
  const variants = variantData;

  // Form state
  const [formData, setFormData] = useState({
    variantName: "",
    model: "",
  });

  // Filter data
  const filteredData = variants.filter((item) => {
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
    setFormData({ variantName: "", model: "" });
    setShowDrawer(true);
  };

  const handleOpenEditDrawer = (item: any) => {
    setEditId(item.id);
    setFormData({
      variantName: item.variantName,
      model: item.model,
    });
    setShowDrawer(true);
  };

  const handleSave = () => {
    setShowDrawer(false);
  };

  const handleDelete = (id: number) => {
    alert(`Delete variant with ID: ${id}`);
  };

  const handleBulkDelete = () => {
    alert(`Delete ${selectedIds.length} selected variants`);
  };

  const modelFilterOptions = [
    { id: "All", name: "All" },
    ...Array.from(new Set(variants.map((c) => c.model))).map((n) => ({
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
            Variant List
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all variants from here
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
    Add Variant
  </Button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search variant..."
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
                  Variant Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Model
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Created On
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
                      {item.variantName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.model}
                    </Td>
                    <Td className="py-4 text-gray-500 dark:text-gray-400">
                      {item.createdAt}
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
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={6}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No variants found
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
            <DialogPanel className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-md transform-gpu flex-col bg-white shadow-2xl transition-transform duration-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="flex h-full flex-col"
              >
                <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    {editId !== null ? "Edit Variant" : "Add Variant"}
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

                <div className="grow space-y-5 overflow-y-auto p-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Model
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
                    <label className="mb-2 block text-sm font-medium">
                      Variant Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter variant name"
                      value={formData.variantName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          variantName: e.target.value,
                        })
                      }
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
                    Save
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
