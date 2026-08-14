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
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Button, Checkbox, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Combobox } from "@/components/shared/form/Combobox";
import { Listbox } from "@/components/shared/form/StyledListbox";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { useNavigate } from "react-router";

// Static Data
const purchaseRegisterData = [
  {
    id: 1,
    purchaseDate: "25 Jul 2026",
    terms: "Net 30",
    supplierName: "ABC Suppliers",
    billNo: "INV-001",
    purchaseBillNo: "PB-001",
    location: "Mumbai",
    totalQuantity: 150,
    totalAmount: 45000,
    freightInsuranceOther: 2000,
    cgstAmount: 1800,
    sgstAmount: 1800,
    igstAmount: 0,
    grandTotal: 50600,
    transportName: "Speed Logistics",
    mobileNo: "9876543210",
    vehicleNo: "MH-01-AB-1234",
    status: "Pending",
    createdAt: "25 Jul 2026",
    createdTime: "10:30 AM",
    isInward: false,
  },
  {
    id: 2,
    purchaseDate: "24 Jul 2026",
    terms: "Cash",
    supplierName: "XYZ Traders",
    billNo: "INV-002",
    purchaseBillNo: "PB-002",
    location: "Pune",
    totalQuantity: 80,
    totalAmount: 28000,
    freightInsuranceOther: 1500,
    cgstAmount: 1200,
    sgstAmount: 1200,
    igstAmount: 0,
    grandTotal: 31900,
    transportName: "Fast Cargo",
    mobileNo: "8765432109",
    vehicleNo: "MH-12-CD-5678",
    status: "Success",
    createdAt: "24 Jul 2026",
    createdTime: "02:15 PM",
    isInward: true,
  },
  {
    id: 3,
    purchaseDate: "23 Jul 2026",
    terms: "Net 15",
    supplierName: "MNO Enterprises",
    billNo: "INV-003",
    purchaseBillNo: "PB-003",
    location: "Bangalore",
    totalQuantity: 200,
    totalAmount: 75000,
    freightInsuranceOther: 3000,
    cgstAmount: 2800,
    sgstAmount: 2800,
    igstAmount: 0,
    grandTotal: 83600,
    transportName: "Reliable Transport",
    mobileNo: "7654321098",
    vehicleNo: "KA-03-EF-9012",
    status: "Pending",
    createdAt: "23 Jul 2026",
    createdTime: "09:45 AM",
    isInward: false,
  },
];

