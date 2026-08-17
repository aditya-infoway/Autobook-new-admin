import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  BuildingLibraryIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  UserGroupIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Combobox } from "@/components/shared/form/Combobox";
import { Checkbox } from "@/components/ui/Form/Checkbox";
import Select from "react-select";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { RefreshCw, ChevronLeft } from "lucide-react";

// ─── STATIC MOCK DATA ──────────────────────────────────────────────────────

const STATIC_DATA = {
  vehicleCharges: {
    exShowroomPrice: "100000.00",
    insurance: "5000.00",
    roadSideAssistance: "500.00",
    exWarranty2_3: "1500.00",
    hypothecationCharges: "1000.00",
    exWarranty2_8: "2500.00",
    rtoRegistrationCharges: "12000.00",
    rtoOtherCharge: "2000.00",
  },
  allotment: {
    model: "BURGMAN STREET",
    variant: "BURGMAN R CONNECTED",
    colour: "PRL.MAT SHADOW GREEN-QUS",
    chassisNo: "MB8EN11AGT8D47657",
    policyNo: "POL-2026-001",
    nomineeName: "Smt. Meghnath Dhakul",
    nomineeDob: "15-08-1960",
    relationWithNominee: "Mother",
  },
  hypothecation: {
    type: "finance" as const,
    financeDoneBy: "SHRIRAM FINANCE",
    financeAmount: "86758",
    emi: "4500",
    tenureMonths: "24",
    apronCharge: "1000",
    loanRoi: "8.5",
    marginMoney: "13404",
    paymentStatus: "pending" as const,
    paymentMode: "UPI",
    chequeNo: "",
    chequeDate: "",
    clearDate: "",
    cashAmount: "",
    bankAmount: "",
    cashAccountId: "",
    bankAccountId: "",
    narration: "",
    assignBy: "PRATIK CHAVAN",
    bankOfFinance: "",
  },
  exchange: {
    existingCustomerModel: "HONDA ACTIVA",
    existingCustomerVariant: "STANDARD",
    existingVehicleYear: "2020",
    customerExpectedPrice: "40000",
    marketPrice: "35000",
    chassisNo: "MB8A9Z8Y7X6W5V4U3",
    companyShare: "1000",
    dealerShares: "500",
    rcNo: "MH-12-AB-1234",
    insurance: "2000",
    vehicleNo: "MH-12-CD-5678",
  },
  payment: {
    discount: "0",
    schemeDiscount: "0",
    exchangeDiscount: "1500",
    invoiceAmount: "121162",
    total: "121162",
    receivedAmount: "108758",
    pendingAmount: "13404",
  },
  broker: {
    brokerName: "Broker A",
    brokerAmount: "2500",
  },
  delivery: {
    invoiceBill: false,
    accessoriesInvoice: false,
    serviceBook: false,
    insuranceCopy: false,
    helmetInvoice: false,
    warrantyBook: false,
    keychainPouch: false,
    allGuard: false,
    matting: false,
    footrest: false,
    helmet: false,
    visor: false,
    seatCover: false,
    bodyCover: false,
    mirrorSet: false,
    other: false,
  },
};

const STATIC_FINANCE_OPTIONS = [
  { id: "1", name: "SHRIRAM FINANCE", employeeName: "Rajesh Sharma" },
  { id: "2", name: "ICICI BANK", employeeName: "Priya Patel" },
];

const STATIC_CASH_ACCOUNTS = [
  { id: "1", name: "CASH ACCOUNT" },
  { id: "2", name: "PETTY CASH" },
];

const STATIC_BANK_ACCOUNTS = [
  { id: "1", name: "HDFC BANK" },
  { id: "2", name: "ICICI BANK" },
];

const STATIC_BROKER_OPTIONS = [
  { id: "broker1", name: "Broker A" },
  { id: "broker2", name: "Broker B" },
  { id: "broker3", name: "Broker C" },
];

const STATIC_RELATION_OPTIONS = [
  { id: "father", name: "Father" },
  { id: "mother", name: "Mother" },
  { id: "spouse", name: "Spouse" },
  { id: "son", name: "Son" },
  { id: "daughter", name: "Daughter" },
  { id: "other", name: "Other" },
];

const STATIC_BANK_OPTIONS = [
  { id: "1", banker: "HDFC Bank" },
  { id: "2", banker: "ICICI Bank" },
  { id: "3", banker: "SBI Bank" },
];

