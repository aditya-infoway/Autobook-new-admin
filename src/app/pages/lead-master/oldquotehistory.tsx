import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

// We simulate history data per customer ID
const STATIC_QUOTE_HISTORY = {
  1: [
    {
      id: 101,
      leadDate: "30-07-2026",
      quotationNo: "Q/26-27/1001",
      dmsEnquiryNo: "ENQ/2026/0311",
      dmsEnquiryDate: "30-07-2026",
      model: "ACCESS 125",
      variant: "DISC RC ABS",
      colour: "Pearl Precious White",
      exShowroomPrice: "85,000",
      insurance: "5,200",
      rtoRegistration: "8,500",
      exWarranty23: "1,500",
      hypothecationCharge: "1,000",
      exWarranty28: "2,000",
      rtoOtherCharge: "500",
      totalAmount: "1,03,700",
    },
    {
      id: 102,
      leadDate: "15-07-2026",
      quotationNo: "Q/26-27/0987",
      dmsEnquiryNo: "ENQ/2026/0290",
      dmsEnquiryDate: "15-07-2026",
      model: "ACCESS 125",
      variant: "DISC",
      colour: "Metallic Matte Black",
      exShowroomPrice: "80,000",
      insurance: "4,800",
      rtoRegistration: "7,500",
      exWarranty23: "1,200",
      hypothecationCharge: "1,000",
      exWarranty28: "1,800",
      rtoOtherCharge: "400",
      totalAmount: "96,700",
    },
  ],
  2: [
    {
      id: 201,
      leadDate: "29-07-2026",
      quotationNo: "Q/26-27/1002",
      dmsEnquiryNo: "ENQ/2026/0310",
      dmsEnquiryDate: "29-07-2026",
      model: "ACCESS 125",
      variant: "DISC",
      colour: "Pearl Grace White",
      exShowroomPrice: "82,000",
      insurance: "5,000",
      rtoRegistration: "8,000",
      exWarranty23: "1,400",
      hypothecationCharge: "1,000",
      exWarranty28: "1,900",
      rtoOtherCharge: "500",
      totalAmount: "99,800",
    },
  ],
  3: [
    {
      id: 301,
      leadDate: "28-07-2026",
      quotationNo: "Q/26-27/1003",
      dmsEnquiryNo: "ENQ/2026/0305",
      dmsEnquiryDate: "28-07-2026",
      model: "BURGMAN STREET",
      variant: "STANDARD",
      colour: "Metallic Blue",
      exShowroomPrice: "1,10,000",
      insurance: "6,500",
      rtoRegistration: "10,000",
      exWarranty23: "2,000",
      hypothecationCharge: "1,500",
      exWarranty28: "2,500",
      rtoOtherCharge: "800",
      totalAmount: "1,33,300",
    },
  ],
  4: [],
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function OldQuoteHistory() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get customer ID from URL
  const customerId = Number(id) as keyof typeof STATIC_QUOTE_HISTORY; // <-- FIX: Cast to key

  // Get data for this specific customer, or fallback to empty array
  const historyData = STATIC_QUOTE_HISTORY[customerId] || [];

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleDownload = (quotationNo: string) => {
    console.log(`Downloading quotation ${quotationNo}`);
  };

  return (
    <div className="relative min-h-screen space-y-6 p-4 pb-28 text-gray-900 md:p-6 dark:text-gray-100">
      {/* Page Header with Back Button */}
     <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
      Old Quote History
    </h1>
    <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
      View old quotation details
    </p>
  </div>
  
  <button
    onClick={handleBack}
    className="inline-flex h-9 items-center gap-2 cursor-pointer rounded-md border border-gray-200 bg-primary-600 px-4 shadow-sm transition hover:bg-primary-700 dark:border-primary-700 dark:bg-primary-800 dark:hover:bg-primary-700"
  >
    <ArrowLeftIcon className="h-5 w-5 text-white dark:text-white" />
    <span className="text-sm font-medium text-white dark:text-white">Back</span>
  </button>
</div>

      {/* Table */}
      <div className="dark:bg-dark-800 dark:border-dark-700 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1200px]">
            <THead className="dark:bg-dark-700/60 dark:border-dark-600 border-b border-gray-200 bg-gray-100">
              <Tr>
                <Th className="text-[11px]">Lead Date</Th>
                <Th className="text-[11px]">Quotation No</Th>
                <Th className="text-[11px]">DMS Enquiry No</Th>
                <Th className="text-[11px]">DMS Enquiry Date</Th>
                <Th className="text-[11px]">Model</Th>
                <Th className="text-[11px]">Variant</Th>
                <Th className="text-[11px]">Colour</Th>
                <Th className="text-[11px] text-right">Ex-showroom Price</Th>
                <Th className="text-[11px] text-right">Insurance</Th>
                <Th className="text-[11px] text-right">RTO & Reg. Charge</Th>
                <Th className="text-[11px] text-right">Ex-Warranty (2+3)</Th>
                <Th className="text-[11px] text-right">Hypothecation Charge</Th>
                <Th className="text-[11px] text-right">Ex-Warranty (2+8)</Th>
                <Th className="text-[11px] text-right">RTO Other Charge</Th>
                <Th className="text-[11px] text-right">Total Amount</Th>
                <Th className="text-[11px] text-center">Download</Th>
              </Tr>
            </THead>

            <TBody className="dark:divide-dark-700 divide-y divide-gray-200">
              {historyData.length > 0 ? (
                historyData.map((item: any) => (
                  <Tr key={item.id} className="dark:hover:bg-dark-700/40 transition-colors hover:bg-gray-50/30 align-middle">
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">{item.leadDate}</Td>
                    <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">{item.quotationNo}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">{item.dmsEnquiryNo}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">{item.dmsEnquiryDate}</Td>
                    <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white">{item.model}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">{item.variant}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300">{item.colour}</Td>
                    <Td className="py-4 text-[12px] font-medium text-gray-900 dark:text-white text-right">₹{item.exShowroomPrice}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300 text-right">₹{item.insurance}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300 text-right">₹{item.rtoRegistration}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300 text-right">₹{item.exWarranty23}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300 text-right">₹{item.hypothecationCharge}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300 text-right">₹{item.exWarranty28}</Td>
                    <Td className="py-4 text-[12px] text-gray-700 dark:text-gray-300 text-right">₹{item.rtoOtherCharge}</Td>
                    <Td className="py-4 text-[12px] font-bold text-gray-900 dark:text-white text-right">₹{item.totalAmount}</Td>
                    <Td className="py-4 text-center">
                      <button
                        onClick={() => handleDownload(item.quotationNo)}
                        className="inline-flex rounded-md border border-blue-500 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        Download
                      </button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={16} className="py-12 text-center text-gray-400 dark:text-gray-500">
                    No quotation history found for this customer
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