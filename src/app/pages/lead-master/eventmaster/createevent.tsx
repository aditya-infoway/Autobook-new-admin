import React, { useState, Fragment, useEffect } from "react";
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
import { Button, Checkbox } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_EVENTS = [
  {
    id: 1,
    eventName: "Mumbai Mega Drive",
    eventPrintName: "MMD 2026",
    startDate: "01-08-2026",
    endDate: "03-08-2026",
    zone: "West Zone",
    rmName: "Rahul Sharma",
    amName: "Amit Patil",
    location: "Mumbai Exhibition Center",
    dayActivity: "3 Days",
    enquiry: 45,
    testDrive: 30,
    booking: 12,
    sales: 8,
  },
  {
    id: 2,
    eventName: "Pune Monsoon Fest",
    eventPrintName: "PMF 2026",
    startDate: "15-08-2026",
    endDate: "18-08-2026",
    zone: "West Zone",
    rmName: "Rahul Sharma",
    amName: "Sneha Kulkarni",
    location: "Pune Camp Ground",
    dayActivity: "4 Days",
    enquiry: 80,
    testDrive: 55,
    booking: 20,
    sales: 14,
  },
  {
    id: 3,
    eventName: "Delhi Auto Expo",
    eventPrintName: "DAE 2026",
    startDate: "10-09-2026",
    endDate: "14-09-2026",
    zone: "North Zone",
    rmName: "Vikram Singh",
    amName: "Priya Gupta",
    location: "Delhi Pragati Maidan",
    dayActivity: "5 Days",
    enquiry: 150,
    testDrive: 90,
    booking: 45,
    sales: 30,
  },
];

const STATIC_EMPLOYEES = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Amit Patil" },
  { id: 3, name: "Sneha Kulkarni" },
  { id: 4, name: "Vikram Singh" },
  { id: 5, name: "Priya Gupta" },
  { id: 6, name: "Rakesh Narkhede" },
];

// ─── CREATE EVENT DRAWER (MODAL) ──────────────────────────────────────────

// ─── CREATE EVENT DRAWER (MODAL) ──────────────────────────────────────────

