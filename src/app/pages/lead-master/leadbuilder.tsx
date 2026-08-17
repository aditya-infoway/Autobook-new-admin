import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { RefreshCw, ChevronUp } from "lucide-react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  DocumentTextIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { LeadDetailsModal } from "./model";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Combobox } from "@/components/shared/form/Combobox";

// --- STATIC MOCK DATA (Removed all dynamic API fetching) ---
const STATIC_LEADS = [
  {
    id: 1,
    quotationNo: "Q/26/27/1255",
    customer: {
      accountName: "Jayant Meghnath Dhakul",
      mobile: "942302537",
      birthday: "15-08-1985",
      city: "Akola",
      gstNo: "GST123",
      createdBy: "Jaysingh",
    },
    model: { modelName: "ACCESS 125" },
    showroomVariant: { variantName: "DISC RC ABS" },
    colour: { colourName: "Pearl Precious White" },
    executive: { employeeName: "Tanuja Jadhav" },
    expectedPurchaseDate: "30-08-2026",
    expectedDeliveryDate: "30-08-2026",
    deliveryTime: "11:00 AM",
    purchaseType: "Cash",
    enquirySource: "Walk In",
    dmsEnquiryNo: "ENQ/2026/0311",
    dmsEnquiryDate: "30-07-2026",
    leadStatus: "Pending",
    leadColor: "red",
    payment: "Pending",
    followUp: "Scheduled",
    finance: "Pending",
    feedback: "Good",
  },
  {
    id: 2,
    quotationNo: "Q/26/27/1254",
    customer: {
      accountName: "Renuka Sudhakar Lad",
      mobile: "888881111",
      birthday: "22-05-1990",
      city: "Pune",
      gstNo: "GST456",
      createdBy: "Rakesh",
    },
    model: { modelName: "ACCESS 125" },
    showroomVariant: { variantName: "DISC RC ABS" },
    colour: { colourName: "Pearl Precious White" },
    executive: { employeeName: "Rakesh Narkhede" },
    expectedPurchaseDate: "30-08-2026",
    expectedDeliveryDate: "30-08-2026",
    deliveryTime: "10:00 AM",
    purchaseType: "Finance",
    enquirySource: "Walk In",
    dmsEnquiryNo: "ENQ/2026/0310",
    dmsEnquiryDate: "30-07-2026",
    leadStatus: "Completed",
    leadColor: "green",
    payment: "Paid",
    followUp: "Done",
    finance: "Approved",
    feedback: "Excellent",
  },
];

// --- COMPONENTS ---

const StatusBadge = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) => (
  <div className="flex items-center justify-between py-0.5 text-[11px] leading-tight">
    <span className="w-16 font-medium text-gray-500 dark:text-gray-400">
      {label}:
    </span>
    <span
      className={`rounded-full px-2 py-0.5 font-semibold text-white ${colorClass}`}
    >
      {value}
    </span>
  </div>
);

// ─── ADD TEST DRIVE DRAWER ────────────────────────────────────────────────

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// ─── ADD TEST DRIVE DRAWER ────────────────────────────────────────────────

