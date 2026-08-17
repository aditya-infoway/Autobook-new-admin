import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_ACCESSORIES_DETAIL = [
  {
    id: 1,
    item: "Seat Cover",
    itemCode: "SC-001",
    hsnCode: "8714.99",
    selectStock: "Available",
    tax: "18%",
    salesPrice: "1,200",
    status: "Active",
  },
  {
    id: 2,
    item: "Floor Mat",
    itemCode: "FM-002",
    hsnCode: "8708.99",
    selectStock: "Available",
    tax: "12%",
    salesPrice: "850",
    status: "Active",
  },
  {
    id: 3,
    item: "Mudguard Set",
    itemCode: "MS-003",
    hsnCode: "8712.00",
    selectStock: "Out of Stock",
    tax: "18%",
    salesPrice: "1,500",
    status: "Inactive",
  },
  {
    id: 4,
    item: "Side Mirror",
    itemCode: "SM-004",
    hsnCode: "7009.10",
    selectStock: "Available",
    tax: "5%",
    salesPrice: "650",
    status: "Active",
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function AccessoriesAllotDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    console.log(`Submitting accessories for ID: ${id}`);
    // Add your submit logic here
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header with Back Button */}
   <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
      Accessories Allot Detail
    </h1>
    <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
      View and manage accessories for quotation #{id}
    </p>
  </div>

  <button
    onClick={handleBack}
    className="inline-flex h-9 items-center gap-2 cursor-pointer rounded-md border border-gray-200 bg-primary-600 px-4 shadow-sm transition hover:bg-primary-600 dark:border-primary-700 dark:bg-primary-800 dark:hover:bg-primary-700"
  >
    <ArrowLeftIcon className="h-5 w-5 text-white dark:text-white" />
    <span className="text-sm font-medium text-white dark:text-white">Back</span>
  </button>
</div>

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[900px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="text-[11px]">Item</Th>
                <Th className="text-[11px]">Item Code</Th>
                <Th className="text-[11px]">HSN Code</Th>
                <Th className="text-[11px]">Select Stock</Th>
                <Th className="text-[11px]">Tax</Th>
                <Th className="text-[11px] text-right">Sales Price</Th>
                <Th className="text-[11px]">Status</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {STATIC_ACCESSORIES_DETAIL.map((item) => (
                <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                  <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">
                    {item.item}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.itemCode}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.hsnCode}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.selectStock}
                  </Td>
                  <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">
                    {item.tax}
                  </Td>
                  <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white text-right">
                    ₹{item.salesPrice}
                  </Td>
                  <Td className="py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
      </div>

      {/* Centered Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}