function CreateEventDrawer({
  isOpen,
  onClose,
  onSave,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventPrintName: "",
    startDate: "",
    endDate: "",
    zone: "",
    rmName: "",
    amName: "",
    companyName: "",
    companyCode: "",
    eventLocation: "",
    dayActivity: "",
    enquiry: "",
    testDrive: "",
    booking: "",
    sales: "",
    assignTo: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        eventName: initialData.eventName || "",
        eventPrintName: initialData.eventPrintName || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        zone: initialData.zone || "",
        rmName: initialData.rmName || "",
        amName: initialData.amName || "",
        companyName: initialData.companyName || "",
        companyCode: initialData.companyCode || "",
        eventLocation: initialData.location || "",
        dayActivity: initialData.dayActivity || "",
        enquiry: initialData.enquiry?.toString() || "",
        testDrive: initialData.testDrive?.toString() || "",
        booking: initialData.booking?.toString() || "",
        sales: initialData.sales?.toString() || "",
        assignTo: null,
      });
    } else {
      setFormData({
        eventName: "",
        eventPrintName: "",
        startDate: "",
        endDate: "",
        zone: "",
        rmName: "",
        amName: "",
        companyName: "",
        companyCode: "",
        eventLocation: "",
        dayActivity: "",
        enquiry: "",
        testDrive: "",
        booking: "",
        sales: "",
        assignTo: null,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

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
                    
                    {/* Header - Fixed */}
                    <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-200 bg-primary-600 px-4 py-4 dark:border-gray-700">
                      <DialogTitle className="text-base font-semibold leading-6 text-white">
                        {initialData ? "Edit Event" : "Create Event"}
                      </DialogTitle>
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md text-white/80 hover:text-white focus:outline-none"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Body Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                        {/* Event Name */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.eventName}
                            onChange={(e) =>
                              handleChange("eventName", e.target.value)
                            }
                            placeholder="Enter Event Name"
                            className={inputClass}
                          />
                        </div>

                        {/* Event Print Name */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event Print Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.eventPrintName}
                            onChange={(e) =>
                              handleChange("eventPrintName", e.target.value)
                            }
                            placeholder="Short Print Name"
                            className={inputClass}
                          />
                        </div>

                        {/* Start Date */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event Start Date
                          </label>
                          <DatePicker
                            value={formData.startDate}
                            onChange={(val) => handleChange("startDate", val)}
                            placeholder="DD-MM-YYYY"
                            options={{
                              dateFormat: "d-m-Y",
                              disableMobile: true,
                            }}
                          />
                        </div>

                        {/* End Date */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event End Date
                          </label>
                          <DatePicker
                            value={formData.endDate}
                            onChange={(val) => handleChange("endDate", val)}
                            placeholder="DD-MM-YYYY"
                            options={{
                              dateFormat: "d-m-Y",
                              disableMobile: true,
                            }}
                          />
                        </div>

                        {/* Zone */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Zone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.zone}
                            onChange={(e) =>
                              handleChange("zone", e.target.value)
                            }
                            placeholder="Enter Zone"
                            className={inputClass}
                          />
                        </div>

                        {/* RM Name */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            RM Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.rmName}
                            onChange={(e) =>
                              handleChange("rmName", e.target.value)
                            }
                            placeholder="Enter RM Name"
                            className={inputClass}
                          />
                        </div>

                        {/* AM Name */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            AM Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.amName}
                            onChange={(e) =>
                              handleChange("amName", e.target.value)
                            }
                            placeholder="Enter AM Name"
                            className={inputClass}
                          />
                        </div>

                        {/* Company Name */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) =>
                              handleChange("companyName", e.target.value)
                            }
                            placeholder="Enter Company Name"
                            className={inputClass}
                          />
                        </div>

                        {/* Company Code */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Company Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.companyCode}
                            onChange={(e) =>
                              handleChange("companyCode", e.target.value)
                            }
                            placeholder="Enter Company Code"
                            className={inputClass}
                          />
                        </div>

                        {/* Event Location */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event Location{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.eventLocation}
                            onChange={(e) =>
                              handleChange("eventLocation", e.target.value)
                            }
                            placeholder="Enter Event Location"
                            className={inputClass}
                          />
                        </div>

                        {/* Day of Activity */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            How many day of activity?{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.dayActivity}
                            onChange={(e) =>
                              handleChange("dayActivity", e.target.value)
                            }
                            placeholder="e.g. 3 Days"
                            className={inputClass}
                          />
                        </div>

                        {/* Enquiry */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Enquiry <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={formData.enquiry}
                            onChange={(e) =>
                              handleChange("enquiry", e.target.value)
                            }
                            placeholder="0"
                            className={inputClass}
                          />
                        </div>

                        {/* Test Drive */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Test Drive <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={formData.testDrive}
                            onChange={(e) =>
                              handleChange("testDrive", e.target.value)
                            }
                            placeholder="0"
                            className={inputClass}
                          />
                        </div>

                        {/* Booking */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Booking <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={formData.booking}
                            onChange={(e) =>
                              handleChange("booking", e.target.value)
                            }
                            placeholder="0"
                            className={inputClass}
                          />
                        </div>

                        {/* Sales */}
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sales <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={formData.sales}
                            onChange={(e) =>
                              handleChange("sales", e.target.value)
                            }
                            placeholder="0"
                            className={inputClass}
                          />
                        </div>

                        {/* Assign To (Search Dropdown) */}
                        <div className="col-span-2 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Assign To <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <Combobox
                              data={STATIC_EMPLOYEES}
                              displayField="name"
                              value={formData.assignTo}
                              onChange={(val: any) =>
                                handleChange("assignTo", val)
                              }
                              placeholder="Search Employee..."
                              searchFields={["name"]}
                              columns={[
                                {
                                  header: "Employee Name",
                                  field: "name",
                                  width: "2fr",
                                },
                              ]}
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
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:flex-none sm:min-w-[120px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700 sm:flex-none sm:min-w-[120px]"
                      >
                        {initialData ? "Update Event" : "Create Event"}
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

export default function CreateEvent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting event ${id}`);
  };

  const handleSave = (data: any) => {
    console.log("Saving event:", data);
    setIsDrawerOpen(false);
  };

  // Filter and Pagination Logic
  const filteredData = STATIC_EVENTS.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.eventName.toLowerCase().includes(searchLower) ||
      item.eventPrintName.toLowerCase().includes(searchLower) ||
      item.location.toLowerCase().includes(searchLower)
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
            Create Event
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage and track all marketing events
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

  {/* Add Event */}
  <Button
    color="primary"
    onClick={handleAdd}
    className="ml-auto whitespace-nowrap"
  >
    <PlusIcon className="mr-1.5 h-4 w-4" />
    Add Event
  </Button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
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
                <Th className="w-10 text-center">
                  <Checkbox
                    className="size-4.5"
                    checked={isAllPageSelected}
                    indeterminate={isSomePageSelected}
                    onChange={(e: any) => handleSelectAll(e.target.checked)}
                  />
                </Th>
                <Th className="w-12 text-center text-[11px]">SR NO.</Th>
                <Th className="text-[11px]">Event Name</Th>
                <Th className="text-[11px]">Event Print Name</Th>
                <Th className="text-[11px]">Start Date</Th>
                <Th className="text-[11px]">End Date</Th>
                <Th className="text-[11px]">Zone</Th>
                <Th className="text-[11px]">RM Name</Th>
                <Th className="text-[11px]">AM Name</Th>
                <Th className="text-[11px]">Event Location</Th>
                <Th className="text-center text-[11px]">Day of Activity</Th>
                <Th className="text-center text-[11px]">Enquiry</Th>
                <Th className="text-center text-[11px]">Test Drive</Th>
                <Th className="text-center text-[11px]">Booking</Th>
                <Th className="text-center text-[11px]">Sales</Th>
                <Th className="w-20 text-center text-[11px]">Action</Th>
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
                      {item.eventName}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.eventPrintName}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.startDate}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.endDate}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.zone}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.rmName}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.amName}
                    </Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.location}
                    </Td>
                    <Td className="py-4 text-center text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.dayActivity}
                    </Td>
                    <Td className="py-4 text-center text-[12px] font-bold text-blue-600 dark:text-blue-400">
                      {item.enquiry}
                    </Td>
                    <Td className="py-4 text-center text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
                      {item.testDrive}
                    </Td>
                    <Td className="py-4 text-center text-[12px] font-bold text-purple-600 dark:text-purple-400">
                      {item.booking}
                    </Td>
                    <Td className="py-4 text-center text-[12px] font-bold text-green-600 dark:text-green-400">
                      {item.sales}
                    </Td>
                    {/* ✅ ACTION COLUMN - DROPDOWN MENU STYLE */}
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
                );
              })}
              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={16}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No events found
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

      {/* Create Event Drawer */}
      <CreateEventDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSave}
        initialData={editingEvent}
      />
    </div>
  );
}