const STATIC_VEHICLE_OPTIONS = [
  {
    id: "1",
    chassisNo: "MB8EN11AGT8D47657",
    batteryNo: "BT-001",
    keyNo: "K-001",
    engineNo: "EN-2026-001",
    inwardDate: "2026-08-01",
    ageDay: 5,
    model: "BURGMAN STREET",
    variant: "BURGMAN R CONNECTED",
    colour: "PRL.MAT SHADOW GREEN-QUS",
  },
  {
    id: "2",
    chassisNo: "MB8A9Z8Y7X6W5V4U3",
    batteryNo: "BT-002",
    keyNo: "K-002",
    engineNo: "EN-2026-002",
    inwardDate: "2026-07-28",
    ageDay: 8,
    model: "BURGMAN STREET",
    variant: "BURGMAN R CONNECTED",
    colour: "PRL.MAT SHADOW GREEN-QUS",
  },
];

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────

const CardHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  colorClass: string;
}> = ({ icon, title, colorClass }) => (
  <div
    className={`flex items-center justify-between rounded-t-lg px-4 py-2.5 text-white ${colorClass}`}
  >
    <span className="flex items-center gap-2 text-sm font-semibold">
      <span className="size-5">{icon}</span>
      {title}
    </span>
  </div>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="dark:border-dark-600 dark:bg-dark-800 rounded-lg border border-gray-200 bg-white shadow-sm">
    {children}
  </div>
);

const Field: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col justify-end">{children}</div>
);

const fieldGrid = "grid grid-cols-2 gap-3 p-4 lg:grid-cols-1 xl:grid-cols-2";

// ─── CUSTOM VEHICLE OPTION COMPONENT ──────────────────────────────────────

