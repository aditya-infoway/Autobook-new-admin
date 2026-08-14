import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Button, Input } from "@/components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Static Data - Purchase Order List
const purchaseOrderListData = [
  {
    id: 1,
    leadId: "LEAD-001",
    customerName: "Rajesh Kumar",
    number: "9876543210",
    model: "iPhone 15 Pro",
    variant: "Pro Max",
    colour: "Pearl Grace White",
    expectedPurchaseDate: "25 Jul 2026",
    source: "Website",
    profession: "Salaried Professional",
    bookingDate: "20 Jul 2026",
    leadStatus: "Hot",
  },
  {
    id: 2,
    leadId: "LEAD-002",
    customerName: "Priya Sharma",
    number: "8765432109",
    model: "Samsung Galaxy S24",
    variant: "Ultra",
    colour: "Titanium Gray",
    expectedPurchaseDate: "24 Jul 2026",
    source: "Showroom Walk-in",
    profession: "Business Owner",
    bookingDate: "18 Jul 2026",
    leadStatus: "Warm",
  },
  {
    id: 3,
    leadId: "LEAD-003",
    customerName: "Amit Singh",
    number: "7654321098",
    model: "Mahindra 265 DI",
    variant: "DI 4x4",
    colour: "Red",
    expectedPurchaseDate: "23 Jul 2026",
    source: "Referral",
    profession: "Farmer",
    bookingDate: "15 Jul 2026",
    leadStatus: "Cold",
  },
  {
    id: 4,
    leadId: "LEAD-004",
    customerName: "Sneha Reddy",
    number: "6543210987",
    model: "Swaraj 744 FE",
    variant: "FE 2WD",
    colour: "Green",
    expectedPurchaseDate: "22 Jul 2026",
    source: "Digital Campaign",
    profession: "Self Employed",
    bookingDate: "12 Jul 2026",
    leadStatus: "Hot",
  },
  {
    id: 5,
    leadId: "LEAD-005",
    customerName: "Vikram Patil",
    number: "5432109876",
    model: "Eicher 380",
    variant: "Super",
    colour: "Yellow",
    expectedPurchaseDate: "21 Jul 2026",
    source: "Phone Call",
    profession: "Government Employee",
    bookingDate: "10 Jul 2026",
    leadStatus: "Warm",
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

export default function PurchaseOrderList() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const filteredData = purchaseOrderListData.filter((item) => {
    const matchesSearch =
      item.leadId.toLowerCase().includes(search.toLowerCase()) ||
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.number.includes(search);
    return matchesSearch;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "Warm":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Cold":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleBack = () => {
    navigate("/purchase-master/purchaseorder");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-primary-600 dark:text-primary-400 text-lg font-bold">
            Purchase Order Details
            {order && (
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                - {order.model} ({order.variant})
              </span>
            )}
          </h1>
          <div className="bg-primary-500 mt-1 h-[2px] w-12" />
        </div>
        <button
          onClick={handleBack}
          className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Order Summary Card */}
      {order && (
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Model</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {order.model}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Variant
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {order.variant}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Colour</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {order.colour}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Quantity
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {order.qty}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4 w-full max-w-md">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <Table
            hoverable
            className="w-full min-w-[800px] text-left [&_.table-th]:font-semibold"
          >
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-16 py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  S.No
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Lead ID
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Customer Name
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Number
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
                  Ex. Pu. Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Source
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Profession
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Booking Date
                </Th>
                <Th className="py-3.5 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Lead Status
                </Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <Tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                >
                  <Td className="py-3.5 text-center font-medium text-gray-500">
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td className="py-3.5 font-medium text-gray-900 dark:text-white">
                    {item.leadId}
                  </Td>
                  <Td className="py-3.5 font-medium text-gray-900 dark:text-white">
                    {item.customerName}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.number}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.model}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.variant}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.colour}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.expectedPurchaseDate}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.source}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.profession}
                  </Td>
                  <Td className="py-3.5 text-gray-600 dark:text-gray-400">
                    {item.bookingDate}
                  </Td>
                  <Td className="py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        item.leadStatus,
                      )}`}
                    >
                      {item.leadStatus}
                    </span>
                  </Td>
                </Tr>
              ))}

              {currentItems.length === 0 && (
                <Tr>
                  <Td
                    colSpan={12}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No leads found
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
    </div>
  );
}