function AddTestDriveDrawer({
  isOpen,
  onClose,
  lead,
}: {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
}) {
  // Prevent crash if lead is null
  if (!lead) return null;

  const [testDriveDate, setTestDriveDate] = useState("04-08-2026");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [duration, setDuration] = useState("");
  const [speedometer, setSpeedometer] = useState("");
  const [licenceNo, setLicenceNo] = useState("");
  const [feedback, setFeedback] = useState("Satisfied");
  const [remarks, setRemarks] = useState("");
  const [place, setPlace] = useState<"Dealership" | "Other Place">(
    "Dealership",
  );
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedColour, setSelectedColour] = useState<any>(null);

  const handleSubmit = () => {
    console.log("Test Drive Submitted", {
      leadId: lead.id,
      testDriveDate,
      fromTime,
      toTime,
      duration,
      speedometer,
      licenceNo,
      feedback,
      remarks,
      place,
    });
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
                    
                    {/* Header - Fixed */}
                    <div className="flex-shrink-0 flex items-center justify-between bg-primary-500 px-4 py-4">
                      <DialogTitle className="text-lg font-semibold text-white">
                        Add Test Drive
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
                        {/* Row 1: Model & Variant (Read-only) */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Model <span className="text-red-500">*</span>
                            </label>
                            <Combobox
                              data={
                                [
                                  /* Replace with your real list of models */
                                ]
                              }
                              displayField="modelName"
                              value={selectedModel}
                              onChange={setSelectedModel}
                              placeholder="Search and Select Model"
                              searchFields={["modelName"]}
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Variant <span className="text-red-500">*</span>
                            </label>
                            <Combobox
                              data={
                                [
                                  /* Replace with your real list of variants */
                                ]
                              }
                              displayField="variantName"
                              value={selectedVariant}
                              onChange={setSelectedVariant}
                              placeholder="Search and Select Variant"
                              searchFields={["variantName"]}
                            />
                          </div>
                        </div>

                        {/* Row 2: Colour & Test Drive Date */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Colour <span className="text-red-500">*</span>
                            </label>
                            <Combobox
                              data={
                                [
                                  /* Replace with your real list of colours */
                                ]
                              }
                              displayField="colourName"
                              value={selectedColour}
                              onChange={setSelectedColour}
                              placeholder="Search and Select Colour"
                              searchFields={["colourName"]}
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Test Drive Date{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <DatePicker
                              value={testDriveDate}
                              onChange={(val: any) => setTestDriveDate(val)}
                              placeholder="DD-MM-YYYY"
                              options={{
                                dateFormat: "d-m-Y",
                                disableMobile: true,
                              }}
                            />
                          </div>
                        </div>

                        {/* Row 3: From Time, To Time, Duration */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Test Drive From Time{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="time"
                              value={fromTime}
                              onChange={(e) => setFromTime(e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Test Drive To Time{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="time"
                              value={toTime}
                              onChange={(e) => setToTime(e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Duration <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              placeholder="Duration"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                          </div>
                        </div>

                        {/* Row 4: Speedometer, Licence No, Feedback */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Vehicle Speedometer Running{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={speedometer}
                              onChange={(e) => setSpeedometer(e.target.value)}
                              placeholder="Vehicle Speedometer Running"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Licence No <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={licenceNo}
                              onChange={(e) => setLicenceNo(e.target.value)}
                              placeholder="Licence No"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Feedback <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="Satisfied">Satisfied</option>
                              <option value="Not Satisfied">Not Satisfied</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 5: Remarks & Place (Radio Buttons) */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Remarks <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={3}
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                              placeholder="Remarks"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Mention the Place of Test Drive Given{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2 space-y-2">
                              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <input
                                  type="radio"
                                  name="place"
                                  value="Dealership"
                                  checked={place === "Dealership"}
                                  onChange={() => setPlace("Dealership")}
                                  className="accent-primary-500"
                                />
                                Dealership
                              </label>
                              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <input
                                  type="radio"
                                  name="place"
                                  value="Other Place"
                                  checked={place === "Other Place"}
                                  onChange={() => setPlace("Other Place")}
                                  className="accent-primary-500"
                                />
                                Other Place
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions - Fixed */}
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
                        className="flex-1 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-600 sm:flex-none sm:min-w-[120px]"
                      >
                        Submit
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
export default function LeadBuilder() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showTestDriveDrawer, setShowTestDriveDrawer] = useState(false);
  const [selectedLeadForTestDrive, setSelectedLeadForTestDrive] =
    useState<any>(null);

  // Filter static data based on search
  const filteredData = STATIC_LEADS.filter((lead) => {
    const searchLower = search.toLowerCase();
    return (
      lead.customer.accountName.toLowerCase().includes(searchLower) ||
      lead.customer.mobile.includes(search) ||
      lead.model.modelName.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleFollowUp = (id: number) => {
    navigate(`/lead-master/follow-up/${id}`);
  };

  


 const handleCreateOrder = (id: number) => {
    navigate(`/lead-master/createorder/${id}`);
  };


  // Handlers (stubbed for static demo)
  const handleEdit = (id: number) => console.log(`Edit ${id}`);
  const handleDelete = (id: number) => console.log(`Delete ${id}`);

  const handlePayment = (id: number) => console.log(`Payment ${id}`);
  const handleOrderBill = (id: number) => console.log(`Order Bill ${id}`);
  const handleTestDrive = (lead: any) => {
    setSelectedLeadForTestDrive(lead);
    setShowTestDriveDrawer(true);
  };
  
  const handleCreateBooking = (id: number) =>
    console.log(`Create Booking ${id}`);
  const handleCancel = (id: number) => console.log(`Cancel ${id}`);
  const handleDeliveryChallan = (id: number) =>
    console.log(`Delivery Challan ${id}`);
  const handleEditQuotation = (id: number) =>
    console.log(`Edit Quotation ${id}`);

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
            Lead Builder Report
          </h1>
        </div>
       <div className="flex flex-wrap items-center gap-2">
  {/* 4 New Icons */}
  <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-red-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800">
    <FaFilePdf className="h-6 w-6" title="Export PDF" />
  </button>
  <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-green-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800">
    <FaFileExcel className="h-6 w-6" title="Export Excel" />
  </button>
  <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800">
    <RefreshCw className="h-6 w-6" />
  </button>
  <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800">
    <ChevronUp className="h-6 w-6" />
  </button>
  <Button color="primary" onClick={() => setShowLeadModal(true)}>
    <PlusIcon className="mr-1 size-4.5" /> Add Lead
  </Button>
</div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
        />
      </div>

      {/* Table Card */}
      <div className="dark:border-dark-700 dark:bg-dark-800 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1600px] border-collapse">
            <THead className="dark:border-dark-600 dark:bg-dark-700/60 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-8 text-center text-[10px]">SR NO</Th>
                <Th className="min-w-[180px] text-[11px]">Quotation No</Th>
                <Th className="min-w-[180px] text-[11px]">Customer Detail</Th>
                <Th className="min-w-[180px] text-[11px]">Vehicle Detail</Th>
                <Th className="min-w-[180px] text-[11px]">Purchase Detail</Th>
                <Th className="min-w-[180px] text-[11px]">DMS Detail</Th>
                <Th className="min-w-[160px] text-center text-[11px]">
                  Update
                </Th>
                <Th className="min-w-[160px] text-center text-[11px]">
                  Process / Billing
                </Th>
                <Th className="min-w-[100px] text-center text-[11px]">Lost</Th>
                <Th className="min-w-[120px] text-center text-[11px]">
                  Vehicle Registration
                </Th>
                <Th className="min-w-[120px] text-center text-[11px]">
                  Printing
                </Th>
                <Th className="min-w-[180px] text-center text-[11px]">
                  Status
                </Th>
              </Tr>
            </THead>
            <TBody>
              {currentItems.map((lead, idx) => (
                <Tr
                  key={lead.id}
                  className="dark:border-dark-700 border-b align-top"
                >
                  <Td className="px-1 py-2 text-center align-middle text-[11px] font-medium">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </Td>

                  <Td className="px-2 py-2 align-middle">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {lead.quotationNo}
                    </span>
                  </Td>

                  {/* Customer Detail */}
                  <Td className="px-2 py-2 text-[11px]">
                    <div className="space-y-1">
                      <div className="truncate font-bold text-gray-900 dark:text-white">
                        {lead.customer.accountName}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <PhoneIcon className="size-3.5 shrink-0" />
                        <span>{lead.customer.mobile}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="size-3.5 shrink-0" />
                        <span>{lead.customer.birthday}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <MapPinIcon className="size-3.5 shrink-0" />
                        <span>{lead.customer.city}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <UserIcon className="size-3.5 shrink-0" />
                        <span className="truncate">
                          Created by: {lead.customer.createdBy}
                        </span>
                      </div>
                    </div>
                  </Td>

                  {/* Vehicle Detail */}
                  <Td className="px-2 py-2 text-[11px]">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Model: {lead.model.modelName}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Variant: {lead.showroomVariant.variantName}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Colour: {lead.colour.colourName}
                      </div>
                    </div>
                  </Td>

                  {/* Purchase Detail */}
                  <Td className="px-2 py-2 text-[11px]">
                    <div className="space-y-1">
                      <div className="text-gray-600 dark:text-gray-400">
                        Executive:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {lead.executive.employeeName}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Purchase Date:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {lead.expectedPurchaseDate}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Delivery Time:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {lead.deliveryTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Purchase Type:
                        </span>
                        <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {lead.purchaseType}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Source:
                        </span>
                        <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                          {lead.enquirySource}
                        </span>
                      </div>
                    </div>
                  </Td>

                  {/* DMS Detail */}
                  <Td className="px-2 py-2 text-[11px]">
                    <div className="space-y-1">
                      <div className="text-gray-600 dark:text-gray-400">
                        DMS Enquiry No:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {lead.dmsEnquiryNo}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        DMS Enquiry Date:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {lead.dmsEnquiryDate}
                        </span>
                      </div>
                      <div className="mt-1 text-[10px] text-gray-500">
                        Created By: Sales Executive
                      </div>
                    </div>
                  </Td>

                  {/* Update Column */}
                  <Td className="px-2 py-2 align-middle">
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => handleFollowUp(lead.id)}
                        className="w-full cursor-pointer rounded-full border border-red-500 py-0.5 text-[11px] font-medium text-red-600 hover:bg-red-50"
                      >
                        Follow-up
                      </button>
                      <button
                        onClick={() => handlePayment(lead.id)}
                        className="w-full cursor-pointer rounded-full border border-green-500 py-0.5 text-[11px] font-medium text-green-600 hover:bg-green-50"
                      >
                        Payment
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOrderBill(lead.id)}
                          className="flex-1 cursor-pointer rounded-full border border-yellow-500 py-0.5 text-[11px] font-medium text-yellow-600 hover:bg-yellow-50"
                        >
                          Send Quotation
                        </button>
                        <button
                          onClick={() => handleEditQuotation(lead.id)}
                          className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <PencilSquareIcon className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleTestDrive(lead)}
                        className="w-full cursor-pointer rounded-full border border-red-500 py-0.5 text-[11px] font-medium text-red-600 hover:bg-red-50"
                      >
                        Test Drive
                      </button>
                    </div>
                  </Td>

                  {/* Process / Billing Column */}
                  <Td className="px-2 py-2 align-middle">
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => handleCreateOrder(lead.id)}
                        className="w-full cursor-pointer rounded-md border border-emerald-500 py-0.5 text-[11px] font-medium text-emerald-600 hover:bg-emerald-50"
                      >
                        Create Order
                      </button>
                      <button
                        onClick={() => handleCreateBooking(lead.id)}
                        className="w-full cursor-pointer rounded-md border border-red-500 py-0.5 text-[11px] font-medium text-red-600 hover:bg-red-50"
                      >
                        Booking / Stockist
                      </button>
                      <button
                        onClick={() => handleCancel(lead.id)}
                        className="w-full cursor-pointer rounded-md border border-red-600 bg-red-50 py-0.5 text-[11px] font-bold text-red-700 hover:bg-red-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleOrderBill(lead.id)}
                        className="w-full cursor-pointer rounded-md border border-blue-800 py-0.5 text-[11px] font-medium text-blue-900 hover:bg-blue-50"
                      >
                        Order Bill
                      </button>
                    </div>
                  </Td>

                  {/* Lost Column */}
                  <Td className="px-2 py-2 text-center align-middle">
                    <button
                      onClick={() => handleCancel(lead.id)}
                      className="w-full cursor-pointer rounded-md border border-red-600 bg-red-50 py-1 text-[11px] font-bold text-red-700 hover:bg-red-100"
                    >
                      Cancel
                    </button>
                  </Td>

                  {/* Vehicle Registration */}
                  <Td className="px-2 py-2 text-center align-middle">
                    <div className="flex flex-col gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                      <span className="cursor-pointer hover:text-blue-600">
                        Vehicle Age
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        Delivery Challan
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        Vehicle Regis.
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        RC
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        HSRP
                      </span>
                    </div>
                  </Td>

                  {/* Printing */}
                  <Td className="px-2 py-2 text-center align-middle">
                    <div className="flex flex-col gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                      <span className="cursor-pointer hover:text-blue-600">
                        Warranty Card:
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        Follow-up:
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        Delivery Challan:
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        Ex-Invoice:
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        Invoice:
                      </span>
                      <span className="cursor-pointer hover:text-blue-600">
                        Docket:
                      </span>
                    </div>
                  </Td>

                  {/* Status Column */}
                  <Td className="px-2 py-2 align-middle text-[11px]">
                    <div className="space-y-0.5">
                      <StatusBadge
                        label="Lead Status"
                        value={lead.leadStatus}
                        colorClass={`${lead.leadColor === "red" ? "bg-red-500" : "bg-green-500"}`}
                      />
                      <StatusBadge
                        label="Payment"
                        value={lead.payment}
                        colorClass={
                          lead.payment === "Paid"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      />
                      <StatusBadge
                        label="Follow-up"
                        value={lead.followUp}
                        colorClass={
                          lead.followUp === "Done"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      />
                      <StatusBadge
                        label="Lead Status"
                        value={lead.finance}
                        colorClass={
                          lead.finance === "Approved"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      />
                      <StatusBadge
                        label="Enquiry"
                        value={lead.feedback}
                        colorClass={
                          lead.feedback === "Excellent"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
              {currentItems.length === 0 && (
                <Tr>
                  <Td colSpan={12} className="py-12 text-center text-gray-400">
                    No leads found
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </div>

        {/* Footer Pagination */}
        {totalItems > 0 && (
          <div className="dark:border-dark-700 dark:bg-dark-800 flex flex-col gap-4 rounded-b-xl border-t border-gray-200 bg-white px-4 py-4 md:flex-row md:items-center">
            <div className="order-1 flex items-center justify-center gap-2 text-sm text-gray-600 md:w-1/3 md:justify-start dark:text-gray-400">
              <span>Show</span>
              <div className="w-20">
                <Menu
                  as="div"
                  className="relative inline-block w-full text-left"
                >
                  <MenuButton className="dark:border-dark-600 dark:bg-dark-700 flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none dark:text-gray-200">
                    <span>{itemsPerPage}</span>
                    <svg
                      className="ml-2 h-4 w-4 transform transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                      anchor="top start"
                      className="dark:bg-dark-700 dark:border-dark-600 z-200 w-20 space-y-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-xl ring-1 ring-black/5 [--anchor-gap:6px] focus:outline-none"
                    >
                      {[10, 20, 30, 40, 50, 100].map((opt) => (
                        <MenuItem key={opt}>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => {
                                setItemsPerPage(opt);
                                setCurrentPage(1);
                              }}
                              className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium ${
                                opt === itemsPerPage
                                  ? "bg-primary-500 text-white"
                                  : active
                                    ? "dark:bg-dark-600 bg-gray-100 text-gray-900 dark:text-white"
                                    : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {opt}
                              {opt === itemsPerPage && (
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
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
                {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                {totalItems} entries
              </span>
            </div>
          </div>
        )}
      </div>

      <LeadDetailsModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
      />

      <AddTestDriveDrawer
        isOpen={showTestDriveDrawer}
        onClose={() => setShowTestDriveDrawer(false)}
        lead={selectedLeadForTestDrive}
      />
    </div>
  );
}
