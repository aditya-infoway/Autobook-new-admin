import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EyeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_STOCK_DETAILS = {
  1: [
    {
      id: 1,
      itemName: "Seat Cover",
      itemCode: "SC-001",
      hsn: "8714.99",
      unit: "PCS",
      group: "Seats",
      totalStock: 100,
      stock: 45,
    },
    {
      id: 2,
      itemName: "Floor Mat",
      itemCode: "FM-002",
      hsn: "8708.99",
      unit: "PCS",
      group: "Floorings",
      totalStock: 200,
      stock: 120,
    },
    {
      id: 3,
      itemName: "Side Mirror",
      itemCode: "SM-003",
      hsn: "7009.10",
      unit: "SET",
      group: "Mirrors",
      totalStock: 50,
      stock: 12,
    },
  ],
  2: [
    {
      id: 4,
      itemName: "Mudguard Set",
      itemCode: "MS-004",
      hsn: "8712.00",
      unit: "SET",
      group: "Body Parts",
      totalStock: 80,
      stock: 30,
    },
    {
      id: 5,
      itemName: "Handle Grip",
      itemCode: "HG-005",
      hsn: "8714.99",
      unit: "SET",
      group: "Controls",
      totalStock: 150,
      stock: 90,
    },
  ],
  3: [],
  4: [
    {
      id: 6,
      itemName: "Leg Guard",
      itemCode: "LG-006",
      hsn: "8714.10",
      unit: "PCS",
      group: "Safety",
      totalStock: 60,
      stock: 20,
    },
    {
      id: 7,
      itemName: "Headlight Assembly",
      itemCode: "HA-007",
      hsn: "8512.20",
      unit: "PCS",
      group: "Lighting",
      totalStock: 40,
      stock: 8,
    },
  ],
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function StockReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const modelId = Number(id) as keyof typeof STATIC_STOCK_DETAILS;

  const handleBack = () => {
    navigate(-1);
  };

 const handleViewStock = (item: any) => {
  navigate(`/accessoriesmaster/fullstock/${item.id}`);
};

  const stockData = STATIC_STOCK_DETAILS[modelId] || [];

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header with Back Button */}
     <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
      Accessories Stock Report
    </h1>
  </div>
  
  <button
    onClick={handleBack}
    className="inline-flex h-9 items-center gap-2 cursor-pointer rounded-md border border-gray-200 bg-primary-600 px-4 shadow-sm transition hover:bg-primary-700 dark:border-gray-700 dark:bg-primary-800 dark:hover:bg-primary-700"
  >
    <ArrowLeftIcon className="h-5 w-5 text-white dark:text-white" />
    <span className="text-sm font-medium text-white dark:text-white">Back</span>
  </button>
</div>

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="w-16 text-center text-[11px]">Sr No.</Th>
                <Th className="text-[11px]">Item Name</Th>
                <Th className="text-[11px]">Item Code</Th>
                <Th className="text-[11px]">HSN</Th>
                <Th className="text-[11px]">Unit</Th>
                <Th className="text-[11px]">Group</Th>
                <Th className="text-center text-[11px]">Total Stock</Th>
                <Th className="text-center text-[11px]">Stock</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {stockData.length > 0 ? (
                stockData.map((item, index) => (
                  <Tr
                    key={item.id}
                    className="dark:hover:bg-dark-700/40 align-middle transition-colors hover:bg-gray-50/30"
                  >
                    <Td className="py-3 text-center text-[12px] font-medium text-gray-500">
                      {index + 1}
                    </Td>
                    <Td className="py-3 text-[12px] font-medium text-gray-900 dark:text-white">
                      {item.itemName}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.itemCode}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.hsn}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.unit}
                    </Td>
                    <Td className="py-3 text-[12px] text-gray-700 dark:text-gray-300">
                      {item.group}
                    </Td>
                    <Td className="py-3 text-center text-[12px] font-semibold text-gray-900 dark:text-white">
                      {item.totalStock}
                    </Td>
                    <Td className="py-3 text-center">
                      <button
                        onClick={() => handleViewStock(item)}
                        className="inline-flex items-center gap-1 rounded border border-blue-500 px-2 py-1 text-[10px] font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        <EyeIcon className="h-3 w-3" />
                        View
                      </button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td
                    colSpan={8}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    No stock found for this model
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