const OrderVehicleOption = (props: any) => {
  const { data, innerRef, innerProps, isFocused, isSelected } = props;
  const inwardDate = data.inwardDate ?? "";
  const motorNo = data.engineNo ?? "";

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`cursor-pointer border-b px-3 py-2 text-xs ${
        isFocused || isSelected
          ? "bg-primary-600 text-white"
          : "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <p>
            <span className="font-semibold">Chassis No:</span> {data.chassisNo}
          </p>
          {data.batteryNo && (
            <p>
              <span className="font-semibold">Battery No:</span> {data.batteryNo}
            </p>
          )}
          {data.keyNo && (
            <p>
              <span className="font-semibold">Key No:</span> {data.keyNo}
            </p>
          )}
        </div>
        <div className="space-y-0.5 text-right">
          {inwardDate && (
            <p>
              <span className="font-semibold">Inward Date:</span>{" "}
              {new Date(inwardDate).toLocaleDateString("en-GB")}
            </p>
          )}
          {data.ageDay !== null && data.ageDay !== undefined && (
            <p>
              <span className="font-semibold">Days:</span> {data.ageDay}
            </p>
          )}
          {motorNo && (
            <p>
              <span className="font-semibold">Motor No:</span> {motorNo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function CreateOrder() {
  const navigate = useNavigate();

  // ─── STATIC STATE ────────────────────────────────────────────────────────
type HypothecationType = "finance" | "bank";
type PaymentStatus = "pending" | "received";
  const [vehicleCharges, setVehicleCharges] = useState(STATIC_DATA.vehicleCharges);
  const [allotment, setAllotment] = useState(STATIC_DATA.allotment);
  
  const [exchange, setExchange] = useState(STATIC_DATA.exchange);
  const [payment, setPayment] = useState(STATIC_DATA.payment);
  const [broker, setBroker] = useState(STATIC_DATA.broker);
  const [delivery, setDelivery] = useState(STATIC_DATA.delivery);



  const [hypothecation, setHypothecation] = useState({
  type: "finance" as HypothecationType,
  financeDoneBy: "",
  financeAmount: "",
  emi: "",
  tenureMonths: "",
  apronCharge: "",
  loanRoi: "",
  marginMoney: "",
  paymentStatus: "pending" as PaymentStatus,
  paymentMode: "",
  chequeNo: "",
  chequeDate: "",
  clearDate: "",
  cashAmount: "",
  bankAmount: "",
  cashAccountId: "",
  bankAccountId: "",
  narration: "",
  assignBy: "",
  bankOfFinance: "",
});

  // ─── FILTERED VEHICLES FOR DEMO ─────────────────────────────────────────

  const matchingVehicleOptions = STATIC_VEHICLE_OPTIONS.filter((vehicle: any) => {
    const vehicleModel = String(vehicle.model ?? "").trim().toLowerCase();
    const vehicleVariant = String(vehicle.variant ?? "").trim().toLowerCase();
    const vehicleColour = String(vehicle.colour ?? "").trim().toLowerCase();
    const leadModel = String(allotment.model ?? "").trim().toLowerCase();
    const leadVariant = String(allotment.variant ?? "").trim().toLowerCase();
    const leadColour = String(allotment.colour ?? "").trim().toLowerCase();

    return (
      vehicleModel === leadModel &&
      vehicleVariant === leadVariant &&
      vehicleColour === leadColour
    );
  });

  // ─── HANDLER (Static Log Only) ──────────────────────────────────────────

  const handleCreateOrder = () => {
    console.log("📦 Static Order Data:", {
      vehicleCharges,
      allotment,
      hypothecation,
      exchange,
      payment,
      broker,
      delivery,
    });
    alert("Order data logged to console (Static Mode)");
  };

  return (
    <div className="dark:bg-dark-900 min-h-screen bg-gray-50 p-4">
      {/* Title row */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Create Order
        </h1>
       <div className="flex items-center gap-2">
  <button
    className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-white shadow-sm transition-colors hover:bg-red-700"
    title="Download PDF"
  >
    <FaFilePdf className="h-6 w-6" />
  </button>
  <button
    className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600 text-white shadow-sm transition-colors hover:bg-emerald-700"
    title="Download Excel"
  >
    <FaFileExcel className="h-6 w-6" />
  </button>
  <button
    className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700"
    title="Refresh"
  >
    <RefreshCw className="h-6 w-6" />
  </button>
  <button
    onClick={() => navigate(-1)}
    className="bg-primary-600 hover:bg-primary-800 flex h-9 items-center gap-1.5 rounded-md px-3 text-white transition-colors"
    title="Back"
  >
    <ChevronLeft className="h-6 w-6" />
    <span className="text-sm">Back</span>
  </button>
</div>
      </div>

      {/* Grid of 7 cards, 3 columns */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* 1. Vehicle Charges - Blue */}
        <Card>
          <CardHeader
            icon={<TruckIcon className="size-5" />}
            title="Vehicle Charges"
            colorClass="bg-blue-700"
          />
          <div className={fieldGrid}>
            <Field>
              <Input
                label="Ex-Showroom Price"
                placeholder="Enter Ex-Showroom Price"
                value={vehicleCharges.exShowroomPrice}
                onChange={(e) =>
                  setVehicleCharges((s) => ({
                    ...s,
                    exShowroomPrice: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Insurance"
                placeholder="Enter Insurance"
                value={vehicleCharges.insurance}
                onChange={(e) =>
                  setVehicleCharges((s) => ({
                    ...s,
                    insurance: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="RTO Other Charge"
                placeholder="Enter RTO Other Charge"
                value={vehicleCharges.rtoOtherCharge}
                onChange={(e) =>
                  setVehicleCharges((s) => ({
                    ...s,
                    rtoOtherCharge: e.target.value,
                  }))
                }
              />
            </Field>
          </div>
        </Card>

        {/* 2. Allotment Details - Teal */}
        <Card>
          <CardHeader
            icon={<ClipboardDocumentListIcon className="size-5" />}
            title="Allotment Details"
            colorClass="bg-teal-700"
          />
          <div className="space-y-3 p-4">
            <div className={fieldGrid.replace("p-4", "")}>
              <Field>
                <Input
                  label="Model"
                  placeholder="Enter Model"
                  value={allotment.model}
                  onChange={(e) =>
                    setAllotment((s) => ({ ...s, model: e.target.value }))
                  }
                />
              </Field>
              <Field>
                <Input
                  label="Variant"
                  placeholder="Enter Variant"
                  value={allotment.variant}
                  onChange={(e) =>
                    setAllotment((s) => ({ ...s, variant: e.target.value }))
                  }
                />
              </Field>
              <Field>
                <Input
                  label="Colour"
                  placeholder="Enter Colour"
                  value={allotment.colour}
                  onChange={(e) =>
                    setAllotment((s) => ({ ...s, colour: e.target.value }))
                  }
                />
              </Field>
            </div>
            <Field>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Chassis No
              </label>
              <Select
                options={matchingVehicleOptions}
                value={
                  matchingVehicleOptions.find(
                    (vehicle: any) =>
                      String(vehicle.chassisNo) === String(allotment.chassisNo),
                  ) || null
                }
                getOptionValue={(vehicle: any) =>
                  String(vehicle.id ?? vehicle.chassisNo)
                }
                getOptionLabel={(vehicle: any) => vehicle.chassisNo || ""}
                components={{
                  Option: OrderVehicleOption,
                }}
                onChange={(vehicle: any) => {
                  setAllotment((prev) => ({
                    ...prev,
                    chassisNo: vehicle?.chassisNo ?? "",
                  }));
                }}
                placeholder="Select Vehicle"
                isSearchable
                isClearable
                noOptionsMessage={() => "No matching chassis found"}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                  menuPortal: (base: any) => ({
                    ...base,
                    zIndex: 99999,
                  }),
                  menu: (base: any) => ({
                    ...base,
                    overflow: "hidden",
                  }),
                  menuList: (base: any) => ({
                    ...base,
                    maxHeight: "300px",
                    padding: 0,
                  }),
                }}
              />
            </Field>
            <p className="pt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
              Insurance Details
            </p>
            <div className={fieldGrid.replace("p-4", "")}>
              <Field>
                <Input
                  label="Policy No"
                  value={allotment.policyNo}
                  placeholder="Enter Policy No."
                  onChange={(e) =>
                    setAllotment((s) => ({ ...s, policyNo: e.target.value }))
                  }
                />
              </Field>
              <Field>
                <Input
                  label="Nominee Name"
                  value={allotment.nomineeName}
                  placeholder="Enter Nominee Name"
                  onChange={(e) =>
                    setAllotment((s) => ({
                      ...s,
                      nomineeName: e.target.value,
                    }))
                  }
                />
              </Field>
              <Field>
                <DatePicker
                  label="Nominee DOB"
                  placeholder="DD-MM-YYYY"
                  value={allotment.nomineeDob}
                  onChange={(val: any) =>
                    setAllotment((s) => ({ ...s, nomineeDob: val }))
                  }
                  options={{ dateFormat: "d-m-Y" }}
                />
              </Field>
              <Field>
                <Combobox
                  label="Relation With Nominee"
                  data={STATIC_RELATION_OPTIONS}
                  displayField="name"
                  value={
                    STATIC_RELATION_OPTIONS.find(
                      (r) => r.name === allotment.relationWithNominee,
                    ) || null
                  }
                  onChange={(val: any) =>
                    setAllotment((s) => ({
                      ...s,
                      relationWithNominee: val?.name || "",
                    }))
                  }
                  placeholder="Select Relation"
                />
              </Field>
            </div>
          </div>
        </Card>

        {/* 3. Hypothecation - Indigo */}
        <Card>
          <CardHeader
            icon={<BuildingLibraryIcon className="size-5" />}
            title="Hypothecation"
            colorClass="bg-indigo-700"
          />
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="hypothecationType"
                  checked={hypothecation.type === "finance"}
                  onChange={() =>
                    setHypothecation((s) => ({ ...s, type: "finance" }))
                  }
                  className="dark:bg-dark-800 h-4 w-4 text-[#003399] focus:ring-[#003399]"
                />
                Finance
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="hypothecationType"
                  checked={hypothecation.type === "bank"}
                  onChange={() =>
                    setHypothecation((s) => ({ ...s, type: "bank" }))
                  }
                  className="dark:bg-dark-800 h-4 w-4 text-[#003399] focus:ring-[#003399]"
                />
                Bank
              </label>
            </div>

            {hypothecation.type === "bank" ? (
              <Field>
                <Combobox
                  label="Bank Of Finance"
                  data={STATIC_BANK_OPTIONS}
                  displayField="banker"
                  value={
                    STATIC_BANK_OPTIONS.find(
                      (item) => item.banker === hypothecation.bankOfFinance,
                    ) || null
                  }
                  onChange={(val: any) =>
                    setHypothecation((prev) => ({
                      ...prev,
                      bankOfFinance: val?.banker || "",
                    }))
                  }
                  placeholder="Select Bank"
                />
              </Field>
            ) : (
              <>
                <div className={fieldGrid.replace("p-4", "")}>
                  <Field>
                    <Combobox
                      label="Finance Done By"
                      data={STATIC_FINANCE_OPTIONS}
                      displayField="name"
                      value={
                        STATIC_FINANCE_OPTIONS.find(
                          (item: any) =>
                            String(item.id) ===
                            String(hypothecation.financeDoneBy),
                        ) || null
                      }
                      onChange={(item: any) => {
                        setHypothecation((prev) => ({
                          ...prev,
                          financeDoneBy: item?.id != null ? String(item.id) : "",
                          assignBy: item?.employeeName || "",
                        }));
                      }}
                      placeholder="Select Finance"
                      searchFields={["name", "employeeName"]}
                      columns={[
                        { header: "Finance Name", field: "name", width: "2fr" },
                        { header: "Employee Name", field: "employeeName", width: "1.5fr" },
                      ]}
                    />
                  </Field>
                  <Field>
                    <Input
                      label="Finance Amount"
                      placeholder="Enter Finance Amount"
                      value={hypothecation.financeAmount}
                      onChange={(e) =>
                        setHypothecation((s) => ({
                          ...s,
                          financeAmount: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <Field>
                    <Input
                      label="EMI"
                      placeholder="Enter EMI"
                      value={hypothecation.emi}
                      onChange={(e) =>
                        setHypothecation((s) => ({
                          ...s,
                          emi: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <Field>
                    <Input
                      label="Tenure (Months)"
                      placeholder="Enter Tenure (Months)"
                      value={hypothecation.tenureMonths}
                      onChange={(e) =>
                        setHypothecation((s) => ({
                          ...s,
                          tenureMonths: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <Field>
                    <Input
                      label="Processing Charge"
                      placeholder="Enter Processing Charge"
                      value={hypothecation.apronCharge}
                      onChange={(e) =>
                        setHypothecation((s) => ({
                          ...s,
                          apronCharge: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <Field>
                    <Input
                      label="Loan ROI"
                      placeholder="Enter Loan ROI"
                      value={hypothecation.loanRoi}
                      onChange={(e) =>
                        setHypothecation((s) => ({
                          ...s,
                          loanRoi: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <Field>
                    <Input
                      label="Margin Money (Down Payment)"
                      placeholder="Enter Margin Money"
                      value={hypothecation.marginMoney}
                      onChange={(e) =>
                        setHypothecation((s) => ({
                          ...s,
                          marginMoney: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <Field>
                    <div className="flex min-w-0 flex-col gap-1">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Payment Status
                      </label>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                        <label className="flex cursor-pointer items-center gap-1 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name="paymentStatus"
                            checked={hypothecation.paymentStatus === "pending"}
                            onChange={() =>
                              setHypothecation((s) => ({
                                ...s,
                                paymentStatus: "pending",
                              }))
                            }
                            className="dark:bg-dark-800 h-4 w-4 text-[#003399] focus:ring-[#003399]"
                          />
                          Pending
                        </label>
                        <label className="flex cursor-pointer items-center gap-1 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name="paymentStatus"
                            checked={hypothecation.paymentStatus === "received"}
                            onChange={() =>
                              setHypothecation((prev) => ({
                                ...prev,
                                paymentStatus: "received",
                                cashAmount: String(Number(prev.marginMoney) || 0),
                                bankAmount: "0",
                              }))
                            }
                            className="dark:bg-dark-800 h-4 w-4 text-[#003399] focus:ring-[#003399]"
                          />
                          Received
                        </label>
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Show when Received is selected */}
                {hypothecation.paymentStatus === "received" && (
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {/* CASH PAYMENT SECTION */}
                    <div className="rounded-lg border border-gray-700 p-4">
                      <div className="space-y-3">
                        <Field>
                          <Input
                            label="Cash Amount"
                            type="number"
                            min="0"
                            placeholder="Enter Cash Amount"
                            value={hypothecation.cashAmount}
                            onChange={(e) => {
                              const cashValue = e.target.value;
                              setHypothecation((prev) => {
                                const marginAmount = Number(prev.marginMoney) || 0;
                                const cashAmount = Number(cashValue) || 0;
                                const calculatedBankAmount = Math.max(
                                  marginAmount - cashAmount,
                                  0,
                                );
                                return {
                                  ...prev,
                                  cashAmount: cashValue,
                                  bankAmount: String(calculatedBankAmount),
                                  bankAccountId:
                                    calculatedBankAmount > 0
                                      ? prev.bankAccountId
                                      : "",
                                };
                              });
                            }}
                          />
                        </Field>
                        <Field>
                          <Combobox
                            label="Cash Account"
                            data={STATIC_CASH_ACCOUNTS}
                            displayField="name"
                            value={
                              STATIC_CASH_ACCOUNTS.find(
                                (item: any) =>
                                  String(item.id) ===
                                  String(hypothecation.cashAccountId),
                              ) || null
                            }
                            onChange={(item: any) =>
                              setHypothecation((prev) => ({
                                ...prev,
                                cashAccountId:
                                  item?.id != null ? String(item.id) : "",
                              }))
                            }
                            placeholder="Select Cash Account"
                          />
                        </Field>
                        <Field>
                          <Input
                            label="Narration"
                            type="text"
                            value={hypothecation.narration}
                            onChange={(e) =>
                              setHypothecation((prev) => ({
                                ...prev,
                                narration: e.target.value,
                              }))
                            }
                            placeholder="Enter cash payment narration"
                          />
                        </Field>
                      </div>
                    </div>

                    {/* BANK PAYMENT SECTION */}
                    <div className="rounded-lg border border-gray-700 p-4">
                      <div className="space-y-3">
                        <Field>
                          <Input
                            label="Bank Amount"
                            type="number"
                            value={hypothecation.bankAmount}
                            placeholder="Auto calculated"
                            readOnly
                          />
                        </Field>
                        {Number(hypothecation.bankAmount) > 0 && (
                          <>
                            <Field>
                              <Combobox
                                label="Bank Account"
                                data={STATIC_BANK_ACCOUNTS}
                                displayField="name"
                                value={
                                  STATIC_BANK_ACCOUNTS.find(
                                    (item: any) =>
                                      String(item.id) ===
                                      String(hypothecation.bankAccountId),
                                  ) || null
                                }
                                onChange={(item: any) =>
                                  setHypothecation((prev) => ({
                                    ...prev,
                                    bankAccountId:
                                      item?.id != null ? String(item.id) : "",
                                  }))
                                }
                                placeholder="Select Bank Account"
                              />
                            </Field>
                            <Field>
                              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Payment Mode
                              </label>
                              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                {["UPI", "NEFT", "CHEQUE", "RTGS", "IMPS"].map(
                                  (mode) => (
                                    <label
                                      key={mode}
                                      className="flex cursor-pointer items-center gap-1.5"
                                    >
                                      <input
                                        type="radio"
                                        name="bankPaymentMode"
                                        value={mode}
                                        checked={
                                          hypothecation.paymentMode === mode
                                        }
                                        onChange={(e) => {
                                          const paymentMode = e.target.value;
                                          setHypothecation((prev) => ({
                                            ...prev,
                                            paymentMode,
                                            chequeNo:
                                              paymentMode === "CHEQUE"
                                                ? prev.chequeNo
                                                : "",
                                            chequeDate:
                                              paymentMode === "CHEQUE"
                                                ? prev.chequeDate
                                                : "",
                                            clearDate:
                                              paymentMode === "CHEQUE"
                                                ? prev.clearDate
                                                : "",
                                          }));
                                        }}
                                        className="accent-primary-600 h-4 w-4 cursor-pointer"
                                      />
                                      <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {mode === "CHEQUE" ? "Cheque" : mode}
                                      </span>
                                    </label>
                                  ),
                                )}
                              </div>
                            </Field>

                            {hypothecation.paymentMode === "CHEQUE" && (
                              <div className="space-y-3 rounded-lg border border-gray-700 p-3">
                                <Field>
                                  <Input
                                    label="Cheque No"
                                    type="text"
                                    value={hypothecation.chequeNo}
                                    onChange={(e) =>
                                      setHypothecation((prev) => ({
                                        ...prev,
                                        chequeNo: e.target.value,
                                      }))
                                    }
                                    placeholder="Enter Cheque No"
                                  />
                                </Field>
                                <Field>
                                  <DatePicker
                                    label="Cheque Date"
                                    placeholder="Select cheque date..."
                                    value={hypothecation.chequeDate}
                                    options={{
                                      disableMobile: true,
                                      dateFormat: "d-m-Y",
                                    }}
                                    onChange={(dates) => {
                                      const selectedDate = dates?.[0];
                                      setHypothecation((prev) => ({
                                        ...prev,
                                        chequeDate: selectedDate
                                          ? selectedDate.toISOString()
                                          : "",
                                      }));
                                    }}
                                  />
                                </Field>
                                <Field>
                                  <DatePicker
                                    label="Clear Date"
                                    placeholder="Select clear date..."
                                    value={hypothecation.clearDate}
                                    options={{
                                      disableMobile: true,
                                      dateFormat: "d-m-Y",
                                    }}
                                    onChange={(dates) => {
                                      const selectedDate = dates?.[0];
                                      setHypothecation((prev) => ({
                                        ...prev,
                                        clearDate: selectedDate
                                          ? selectedDate.toISOString()
                                          : "",
                                      }));
                                    }}
                                  />
                                </Field>
                              </div>
                            )}
                            <Field>
                              <Input
                                label="Narration"
                                type="text"
                                value={hypothecation.narration}
                                onChange={(e) =>
                                  setHypothecation((prev) => ({
                                    ...prev,
                                    narration: e.target.value,
                                  }))
                                }
                                placeholder="Enter bank payment narration"
                              />
                            </Field>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <Field>
                  <Combobox
                    label="Assign By"
                    data={[
                      {
                        id: "finance-employee",
                        name:
                          STATIC_FINANCE_OPTIONS.find(
                            (item: any) =>
                              String(item.id) ===
                              String(hypothecation.financeDoneBy),
                          )?.employeeName || "",
                      },
                    ].filter((item) => item.name)}
                    displayField="name"
                    value={
                      hypothecation.assignBy
                        ? {
                            id: "finance-employee",
                            name: hypothecation.assignBy,
                          }
                        : null
                    }
                    onChange={(employee: any) =>
                      setHypothecation((prev) => ({
                        ...prev,
                        assignBy: employee?.name || "",
                      }))
                    }
                    placeholder="Select Employee"
                  />
                </Field>
              </>
            )}
          </div>
        </Card>

        {/* 4. Exchange Details - Amber */}
        <Card>
          <CardHeader
            icon={<ArrowsRightLeftIcon className="size-5" />}
            title="Exchange Details"
            colorClass="bg-amber-600"
          />
          <div className={fieldGrid}>
            <Field>
              <Input
                label="Existing Customer Model"
                value={exchange.existingCustomerModel}
                placeholder="Enter Existing Customer Model"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    existingCustomerModel: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Existing Customer Variant"
                value={exchange.existingCustomerVariant}
                placeholder="Enter Existing Customer Variant"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    existingCustomerVariant: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Existing Vehicle Year"
                value={exchange.existingVehicleYear}
                placeholder="Enter Vehicle Year"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    existingVehicleYear: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Customer Expected Price"
                value={exchange.customerExpectedPrice}
                placeholder="Enter Expected Price"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    customerExpectedPrice: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Market Price"
                value={exchange.marketPrice}
                placeholder="Enter Market Price"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    marketPrice: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Chassis No"
                value={exchange.chassisNo}
                placeholder="Enter Chassis No"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    chassisNo: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Company Share"
                value={exchange.companyShare}
                placeholder="Enter Company Share"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    companyShare: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Dealer Shares"
                value={exchange.dealerShares}
                placeholder="Enter Dealer Shares"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    dealerShares: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="RC No"
                value={exchange.rcNo}
                placeholder="Enter RC No"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    rcNo: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Insurance"
                value={exchange.insurance}
                placeholder="Enter Insurance"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    insurance: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Vehicle No"
                value={exchange.vehicleNo}
                placeholder="Enter Vehicle No"
                onChange={(e) =>
                  setExchange((s) => ({
                    ...s,
                    vehicleNo: e.target.value,
                  }))
                }
              />
            </Field>
          </div>
        </Card>

        {/* 5. Payment Details - Rose */}
        <Card>
          <CardHeader
            icon={<CreditCardIcon className="size-5" />}
            title="Payment Details"
            colorClass="bg-rose-700"
          />
          <div className={fieldGrid}>
            <Field>
              <Input
                label="Discount"
                value={payment.discount}
                placeholder="Enter Discount"
                onChange={(e) =>
                  setPayment((s) => ({ ...s, discount: e.target.value }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Scheme Discount"
                value={payment.schemeDiscount}
                placeholder="Enter Scheme Discount"
                onChange={(e) =>
                  setPayment((s) => ({
                    ...s,
                    schemeDiscount: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Input
                label="Exchange Discount"
                value={payment.exchangeDiscount}
                placeholder="Enter Exchange Discount"
                readOnly
              />
            </Field>
            <Field>
              <Input
                label="Invoice Amount"
                value={payment.invoiceAmount}
                placeholder="Quotation Grand Total"
                readOnly
              />
            </Field>
            <Field>
              <Input label="Total" value={payment.total} readOnly />
            </Field>
            <Field>
              <Input
                label="Received Amount"
                value={payment.receivedAmount}
                readOnly
              />
            </Field>
            <Field>
              <Input
                label="Pending Amount"
                value={payment.pendingAmount}
                readOnly
              />
            </Field>
          </div>
        </Card>

        {/* 6. Broker Details + 7. Delivery Challan (in same column) */}
        <div className="flex flex-col gap-4">
          {/* 6. Broker Details - Fuchsia */}
          <Card>
            <CardHeader
              icon={<UserGroupIcon className="size-5" />}
              title="Broker Details"
              colorClass="bg-fuchsia-700"
            />
            <div className={fieldGrid}>
              <Field>
                <Combobox
                  label="Broker Name"
                  data={STATIC_BROKER_OPTIONS}
                  displayField="name"
                  value={
                    STATIC_BROKER_OPTIONS.find((b) => b.name === broker.brokerName) ||
                    null
                  }
                  onChange={(val: any) =>
                    setBroker((s) => ({ ...s, brokerName: val?.name || "" }))
                  }
                  placeholder="Select Broker"
                />
              </Field>
              <Field>
                <Input
                  label="Broker Amount"
                  value={broker.brokerAmount}
                  placeholder="Enter Broker Amount"
                  onChange={(e) =>
                    setBroker((s) => ({
                      ...s,
                      brokerAmount: e.target.value,
                    }))
                  }
                />
              </Field>
            </div>
          </Card>

          {/* 7. Delivery Challan - Slate */}
          <Card>
            <CardHeader
              icon={<DocumentTextIcon className="size-5" />}
              title="Delivery Challan"
              colorClass="bg-slate-700"
            />
            <div className="p-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <Checkbox
                  label="Invoice Bill"
                  checked={delivery.invoiceBill}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      invoiceBill: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Accessories Invoice"
                  checked={delivery.accessoriesInvoice}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      accessoriesInvoice: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Service Book"
                  checked={delivery.serviceBook}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      serviceBook: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Insurance Copy"
                  checked={delivery.insuranceCopy}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      insuranceCopy: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Helmet Invoice"
                  checked={delivery.helmetInvoice}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      helmetInvoice: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Warranty Book"
                  checked={delivery.warrantyBook}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      warrantyBook: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Keychain Pouch"
                  checked={delivery.keychainPouch}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      keychainPouch: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="All Guard"
                  checked={delivery.allGuard}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      allGuard: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Matting"
                  checked={delivery.matting}
                  onChange={(e) =>
                    setDelivery((s) => ({ ...s, matting: e.target.checked }))
                  }
                />
                <Checkbox
                  label="Footrest"
                  checked={delivery.footrest}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      footrest: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Helmet"
                  checked={delivery.helmet}
                  onChange={(e) =>
                    setDelivery((s) => ({ ...s, helmet: e.target.checked }))
                  }
                />
                <Checkbox
                  label="Visor"
                  checked={delivery.visor}
                  onChange={(e) =>
                    setDelivery((s) => ({ ...s, visor: e.target.checked }))
                  }
                />
                <Checkbox
                  label="Seat Cover"
                  checked={delivery.seatCover}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      seatCover: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Body Cover"
                  checked={delivery.bodyCover}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      bodyCover: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Mirror Set"
                  checked={delivery.mirrorSet}
                  onChange={(e) =>
                    setDelivery((s) => ({
                      ...s,
                      mirrorSet: e.target.checked,
                    }))
                  }
                />
                <Checkbox
                  label="Other"
                  checked={delivery.other}
                  onChange={(e) =>
                    setDelivery((s) => ({ ...s, other: e.target.checked }))
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Submit Button - Bottom Center */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleCreateOrder}
          className="rounded-lg bg-primary-600 px-8 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-primary-700 hover:shadow-lg"
        >
          Create Order
        </button>
      </div>
    </div>
  );
}