const entriesOptions = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
  { id: 40, name: "40" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

export default function PurchaseRegister() {
  const navigate = useNavigate();
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const purchases = purchaseRegisterData;

  const [formData, setFormData] = useState({
    purchaseDate: "",
    terms: "",
    supplierName: "",
    billNo: "",
    purchaseBillNo: "",
    location: "",
    totalQuantity: "",
    totalAmount: "",
    freightInsuranceOther: "",
    cgstAmount: "",
    sgstAmount: "",
    igstAmount: "",
    grandTotal: "",
    transportName: "",
    mobileNo: "",
    vehicleNo: "",
    status: "Pending",
  });

  const filteredData = purchases.filter((item) => {
    const matchesSearch =
      item.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      item.billNo.toLowerCase().includes(search.toLowerCase()) ||
      item.purchaseBillNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatusFilter === "All" || item.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenAddDrawer = () => {
    setEditId(null);
    setFormData({
      purchaseDate: "",
      terms: "",
      supplierName: "",
      billNo: "",
      purchaseBillNo: "",
      location: "",
      totalQuantity: "",
      totalAmount: "",
      freightInsuranceOther: "",
      cgstAmount: "",
      sgstAmount: "",
      igstAmount: "",
      grandTotal: "",
      transportName: "",
      mobileNo: "",
      vehicleNo: "",
      status: "Pending",
    });
    setShowAddDrawer(true);
  };

  const handleOpenEditDrawer = (item: any) => {
    setEditId(item.id);
    setFormData({
      purchaseDate: item.purchaseDate,
      terms: item.terms,
      supplierName: item.supplierName,
      billNo: item.billNo,
      purchaseBillNo: item.purchaseBillNo,
      location: item.location,
      totalQuantity: String(item.totalQuantity),
      totalAmount: String(item.totalAmount),
      freightInsuranceOther: String(item.freightInsuranceOther),
      cgstAmount: String(item.cgstAmount),
      sgstAmount: String(item.sgstAmount),
      igstAmount: String(item.igstAmount),
      grandTotal: String(item.grandTotal),
      transportName: item.transportName,
      mobileNo: item.mobileNo,
      vehicleNo: item.vehicleNo,
      status: item.status,
    });
    setShowAddDrawer(true);
  };

  const handleView = (item: any) => {
    setViewItem(item);
    setShowViewDrawer(true);
  };

  const handleInwardAction = (item: any) => {
    navigate(`/purchase-master/purchaseregister/purchaseitem/${item.id}`);
  };

  const handleSave = () => {
    setShowAddDrawer(false);
  };

  const handleDelete = (id: number) => {
    alert(`Delete purchase with ID: ${id}`);
  };

  const handleBulkDelete = () => {
    alert(`Delete ${selectedIds.length} selected purchases`);
  };

  const statusFilterOptions = [
    { id: "All", name: "All" },
    { id: "Pending", name: "Pending" },
    { id: "Success", name: "Success" },
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
            Purchase Register
          </h1>
          <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
            Manage all purchases from here
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
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
            onClick={() =>
              navigate("/purchase-master/purchaseregister/addpurchaseregister")
            }
            className="ml-auto whitespace-nowrap"
          >
            Add Purchase
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search purchase..."
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
          <Table
            hoverable
            className="w-full min-w-[1200px] text-left [&_.table-th]:font-semibold"
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
                  Action
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Purchase Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Terms
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Supplier Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Bill No.
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Purchase Bill No.
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Location
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Total Qty
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Total Amount
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Freight + Ins + Other
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  CGST
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  SGST
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  IGST
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Grand Total
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Transport Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Mobile No.
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Vehicle No.
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Status
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
                      {item.isInward ? (
                        // Inward Action: Down Arrow
                        <button
                          onClick={() => handleInwardAction(item)}
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                          title="Inward"
                        >
                          <ChevronDownIcon className="size-4.5" />
                        </button>
                      ) : (
                        // Normal Action: Edit (Pencil)
                        <button
                          
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                          title="Edit"
                        >
                          <PencilSquareIcon className="size-4.5" />
                        </button>
                      )}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.purchaseDate}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.terms}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      {item.supplierName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.billNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.purchaseBillNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.location}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.totalQuantity}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.totalAmount.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.freightInsuranceOther.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.cgstAmount.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.sgstAmount.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      ₹{item.igstAmount.toLocaleString()}
                    </Td>
                    <Td className="py-4 font-medium text-gray-900 dark:text-white">
                      ₹{item.grandTotal.toLocaleString()}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.transportName}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.mobileNo}
                    </Td>
                    <Td className="py-4 text-gray-600 dark:text-gray-400">
                      {item.vehicleNo}
                    </Td>
                    <Td className="py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          item.status === "Success"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </Td>
                  </Tr>
                );
              })}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={20}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No purchases found
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
      <Transition appear show={showAddDrawer} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100]"
          onClose={() => setShowAddDrawer(false)}
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
                    {editId !== null ? "Edit Purchase" : "Add Purchase"}
                  </h2>
                  <Button
                    onClick={() => setShowAddDrawer(false)}
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
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Purchase Date
                      </label>
                      <DatePicker
                        placeholder="Select date"
                        value={formData.purchaseDate}
                        onChange={(date: any) => {
                          setFormData({ ...formData, purchaseDate: date });
                        }}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Terms
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter terms"
                        value={formData.terms}
                        onChange={(e) =>
                          setFormData({ ...formData, terms: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Supplier Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter supplier name"
                        value={formData.supplierName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            supplierName: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bill No.
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter bill no"
                        value={formData.billNo}
                        onChange={(e) =>
                          setFormData({ ...formData, billNo: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Purchase Bill No.
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter purchase bill no"
                        value={formData.purchaseBillNo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            purchaseBillNo: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Quantity
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter total quantity"
                        value={formData.totalQuantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalQuantity: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter total amount"
                        value={formData.totalAmount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalAmount: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Freight + Insurance + Other
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={formData.freightInsuranceOther}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            freightInsuranceOther: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        CGST Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter CGST amount"
                        value={formData.cgstAmount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cgstAmount: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        SGST Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter SGST amount"
                        value={formData.sgstAmount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sgstAmount: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        IGST Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter IGST amount"
                        value={formData.igstAmount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            igstAmount: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Grand Total
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter grand total"
                        value={formData.grandTotal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            grandTotal: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Transport Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter transport name"
                        value={formData.transportName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            transportName: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mobile No.
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter mobile no"
                        value={formData.mobileNo}
                        onChange={(e) =>
                          setFormData({ ...formData, mobileNo: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Vehicle No.
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter vehicle no"
                        value={formData.vehicleNo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vehicleNo: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Success">Success</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="dark:border-dark-500 flex items-center justify-end gap-3 border-t border-gray-200 p-5">
                  <Button
                    variant="outlined"
                    color="neutral"
                    type="button"
                    onClick={() => setShowAddDrawer(false)}
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
                    Purchase Details - {viewItem?.billNo}
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
                          Purchase Date
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.purchaseDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Terms
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.terms}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Supplier Name
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.supplierName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Bill No.
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.billNo}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Purchase Bill No.
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.purchaseBillNo}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Location
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total Quantity
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.totalQuantity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total Amount
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Freight + Ins + Other
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.freightInsuranceOther.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          CGST Amount
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.cgstAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SGST Amount
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.sgstAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          IGST Amount
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.igstAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Grand Total
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ₹{viewItem.grandTotal.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Transport Name
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.transportName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Mobile No.
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.mobileNo}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Vehicle No.
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {viewItem.vehicleNo}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              viewItem.status === "Success"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {viewItem.status}
                          </span>
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
